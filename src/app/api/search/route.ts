import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parseSearchQuery } from '@/lib/nlp-parser';
import { searchFlights, searchStays, ResolvedDestination } from '@/lib/duffel-client';
import { searchAmadeusHotels } from '@/lib/amadeus-client';
import { buildDeals } from '@/lib/deal-builder';
import { buildQueryText, embedText } from '@/lib/embeddings';
import { findSimilarDestinations } from '@/lib/destination-search';
import { getServerSession, saveServerSession, createServerSession } from '@/lib/session-store';
import { getRedis } from '@/lib/redis';
import { SearchResult, SessionProfile } from '@/types';

/** Validate and sanitize client-provided session profile to prevent abuse */
function sanitizeSessionProfile(raw: unknown): SessionProfile | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;

  // Validate required shape
  if (typeof obj.sessionId !== 'string') return null;
  if (typeof obj.searchCount !== 'number' || obj.searchCount < 0 || obj.searchCount > 1000) return null;

  // Cap array/object sizes to prevent oversized payloads
  const interests = typeof obj.interests === 'object' && obj.interests !== null
    ? Object.fromEntries(Object.entries(obj.interests as Record<string, unknown>).slice(0, 50).filter(([, v]) => typeof v === 'number'))
    : {};
  const destinations = typeof obj.destinations === 'object' && obj.destinations !== null
    ? Object.fromEntries(Object.entries(obj.destinations as Record<string, unknown>).slice(0, 50).filter(([, v]) => typeof v === 'number'))
    : {};
  const budgetSignals = Array.isArray(obj.budgetSignals)
    ? obj.budgetSignals.slice(0, 100).filter((v): v is number => typeof v === 'number')
    : [];
  const travelStyle = typeof obj.travelStyle === 'object' && obj.travelStyle !== null
    ? Object.fromEntries(Object.entries(obj.travelStyle as Record<string, unknown>).slice(0, 50).filter(([, v]) => typeof v === 'number'))
    : {};
  const dismissedPreferences = Array.isArray(obj.dismissedPreferences)
    ? obj.dismissedPreferences.slice(0, 50).filter((v): v is string => typeof v === 'string')
    : [];

  return {
    sessionId: String(obj.sessionId).slice(0, 100),
    searchCount: Math.min(obj.searchCount as number, 1000),
    interests: interests as Record<string, number>,
    destinations: destinations as Record<string, number>,
    budgetSignals,
    travelStyle: travelStyle as Record<string, number>,
    dismissedPreferences,
    createdAt: typeof obj.createdAt === 'string' ? obj.createdAt.slice(0, 30) : new Date().toISOString(),
    lastSearchAt: typeof obj.lastSearchAt === 'string' ? obj.lastSearchAt.slice(0, 30) : new Date().toISOString(),
    breakdownClicks: typeof obj.breakdownClicks === 'number' ? Math.min(Math.max(0, obj.breakdownClicks), 10000) : undefined,
    proInterestClicked: typeof obj.proInterestClicked === 'boolean' ? obj.proInterestClicked : undefined,
    proInterestEmail: typeof obj.proInterestEmail === 'string' ? obj.proInterestEmail.slice(0, 200) : undefined,
  };
}

const ALLOWED_ORIGINS = [
  'https://roami.world',
  'http://localhost:3000',
  'http://localhost:3001',
];

function setCorsHeaders(res: NextResponse, origin: string | null): NextResponse {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  const res = new NextResponse(null, { status: 204 });
  return setCorsHeaders(res, origin);
}

async function isRateLimited(ip: string): Promise<boolean> {
  try {
    const redis = getRedis();
    if (!redis) return false; // No Redis = no rate limiting (graceful degradation)

    const key = `ratelimit:search:${ip}`;
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, 60); // 60 second window
    }
    return count > 5; // 5 requests per minute
  } catch {
    return false; // Redis error = don't block the request
  }
}

function addDays(date: Date, days: number): string {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().split('T')[0];
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');

  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (await isRateLimited(ip)) {
      return setCorsHeaders(
        NextResponse.json(
          { error: 'Too many requests. Please try again in a minute.' },
          { status: 429 }
        ),
        origin
      );
    }

    // Session: read cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('roami_sid')?.value ?? null;

    const body = await request.json();
    const query = body.query;

    if (!query || typeof query !== 'string') {
      return setCorsHeaders(
        NextResponse.json({ error: 'Query is required' }, { status: 400 }),
        origin
      );
    }

    if (query.length > 500) {
      return setCorsHeaders(
        NextResponse.json({ error: 'Query too long (max 500 characters)' }, { status: 400 }),
        origin
      );
    }

    // Check API keys are configured
    if (!process.env.ANTHROPIC_API_KEY || !process.env.DUFFEL_API_TOKEN) {
      return setCorsHeaders(
        NextResponse.json({ error: 'API keys not configured', fallback: true }, { status: 503 }),
        origin
      );
    }

    // Step 1: Parse the natural language query with Claude Haiku
    const intent = await parseSearchQuery(query);

    // Step 1.5: Semantic destination matching
    const queryText = buildQueryText(intent, query);
    const queryEmbedding = await embedText(queryText);
    let destinations = intent.destinations;
    let similarityMap: Record<string, number> = {};
    let resolvedDestinations: ResolvedDestination[] = [];
    let destinationTags: Record<string, string[]> = {};

    if (queryEmbedding) {
      const matches = await findSimilarDestinations(queryEmbedding, {
        limit: 8,
        budgetPerPerson: intent.budgetPerPerson,
      });
      if (matches.length > 0) {
        // Take top 5 for flight search (more chances for Duffel to find routes)
        const top = matches.slice(0, 5);
        destinations = top.map(m => m.slug);
        similarityMap = Object.fromEntries(matches.map(m => [m.slug, m.similarity]));
        resolvedDestinations = top.map(m => ({
          slug: m.slug,
          iata: m.iata,
          name: m.name,
          country: m.country,
          latitude: m.latitude,
          longitude: m.longitude,
          imageUrl: m.imageUrl,
          tags: m.tags,
          seedPriceGbp: m.seedPriceGbp,
        }));
        destinationTags = Object.fromEntries(top.map(m => [m.slug, m.tags]));
      }
    }

    // Step 2: Calculate dates
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    let departureDate: string;
    let returnDate: string;

    if (intent.departureWindow) {
      const earliest = intent.departureWindow.earliest;
      const latest = intent.departureWindow.latest;
      // Compare date-only strings to avoid time-of-day issues
      if (earliest >= todayStr) {
        departureDate = earliest;
      } else if (latest && latest >= todayStr) {
        departureDate = latest;
      } else {
        departureDate = addDays(now, 21);
      }
      const dep = new Date(departureDate);
      returnDate = addDays(dep, intent.nights);
    } else {
      // Default: 3 weeks from now
      departureDate = addDays(now, 21);
      returnDate = addDays(now, 21 + intent.nights);
    }
    // Step 3: Search flights and stays in parallel
    const [flights, duffelStays] = await Promise.all([
      searchFlights({
        destinations,
        origin: intent.originAirport ?? undefined,
        departureDate,
        returnDate,
        travellers: intent.travellers,
        resolvedDestinations,
      }),
      searchStays({
        destinations,
        checkIn: departureDate,
        checkOut: returnDate,
        guests: intent.travellers,
        resolvedDestinations,
      }),
    ]);

    // Step 3.5: If Duffel Stays returned nothing, try Amadeus for hotel data
    let stays = duffelStays;
    if (duffelStays.length === 0 && resolvedDestinations.length > 0) {
      const amadeusResults = await Promise.all(
        resolvedDestinations
          .filter(rd => rd.slug)
          .map(rd => searchAmadeusHotels({
            cityCode: rd.iata,
            checkIn: departureDate,
            checkOut: returnDate,
            guests: intent.travellers,
            destination: rd.slug!,
          }))
      );
      stays = amadeusResults.flat();
    }

    // Step 4: Bundle into deals (async — fetches market price data)
    const resolvedMap: Record<string, { iata: string; country: string; imageUrl: string; seedPriceGbp: number | null }> = {};
    for (const rd of resolvedDestinations) {
      if (rd.slug) {
        resolvedMap[rd.slug] = {
          iata: rd.iata,
          country: rd.country,
          imageUrl: rd.imageUrl ?? '',
          seedPriceGbp: rd.seedPriceGbp ?? null,
        };
      }
    }

    // Merge session: prefer server-side if available, fall back to client-provided
    let sessionProfile = sanitizeSessionProfile(body.sessionProfile);
    if (sessionCookie) {
      const serverSession = await getServerSession(sessionCookie);
      if (serverSession) {
        // Server session has higher search count = more data, prefer it
        if (!sessionProfile || serverSession.searchCount >= sessionProfile.searchCount) {
          sessionProfile = serverSession;
        }
      }
    }

    const deals = await buildDeals({
      flights,
      stays,
      interests: intent.interests,
      travellers: intent.travellers,
      budgetPerPerson: intent.budgetPerPerson,
      origin: intent.originAirport ?? undefined,
      sessionProfile,
      similarityScores: similarityMap,
      destinationTags,
      resolvedDestinations: resolvedMap,
    });

    // Strip internal margin fields before sending to client
    const result: SearchResult = {
      deals: deals.slice(0, 6).map(({ netMargin, isLossMaker, ...deal }) => deal),
      preferences: intent.preferences,
      query,
      source: 'duffel',
      budgetPerPerson: intent.budgetPerPerson ?? null,
    };

    // Persist session server-side (best-effort, non-blocking for response)
    let sessionId = sessionCookie;
    if (sessionProfile) {
      if (sessionId) {
        // Fire-and-forget save
        saveServerSession(sessionId, sessionProfile).catch(() => {});
      } else {
        // Create new server session
        sessionId = await createServerSession(sessionProfile);
      }
    }
    result.sessionId = sessionId ?? undefined;

    const response = setCorsHeaders(NextResponse.json(result), origin);

    // Set session cookie if new or missing
    if (sessionId && sessionId !== sessionCookie) {
      response.cookies.set('roami_sid', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });
    }

    return response;
  } catch (err) {
    console.error('Search API error:', err);
    return setCorsHeaders(
      NextResponse.json({ error: 'Search failed', fallback: true }, { status: 500 }),
      origin
    );
  }
}
