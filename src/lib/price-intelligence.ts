/**
 * Price Intelligence Layer
 *
 * Logs Duffel price responses to Upstash Redis and computes market
 * statistics for deal confidence scoring.
 */

import { Redis } from "@upstash/redis";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PriceObservation {
  route: string;          // "LHR-LIS"
  departureDate: string;  // "2026-04-15"
  returnDate: string;     // "2026-04-18"
  nights: number;
  pricePerPerson: number; // GBP normalised
  currency: string;       // original currency from Duffel
  rawAmount: number;      // original amount before GBP conversion
  airline: string;
  cabinClass: string;
  observedAt: string;     // ISO timestamp
  offerId: string;        // Duffel offer ID for dedup
}

export interface RouteStats {
  route: string;
  nights: number;
  sampleCount: number;
  mean: number;
  median: number;
  p25: number;
  p75: number;
  min: number;
  max: number;
  lastUpdated: string;
  trend: "rising" | "falling" | "stable";
}

export interface MarketPrice {
  price: number;
  source: "observed" | "seed";
  sampleCount: number;
  percentile: number | null; // where a given price sits 0-100
  trend: "rising" | "falling" | "stable" | null;
  stats: RouteStats | null;
}

// ---------------------------------------------------------------------------
// Seed prices — per-person for a 3-night trip (Q1 2026, GBP)
// ---------------------------------------------------------------------------

export const SEED_PRICES: Record<string, number> = {
  lisbon: 320,
  barcelona: 350,
  amsterdam: 380,
  rome: 340,
  porto: 280,
  prague: 260,
  dubrovnik: 400,
  marrakech: 300,
  paris: 400,
  berlin: 300,
  vienna: 340,
  budapest: 250,
  copenhagen: 420,
  athens: 310,
  seville: 290,
  florence: 360,
  edinburgh: 280,
  nice: 380,
  split: 350,
  malaga: 270,
};

// ---------------------------------------------------------------------------
// Lazy Redis client
// ---------------------------------------------------------------------------

let redisClient: Redis | null = null;

function getRedis(): Redis | null {
  if (redisClient) return redisClient;

  try {
    if (
      !process.env.UPSTASH_REDIS_REST_URL ||
      !process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
      return null;
    }
    redisClient = Redis.fromEnv();
    return redisClient;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// KV key helpers
// ---------------------------------------------------------------------------

function priceKey(route: string, nights: number): string {
  return `price:${route}:${nights}`;
}

function statsKey(route: string, nights: number): string {
  return `stats:${route}:${nights}`;
}

// ---------------------------------------------------------------------------
// Stats computation (private)
// ---------------------------------------------------------------------------

function computeStats(
  observations: PriceObservation[],
  route: string,
  nights: number,
): RouteStats {
  const prices = observations
    .map((o) => o.pricePerPerson)
    .sort((a, b) => a - b);

  const sum = prices.reduce((acc, p) => acc + p, 0);
  const mean = sum / prices.length;

  const median = percentileValue(prices, 50);
  const p25 = percentileValue(prices, 25);
  const p75 = percentileValue(prices, 75);

  const trend = computeTrend(observations);

  return {
    route,
    nights,
    sampleCount: prices.length,
    mean: round2(mean),
    median: round2(median),
    p25: round2(p25),
    p75: round2(p75),
    min: prices[0],
    max: prices[prices.length - 1],
    lastUpdated: new Date().toISOString(),
    trend,
  };
}

/**
 * Return the value at a given percentile from a **sorted** array.
 * Uses linear interpolation between closest ranks.
 */
function percentileValue(sorted: number[], pct: number): number {
  if (sorted.length === 1) return sorted[0];
  const idx = (pct / 100) * (sorted.length - 1);
  const lower = Math.floor(idx);
  const upper = Math.ceil(idx);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (idx - lower);
}

/**
 * Compare mean of last-14-day observations vs 15-30-day observations.
 * >5% higher = rising, >5% lower = falling, otherwise stable.
 */
function computeTrend(
  observations: PriceObservation[],
): "rising" | "falling" | "stable" {
  const now = Date.now();
  const DAY = 86_400_000;

  const recent: number[] = [];
  const older: number[] = [];

  for (const o of observations) {
    const age = now - new Date(o.observedAt).getTime();
    if (age <= 14 * DAY) {
      recent.push(o.pricePerPerson);
    } else if (age <= 30 * DAY) {
      older.push(o.pricePerPerson);
    }
  }

  if (recent.length === 0 || older.length === 0) return "stable";

  const recentMean = recent.reduce((a, b) => a + b, 0) / recent.length;
  const olderMean = older.reduce((a, b) => a + b, 0) / older.length;

  const change = (recentMean - olderMean) / olderMean;

  if (change > 0.05) return "rising";
  if (change < -0.05) return "falling";
  return "stable";
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// ---------------------------------------------------------------------------
// Seed price lookup (private)
// ---------------------------------------------------------------------------

// Reverse IATA→city lookup for seed price matching
const IATA_TO_CITY: Record<string, string> = {
  lis: "lisbon", bcn: "barcelona", ams: "amsterdam", fco: "rome",
  opo: "porto", prg: "prague", dbv: "dubrovnik", rak: "marrakech",
  cdg: "paris", ber: "berlin", vie: "vienna", bud: "budapest",
  cph: "copenhagen", ath: "athens", svq: "seville", flr: "florence",
  edi: "edinburgh", nce: "nice", spu: "split", agp: "malaga",
};

function getSeedPrice(route: string, nights: number): number | null {
  // route is e.g. "LHR-LIS" — try to match the destination city
  const dest = route.split("-").pop()?.toLowerCase() ?? "";

  // Direct city name match first (works if route uses city names)
  if (SEED_PRICES[dest] !== undefined) {
    return SEED_PRICES[dest] * (nights / 3);
  }

  // IATA code → city name lookup
  const cityName = IATA_TO_CITY[dest];
  if (cityName && SEED_PRICES[cityName] !== undefined) {
    return SEED_PRICES[cityName] * (nights / 3);
  }

  return null;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Log price observations to Redis. Fire-and-forget safe — never throws.
 */
export async function logPriceObservations(
  observations: PriceObservation[],
): Promise<void> {
  try {
    const redis = getRedis();
    if (!redis || observations.length === 0) return;

    // Group observations by route+nights
    const groups = new Map<string, PriceObservation[]>();
    for (const obs of observations) {
      const key = `${obs.route}:${obs.nights}`;
      const group = groups.get(key) ?? [];
      group.push(obs);
      groups.set(key, group);
    }

    for (const [groupKey, newObs] of groups) {
      const [route, nightsStr] = groupKey.split(":");
      const nights = Number(nightsStr);
      const pk = priceKey(route, nights);

      // Read existing observations
      let existing: PriceObservation[] = [];
      try {
        const raw = await redis.get<PriceObservation[]>(pk);
        if (Array.isArray(raw)) {
          existing = raw;
        }
      } catch {
        // If read fails, start fresh
      }

      // Dedup by offerId
      const seenIds = new Set(existing.map((o) => o.offerId));
      const deduped = newObs.filter((o) => !seenIds.has(o.offerId));

      // Merge and cap at 200 most recent
      const merged = [...existing, ...deduped]
        .sort(
          (a, b) =>
            new Date(b.observedAt).getTime() -
            new Date(a.observedAt).getTime(),
        )
        .slice(0, 200);

      // Write back
      await redis.set(pk, merged);

      // Recompute and cache stats with 24hr TTL
      const stats = computeStats(merged, route, nights);
      const sk = statsKey(route, nights);
      await redis.set(sk, stats, { ex: 86400 });
    }
  } catch (err) {
    console.error("[price-intelligence] logPriceObservations error:", err);
  }
}

/**
 * Get the market price for a route/nights combo.
 * Falls back to seed prices when observed data is insufficient.
 * Never throws.
 */
export async function getMarketPrice(
  route: string,
  nights: number,
): Promise<MarketPrice> {
  try {
    const redis = getRedis();

    if (redis) {
      const sk = statsKey(route, nights);
      const stats = await redis.get<RouteStats>(sk);

      if (stats && stats.sampleCount >= 10) {
        return {
          price: stats.median,
          source: "observed",
          sampleCount: stats.sampleCount,
          percentile: null,
          trend: stats.trend,
          stats,
        };
      }
    }
  } catch (err) {
    console.error("[price-intelligence] getMarketPrice redis error:", err);
  }

  // Fallback to seed price
  const seed = getSeedPrice(route, nights);
  const price = seed ?? 300 * (nights / 3); // generic fallback

  return {
    price: round2(price),
    source: "seed",
    sampleCount: 0,
    percentile: null,
    trend: null,
    stats: null,
  };
}

/**
 * Given a price, return what percentile it sits at for a route/nights combo.
 * 0 = cheapest ever seen, 100 = most expensive.
 * Returns null if insufficient data.
 */
export async function getPricePercentile(
  price: number,
  route: string,
  nights: number,
): Promise<number | null> {
  try {
    const redis = getRedis();
    if (!redis) return null;

    const pk = priceKey(route, nights);
    const observations = await redis.get<PriceObservation[]>(pk);

    if (!Array.isArray(observations) || observations.length < 10) {
      return null;
    }

    const prices = observations
      .map((o) => o.pricePerPerson)
      .sort((a, b) => a - b);

    // Count how many prices are below the given price
    let below = 0;
    for (const p of prices) {
      if (p < price) below++;
      else break; // sorted, so we can stop
    }

    return round2((below / prices.length) * 100);
  } catch (err) {
    console.error("[price-intelligence] getPricePercentile error:", err);
    return null;
  }
}
