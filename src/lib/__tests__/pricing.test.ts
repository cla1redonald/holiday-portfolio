import { describe, it, expect } from 'vitest';
import { calculateDealPricing, isBelowMinimumFlightValue, PRICING_CONFIG } from '../pricing';

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
});
