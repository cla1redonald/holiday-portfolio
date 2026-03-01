import { describe, it, expect, vi, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// Mocks — must be declared before importing the module under test
// ---------------------------------------------------------------------------

vi.mock('../duffel-client', () => ({}));

vi.mock('../fx-rates', () => ({
  getRate: vi.fn(() => Promise.resolve(1.0)),
}));

const mockGetMarketPrice = vi.fn();
const mockGetPricePercentile = vi.fn();
const mockLogPriceObservations = vi.fn();

vi.mock('../price-intelligence', () => ({
  getMarketPrice: (...args: unknown[]) => mockGetMarketPrice(...args),
  getPricePercentile: (...args: unknown[]) => mockGetPricePercentile(...args),
  logPriceObservations: (...args: unknown[]) => mockLogPriceObservations(...args),
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

const defaultResolvedDestinations: Record<string, { iata: string; country: string; imageUrl: string; seedPriceGbp: number | null }> = {
  lisbon: { iata: 'LIS', country: 'Portugal', imageUrl: 'https://example.com/lisbon.jpg', seedPriceGbp: 280 },
  barcelona: { iata: 'BCN', country: 'Spain', imageUrl: 'https://example.com/barcelona.jpg', seedPriceGbp: 320 },
  prague: { iata: 'PRG', country: 'Czech Republic', imageUrl: 'https://example.com/prague.jpg', seedPriceGbp: 250 },
  budapest: { iata: 'BUD', country: 'Hungary', imageUrl: 'https://example.com/budapest.jpg', seedPriceGbp: 220 },
};

const defaultParams = {
  flights: [makeFlight()],
  stays: [makeStay()],
  interests: ['food', 'culture'],
  travellers: 2,
  budgetPerPerson: null as number | null,
  origin: 'LHR',
  resolvedDestinations: defaultResolvedDestinations,
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
      expect(deals[0].dealConfidence).toBeGreaterThanOrEqual(45);
    });

    it('boosts confidence when semantic similarity score is high', async () => {
      const dealsNoSimilarity = await buildDeals({ ...defaultParams, interests: [] });

      const dealsWithSimilarity = await buildDeals({
        ...defaultParams,
        interests: [],
        similarityScores: { lisbon: 0.8 },
      });

      expect(dealsWithSimilarity[0].dealConfidence).toBeGreaterThan(
        dealsNoSimilarity[0].dealConfidence,
      );
    });

    it('gives 15 lead time points for departures 21-56 days out', async () => {
      const thirtyDaysOut = new Date(Date.now() + 30 * 86400000);
      const returnDate = new Date(thirtyDaysOut.getTime() + 3 * 86400000);
      const flight = makeFlight({
        departureDate: thirtyDaysOut.toISOString().split('T')[0],
        returnDate: returnDate.toISOString().split('T')[0],
      });

      const deals = await buildDeals({ ...defaultParams, flights: [flight], interests: [] });

      const fiveDaysOut = new Date(Date.now() + 5 * 86400000);
      const returnDateShort = new Date(fiveDaysOut.getTime() + 3 * 86400000);
      const shortFlight = makeFlight({
        departureDate: fiveDaysOut.toISOString().split('T')[0],
        returnDate: returnDateShort.toISOString().split('T')[0],
      });

      const shortDeals = await buildDeals({ ...defaultParams, flights: [shortFlight], interests: [] });

      expect(deals[0].dealConfidence).toBeGreaterThan(shortDeals[0].dealConfidence);
    });

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

    it('caps confidence at 98', async () => {
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

    it('Factor 2 returns 0 when no similarity scores are provided', async () => {
      // Without similarity scores, interest match should contribute 0 points
      const dealsNoScores = await buildDeals({
        ...defaultParams,
        interests: ['food', 'culture'],
        similarityScores: undefined,
      });

      const dealsWithScores = await buildDeals({
        ...defaultParams,
        interests: ['food', 'culture'],
        similarityScores: { lisbon: 0.7 },
      });

      // With similarity, confidence should be higher
      expect(dealsWithScores[0].dealConfidence).toBeGreaterThan(
        dealsNoScores[0].dealConfidence,
      );
    });

    it('boosts alignment when price is within budget signals', async () => {
      const profileInBudget = makeSessionProfile({
        searchCount: 3,
        destinations: { lisbon: 1 },
        budgetSignals: [500, 600],
      });

      const profileOverBudget = makeSessionProfile({
        searchCount: 3,
        destinations: { lisbon: 1 },
        budgetSignals: [50, 60],
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
  // Pricing engine integration
  // =========================================================================

  describe('pricing engine', () => {
    it('includes netMargin and isLossMaker in deal output', async () => {
      const deals = await buildDeals(defaultParams);

      const deal = deals[0];
      expect(deal).toHaveProperty('netMargin');
      expect(deal).toHaveProperty('isLossMaker');
      expect(typeof deal.netMargin).toBe('number');
      expect(typeof deal.isLossMaker).toBe('boolean');
    });

    it('includes pricing breakdown with markup from pricing engine', async () => {
      const deals = await buildDeals(defaultParams);

      expect(deals[0].pricing).toBeDefined();
      const pricing = deals[0].pricing!;
      expect(pricing).toHaveProperty('markup');
      expect(pricing).toHaveProperty('subtotal');
      expect(pricing).toHaveProperty('total');
      // subtotal + markup should equal total
      expect(pricing.subtotal + pricing.markup).toBe(pricing.total);
    });
  });

  // =========================================================================
  // Budget filtering
  // =========================================================================

  describe('budget filtering', () => {
    it('filters out deals that exceed budgetPerPerson', async () => {
      const deals = await buildDeals({
        ...defaultParams,
        budgetPerPerson: 100,
      });

      expect(deals).toHaveLength(0);
    });

    it('keeps deals within budgetPerPerson', async () => {
      const deals = await buildDeals({
        ...defaultParams,
        budgetPerPerson: 500,
      });

      expect(deals).toHaveLength(1);
    });
  });

  // =========================================================================
  // Sorting
  // =========================================================================

  describe('sorting', () => {
    it('sorts deals by confidence descending', async () => {
      const flightLisbon = makeFlight({ destination: 'lisbon' });
      const flightPrague = makeFlight({
        destination: 'prague',
        offerId: 'off_789',
        allOffers: [
          { offerId: 'off_789', pricePerPerson: 200, currency: 'GBP', airline: 'Ryanair', airlineLogo: null, stops: 0, totalDuration: 180 },
        ],
      });
      const stayPrague = makeStay({ destination: 'prague', hotelName: 'Hotel Prague' });

      const deals = await buildDeals({
        ...defaultParams,
        flights: [flightLisbon, flightPrague],
        stays: [makeStay(), stayPrague],
        interests: ['food', 'culture'],
      });

      expect(deals.length).toBeGreaterThanOrEqual(2);
      for (let i = 1; i < deals.length; i++) {
        expect(deals[i - 1].dealConfidence).toBeGreaterThanOrEqual(deals[i].dealConfidence);
      }
    });
  });

  // =========================================================================
  // Cosine similarity scoring (semantic search)
  // =========================================================================

  describe('cosine similarity scoring', () => {
    it('uses similarity score for Factor 2 when available', async () => {
      const dealsWithSimilarity = await buildDeals({
        ...defaultParams,
        interests: [],
        similarityScores: { lisbon: 0.85 },
      });

      const dealsWithoutSimilarity = await buildDeals({
        ...defaultParams,
        interests: [],
      });

      expect(dealsWithSimilarity[0].dealConfidence).toBeGreaterThan(
        dealsWithoutSimilarity[0].dealConfidence,
      );
    });

    it('shows "Strong match for your style" for similarity >= 0.7', async () => {
      const deals = await buildDeals({
        ...defaultParams,
        interests: [],
        similarityScores: { lisbon: 0.75 },
      });

      expect(deals[0].confidenceRationale).toContain('Strong match for your style');
    });

    it('shows "Good match for your preferences" for similarity 0.5-0.7', async () => {
      const deals = await buildDeals({
        ...defaultParams,
        interests: [],
        similarityScores: { lisbon: 0.55 },
      });

      expect(deals[0].confidenceRationale).toContain('Good match for your preferences');
    });

    it('returns no interest match rationale when similarity not provided', async () => {
      const deals = await buildDeals({
        ...defaultParams,
        interests: ['food', 'culture'],
      });

      // Without similarity scores, Factor 2 is 0 — no match rationale
      expect(deals[0].confidenceRationale).not.toContain('match');
    });

    it('uses destinationTags for display tags on deals', async () => {
      const deals = await buildDeals({
        ...defaultParams,
        destinationTags: { lisbon: ['food', 'culture', 'nightlife'] },
      });

      expect(deals[0].tags).toEqual(['food', 'culture', 'nightlife']);
    });
  });

  // =========================================================================
  // Price logging
  // =========================================================================

  describe('price logging', () => {
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
