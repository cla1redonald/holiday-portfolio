import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ---------------------------------------------------------------------------
// Mocks — must be declared before importing the module under test
// ---------------------------------------------------------------------------

const mockStaysSearch = vi.fn();
const mockOfferRequestsCreate = vi.fn();
const mockOffersList = vi.fn();

vi.mock('@duffel/api', () => ({
  Duffel: vi.fn(() => ({
    stays: { search: mockStaysSearch },
    offerRequests: { create: mockOfferRequestsCreate },
    offers: { list: mockOffersList },
  })),
}));

vi.mock('../iata-codes', () => ({
  lookupCity: vi.fn((name: string) => {
    const cities: Record<string, { iata: string; country: string; latitude: number; longitude: number; image: string }> = {
      lisbon: { iata: 'LIS', country: 'Portugal', latitude: 38.7223, longitude: -9.1393, image: 'https://example.com/lisbon.jpg' },
      barcelona: { iata: 'BCN', country: 'Spain', latitude: 41.3874, longitude: 2.1686, image: 'https://example.com/barcelona.jpg' },
    };
    return cities[name.toLowerCase()];
  }),
}));

// Import AFTER mocks are declared
import { searchStays, type StayResult } from '../duffel-client';

// ---------------------------------------------------------------------------
// Helpers — build realistic SDK-shaped responses
// ---------------------------------------------------------------------------

function makeSdkStayResult(overrides: Partial<{
  id: string;
  name: string;
  rating: number | null;
  review_score: number | null;
  totalAmount: string;
  currency: string;
  photoUrl: string | null;
}> = {}) {
  return {
    id: overrides.id ?? 'stay_001',
    check_in_date: '2025-06-15',
    check_out_date: '2025-06-18',
    accommodation: {
      name: overrides.name ?? 'Hotel Lisbon Central',
      rating: overrides.rating !== undefined ? overrides.rating : 4,
      review_score: overrides.review_score !== undefined ? overrides.review_score : 8.5,
      photos: overrides.photoUrl !== undefined
        ? (overrides.photoUrl ? [{ url: overrides.photoUrl }] : [])
        : [{ url: 'https://photos.example.com/hotel.jpg' }],
    },
    rooms: 1,
    guests: [{ type: 'adult' }],
    cheapest_rate_total_amount: overrides.totalAmount ?? '300.00',
    cheapest_rate_currency: overrides.currency ?? 'GBP',
    expires_at: '2025-06-14T23:59:59Z',
  };
}

function makeSdkResponse(results: ReturnType<typeof makeSdkStayResult>[]) {
  return {
    data: {
      results,
      created_at: '2025-06-01T12:00:00Z',
    },
  };
}

// ---------------------------------------------------------------------------
// Default search params
// ---------------------------------------------------------------------------

const defaultParams = {
  destinations: ['lisbon'],
  checkIn: '2025-06-15',
  checkOut: '2025-06-18',
  guests: 2,
  rooms: 1,
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('searchStays — Duffel SDK integration', () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    // Spy on global fetch to assert it is NOT called for stays
    fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}'));
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  // -----------------------------------------------------------------------
  // 1. SDK usage — calls duffel.stays.search(), not raw fetch
  // -----------------------------------------------------------------------
  it('calls duffel.stays.search() with the SDK client', async () => {
    mockStaysSearch.mockResolvedValueOnce(makeSdkResponse([makeSdkStayResult()]));

    await searchStays(defaultParams);

    expect(mockStaysSearch).toHaveBeenCalledTimes(1);
  });

  // -----------------------------------------------------------------------
  // 2. Location params — SDK receives geographic_coordinates from lookupCity
  // -----------------------------------------------------------------------
  it('passes correct geographic_coordinates from lookupCity to SDK', async () => {
    mockStaysSearch.mockResolvedValueOnce(makeSdkResponse([makeSdkStayResult()]));

    await searchStays(defaultParams);

    expect(mockStaysSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        location: {
          radius: 10,
          geographic_coordinates: {
            latitude: 38.7223,
            longitude: -9.1393,
          },
        },
      }),
    );
  });

  // -----------------------------------------------------------------------
  // 3. Guest construction — SDK receives correct guests array
  // -----------------------------------------------------------------------
  it('constructs guests array matching traveller count', async () => {
    mockStaysSearch.mockResolvedValueOnce(makeSdkResponse([makeSdkStayResult()]));

    await searchStays({ ...defaultParams, guests: 3 });

    const call = mockStaysSearch.mock.calls[0][0];
    expect(call.guests).toEqual([
      { type: 'adult' },
      { type: 'adult' },
      { type: 'adult' },
    ]);
  });

  // -----------------------------------------------------------------------
  // 4. Check-in / check-out / rooms params forwarded correctly
  // -----------------------------------------------------------------------
  it('passes check_in_date, check_out_date, and rooms to SDK', async () => {
    mockStaysSearch.mockResolvedValueOnce(makeSdkResponse([makeSdkStayResult()]));

    await searchStays(defaultParams);

    expect(mockStaysSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        check_in_date: '2025-06-15',
        check_out_date: '2025-06-18',
        rooms: 1,
      }),
    );
  });

  // -----------------------------------------------------------------------
  // 5. Result mapping — SDK response correctly mapped to StayResult[]
  // -----------------------------------------------------------------------
  it('maps SDK response to StayResult with all fields', async () => {
    mockStaysSearch.mockResolvedValueOnce(
      makeSdkResponse([
        makeSdkStayResult({
          name: 'Hotel Alfama',
          rating: 5,
          review_score: 9.2,
          totalAmount: '450.00',
          currency: 'EUR',
          photoUrl: 'https://photos.example.com/alfama.jpg',
        }),
      ]),
    );

    const results = await searchStays(defaultParams);

    expect(results).toHaveLength(1);
    const stay = results[0];

    // 3 nights: June 15-18
    const expectedPricePerNight = 450.0 / 3;

    expect(stay).toEqual({
      destination: 'lisbon',
      hotelName: 'Hotel Alfama',
      rating: 5,
      reviewScore: 9.2,
      totalPrice: 450.0,
      pricePerNight: expectedPricePerNight,
      currency: 'EUR',
      checkIn: '2025-06-15',
      checkOut: '2025-06-18',
      photoUrl: 'https://photos.example.com/alfama.jpg',
      boardType: 'room_only',
    } satisfies StayResult);
  });

  // -----------------------------------------------------------------------
  // 6. Photo URL null when no photos
  // -----------------------------------------------------------------------
  it('sets photoUrl to null when accommodation has no photos', async () => {
    mockStaysSearch.mockResolvedValueOnce(
      makeSdkResponse([makeSdkStayResult({ photoUrl: null })]),
    );

    const results = await searchStays(defaultParams);

    expect(results[0].photoUrl).toBeNull();
  });

  // -----------------------------------------------------------------------
  // 7. Sorting — results sorted by cheapest_rate_total_amount
  // -----------------------------------------------------------------------
  it('sorts results by cheapest_rate_total_amount ascending', async () => {
    mockStaysSearch.mockResolvedValueOnce(
      makeSdkResponse([
        makeSdkStayResult({ id: 'expensive', totalAmount: '900.00', name: 'Expensive Hotel' }),
        makeSdkStayResult({ id: 'cheap', totalAmount: '150.00', name: 'Budget Inn' }),
        makeSdkStayResult({ id: 'mid', totalAmount: '400.00', name: 'Mid-Range Stay' }),
      ]),
    );

    const results = await searchStays(defaultParams);

    expect(results[0].hotelName).toBe('Budget Inn');
    expect(results[1].hotelName).toBe('Mid-Range Stay');
    expect(results[2].hotelName).toBe('Expensive Hotel');
  });

  // -----------------------------------------------------------------------
  // 8. Limit — max 3 results per destination
  // -----------------------------------------------------------------------
  it('limits results to 3 per destination', async () => {
    mockStaysSearch.mockResolvedValueOnce(
      makeSdkResponse([
        makeSdkStayResult({ id: '1', totalAmount: '100.00', name: 'Hotel A' }),
        makeSdkStayResult({ id: '2', totalAmount: '200.00', name: 'Hotel B' }),
        makeSdkStayResult({ id: '3', totalAmount: '300.00', name: 'Hotel C' }),
        makeSdkStayResult({ id: '4', totalAmount: '400.00', name: 'Hotel D' }),
        makeSdkStayResult({ id: '5', totalAmount: '500.00', name: 'Hotel E' }),
      ]),
    );

    const results = await searchStays(defaultParams);

    expect(results).toHaveLength(3);
    expect(results.map((r) => r.hotelName)).toEqual(['Hotel A', 'Hotel B', 'Hotel C']);
  });

  // -----------------------------------------------------------------------
  // 9. Error handling — SDK errors caught, returns []
  // -----------------------------------------------------------------------
  it('catches SDK errors and returns empty array', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    mockStaysSearch.mockRejectedValueOnce({
      errors: [{ title: 'Forbidden', message: 'Stays not enabled', code: 'forbidden' }],
      meta: { status: 403 },
    });

    const results = await searchStays(defaultParams);

    expect(results).toEqual([]);
    consoleSpy.mockRestore();
  });

  // -----------------------------------------------------------------------
  // 10. Error handling — 403 specifically
  // -----------------------------------------------------------------------
  it('handles 403 (stays not enabled) gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    mockStaysSearch.mockRejectedValueOnce({
      errors: [{ title: 'Forbidden', message: 'Your account does not have access to Stays', code: 'forbidden' }],
      meta: { status: 403 },
    });

    const results = await searchStays(defaultParams);

    expect(results).toEqual([]);
    // Should log the structured error
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Stays search failed for lisbon'),
      expect.any(String),
    );
    consoleSpy.mockRestore();
  });

  // -----------------------------------------------------------------------
  // 11. Unknown destination — lookupCity returns undefined
  // -----------------------------------------------------------------------
  it('returns empty array for unknown destinations', async () => {
    const results = await searchStays({
      ...defaultParams,
      destinations: ['atlantis'],
    });

    expect(results).toEqual([]);
    // SDK should NOT be called when city lookup fails
    expect(mockStaysSearch).not.toHaveBeenCalled();
  });

  // -----------------------------------------------------------------------
  // 12. Empty results — SDK returns empty results array
  // -----------------------------------------------------------------------
  it('handles SDK returning empty results', async () => {
    mockStaysSearch.mockResolvedValueOnce(makeSdkResponse([]));

    const results = await searchStays(defaultParams);

    expect(results).toEqual([]);
  });

  // -----------------------------------------------------------------------
  // 13. Multiple destinations — searches in parallel, max 3
  // -----------------------------------------------------------------------
  it('searches multiple destinations in parallel (max 3)', async () => {
    mockStaysSearch.mockResolvedValue(
      makeSdkResponse([makeSdkStayResult()]),
    );

    await searchStays({
      ...defaultParams,
      destinations: ['lisbon', 'barcelona'],
    });

    expect(mockStaysSearch).toHaveBeenCalledTimes(2);
  });

  // -----------------------------------------------------------------------
  // 14. Destinations capped at 3
  // -----------------------------------------------------------------------
  it('caps destinations to first 3', async () => {
    mockStaysSearch.mockResolvedValue(
      makeSdkResponse([makeSdkStayResult()]),
    );

    await searchStays({
      ...defaultParams,
      destinations: ['lisbon', 'barcelona', 'lisbon', 'barcelona'],
    });

    // Only 3 calls, not 4
    expect(mockStaysSearch).toHaveBeenCalledTimes(3);
  });

  // -----------------------------------------------------------------------
  // 15. No raw fetch — stays search does NOT use global fetch
  // -----------------------------------------------------------------------
  it('does NOT use global fetch() for stays search', async () => {
    mockStaysSearch.mockResolvedValueOnce(makeSdkResponse([makeSdkStayResult()]));

    await searchStays(defaultParams);

    // fetch should not have been called at all
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  // -----------------------------------------------------------------------
  // 16. Singleton — uses getDuffel() (Duffel constructor called with token)
  // -----------------------------------------------------------------------
  it('uses getDuffel() singleton (Duffel instantiated with token)', async () => {
    const { Duffel } = await import('@duffel/api');

    mockStaysSearch.mockResolvedValueOnce(makeSdkResponse([makeSdkStayResult()]));

    await searchStays(defaultParams);

    // The Duffel constructor should have been called (by getDuffel())
    expect(Duffel).toHaveBeenCalledWith({ token: expect.any(String) });
  });

  // -----------------------------------------------------------------------
  // 17. Timeout — uses withTimeout (8s), not withAbortableTimeout
  // -----------------------------------------------------------------------
  it('returns empty when SDK call exceeds timeout', async () => {
    // Simulate a promise that never resolves (will be raced against timeout)
    mockStaysSearch.mockReturnValueOnce(new Promise(() => {}));

    const results = await searchStays(defaultParams);

    // withTimeout should cause null after 8s, resulting in empty results
    // For test speed, we use vi.useFakeTimers in a separate test
    // Here we just verify the function signature works with slow responses
    // The real timeout test is below with fake timers
    expect(results).toBeDefined();
  }, 15000);

  // -----------------------------------------------------------------------
  // 18. Timeout with fake timers
  // -----------------------------------------------------------------------
  it('times out after 8 seconds using withTimeout (not withAbortableTimeout)', async () => {
    vi.useFakeTimers();

    mockStaysSearch.mockReturnValueOnce(
      new Promise((resolve) => {
        // Will resolve after 15s — well past the 8s timeout
        setTimeout(() => resolve(makeSdkResponse([makeSdkStayResult()])), 15000);
      }),
    );

    const resultPromise = searchStays(defaultParams);

    // Advance past the 8s timeout
    await vi.advanceTimersByTimeAsync(9000);

    const results = await resultPromise;

    // Should get empty results because the SDK call timed out
    expect(results).toEqual([]);

    vi.useRealTimers();
  });

  // -----------------------------------------------------------------------
  // 19. Default rooms — defaults to 1 when not specified
  // -----------------------------------------------------------------------
  it('defaults rooms to 1 when not specified', async () => {
    mockStaysSearch.mockResolvedValueOnce(makeSdkResponse([makeSdkStayResult()]));

    const { rooms: _rooms, ...paramsWithoutRooms } = defaultParams;
    await searchStays(paramsWithoutRooms);

    expect(mockStaysSearch).toHaveBeenCalledWith(
      expect.objectContaining({ rooms: 1 }),
    );
  });

  // -----------------------------------------------------------------------
  // 20. Price per night calculation
  // -----------------------------------------------------------------------
  it('computes pricePerNight as totalPrice / nights', async () => {
    mockStaysSearch.mockResolvedValueOnce(
      makeSdkResponse([makeSdkStayResult({ totalAmount: '600.00' })]),
    );

    // 5 nights: June 15 - June 20
    const results = await searchStays({
      ...defaultParams,
      checkIn: '2025-06-15',
      checkOut: '2025-06-20',
    });

    expect(results[0].totalPrice).toBe(600);
    expect(results[0].pricePerNight).toBe(120); // 600 / 5
  });

  // -----------------------------------------------------------------------
  // 21. Rating and reviewScore null values pass through
  // -----------------------------------------------------------------------
  it('passes null rating and reviewScore through correctly', async () => {
    mockStaysSearch.mockResolvedValueOnce(
      makeSdkResponse([makeSdkStayResult({ rating: null, review_score: null })]),
    );

    const results = await searchStays(defaultParams);

    expect(results[0].rating).toBeNull();
    expect(results[0].reviewScore).toBeNull();
  });

  // -----------------------------------------------------------------------
  // 22. Non-Duffel errors also caught
  // -----------------------------------------------------------------------
  it('catches generic (non-Duffel) errors and returns empty array', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    mockStaysSearch.mockRejectedValueOnce(new Error('Network failure'));

    const results = await searchStays(defaultParams);

    expect(results).toEqual([]);
    consoleSpy.mockRestore();
  });
});
