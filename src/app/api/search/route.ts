import { NextRequest, NextResponse } from 'next/server';
import { parseSearchQuery } from '@/lib/nlp-parser';
import { searchFlights, searchStays } from '@/lib/duffel-client';
import { buildDeals } from '@/lib/deal-builder';
import { searchDeals as searchMockDeals } from '@/lib/search-engine';
import { SearchResult } from '@/types';

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

    // Step 2: Calculate dates
    const now = new Date();
    let departureDate: string;
    let returnDate: string;

    if (intent.departureWindow) {
      const earliest = intent.departureWindow.earliest;
      const latest = intent.departureWindow.latest;
      // Use earliest, but fall back to latest if earliest is in the past
      if (new Date(earliest) >= now) {
        departureDate = earliest;
      } else if (latest && new Date(latest) >= now) {
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
    console.log('[search] Searching Duffel flights + stays...');
    const [flights, stays] = await Promise.all([
      searchFlights({
        destinations: intent.destinations,
        origin: intent.originAirport ?? undefined,
        departureDate,
        returnDate,
        travellers: intent.travellers,
      }),
      searchStays({
        destinations: intent.destinations,
        checkIn: departureDate,
        checkOut: returnDate,
        guests: intent.travellers,
      }),
    ]);
    console.log('[search] Flights:', flights.length, 'results. Stays:', stays.length, 'results');

    // Step 4: Bundle into deals
    const deals = buildDeals({
      flights,
      stays,
      interests: intent.interests,
      travellers: intent.travellers,
      budgetPerPerson: intent.budgetPerPerson,
    });
    console.log('[search] Built', deals.length, 'deals');

    // If Duffel returned no results (test mode, no Stays access, etc.),
    // use Claude Haiku preferences with mock deals as a hybrid fallback
    if (deals.length === 0) {
      console.log('[search] No Duffel results — falling back to mock deals');
      const mockResult = await searchMockDeals(query);
      const result: SearchResult = {
        deals: mockResult.deals,
        preferences: intent.preferences.length > 0 ? intent.preferences : mockResult.preferences,
        query,
        source: 'mock',
      };
      return setCorsHeaders(NextResponse.json(result), origin);
    }

    const result: SearchResult = {
      deals: deals.slice(0, 6),
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
