import { describe, it, expect } from 'vitest';
import {
  calculateDealPricing,
  isBelowMinimumFlightValue,
  priceAncillary,
  filterViableAncillaries,
  PRICING_CONFIG,
} from '../pricing';

describe('calculateDealPricing', () => {
  it('computes correct costs for a package deal (flight + hotel)', () => {
    // 2 travellers, flight total £300, hotel total £200
    const result = calculateDealPricing({
      flightTotalGBP: 300,
      hotelTotalGBP: 200,
      travellers: 2,
      isPackage: true,
    });

    // Duffel flat fee: £2.40
    expect(result.flightCostToUs).toBeCloseTo(2.40 + 300 * 0.01, 2); // £5.40

    // ATOL: 2 × £2.50 = £5.00
    expect(result.atolCost).toBe(5.00);

    // Total cost must be positive
    expect(result.totalCostToUs).toBeGreaterThan(0);

    // Markup revenue: 5% of total order (£300 flight + £200 hotel = £500)
    expect(result.markupRevenue).toBeCloseTo(500 * 0.05, 2); // £25.00

    // Net margin should be positive for this reasonable deal
    expect(result.netMargin).toBeGreaterThan(0);
    expect(result.isLossMaker).toBe(false);

    // Customer pays more than cost price
    expect(result.customerPricePerPerson).toBeGreaterThan(result.costPricePerPerson);
  });

  it('computes correct costs for flight-only deal (no ATOL)', () => {
    const result = calculateDealPricing({
      flightTotalGBP: 400,
      hotelTotalGBP: 0,
      travellers: 2,
      isPackage: false,
    });

    // No ATOL for flight-only
    expect(result.atolCost).toBe(0);

    // Should still be viable at £400 total
    expect(result.isLossMaker).toBe(false);
  });

  it('flags cheap flight-only deal as loss-maker', () => {
    // £40 total flight for 1 person — the £2.40 flat fee kills margins
    const result = calculateDealPricing({
      flightTotalGBP: 40,
      hotelTotalGBP: 0,
      travellers: 1,
      isPackage: false,
    });

    // Costs: £2.40 flat + £0.40 (1%) + ~£0.59 payment = ~£3.39
    // Revenue: £40 × 5% = £2.00 (markup on total order = just flight here)
    // Net: £2.00 - £3.39 = -£1.39
    expect(result.isLossMaker).toBe(true);
    expect(result.netMargin).toBeLessThan(0);
  });

  it('customer price is always rounded to whole pounds', () => {
    const result = calculateDealPricing({
      flightTotalGBP: 333,
      hotelTotalGBP: 167,
      travellers: 3,
      isPackage: true,
    });

    expect(Number.isInteger(result.customerPricePerPerson)).toBe(true);
    expect(Number.isInteger(result.costPricePerPerson)).toBe(true);
  });

  it('handles single traveller correctly', () => {
    const result = calculateDealPricing({
      flightTotalGBP: 200,
      hotelTotalGBP: 150,
      travellers: 1,
      isPackage: true,
    });

    // Per-person = total since 1 traveller
    expect(result.costPricePerPerson).toBe(Math.round(200 + 150));
    expect(result.customerPricePerPerson).toBeGreaterThan(result.costPricePerPerson);
  });

  it('payment processing is calculated on total including markup', () => {
    const result = calculateDealPricing({
      flightTotalGBP: 1000,
      hotelTotalGBP: 500,
      travellers: 2,
      isPackage: true,
    });

    // Markup on total order: (1000 + 500) × 5% = £75
    // Total customer pays: 1000 + 500 + 75 = £1575
    // Payment fee: 1575 × 1.4% = £22.05
    expect(result.paymentProcessingCost).toBeCloseTo(1575 * 0.014, 1);
  });
});

describe('isBelowMinimumFlightValue', () => {
  it('returns true for flights below threshold', () => {
    expect(isBelowMinimumFlightValue(50)).toBe(true);
    expect(isBelowMinimumFlightValue(99)).toBe(true);
  });

  it('returns false for flights at or above threshold', () => {
    expect(isBelowMinimumFlightValue(100)).toBe(false);
    expect(isBelowMinimumFlightValue(500)).toBe(false);
  });
});

describe('PRICING_CONFIG', () => {
  it('has sensible default values', () => {
    expect(PRICING_CONFIG.duffel.flightFlatFeeGBP).toBe(2.40);
    expect(PRICING_CONFIG.duffel.flightPercentage).toBe(0.01);
    expect(PRICING_CONFIG.payments.percentageFee).toBe(0.014);
    expect(PRICING_CONFIG.markup.orderPercentage).toBe(0.05);
    expect(PRICING_CONFIG.atol.perPassengerGBP).toBe(2.50);
  });

  it('has correct ancillary category defaults', () => {
    const cats = PRICING_CONFIG.ancillaries.categories;
    expect(cats.bags.enabled).toBe(true);
    expect(cats.seatSelection.enabled).toBe(false);
    expect(cats.premiumSeat.enabled).toBe(true);
    expect(cats.meals.enabled).toBe(false);
    expect(cats.flexibility.enabled).toBe(true);
  });

  it('has minMarginPercentage set to 0 for friends testing (bump to 0.05 at scale)', () => {
    expect(PRICING_CONFIG.ancillaries.minMarginPercentage).toBe(0);
  });
});


// ---------------------------------------------------------------------------
// Ancillary pricing
// ---------------------------------------------------------------------------

describe('priceAncillary', () => {
  it('rejects disabled categories regardless of price', () => {
    // Seat selection is disabled — even a £50 seat should not be offered
    const result = priceAncillary('seatSelection', 50);
    expect(result.shouldOffer).toBe(false);
    expect(result.customerPrice).toBe(0);
  });

  it('rejects meals regardless of price', () => {
    const result = priceAncillary('meals', 30);
    expect(result.shouldOffer).toBe(false);
  });

  it('approves a £30 checked bag', () => {
    const result = priceAncillary('bags', 30);

    expect(result.shouldOffer).toBe(true);
    // Customer price: ceil(30 + 10% markup) = £33
    expect(result.customerPrice).toBe(33);
    // Cost: £1.60 flat + (33 × 1.4%) = £1.60 + £0.462 = £2.062
    expect(result.costToUs).toBeCloseTo(1.60 + 33 * 0.014, 2);
    // Margin: £3 markup - ~£2.06 cost = ~£0.94
    expect(result.netMargin).toBeGreaterThan(0);
    // Margin percentage is returned for visibility
    expect(result.marginPercentage).toBeDefined();
    expect(result.marginPercentage).toBeCloseTo(0.94 / 33, 2); // ~2.8%
  });

  it('rejects a cheap £10 bag (below £20 minimum)', () => {
    const result = priceAncillary('bags', 10);

    expect(result.shouldOffer).toBe(false);
    expect(result.reason).toContain('below');
  });

  it('approves a £40 extra legroom seat', () => {
    const result = priceAncillary('premiumSeat', 40);

    expect(result.shouldOffer).toBe(true);
    expect(result.customerPrice).toBe(44); // ceil(40 × 1.10)
    expect(result.netMargin).toBeGreaterThan(0);
  });

  it('approves a £25 flexibility add-on', () => {
    const result = priceAncillary('flexibility', 25);

    expect(result.shouldOffer).toBe(true);
    expect(result.netMargin).toBeGreaterThan(0);
  });

  it('customer price is always rounded up', () => {
    // £33 × 1.10 = £36.30 → should ceil to £37
    const result = priceAncillary('bags', 33);
    expect(result.customerPrice).toBe(37);
    expect(Number.isInteger(result.customerPrice)).toBe(true);
  });

  it('reports margin percentage on all enabled ancillaries', () => {
    // A £55 bag has ~5% margin (see breakeven calc in pricing.ts comments)
    const result = priceAncillary('bags', 55);
    expect(result.shouldOffer).toBe(true);
    expect(result.marginPercentage).toBeGreaterThan(0.04);
  });
});

describe('filterViableAncillaries', () => {
  it('filters out disabled categories and cheap items', () => {
    const input = [
      { category: 'bags' as const, priceGBP: 30 },         // should pass
      { category: 'seatSelection' as const, priceGBP: 15 }, // disabled
      { category: 'meals' as const, priceGBP: 8 },          // disabled
      { category: 'bags' as const, priceGBP: 10 },          // too cheap
      { category: 'premiumSeat' as const, priceGBP: 45 },   // should pass
    ];

    const viable = filterViableAncillaries(input);

    expect(viable).toHaveLength(2);
    expect(viable[0].category).toBe('bags');
    expect(viable[0].priceGBP).toBe(30);
    expect(viable[1].category).toBe('premiumSeat');
    expect(viable[1].priceGBP).toBe(45);
  });

  it('returns empty array when nothing is viable', () => {
    const input = [
      { category: 'seatSelection' as const, priceGBP: 15 },
      { category: 'meals' as const, priceGBP: 8 },
    ];

    expect(filterViableAncillaries(input)).toHaveLength(0);
  });

  it('includes pricing breakdown on each viable item', () => {
    const viable = filterViableAncillaries([
      { category: 'bags' as const, priceGBP: 35 },
    ]);

    expect(viable[0].pricing.shouldOffer).toBe(true);
    expect(viable[0].pricing.customerPrice).toBeGreaterThan(35);
    expect(viable[0].pricing.netMargin).toBeGreaterThan(0);
  });
});
