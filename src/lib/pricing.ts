/**
 * Pricing engine — calculates Duffel costs, applies markup, and flags loss-makers.
 *
 * Duffel fee structure (March 2026):
 *   Flights: $3 (~£2.40) flat + 1% of ticket value per confirmed order
 *   Payments (EU card): 1.4% of transaction value
 *   Stays: £0 cost to seller (commission-share from hotel)
 *   Ancillaries: $2 (~£1.60) per paid ancillary
 *
 * See docs/research/research-7-duffel-breakeven.md for full analysis.
 */

// ---------------------------------------------------------------------------
// Config — all costs and margins in one place
// ---------------------------------------------------------------------------

export const PRICING_CONFIG = {
  // Duffel API fees
  duffel: {
    flightFlatFeeGBP: 2.40,        // $3 converted at ~£0.80/$1
    flightPercentage: 0.01,          // 1% of ticket value
    ancillaryFlatFeeGBP: 1.60,      // $2 per paid ancillary
    staysCostToSeller: 0,            // commission-share — hotel pays, not us
  },

  // Payment processing (using Duffel Payments, EU card)
  payments: {
    percentageFee: 0.014,            // 1.4% for European cards
  },

  // Our markup — applied on total order value (flights + hotel)
  markup: {
    orderPercentage: 0.05,           // 5% on total order value
  },

  // ATOL (only applies to flight+hotel packages)
  atol: {
    perPassengerGBP: 2.50,
  },

  // Minimum order thresholds (from breakeven analysis)
  thresholds: {
    // Below this flight value, we lose money even with markup
    minFlightValueGBP: 100,
  },
} as const;


// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DealCosts {
  /** What Duffel charges us for the flight component */
  flightCostToUs: number;
  /** What Duffel charges for payment processing */
  paymentProcessingCost: number;
  /** ATOL contribution (packages only) */
  atolCost: number;
  /** Total cost to us for this deal */
  totalCostToUs: number;
  /** Total markup revenue we earn */
  markupRevenue: number;
  /** Net margin (markup - costs). Negative = we lose money */
  netMargin: number;
  /** True if this deal loses us money */
  isLossMaker: boolean;
  /** The customer-facing price per person (after markup) */
  customerPricePerPerson: number;
  /** The original cost price per person (before markup) */
  costPricePerPerson: number;
}


// ---------------------------------------------------------------------------
// Core calculation
// ---------------------------------------------------------------------------

export function calculateDealPricing(params: {
  /** Total flight cost in GBP (all travellers combined) */
  flightTotalGBP: number;
  /** Total hotel cost in GBP (all travellers combined). 0 if no hotel. */
  hotelTotalGBP: number;
  /** Number of travellers */
  travellers: number;
  /** Whether this is a package (flight+hotel) — affects ATOL */
  isPackage: boolean;
}): DealCosts {
  const { flightTotalGBP, hotelTotalGBP, travellers, isPackage } = params;
  const cfg = PRICING_CONFIG;

  // --- Costs to us ---

  // Duffel flight API: flat fee + 1%
  const flightCostToUs =
    cfg.duffel.flightFlatFeeGBP +
    flightTotalGBP * cfg.duffel.flightPercentage;

  // Our markup: percentage of total order value (flights + hotel)
  const orderTotal = flightTotalGBP + hotelTotalGBP;
  const markupAmount = orderTotal * cfg.markup.orderPercentage;
  const totalCustomerPays = orderTotal + markupAmount;

  // Duffel Payments: 1.4% of the amount the customer pays (including our markup)
  const paymentProcessingCost = totalCustomerPays * cfg.payments.percentageFee;

  // ATOL: per passenger, only for packages
  const atolCost = isPackage ? travellers * cfg.atol.perPassengerGBP : 0;

  const totalCostToUs = flightCostToUs + paymentProcessingCost + atolCost;

  // --- Revenue to us ---
  const markupRevenue = markupAmount;

  // --- Net ---
  const netMargin = markupRevenue - totalCostToUs;
  const isLossMaker = netMargin < 0;

  // --- Per-person prices ---
  const costPricePerPerson = orderTotal / Math.max(travellers, 1);
  const customerPricePerPerson = totalCustomerPays / Math.max(travellers, 1);

  return {
    flightCostToUs,
    paymentProcessingCost,
    atolCost,
    totalCostToUs,
    markupRevenue,
    netMargin,
    isLossMaker,
    customerPricePerPerson: Math.round(customerPricePerPerson),
    costPricePerPerson: Math.round(costPricePerPerson),
  };
}


// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns true if a flight is below the minimum viable order value */
export function isBelowMinimumFlightValue(flightTotalGBP: number): boolean {
  return flightTotalGBP < PRICING_CONFIG.thresholds.minFlightValueGBP;
}
