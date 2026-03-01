import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

// Reset module state between tests
let searchAmadeusHotels: typeof import('../amadeus-client').searchAmadeusHotels;

function tokenResponse(expiresIn = 1799) {
  return new Response(JSON.stringify({ access_token: 'test-token-123', token_type: 'Bearer', expires_in: expiresIn }), { status: 200 });
}

function hotelListResponse(hotels: Array<{ hotelId: string; name: string; rating?: number }> = [
  { hotelId: 'HLLON001', name: 'Hotel Alpha', rating: 4 },
  { hotelId: 'HLLON002', name: 'Hotel Beta', rating: 3 },
]) {
  return new Response(JSON.stringify({ data: hotels }), { status: 200 });
}

function hotelOffersResponse(offers: Array<{
  hotel: { hotelId: string; name: string; rating?: string; media?: Array<{ uri: string }> };
  offers: Array<{ id: string; price: { total: string; currency: string }; boardType?: string }>;
}> = [
  {
    hotel: { hotelId: 'HLLON001', name: 'Hotel Alpha', rating: '4', media: [{ uri: 'https://img.example.com/alpha.jpg' }] },
    offers: [{ id: 'OFF1', price: { total: '300.00', currency: 'GBP' }, boardType: 'BREAKFAST' }],
  },
  {
    hotel: { hotelId: 'HLLON002', name: 'Hotel Beta', rating: '3' },
    offers: [{ id: 'OFF2', price: { total: '180.00', currency: 'GBP' } }],
  },
]) {
  return new Response(JSON.stringify({ data: offers }), { status: 200 });
}

const defaultParams = {
  cityCode: 'LON',
  checkIn: '2026-04-01',
  checkOut: '2026-04-04',
  guests: 2,
  destination: 'london',
};

describe('amadeus-client', () => {
  beforeEach(async () => {
    vi.resetModules();
    mockFetch.mockReset();
    process.env.AMADEUS_API_KEY = 'test-key';
    process.env.AMADEUS_API_SECRET = 'test-secret';
    const mod = await import('../amadeus-client');
    searchAmadeusHotels = mod.searchAmadeusHotels;
  });

  afterEach(() => {
    delete process.env.AMADEUS_API_KEY;
    delete process.env.AMADEUS_API_SECRET;
  });

  // 1. Returns empty array when credentials not set
  it('returns [] when AMADEUS_API_KEY is not set', async () => {
    delete process.env.AMADEUS_API_KEY;
    const results = await searchAmadeusHotels(defaultParams);
    expect(results).toEqual([]);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('returns [] when AMADEUS_API_SECRET is not set', async () => {
    delete process.env.AMADEUS_API_SECRET;
    const results = await searchAmadeusHotels(defaultParams);
    expect(results).toEqual([]);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  // 2. Token fetch and caching
  it('fetches OAuth token and caches it across calls', async () => {
    mockFetch
      .mockResolvedValueOnce(tokenResponse())
      .mockResolvedValueOnce(hotelListResponse())
      .mockResolvedValueOnce(hotelOffersResponse())
      // Second call should reuse cached token
      .mockResolvedValueOnce(hotelListResponse())
      .mockResolvedValueOnce(hotelOffersResponse());

    await searchAmadeusHotels(defaultParams);
    await searchAmadeusHotels(defaultParams);

    // Token should only be fetched once
    const tokenCalls = mockFetch.mock.calls.filter(
      (c: unknown[]) => String(c[0]).includes('oauth2/token')
    );
    expect(tokenCalls).toHaveLength(1);
  });

  // 3. Hotel list request formatting
  it('calls hotel list API with correct params', async () => {
    mockFetch
      .mockResolvedValueOnce(tokenResponse())
      .mockResolvedValueOnce(hotelListResponse())
      .mockResolvedValueOnce(hotelOffersResponse());

    await searchAmadeusHotels(defaultParams);

    const listCall = mockFetch.mock.calls[1];
    const listUrl = String(listCall[0]);
    expect(listUrl).toContain('/v1/reference-data/locations/hotels/by-city');
    expect(listUrl).toContain('cityCode=LON');
    expect(listUrl).toContain('ratings=3%2C4%2C5');
  });

  // 4. Hotel offers request formatting
  it('calls hotel offers API with correct params', async () => {
    mockFetch
      .mockResolvedValueOnce(tokenResponse())
      .mockResolvedValueOnce(hotelListResponse())
      .mockResolvedValueOnce(hotelOffersResponse());

    await searchAmadeusHotels(defaultParams);

    const offersCall = mockFetch.mock.calls[2];
    const offersUrl = String(offersCall[0]);
    expect(offersUrl).toContain('/v3/shopping/hotel-offers');
    expect(offersUrl).toContain('hotelIds=HLLON001%2CHLLON002');
    expect(offersUrl).toContain('checkInDate=2026-04-01');
    expect(offersUrl).toContain('checkOutDate=2026-04-04');
    expect(offersUrl).toContain('adults=2');
    expect(offersUrl).toContain('currency=GBP');
  });

  // 5. Response mapping to StayResult
  it('maps Amadeus response to StayResult correctly', async () => {
    mockFetch
      .mockResolvedValueOnce(tokenResponse())
      .mockResolvedValueOnce(hotelListResponse())
      .mockResolvedValueOnce(hotelOffersResponse());

    const results = await searchAmadeusHotels(defaultParams);

    expect(results).toHaveLength(2);
    // Sorted by price — Hotel Beta (£180) before Hotel Alpha (£300)
    expect(results[0]).toEqual({
      destination: 'london',
      hotelName: 'Hotel Beta',
      rating: 3,
      reviewScore: null,
      totalPrice: 180,
      pricePerNight: 60,
      currency: 'GBP',
      checkIn: '2026-04-01',
      checkOut: '2026-04-04',
      photoUrl: null,
      boardType: 'room_only',
    });
    expect(results[1]).toEqual({
      destination: 'london',
      hotelName: 'Hotel Alpha',
      rating: 4,
      reviewScore: null,
      totalPrice: 300,
      pricePerNight: 100,
      currency: 'GBP',
      checkIn: '2026-04-01',
      checkOut: '2026-04-04',
      photoUrl: 'https://img.example.com/alpha.jpg',
      boardType: 'BREAKFAST',
    });
  });

  // 6. Limits results to 3
  it('returns max 3 results sorted by price', async () => {
    const manyOffers = [
      { hotel: { hotelId: 'H1', name: 'Expensive', rating: '5' }, offers: [{ id: 'O1', price: { total: '500.00', currency: 'GBP' } }] },
      { hotel: { hotelId: 'H2', name: 'Cheap', rating: '3' }, offers: [{ id: 'O2', price: { total: '100.00', currency: 'GBP' } }] },
      { hotel: { hotelId: 'H3', name: 'Mid', rating: '4' }, offers: [{ id: 'O3', price: { total: '250.00', currency: 'GBP' } }] },
      { hotel: { hotelId: 'H4', name: 'Budget', rating: '3' }, offers: [{ id: 'O4', price: { total: '80.00', currency: 'GBP' } }] },
    ];

    mockFetch
      .mockResolvedValueOnce(tokenResponse())
      .mockResolvedValueOnce(hotelListResponse([
        { hotelId: 'H1', name: 'Expensive' },
        { hotelId: 'H2', name: 'Cheap' },
        { hotelId: 'H3', name: 'Mid' },
        { hotelId: 'H4', name: 'Budget' },
      ]))
      .mockResolvedValueOnce(new Response(JSON.stringify({ data: manyOffers }), { status: 200 }));

    const results = await searchAmadeusHotels(defaultParams);

    expect(results).toHaveLength(3);
    expect(results.map(r => r.hotelName)).toEqual(['Budget', 'Cheap', 'Mid']);
  });

  // 7. Retries on 401
  it('retries with fresh token on 401', async () => {
    mockFetch
      .mockResolvedValueOnce(tokenResponse())
      // First hotel list call returns 401
      .mockResolvedValueOnce(new Response('Unauthorized', { status: 401 }))
      // Fresh token
      .mockResolvedValueOnce(tokenResponse())
      // Retry succeeds
      .mockResolvedValueOnce(hotelListResponse())
      .mockResolvedValueOnce(hotelOffersResponse());

    const results = await searchAmadeusHotels(defaultParams);

    expect(results).toHaveLength(2);
    // Should have fetched token twice
    const tokenCalls = mockFetch.mock.calls.filter(
      (c: unknown[]) => String(c[0]).includes('oauth2/token')
    );
    expect(tokenCalls).toHaveLength(2);
  });

  // 8. Returns [] when hotel list is empty
  it('returns [] when no hotels found for city', async () => {
    mockFetch
      .mockResolvedValueOnce(tokenResponse())
      .mockResolvedValueOnce(new Response(JSON.stringify({ data: [] }), { status: 200 }));

    const results = await searchAmadeusHotels(defaultParams);
    expect(results).toEqual([]);
  });

  // 9. Returns [] when API errors
  it('returns [] on API error', async () => {
    mockFetch
      .mockResolvedValueOnce(tokenResponse())
      .mockResolvedValueOnce(new Response('Server Error', { status: 500 }));

    const results = await searchAmadeusHotels(defaultParams);
    expect(results).toEqual([]);
  });

  // 10. Handles missing photo and rating gracefully
  it('handles missing photo and rating', async () => {
    mockFetch
      .mockResolvedValueOnce(tokenResponse())
      .mockResolvedValueOnce(hotelListResponse([{ hotelId: 'H1', name: 'No Photo Hotel' }]))
      .mockResolvedValueOnce(hotelOffersResponse([{
        hotel: { hotelId: 'H1', name: 'No Photo Hotel' },
        offers: [{ id: 'O1', price: { total: '200.00', currency: 'GBP' } }],
      }]));

    const results = await searchAmadeusHotels(defaultParams);

    expect(results).toHaveLength(1);
    expect(results[0].photoUrl).toBeNull();
    expect(results[0].rating).toBeNull();
    expect(results[0].boardType).toBe('room_only');
  });
});
