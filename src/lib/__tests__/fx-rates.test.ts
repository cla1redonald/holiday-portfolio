import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Reset module state between tests
let getRate: typeof import('../fx-rates').getRate;

describe('fx-rates', () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    vi.resetModules();
    fetchSpy = vi.spyOn(globalThis, 'fetch');
    const mod = await import('../fx-rates');
    getRate = mod.getRate;
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it('returns 1.0 for GBP without fetching', async () => {
    const rate = await getRate('GBP');
    expect(rate).toBe(1.0);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('fetches rates from API and caches them', async () => {
    fetchSpy.mockResolvedValueOnce(
      new Response(JSON.stringify({
        result: 'success',
        rates: { EUR: 1.17, USD: 1.27 },
      })),
    );

    const eurRate = await getRate('EUR');
    // 1 GBP = 1.17 EUR → 1 EUR = 1/1.17 ≈ 0.855 GBP
    expect(eurRate).toBeCloseTo(1 / 1.17, 3);
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    // Second call should use cache
    const usdRate = await getRate('USD');
    expect(usdRate).toBeCloseTo(1 / 1.27, 3);
    expect(fetchSpy).toHaveBeenCalledTimes(1); // still 1 — cached
  });

  it('falls back to hardcoded rates when API fails', async () => {
    fetchSpy.mockRejectedValueOnce(new Error('Network error'));

    const rate = await getRate('EUR');
    expect(rate).toBe(0.86); // hardcoded fallback
  });

  it('returns 1.0 for unknown currencies when API is down', async () => {
    fetchSpy.mockRejectedValueOnce(new Error('Network error'));

    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const rate = await getRate('JPY');
    expect(rate).toBe(1.0);
    consoleSpy.mockRestore();
  });
});
