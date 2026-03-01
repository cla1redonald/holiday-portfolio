import { describe, it, expect, vi, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// Mocks — must be declared before importing the module under test
// ---------------------------------------------------------------------------

const mockRedisGet = vi.fn();
const mockRedisSet = vi.fn();

vi.mock('@upstash/redis', () => ({
  Redis: {
    fromEnv: vi.fn(() => ({
      get: mockRedisGet,
      set: mockRedisSet,
    })),
  },
}));

// Set env vars so getRedis() returns the mock client
vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://fake.upstash.io');
vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'fake-token');

// Import AFTER mocks are declared
import {
  logPriceObservations,
  getMarketPrice,
  getPricePercentile,
  SEED_PRICES,
  type PriceObservation,
  type RouteStats,
} from '../price-intelligence';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeObservation(overrides: Partial<PriceObservation> = {}): PriceObservation {
  return {
    route: 'LHR-LIS',
    departureDate: '2026-04-15',
    returnDate: '2026-04-18',
    nights: 3,
    pricePerPerson: 100,
    currency: 'GBP',
    rawAmount: 100,
    airline: 'TAP',
    cabinClass: 'economy',
    observedAt: new Date().toISOString(),
    offerId: 'off_001',
    ...overrides,
  };
}

function makeStats(overrides: Partial<RouteStats> = {}): RouteStats {
  return {
    route: 'LHR-LIS',
    nights: 3,
    sampleCount: 15,
    mean: 110,
    median: 105,
    p25: 90,
    p75: 130,
    min: 70,
    max: 180,
    lastUpdated: new Date().toISOString(),
    trend: 'stable',
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('price-intelligence', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRedisGet.mockResolvedValue(null);
    mockRedisSet.mockResolvedValue('OK');
  });

  // =========================================================================
  // logPriceObservations
  // =========================================================================

  describe('logPriceObservations', () => {
    // -----------------------------------------------------------------------
    // 1. Gracefully does nothing when Redis is unavailable
    // -----------------------------------------------------------------------
    it('does nothing when observations array is empty', async () => {
      await logPriceObservations([]);

      expect(mockRedisGet).not.toHaveBeenCalled();
      expect(mockRedisSet).not.toHaveBeenCalled();
    });

    // -----------------------------------------------------------------------
    // 2. Writes observations to Redis using price:{route}:{nights} key
    // -----------------------------------------------------------------------
    it('writes observations to Redis with correct key format', async () => {
      const obs = makeObservation({ route: 'LHR-LIS', nights: 3 });

      await logPriceObservations([obs]);

      // Should write to price:LHR-LIS:3
      expect(mockRedisSet).toHaveBeenCalledWith(
        'price:LHR-LIS:3',
        expect.arrayContaining([expect.objectContaining({ offerId: 'off_001' })]),
      );

      // Should also write stats to stats:LHR-LIS:3
      expect(mockRedisSet).toHaveBeenCalledWith(
        'stats:LHR-LIS:3',
        expect.objectContaining({ route: 'LHR-LIS', nights: 3 }),
        { ex: 86400 },
      );
    });

    // -----------------------------------------------------------------------
    // 3. Deduplicates by offerId
    // -----------------------------------------------------------------------
    it('deduplicates observations by offerId', async () => {
      const existing = [
        makeObservation({ offerId: 'off_001', pricePerPerson: 100 }),
      ];
      mockRedisGet.mockResolvedValueOnce(existing);

      const newObs = [
        makeObservation({ offerId: 'off_001', pricePerPerson: 100 }), // duplicate
        makeObservation({ offerId: 'off_002', pricePerPerson: 120 }), // new
      ];

      await logPriceObservations(newObs);

      // The merged array should have exactly 2 unique observations
      const savedObservations = mockRedisSet.mock.calls[0][1] as PriceObservation[];
      expect(savedObservations).toHaveLength(2);
      const offerIds = savedObservations.map((o) => o.offerId);
      expect(offerIds).toContain('off_001');
      expect(offerIds).toContain('off_002');
    });

    // -----------------------------------------------------------------------
    // 4. Caps at 200 observations
    // -----------------------------------------------------------------------
    it('caps stored observations at 200', async () => {
      // Build 195 existing observations
      const existing: PriceObservation[] = [];
      for (let i = 0; i < 195; i++) {
        existing.push(
          makeObservation({
            offerId: `existing_${i}`,
            pricePerPerson: 90 + i,
            observedAt: new Date(Date.now() - i * 60000).toISOString(),
          }),
        );
      }
      mockRedisGet.mockResolvedValueOnce(existing);

      // Add 10 new observations (total would be 205 without cap)
      const newObs: PriceObservation[] = [];
      for (let i = 0; i < 10; i++) {
        newObs.push(
          makeObservation({
            offerId: `new_${i}`,
            pricePerPerson: 80 + i,
            observedAt: new Date(Date.now() + i * 60000).toISOString(),
          }),
        );
      }

      await logPriceObservations(newObs);

      const savedObservations = mockRedisSet.mock.calls[0][1] as PriceObservation[];
      expect(savedObservations).toHaveLength(200);
    });

    // -----------------------------------------------------------------------
    // 5. Computes and caches stats with 24hr TTL
    // -----------------------------------------------------------------------
    it('computes stats and caches with 24hr TTL', async () => {
      const observations = [
        makeObservation({ offerId: 'a', pricePerPerson: 80 }),
        makeObservation({ offerId: 'b', pricePerPerson: 100 }),
        makeObservation({ offerId: 'c', pricePerPerson: 120 }),
      ];

      await logPriceObservations(observations);

      // Stats call is the second set call
      const statsCall = mockRedisSet.mock.calls.find(
        (call) => typeof call[0] === 'string' && call[0].startsWith('stats:'),
      );
      expect(statsCall).toBeDefined();
      expect(statsCall![0]).toBe('stats:LHR-LIS:3');
      expect(statsCall![2]).toEqual({ ex: 86400 });

      const stats = statsCall![1] as RouteStats;
      expect(stats.sampleCount).toBe(3);
      expect(stats.min).toBe(80);
      expect(stats.max).toBe(120);
      expect(stats.median).toBe(100);
    });
  });

  // =========================================================================
  // getMarketPrice
  // =========================================================================

  describe('getMarketPrice', () => {
    // -----------------------------------------------------------------------
    // 1. Returns observed data when Redis has 10+ observations in stats cache
    // -----------------------------------------------------------------------
    it('returns observed data when stats cache has 10+ samples', async () => {
      const stats = makeStats({ sampleCount: 15, median: 105, trend: 'rising' });
      mockRedisGet.mockResolvedValueOnce(stats);

      const result = await getMarketPrice('LHR-LIS', 3);

      expect(result.source).toBe('observed');
      expect(result.price).toBe(105); // median
      expect(result.sampleCount).toBe(15);
      expect(result.trend).toBe('rising');
      expect(result.stats).toEqual(stats);
    });

    // -----------------------------------------------------------------------
    // 2. Falls back to seed price for known destinations
    // -----------------------------------------------------------------------
    it('falls back to seed price for known destinations', async () => {
      // Redis returns stats with too few samples
      mockRedisGet.mockResolvedValueOnce(makeStats({ sampleCount: 5 }));

      const result = await getMarketPrice('LHR-lisbon', 3);

      expect(result.source).toBe('seed');
      expect(result.price).toBe(SEED_PRICES['lisbon']); // 320 for 3 nights
      expect(result.sampleCount).toBe(0);
      expect(result.stats).toBeNull();
    });

    // -----------------------------------------------------------------------
    // 3. Falls back to generic price for unknown destinations
    // -----------------------------------------------------------------------
    it('falls back to generic price for unknown destinations', async () => {
      // No stats in cache
      mockRedisGet.mockResolvedValueOnce(null);

      const result = await getMarketPrice('LHR-XYZ', 3);

      expect(result.source).toBe('seed');
      expect(result.price).toBe(300); // 300 * (3/3)
      expect(result.sampleCount).toBe(0);
    });

    // -----------------------------------------------------------------------
    // 4. Scales seed price by nights
    // -----------------------------------------------------------------------
    it('scales seed price by nights', async () => {
      mockRedisGet.mockResolvedValueOnce(null);

      const result = await getMarketPrice('LHR-lisbon', 7);

      // lisbon seed = 320, scaled: 320 * (7/3) ≈ 746.67
      const expected = Math.round(320 * (7 / 3) * 100) / 100;
      expect(result.price).toBe(expected);
      expect(result.source).toBe('seed');
    });

    // -----------------------------------------------------------------------
    // 5. Generic fallback also scales by nights
    // -----------------------------------------------------------------------
    it('generic fallback scales by nights for unknown destinations', async () => {
      mockRedisGet.mockResolvedValueOnce(null);

      const result = await getMarketPrice('LHR-UNKNOWN', 6);

      // 300 * (6/3) = 600
      expect(result.price).toBe(600);
    });
  });

  // =========================================================================
  // getPricePercentile
  // =========================================================================

  describe('getPricePercentile', () => {
    // -----------------------------------------------------------------------
    // 1. Returns null when fewer than 10 observations
    // -----------------------------------------------------------------------
    it('returns null when fewer than 10 observations', async () => {
      const observations = Array.from({ length: 5 }, (_, i) =>
        makeObservation({ offerId: `off_${i}`, pricePerPerson: 100 + i * 10 }),
      );
      mockRedisGet.mockResolvedValueOnce(observations);

      const result = await getPricePercentile(110, 'LHR-LIS', 3);

      expect(result).toBeNull();
    });

    // -----------------------------------------------------------------------
    // 2. Returns correct percentile for a price within the distribution
    // -----------------------------------------------------------------------
    it('returns correct percentile for a price within the distribution', async () => {
      // 10 observations with prices 10, 20, ..., 100
      const observations = Array.from({ length: 10 }, (_, i) =>
        makeObservation({ offerId: `off_${i}`, pricePerPerson: (i + 1) * 10 }),
      );
      mockRedisGet.mockResolvedValueOnce(observations);

      // Price of 55 — 5 out of 10 are below (10,20,30,40,50)
      const result = await getPricePercentile(55, 'LHR-LIS', 3);

      expect(result).toBe(50); // (5 / 10) * 100
    });

    // -----------------------------------------------------------------------
    // 3. Returns 0 for price below all observations
    // -----------------------------------------------------------------------
    it('returns 0 for price below all observations', async () => {
      const observations = Array.from({ length: 10 }, (_, i) =>
        makeObservation({ offerId: `off_${i}`, pricePerPerson: 100 + i * 10 }),
      );
      mockRedisGet.mockResolvedValueOnce(observations);

      const result = await getPricePercentile(5, 'LHR-LIS', 3);

      expect(result).toBe(0);
    });
  });

  // =========================================================================
  // Stats computation (via logPriceObservations + getMarketPrice)
  // =========================================================================

  describe('stats computation (indirect)', () => {
    // -----------------------------------------------------------------------
    // 1. Median calculation
    // -----------------------------------------------------------------------
    it('computes correct median', async () => {
      const observations = [
        makeObservation({ offerId: 'a', pricePerPerson: 50 }),
        makeObservation({ offerId: 'b', pricePerPerson: 100 }),
        makeObservation({ offerId: 'c', pricePerPerson: 150 }),
        makeObservation({ offerId: 'd', pricePerPerson: 200 }),
        makeObservation({ offerId: 'e', pricePerPerson: 250 }),
      ];

      await logPriceObservations(observations);

      const statsCall = mockRedisSet.mock.calls.find(
        (call) => typeof call[0] === 'string' && call[0].startsWith('stats:'),
      );
      const stats = statsCall![1] as RouteStats;

      // Sorted: [50, 100, 150, 200, 250] -> median at index 2 = 150
      expect(stats.median).toBe(150);
    });

    // -----------------------------------------------------------------------
    // 2. Trend: stable when not enough old data
    // -----------------------------------------------------------------------
    it('returns stable trend when all observations are recent', async () => {
      // All observations are within the last 14 days — no "older" bucket
      const observations = Array.from({ length: 5 }, (_, i) =>
        makeObservation({
          offerId: `obs_${i}`,
          pricePerPerson: 100 + i * 10,
          observedAt: new Date(Date.now() - i * 86400000).toISOString(), // 0-4 days ago
        }),
      );

      await logPriceObservations(observations);

      const statsCall = mockRedisSet.mock.calls.find(
        (call) => typeof call[0] === 'string' && call[0].startsWith('stats:'),
      );
      const stats = statsCall![1] as RouteStats;

      expect(stats.trend).toBe('stable');
    });
  });
});
