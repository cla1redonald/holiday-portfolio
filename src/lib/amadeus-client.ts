import type { StayResult } from './duffel-client';

// ---------------------------------------------------------------------------
// Amadeus Hotel Search — OAuth 2.0 + Hotel List + Hotel Offers
// ---------------------------------------------------------------------------

const BASE_URL = 'https://api.amadeus.com';

let cachedToken: string | null = null;
let tokenExpiry = 0;

/**
 * Get an OAuth 2.0 access token using client_credentials grant.
 * Cached in memory; tokens typically last ~30 minutes.
 */
async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const key = process.env.AMADEUS_API_KEY;
  const secret = process.env.AMADEUS_API_SECRET;
  if (!key || !secret) throw new Error('Amadeus credentials not configured');

  const res = await fetch(`${BASE_URL}/v1/security/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: key,
      client_secret: secret,
    }),
    signal: AbortSignal.timeout(5000),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Amadeus token request failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  // Expire 60s early to avoid edge-case 401s
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken!;
}

/** Make an authenticated GET request to Amadeus. Retries once on 401. */
async function amadeusGet(path: string, params: Record<string, string>): Promise<unknown> {
  const url = new URL(path, BASE_URL);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  let token = await getToken();
  let res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(8000),
  });

  // Retry once on 401 (token may have been revoked)
  if (res.status === 401) {
    cachedToken = null;
    tokenExpiry = 0;
    token = await getToken();
    res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(8000),
    });
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Amadeus API error: ${res.status} ${text}`);
  }

  return res.json();
}

// ---------------------------------------------------------------------------
// Amadeus response shapes (partial — only what we use)
// ---------------------------------------------------------------------------

interface AmadeusHotelListItem {
  hotelId: string;
  name: string;
  rating?: number;
  geoCode?: { latitude: number; longitude: number };
}

interface AmadeusHotelOffer {
  hotel: {
    hotelId: string;
    name: string;
    rating?: string;
    media?: Array<{ uri: string }>;
    cityCode?: string;
  };
  offers: Array<{
    id: string;
    price: { total: string; currency: string };
    boardType?: string;
    room?: { description?: { text?: string } };
  }>;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Search for hotels in a city using Amadeus Hotel List + Hotel Offers APIs.
 * Returns results mapped to the same StayResult interface used by Duffel Stays.
 *
 * Gracefully returns [] when:
 * - Amadeus credentials are not set
 * - Any API call fails
 * - No hotels found for the city
 */
export async function searchAmadeusHotels(params: {
  cityCode: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  destination: string; // slug for StayResult.destination
}): Promise<StayResult[]> {
  if (!process.env.AMADEUS_API_KEY || !process.env.AMADEUS_API_SECRET) {
    return [];
  }

  try {
    // Step 1: Get hotel IDs for the city
    const listData = await amadeusGet('/v1/reference-data/locations/hotels/by-city', {
      cityCode: params.cityCode.toUpperCase(),
      ratings: '3,4,5',
      radius: '30',
      radiusUnit: 'KM',
    }) as { data?: AmadeusHotelListItem[] };

    const hotels = listData.data ?? [];
    if (hotels.length === 0) return [];

    // Take top 10 hotel IDs to keep the offers request fast
    const hotelIds = hotels.slice(0, 10).map(h => h.hotelId).join(',');

    // Step 2: Get offers for those hotels
    const offersData = await amadeusGet('/v3/shopping/hotel-offers', {
      hotelIds,
      checkInDate: params.checkIn,
      checkOutDate: params.checkOut,
      adults: String(params.guests),
      roomQuantity: '1',
      currency: 'GBP',
      bestRateOnly: 'true',
    }) as { data?: AmadeusHotelOffer[] };

    const offerResults = offersData.data ?? [];
    if (offerResults.length === 0) return [];

    // Calculate nights
    const checkInDate = new Date(params.checkIn);
    const checkOutDate = new Date(params.checkOut);
    const nights = Math.max(1, Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));

    // Map to StayResult and sort by price
    const results: StayResult[] = offerResults
      .filter(h => h.offers && h.offers.length > 0)
      .map(h => {
        const cheapest = h.offers[0];
        const totalPrice = parseFloat(cheapest.price.total);
        return {
          destination: params.destination,
          hotelName: h.hotel.name,
          rating: h.hotel.rating ? parseInt(h.hotel.rating, 10) : null,
          reviewScore: null,
          totalPrice,
          pricePerNight: Math.round((totalPrice / nights) * 100) / 100,
          currency: cheapest.price.currency,
          checkIn: params.checkIn,
          checkOut: params.checkOut,
          photoUrl: h.hotel.media?.[0]?.uri ?? null,
          boardType: cheapest.boardType ?? 'room_only',
        };
      })
      .sort((a, b) => a.totalPrice - b.totalPrice)
      .slice(0, 3);

    return results;
  } catch (err) {
    console.warn('[amadeus] Hotel search failed:', err instanceof Error ? err.message : err);
    return [];
  }
}

/** Exported for testing */
export { getToken as _getToken, amadeusGet as _amadeusGet };
