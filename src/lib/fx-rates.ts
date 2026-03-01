const FALLBACK_RATES: Record<string, number> = { GBP: 1.0, EUR: 0.86, USD: 0.79 };
let cachedRates: Record<string, number> | null = null;
let cacheExpiry = 0;

/**
 * Get the exchange rate to convert `currency` into GBP.
 * Uses open.er-api.com with a 24h in-memory cache. Falls back to hardcoded
 * rates if the API is unavailable, then to 1.0 (treat as GBP).
 */
export async function getRate(currency: string): Promise<number> {
  if (currency === 'GBP') return 1.0;

  if (!cachedRates || Date.now() > cacheExpiry) {
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/GBP', {
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const data = await res.json();
        // API returns rates FROM GBP (e.g. 1 GBP = 1.17 EUR)
        // We need rates TO GBP (e.g. 1 EUR = 0.85 GBP), so invert
        cachedRates = { GBP: 1.0 };
        for (const [code, rate] of Object.entries(data.rates as Record<string, number>)) {
          cachedRates[code] = 1 / rate;
        }
        cacheExpiry = Date.now() + 24 * 60 * 60 * 1000;
      }
    } catch {
      // API down — use fallback
    }
  }

  const rate = cachedRates?.[currency] ?? FALLBACK_RATES[currency];
  if (rate != null) return rate;
  console.warn(`[fx-rates] Unknown currency "${currency}", treating as GBP`);
  return 1.0;
}
