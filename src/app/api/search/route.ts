import { NextRequest, NextResponse } from 'next/server';
import { parseSearchQuery } from '@/lib/nlp-parser';
import { searchFlights, searchStays } from '@/lib/duffel-client';
import { buildDeals } from '@/lib/deal-builder';
import { buildQueryText, embedText } from '@/lib/embeddings';
import { findSimilarDestinations } from '@/lib/destination-search';
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

const RATE_LIMIT = { windowMs: 60_000, maxRequests: 5 };
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return false;
  }
  record.count++;
  return record.count > RATE_LIMIT.maxRequests;
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
    if (isRateLimited(ip)) {
      return setCorsHeaders(
        NextResponse.json(
          { error: 'Too many requests. Please try again in a minute.' },
          { status: 429 }
        ),
        origin
      );
    }

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
    console.log('[search] Parsing query with Haiku...');
    const intent = await parseSearchQuery(query);
    console.log('[search] Haiku parsed:', JSON.stringify({ destinations: intent.destinations, nights: intent.nights, travellers: intent.travellers }));

    // Step 1.5: Semantic destination matching
    const queryText = buildQueryText(intent);
    const queryEmbedding = await embedText(queryText);
    let destinations = intent.destinations;
    let similarityMap: Record<string, number> = {};

    if (queryEmbedding) {
      const matches = await findSimilarDestinations(queryEmbedding, {
        limit: 5,
        budgetPerPerson: intent.budgetPerPerson,
      });
      if (matches.length > 0) {
        destinations = matches.slice(0, 3).map(m => m.slug);
        similarityMap = Object.fromEntries(matches.map(m => [m.slug, m.similarity]));
        console.log('[search] Semantic matches:', matches.map(m => `${m.slug} (${m.similarity.toFixed(2)})`).join(', '));
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
    console.log('[search] Dates:', departureDate, '→', returnDate);

    // Step 3: Search flights and stays in parallel
    console.log('[search] Searching Duffel flights + stays for:', destinations.join(', '));
    const [flights, stays] = await Promise.all([
      searchFlights({
        destinations,
        origin: intent.originAirport ?? undefined,
        departureDate,
        returnDate,
        travellers: intent.travellers,
      }),
      searchStays({
        destinations,
        checkIn: departureDate,
        checkOut: returnDate,
        guests: intent.travellers,
      }),
    ]);
    console.log('[search] Flights:', flights.length, 'results. Stays:', stays.length, 'results');

    // Step 4: Bundle into deals (async — fetches market price data)
    const deals = await buildDeals({
      flights,
      stays,
      interests: intent.interests,
      travellers: intent.travellers,
      budgetPerPerson: intent.budgetPerPerson,
      origin: intent.originAirport ?? undefined,
      sessionProfile: sanitizeSessionProfile(body.sessionProfile),
      similarityScores: similarityMap,
    });
    console.log('[search] Built', deals.length, 'deals');

    // Strip internal margin fields before sending to client
    const result: SearchResult = {
      deals: deals.slice(0, 6).map(({ netMargin, isLossMaker, ...deal }) => deal),
      preferences: intent.preferences,
      query,
      source: 'duffel',
    };

    return setCorsHeaders(NextResponse.json(result), origin);
  } catch (err) {
    console.error('Search API error:', err);
    return setCorsHeaders(
      NextResponse.json({ error: 'Search failed', fallback: true }, { status: 500 }),
      origin
    );
  }
}
