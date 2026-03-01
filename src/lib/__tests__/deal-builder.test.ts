import { describe, it, expect, vi, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// Mocks — must be declared before importing the module under test
// ---------------------------------------------------------------------------

vi.mock('../duffel-client', () => ({}));

vi.mock('../iata-codes', () => ({
  lookupCity: vi.fn((name: string) => {
    const cities: Record<string, { iata: string; country: string; latitude: number; longitude: number; image: string }> = {
      lisbon: { iata: 'LIS', country: 'Portugal', latitude: 38.7223, longitude: -9.1393, image: 'https://example.com/lisbon.jpg' },
      barcelona: { iata: 'BCN', country: 'Spain', latitude: 41.3874, longitude: 2.1686, image: 'https://example.com/barcelona.jpg' },
      prague: { iata: 'PRG', country: 'Czech Republic', latitude: 50.0755, longitude: 14.4378, image: 'https://example.com/prague.jpg' },
    };
    return cities[name.toLowerCase()];
  }),
  getDestinationImage: vi.fn((dest: string) => `https://images.example.com/${dest}.jpg`),
  getCountry: vi.fn((dest: string) => {
    const countries: Record<string, string> = { lisbon: 'Portugal', barcelona: 'Spain', prague: 'Czech Republic' };
    return countries[dest] ?? '';
  }),
}));

const mockGetMarketPrice = vi.fn();
const mockGetPricePercentile = vi.fn();
const mockLogPriceObservations = vi.fn();

vi.mock('../price-intelligence', () => ({
  getMarketPrice: (...args: unknown[]) => mockGetMarketPrice(...args),
  getPricePercentile: (...args: unknown[]) => mockGetPricePercentile(...args),
  logPriceObservations: (...args: unknown[]) => mockLogPriceObservations(...args),
  SEED_PRICES: {
    lisbon: 320,
    barcelona: 350,
    amsterdam: 380,
    rome: 340,
    prague: 260,
  },
}));

// Import AFTER mocks are declared
import { buildDeals } from '../deal-builder';
import type { FlightResult, StayResult } from '../duffel-client';
import type { SessionProfile } from '@/types';

// ---------------------------------------------------------------------------
// Helpers — build realistic test fixtures
// ---------------------------------------------------------------------------

function makeFlight(overrides: Partial<FlightResult> = {}): FlightResult {
  return {
    destination: 'lisbon',
    airline: 'TAP',
    departureDate: '2026-04-15',
    returnDate: '2026-04-18',
    pricePerPerson: 89,
    currency: 'GBP',
    nights: 3,
    offerId: 'off_123',
    offerExpiresAt: '2026-04-14T12:00:00Z',
    cabinClass: 'economy',
    stops: 0,
    outboundDeparture: '2026-04-15T06:00:00Z',
    outboundArrival: '2026-04-15T08:40:00Z',
    returnDeparture: '2026-04-18T17:00:00Z',
    returnArrival: '2026-04-18T19:30:00Z',
    baggageIncluded: true,
    airlineLogo: 'https://logo.example/tap.png',
    totalDuration: 160,
    allOffers: [
      { offerId: 'off_123', pricePerPerson: 89, currency: 'GBP', airline: 'TAP', airlineLogo: null, stops: 0, totalDuration: 160 },
      { offerId: 'off_456', pricePerPerson: 125, currency: 'GBP', airline: 'BA', airlineLogo: null, stops: 1, totalDuration: 240 },
    ],
    ...overrides,
  };
}

function makeStay(overrides: Partial<StayResult> = {}): StayResult {
  return {
    destination: 'lisbon',
    hotelName: 'Hotel Lisbon Central',
    rating: 4,
    reviewScore: 8.5,
    totalPrice: 300,
    pricePerNight: 100,
    currency: 'GBP',
    checkIn: '2026-04-15',
    checkOut: '2026-04-18',
    photoUrl: 'https://photos.example.com/hotel.jpg',
    boardType: 'room_only',
    ...overrides,
  };
}

function makeSessionProfile(overrides: Partial<SessionProfile> = {}): SessionProfile {
  return {
    sessionId: 'session_001',
    searchCount: 3,
    interests: { food: 2, culture: 1 },
    destinations: { lisbon: 2 },
    budgetSignals: [400],
    travelStyle: {},
    dismissedPreferences: [],
    createdAt: new Date().toISOString(),
    lastSearchAt: new Date().toISOString(),
    ...overrides,
  };
}

const defaultParams = {
  flights: [makeFlight()],
  stays: [makeStay()],
  interests: ['food', 'culture'],
  travellers: 2,
  budgetPerPerson: null as number | null,
  origin: 'LHR',
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('deal-builder — buildDeals', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default market price mock: seed-based, no observed data
    mockGetMarketPrice.mockResolvedValue({
      price: 320,
      source: 'seed',
      sampleCount: 0,
      percentile: null,
      trend: null,
      stats: null,
    });

    mockGetPricePercentile.mockResolvedValue(null);
    mockLogPriceObservations.mockResolvedValue(undefined);
  });

  // =========================================================================
  // 5-factor confidence scoring
  // =========================================================================

  describe('5-factor confidence scoring', () => {
    // -----------------------------------------------------------------------
    // 1. Low price percentile (<=25) gets high confidence
    // -----------------------------------------------------------------------
    it('gives high confidence when price percentile is <=25', async () => {
      mockGetPricePercentile.mockResolvedValue(15);
      mockGetMarketPrice.mockResolvedValue({
        price: 320,
        source: 'observed',
        sampleCount: 50,
        percentile: null,
        trend: 'stable',
        stats: { median: 320, sampleCount: 50, trend: 'stable' },
      });

      const deals = await buildDeals({ ...defaultParams, interests: [] });

      expect(deals).toHaveLength(1);
      // Price percentile <=25 should contribute 25 points to confidence
      // Base(10) + pricePercentile(25) + interest(0) + leadTime + priceTrend + sessionAlignment
      expect(deals[0].dealConfidence).toBeGreaterThanOrEqual(45);
    });

    // -----------------------------------------------------------------------
    // 2. Interest matching boosts confidence
    // -----------------------------------------------------------------------
    it('boosts confidence when interests match destination strengths', async () => {
      // Lisbon strengths: food, culture, nightlife, beach, budget
      const dealsNoInterests = await buildDeals({ ...defaultParams, interests: [] });

      const dealsWithInterests = await buildDeals({
        ...defaultParams,
        interests: ['food', 'culture', 'nightlife', 'beach', 'budget'],
      });

      expect(dealsWithInterests[0].dealConfidence).toBeGreaterThan(
        dealsNoInterests[0].dealConfidence,
      );
    });

    // -----------------------------------------------------------------------
    // 3. Booking lead time 21-56 days = 15 points
    // -----------------------------------------------------------------------
    it('gives 15 lead time points for departures 21-56 days out', async () => {
      // Set departure to 30 days from now
      const thirtyDaysOut = new Date(Date.now() + 30 * 86400000);
      const returnDate = new Date(thirtyDaysOut.getTime() + 3 * 86400000);
      const flight = makeFlight({
        departureDate: thirtyDaysOut.toISOString().split('T')[0],
        returnDate: returnDate.toISOString().split('T')[0],
      });

      const deals = await buildDeals({ ...defaultParams, flights: [flight], interests: [] });

      // Compare with a departure 5 days out (should get much lower lead time score)
      const fiveDaysOut = new Date(Date.now() + 5 * 86400000);
      const returnDateShort = new Date(fiveDaysOut.getTime() + 3 * 86400000);
      const shortFlight = makeFlight({
        departureDate: fiveDaysOut.toISOString().split('T')[0],
        returnDate: returnDateShort.toISOString().split('T')[0],
      });

      const shortDeals = await buildDeals({ ...defaultParams, flights: [shortFlight], interests: [] });

      expect(deals[0].dealConfidence).toBeGreaterThan(shortDeals[0].dealConfidence);
    });

    // -----------------------------------------------------------------------
    // 4. Price trend: rising + below median = 15 points
    // -----------------------------------------------------------------------
    it('gives max trend score when prices are rising and deal is below median', async () => {
      mockGetMarketPrice.mockResolvedValue({
        price: 320,
        source: 'observed',
        sampleCount: 50,
        percentile: null,
        trend: 'rising',
        stats: { median: 500, sampleCount: 50, trend: 'rising' },
      });

      const risingDeals = await buildDeals({ ...defaultParams, interests: [] });

      // Compare with falling trend
      mockGetMarketPrice.mockResolvedValue({
        price: 320,
        source: 'observed',
        sampleCount: 50,
        percentile: null,
        trend: 'falling',
        stats: { median: 500, sampleCount: 50, trend: 'falling' },
      });

      const fallingDeals = await buildDeals({ ...defaultParams, interests: [] });

      expect(risingDeals[0].dealConfidence).toBeGreaterThan(fallingDeals[0].dealConfidence);
    });

    // -----------------------------------------------------------------------
    // 5. Confidence is capped at 98
    // -----------------------------------------------------------------------
    it('caps confidence at 98', async () => {
      // Max everything: great price, matching interests, ideal timing, rising trend, session alignment
      mockGetPricePercentile.mockResolvedValue(10);
      mockGetMarketPrice.mockResolvedValue({
        price: 500,
        source: 'observed',
        sampleCount: 100,
        percentile: null,
        trend: 'rising',
        stats: { median: 500, sampleCount: 100, trend: 'rising' },
      });

      const thirtyDaysOut = new Date(Date.now() + 30 * 86400000);
      const returnDate = new Date(thirtyDaysOut.getTime() + 3 * 86400000);

      const deals = await buildDeals({
        ...defaultParams,
        flights: [makeFlight({
          departureDate: thirtyDaysOut.toISOString().split('T')[0],
          returnDate: returnDate.toISOString().split('T')[0],
        })],
        interests: ['food', 'culture', 'nightlife', 'beach', 'budget'],
        sessionProfile: makeSessionProfile({
          searchCount: 5,
          destinations: { lisbon: 3 },
          budgetSignals: [500, 400],
          interests: { food: 3, culture: 3, nightlife: 2 },
        }),
      });

      expect(deals[0].dealConfidence).toBeLessThanOrEqual(98);
    });
  });

  // =========================================================================
  // Session alignment
  // =========================================================================

  describe('session alignment', () => {
    // -----------------------------------------------------------------------
    // 1. Previously searched destinations get a boost
    // -----------------------------------------------------------------------
    it('boosts deals for previously searched destinations', async () => {
      const profile = makeSessionProfile({
        searchCount: 3,
        destinations: { lisbon: 2 },
      });

      const dealsWithProfile = await buildDeals({
        ...defaultParams,
        interests: [],
        sessionProfile: profile,
      });

      const dealsNoProfile = await buildDeals({
        ...defaultParams,
        interests: [],
        sessionProfile: null,
      });

      expect(dealsWithProfile[0].dealConfidence).toBeGreaterThan(
        dealsNoProfile[0].dealConfidence,
      );
    });

    // -----------------------------------------------------------------------
    // 2. Dismissed preferences reduce alignment score
    // -----------------------------------------------------------------------
    it('reduces alignment for dismissed preference overlaps', async () => {
      const profileNoDismiss = makeSessionProfile({
        searchCount: 3,
        destinations: { lisbon: 2 },
        dismissedPreferences: [],
      });

      const profileDismissed = makeSessionProfile({
        searchCount: 3,
        destinations: { lisbon: 2 },
        dismissedPreferences: ['food', 'culture', 'nightlife'], // overlaps lisbon strengths
      });

      const dealsNoDismiss = await buildDeals({
        ...defaultParams,
        interests: [],
        sessionProfile: profileNoDismiss,
      });

      const dealsDismissed = await buildDeals({
        ...defaultParams,
        interests: [],
        sessionProfile: profileDismissed,
      });

      expect(dealsNoDismiss[0].dealConfidence).toBeGreaterThanOrEqual(
        dealsDismissed[0].dealConfidence,
      );
    });

    // -----------------------------------------------------------------------
    // 3. Budget alignment (price <= avgBudget * 1.1)
    // -----------------------------------------------------------------------
    it('boosts alignment when price is within budget signals', async () => {
      const profileInBudget = makeSessionProfile({
        searchCount: 3,
        destinations: { lisbon: 1 },
        budgetSignals: [500, 600], // avg = 550, threshold = 605
      });

      const profileOverBudget = makeSessionProfile({
        searchCount: 3,
        destinations: { lisbon: 1 },
        budgetSignals: [50, 60], // avg = 55, threshold = 60.5 — deal will exceed
      });

      const dealsInBudget = await buildDeals({
        ...defaultParams,
        interests: [],
        sessionProfile: profileInBudget,
      });

      const dealsOverBudget = await buildDeals({
        ...defaultParams,
        interests: [],
        sessionProfile: profileOverBudget,
      });

      expect(dealsInBudget[0].dealConfidence).toBeGreaterThan(
        dealsOverBudget[0].dealConfidence,
      );
    });
  });

  // =========================================================================
  // Margin calculation
  // =========================================================================

  describe('margin calculation', () => {
    // -----------------------------------------------------------------------
    // 1. Passthrough mode: margin = 0
    // -----------------------------------------------------------------------
    it('sets margin to 0 in passthrough mode', async () => {
      const deals = await buildDeals(defaultParams);

      expect(deals[0].pricing!.margin).toBe(0);
      expect(deals[0].pricing!.marginType).toBe('none');
    });

    // -----------------------------------------------------------------------
    // 2. Total = flight cost + hotel cost (in passthrough)
    // -----------------------------------------------------------------------
    it('total equals flight + hotel cost in passthrough mode', async () => {
      const deals = await buildDeals(defaultParams);

      const pricing = deals[0].pricing!;
      expect(pricing.total).toBe(pricing.flightCost + pricing.hotelCost);
      expect(pricing.subtotal).toBe(pricing.total);
    });
  });

  // =========================================================================
  // Budget filtering
  // =========================================================================

  describe('budget filtering', () => {
    // -----------------------------------------------------------------------
    // 1. Deals over budget are filtered out
    // -----------------------------------------------------------------------
    it('filters out deals that exceed budgetPerPerson', async () => {
      // Flight is 89 GBP, hotel per person is 150 GBP (300/2) = 239 total
      const deals = await buildDeals({
        ...defaultParams,
        budgetPerPerson: 100, // way below total
      });

      expect(deals).toHaveLength(0);
    });

    // -----------------------------------------------------------------------
    // 2. Deals within budget are kept
    // -----------------------------------------------------------------------
    it('keeps deals within budgetPerPerson', async () => {
      const deals = await buildDeals({
        ...defaultParams,
        budgetPerPerson: 500, // well above total
      });

      expect(deals).toHaveLength(1);
    });
  });

  // =========================================================================
  // Sorting
  // =========================================================================

  describe('sorting', () => {
    // -----------------------------------------------------------------------
    // Deals are sorted by confidence descending
    // -----------------------------------------------------------------------
    it('sorts deals by confidence descending', async () => {
      // Create two flights: one with matching interests, one without
      const flightLisbon = makeFlight({ destination: 'lisbon' });
      const flightPrague = makeFlight({
        destination: 'prague',
        offerId: 'off_789',
        allOffers: [
          { offerId: 'off_789', pricePerPerson: 200, currency: 'GBP', airline: 'Ryanair', airlineLogo: null, stops: 0, totalDuration: 180 },
        ],
      });
      const stayPrague = makeStay({ destination: 'prague', hotelName: 'Hotel Prague' });

      // Lisbon matches food+culture interests; Prague (budget, nightlife, culture, architecture, historic)
      // should match less for food-focused interests
      const deals = await buildDeals({
        ...defaultParams,
        flights: [flightLisbon, flightPrague],
        stays: [makeStay(), stayPrague],
        interests: ['food', 'culture'],
      });

      expect(deals.length).toBeGreaterThanOrEqual(2);
      // Verify descending order
      for (let i = 1; i < deals.length; i++) {
        expect(deals[i - 1].dealConfidence).toBeGreaterThanOrEqual(deals[i].dealConfidence);
      }
    });
  });

  // =========================================================================
  // Price logging
  // =========================================================================

  describe('price logging', () => {
    // -----------------------------------------------------------------------
    // logPriceObservations is called with observations from all offers
    // -----------------------------------------------------------------------
    it('calls logPriceObservations with observations from all flight offers', async () => {
      const flight = makeFlight({
        allOffers: [
          { offerId: 'off_a', pricePerPerson: 89, currency: 'GBP', airline: 'TAP', airlineLogo: null, stops: 0, totalDuration: 160 },
          { offerId: 'off_b', pricePerPerson: 125, currency: 'GBP', airline: 'BA', airlineLogo: null, stops: 1, totalDuration: 240 },
          { offerId: 'off_c', pricePerPerson: 150, currency: 'GBP', airline: 'EZY', airlineLogo: null, stops: 0, totalDuration: 170 },
        ],
      });

      await buildDeals({ ...defaultParams, flights: [flight] });

      expect(mockLogPriceObservations).toHaveBeenCalledTimes(1);
      const observations = mockLogPriceObservations.mock.calls[0][0];
      expect(observations).toHaveLength(3);
      expect(observations.map((o: { offerId: string }) => o.offerId)).toEqual([
        'off_a',
        'off_b',
        'off_c',
      ]);
    });
  });
});
