/**
 * Pricing engine — calculates Duffel costs, applies markup, and flags loss-makers.
 *
 * Duffel fee structure (March 2026):
 *   Flights: $3 (~£2.40) flat + 1% of ticket value per confirmed order
 *   Payments (EU card): 1.4% of transaction value
 *   Stays: £0 cost to seller (commission-share from hotel)
 *   Ancillaries: $2 (~£1.60) per paid ancillary
 *
 * How this maps to Duffel's payment flow:
 *   Duffel has NO markup_amount field on the Create Order endpoint. Instead,
 *   markup is applied via the Payment Intent amount — you charge the customer
 *   more than the flight costs, and Duffel treats the difference as your markup.
 *
 *   Payment Intent amount = ((offer total + markup) × FX rate) / (1 - payment_fee%)
 *
 *   When building the booking flow, `calculateDealPricing()` output feeds directly
 *   into the Payment Intent creation. The `totalCustomerPays` value from this
 *   function becomes the basis for the Payment Intent `amount` field.
 *
 *   For ancillaries, Duffel's @duffel/components Ancillaries Component has a
 *   built-in `markup` prop ({ amount, rate } per category). We use
 *   `filterViableAncillaries()` to decide which categories to show, then the
 *   Duffel component can handle price display using our markup config.
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

  // Ancillary pricing — Duffel charges £1.60 flat per ancillary.
  // Only offer ancillaries where our net margin exceeds the minimum threshold.
  ancillaries: {
    // Minimum ancillary price (GBP) worth offering to the customer.
    // Below this, the £1.60 flat fee + payment processing eats the markup.
    minViablePriceGBP: 20,

    // Markup on ancillaries (higher than flights — customers expect ancillary markup)
    markupPercentage: 0.10,        // 10% on ancillaries

    // Minimum net margin as a percentage of customer price.
    // If our profit is less than this % of what the customer pays, don't offer it.
    // Set to 0 for friends testing (any profit is fine). Bump to 0.05 (5%) at scale.
    minMarginPercentage: 0,

    // Ancillary categories and whether to offer them
    categories: {
      // Bags: typically £25–£50 each. At 10% markup on £30 bag = £3 revenue vs £1.60 cost. Profitable.
      bags: { enabled: true, reason: 'Avg £30+, clears £1.60 flat fee easily' },

      // Seat selection: typically £5–£20. At 10% markup on £15 = £1.50 revenue vs £1.60 cost. Loss-maker.
      seatSelection: { enabled: false, reason: 'Avg £10–15, below £20 minimum — net loss after flat fee' },

      // Extra legroom / preferred seats: typically £30–£60. Profitable.
      premiumSeat: { enabled: true, reason: 'Avg £35+, comfortable margin above flat fee' },

      // Meals: typically £5–£15. Loss-maker.
      meals: { enabled: false, reason: 'Avg £8–12, well below £20 minimum' },

      // Cancel for any reason / flexibility: typically £20–£50. Borderline to profitable.
      flexibility: { enabled: true, reason: 'Avg £25+, marginal but improves customer experience' },
    },
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


// ---------------------------------------------------------------------------
// Ancillary pricing
// ---------------------------------------------------------------------------

export type AncillaryCategory = keyof typeof PRICING_CONFIG.ancillaries.categories;

export interface AncillaryPricing {
  /** Whether we should offer this ancillary to the customer */
  shouldOffer: boolean;
  /** Why we are or aren't offering it */
  reason: string;
  /** What Duffel charges us (flat fee + payment processing) */
  costToUs: number;
  /** Our markup revenue on this ancillary */
  markupRevenue: number;
  /** Net margin per ancillary item. Negative = loss-maker */
  netMargin: number;
  /** Price the customer sees (cost + markup) */
  customerPrice: number;
  /** Net margin as a percentage of customer price (e.g. 0.05 = 5%) */
  marginPercentage?: number;
}

/**
 * Determine whether an ancillary is worth offering and what to charge.
 *
 * @param category   - The type of ancillary (bags, seatSelection, etc.)
 * @param priceGBP   - Duffel's price for this ancillary in GBP
 */
export function priceAncillary(
  category: AncillaryCategory,
  priceGBP: number,
): AncillaryPricing {
  const cfg = PRICING_CONFIG;
  const categoryConfig = cfg.ancillaries.categories[category];

  // If the category is disabled, don't offer regardless of price
  if (!categoryConfig.enabled) {
    return {
      shouldOffer: false,
      reason: categoryConfig.reason,
      costToUs: 0,
      markupRevenue: 0,
      netMargin: 0,
      customerPrice: 0,
    };
  }

  // Cost to us: flat fee + payment processing on customer-facing price
  const customerPrice = Math.ceil(priceGBP * (1 + cfg.ancillaries.markupPercentage));
  // Derive actual markup from the rounded price to avoid understating margin
  const markup = customerPrice - priceGBP;
  const costToUs = cfg.duffel.ancillaryFlatFeeGBP + (customerPrice * cfg.payments.percentageFee);
  const netMargin = markup - costToUs;

  // Check against minimum viable price
  const belowMinimum = priceGBP < cfg.ancillaries.minViablePriceGBP;

  // Check margin meets the 5% threshold (net margin / customer price)
  const marginPercentage = customerPrice > 0 ? netMargin / customerPrice : 0;
  const meetsMarginThreshold = marginPercentage >= cfg.ancillaries.minMarginPercentage;

  const shouldOffer = !belowMinimum && meetsMarginThreshold;

  let reason: string;
  if (belowMinimum) {
    reason = `Price £${priceGBP} below £${cfg.ancillaries.minViablePriceGBP} minimum`;
  } else if (!meetsMarginThreshold) {
    reason = `Margin ${(marginPercentage * 100).toFixed(1)}% below ${cfg.ancillaries.minMarginPercentage * 100}% threshold`;
  } else {
    reason = `${(marginPercentage * 100).toFixed(1)}% margin (£${netMargin.toFixed(2)})`;
  }

  return {
    shouldOffer,
    reason,
    costToUs,
    markupRevenue: markup,
    netMargin,
    customerPrice,
    marginPercentage,
  };
}

/**
 * Filter a list of ancillaries down to only the ones worth offering.
 * Use this when rendering the ancillaries component to hide loss-makers.
 */
export function filterViableAncillaries(
  ancillaries: Array<{ category: AncillaryCategory; priceGBP: number }>,
): Array<{ category: AncillaryCategory; priceGBP: number; pricing: AncillaryPricing }> {
  return ancillaries
    .map((a) => ({ ...a, pricing: priceAncillary(a.category, a.priceGBP) }))
    .filter((a) => a.pricing.shouldOffer);
}
