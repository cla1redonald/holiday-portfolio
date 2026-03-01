import { Deal, PriceBreakdown, FlightDetail, PriceContext, MarginConfig, SessionProfile, FlightOffer as FlightOfferType } from '@/types';
import { FlightResult, StayResult } from './duffel-client';
import { getDestinationImage, getCountry, lookupCity } from './iata-codes';
import { getMarketPrice, getPricePercentile, logPriceObservations, SEED_PRICES, PriceObservation } from './price-intelligence';

interface BundleParams {
  flights: FlightResult[];
  stays: StayResult[];
  interests: string[];
  travellers: number;
  budgetPerPerson: number | null;
  origin?: string;
  sessionProfile?: SessionProfile | null;
}

// Current margin config — passthrough until bed bank / affiliate is active
const MARGIN_CONFIG: MarginConfig = {
  mode: 'passthrough',
  affiliateRate: 0,
  markupRate: 0,
  minMarginGBP: 0,
  maxMarginGBP: 0,
};

const CURRENCY_RATES: Record<string, number> = { GBP: 1.0, EUR: 0.86, USD: 0.79 };

function toGBP(amount: number, currency: string): { gbp: number; known: boolean } {
  const rate = CURRENCY_RATES[currency];
  if (rate != null) return { gbp: amount * rate, known: true };
  console.warn(`[deal-builder] Unknown currency "${currency}", treating as GBP`);
  return { gbp: amount, known: false };
}

// Which interests each destination is known for
const DEST_STRENGTHS: Record<string, string[]> = {
  lisbon: ['food', 'culture', 'nightlife', 'beach', 'budget'],
  barcelona: ['food', 'architecture', 'beach', 'nightlife', 'art'],
  amsterdam: ['culture', 'art', 'nightlife', 'architecture'],
  rome: ['food', 'culture', 'historic', 'architecture', 'romantic'],
  porto: ['food', 'culture', 'budget', 'romantic'],
  prague: ['culture', 'architecture', 'budget', 'nightlife', 'historic'],
  dubrovnik: ['beach', 'historic', 'romantic', 'culture'],
  marrakech: ['food', 'culture', 'shopping', 'budget'],
  paris: ['food', 'culture', 'romantic', 'art', 'architecture', 'luxury'],
  berlin: ['nightlife', 'art', 'culture', 'budget'],
  vienna: ['culture', 'architecture', 'food', 'luxury', 'romantic'],
  budapest: ['budget', 'nightlife', 'culture', 'architecture'],
  copenhagen: ['food', 'architecture', 'culture'],
  athens: ['culture', 'historic', 'food', 'budget', 'beach'],
  seville: ['food', 'culture', 'architecture', 'budget'],
  florence: ['food', 'art', 'culture', 'architecture', 'romantic'],
  edinburgh: ['culture', 'historic', 'food', 'nightlife'],
  nice: ['beach', 'food', 'luxury', 'romantic'],
  split: ['beach', 'historic', 'budget'],
  malaga: ['beach', 'food', 'budget'],
};

// ---------------------------------------------------------------------------
// 5-factor confidence scoring
// ---------------------------------------------------------------------------

interface ConfidenceInput {
  destination: string;
  totalPricePerPerson: number;
  interests: string[];
  departureDate: string;
  priceContext: PriceContext;
  sessionProfile?: SessionProfile | null;
}

interface ConfidenceResult {
  confidence: number;
  rationale: string;
  factors: {
    pricePercentile: number;
    interestMatch: number;
    bookingLeadTime: number;
    priceTrend: number;
    sessionAlignment: number;
    base: number;
  };
}

function calculateDealConfidence(input: ConfidenceInput): ConfidenceResult {
  const { destination, totalPricePerPerson, interests, departureDate, priceContext, sessionProfile } = input;
  const reasons: string[] = [];

  // --- Factor 1: Price Percentile (0-25) ---
  let pricePercentileScore = 0;
  if (priceContext.percentile != null) {
    if (priceContext.percentile <= 25) {
      pricePercentileScore = 25;
      reasons.push(`Cheapest ${Math.round(priceContext.percentile)}% we've tracked`);
    } else if (priceContext.percentile <= 50) {
      pricePercentileScore = 18;
      reasons.push('Below median price for this route');
    } else if (priceContext.percentile <= 75) {
      pricePercentileScore = 10;
      reasons.push('Mid-range pricing');
    } else {
      pricePercentileScore = 3;
    }
  } else {
    // Fallback: compare against seed/market price
    const refPrice = priceContext.marketMedian ?? (SEED_PRICES[destination] ?? 350);
    const savings = ((refPrice - totalPricePerPerson) / refPrice) * 100;
    if (savings > 20) {
      pricePercentileScore = 25;
      reasons.push(`${Math.round(savings)}% below ${priceContext.source === 'observed' ? 'market' : 'typical'} price`);
    } else if (savings > 10) {
      pricePercentileScore = 18;
      reasons.push(`${Math.round(savings)}% below average`);
    } else if (savings > 0) {
      pricePercentileScore = 10;
      reasons.push('Competitively priced');
    } else {
      pricePercentileScore = 3;
    }
  }

  // --- Factor 2: Interest Match (0-20) ---
  let interestMatchScore = 0;
  const strengths = DEST_STRENGTHS[destination] ?? [];
  const sessionInterests = sessionProfile?.interests ?? {};

  // Weight interests by session frequency
  let weightedMatchScore = 0;
  const matchedInterests: string[] = [];
  for (const interest of interests) {
    if (strengths.includes(interest)) {
      const sessionWeight = Math.min((sessionInterests[interest] ?? 1), 3); // cap at 3x
      weightedMatchScore += sessionWeight;
      matchedInterests.push(interest);
    }
  }

  if (weightedMatchScore >= 5) {
    interestMatchScore = 20;
    reasons.push(`Strong match for ${matchedInterests.slice(0, 2).join(' + ')}`);
  } else if (weightedMatchScore >= 3) {
    interestMatchScore = 15;
    reasons.push(`Good match for ${matchedInterests[0] ?? 'your preferences'}`);
  } else if (weightedMatchScore >= 1) {
    interestMatchScore = 10;
    reasons.push('Partial match for your style');
  }

  // --- Factor 3: Booking Lead Time (0-15) ---
  let bookingLeadTimeScore = 0;
  const daysOut = Math.ceil(
    (new Date(departureDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  if (daysOut >= 21 && daysOut <= 56) {
    bookingLeadTimeScore = 15;
    reasons.push(`Great booking window (${Math.round(daysOut / 7)} weeks out)`);
  } else if (daysOut >= 14 && daysOut < 21) {
    bookingLeadTimeScore = 10;
  } else if (daysOut > 56 && daysOut <= 90) {
    bookingLeadTimeScore = 10;
  } else if (daysOut > 90) {
    bookingLeadTimeScore = 5;
  } else if (daysOut >= 7) {
    bookingLeadTimeScore = 5;
  } else {
    bookingLeadTimeScore = 2;
  }

  // --- Factor 4: Price Trend (0-15) ---
  let priceTrendScore = 7; // default when no trend data
  if (priceContext.trend) {
    const belowMedian = priceContext.marketMedian != null && totalPricePerPerson < priceContext.marketMedian;
    if (priceContext.trend === 'rising' && belowMedian) {
      priceTrendScore = 15;
      reasons.push('Prices rising — good time to book');
    } else if (priceContext.trend === 'rising') {
      priceTrendScore = 10;
    } else if (priceContext.trend === 'stable' && belowMedian) {
      priceTrendScore = 10;
    } else if (priceContext.trend === 'stable') {
      priceTrendScore = 7;
    } else {
      // falling — prices may drop further
      priceTrendScore = 5;
      reasons.push('Prices trending down');
    }
  }

  // --- Factor 5: Session Alignment (0-15) ---
  let sessionAlignmentScore = 0;
  if (sessionProfile && sessionProfile.searchCount > 1) {
    const destSearchCount = sessionProfile.destinations[destination] ?? 0;
    const dismissed = sessionProfile.dismissedPreferences ?? [];

    // Boost destinations the user has searched for repeatedly
    if (destSearchCount >= 2) {
      sessionAlignmentScore += 8;
    } else if (destSearchCount >= 1) {
      sessionAlignmentScore += 4;
    }

    // Check if any of this destination's strengths were dismissed
    const dismissedOverlap = strengths.filter(s => dismissed.includes(s)).length;
    if (dismissedOverlap > 0) {
      sessionAlignmentScore = Math.max(0, sessionAlignmentScore - 5);
    }

    // Budget alignment
    if (sessionProfile.budgetSignals.length > 0) {
      const avgBudget = sessionProfile.budgetSignals.reduce((a, b) => a + b, 0) / sessionProfile.budgetSignals.length;
      if (totalPricePerPerson <= avgBudget * 1.1) {
        sessionAlignmentScore += 5;
      }
    }

    sessionAlignmentScore = Math.min(sessionAlignmentScore, 15);

    if (sessionAlignmentScore >= 10) {
      reasons.push('Matches your search pattern');
    }
  }

  const base = 10;
  const rawConfidence = base + pricePercentileScore + interestMatchScore + bookingLeadTimeScore + priceTrendScore + sessionAlignmentScore;
  const confidence = Math.min(rawConfidence, 98);

  return {
    confidence,
    rationale: reasons.slice(0, 3).join(' · ') || 'Standard pricing',
    factors: {
      pricePercentile: pricePercentileScore,
      interestMatch: interestMatchScore,
      bookingLeadTime: bookingLeadTimeScore,
      priceTrend: priceTrendScore,
      sessionAlignment: sessionAlignmentScore,
      base,
    },
  };
}

// ---------------------------------------------------------------------------
// Margin calculation
// ---------------------------------------------------------------------------

function calculateMargin(subtotal: number, config: MarginConfig): number {
  if (config.mode === 'passthrough') return 0;
  if (config.mode === 'affiliate') return subtotal * config.affiliateRate;
  // markup mode
  const raw = subtotal * config.markupRate;
  return Math.min(Math.max(raw, config.minMarginGBP), config.maxMarginGBP || Infinity);
}

// ---------------------------------------------------------------------------
// Build deals (async — fetches market price data)
// ---------------------------------------------------------------------------

export async function buildDeals(params: BundleParams): Promise<Deal[]> {
  const { flights, stays, interests, travellers, budgetPerPerson, origin, sessionProfile } = params;
  const deals: Deal[] = [];
  const currencyKnownByIndex = new Map<number, boolean>();
  const priceObservations: PriceObservation[] = [];
  const originCode = origin ?? 'LHR';

  // Prefetch all market data in parallel to avoid sequential Redis calls
  const routeKeys = flights.map((flight) => {
    const cityInfo = lookupCity(flight.destination);
    return cityInfo ? `${originCode}-${cityInfo.iata}` : `${originCode}-${flight.destination.toUpperCase()}`;
  });
  const marketDataPromises = routeKeys.map((key, i) => getMarketPrice(key, flights[i].nights));

  // Pre-compute per-flight pricing data (all synchronous) for percentile batch
  const perFlightData = flights.map((flight) => {
    const destStays = stays
      .filter((s) => s.destination === flight.destination)
      .sort((a, b) => {
        const scoreA = a.reviewScore ?? 0;
        const scoreB = b.reviewScore ?? 0;
        if (scoreB !== scoreA) return scoreB - scoreA;
        return a.totalPrice - b.totalPrice;
      });
    const stay = destStays[0];
    const estimatedHotelPerNight = stay ? (stay.totalPrice / Math.max(flight.nights, 1)) : 65;
    const hotelTotal = stay ? stay.totalPrice : estimatedHotelPerNight * flight.nights;
    const hotelPerPerson = hotelTotal / Math.max(travellers, 1);
    const flightConv = toGBP(flight.pricePerPerson, flight.currency);
    const hotelConv = stay ? toGBP(hotelPerPerson, stay.currency) : { gbp: hotelPerPerson, known: true };
    const subtotalPerPerson = flightConv.gbp + hotelConv.gbp;
    const margin = calculateMargin(subtotalPerPerson, MARGIN_CONFIG);
    const totalPerPerson = subtotalPerPerson + margin;
    return { stay, hotelTotal, flightConv, hotelConv, subtotalPerPerson, margin, totalPerPerson };
  });

  // Batch market data and percentile lookups in parallel
  const [marketDataResults, percentileResults] = await Promise.all([
    Promise.all(marketDataPromises),
    Promise.all(flights.map((flight, i) =>
      getPricePercentile(perFlightData[i].totalPerPerson, routeKeys[i], flight.nights),
    )),
  ]);

  for (const [index, flight] of flights.entries()) {
    const { stay, hotelTotal, flightConv, hotelConv, subtotalPerPerson, margin, totalPerPerson } = perFlightData[index];
    const hotelName = stay ? stay.hotelName : 'Hotel TBC';
    const currencyKnown = flightConv.known && hotelConv.known;

    const routeKey = routeKeys[index];
    const market = marketDataResults[index];
    const percentile = percentileResults[index];

    const priceCtx: PriceContext = {
      marketMedian: market.stats?.median ?? market.price,
      percentile,
      sampleCount: market.sampleCount,
      trend: market.trend,
      source: market.source,
    };

    // Build originalPrice (market reference)
    const refPrice = market.price;
    const originalPrice = totalPerPerson < refPrice ? Math.round(refPrice) : Math.round(totalPerPerson);

    // Confidence scoring
    const { confidence, rationale } = calculateDealConfidence({
      destination: flight.destination,
      totalPricePerPerson: totalPerPerson,
      interests,
      departureDate: flight.departureDate,
      priceContext: priceCtx,
      sessionProfile,
    });

    const destName = flight.destination.charAt(0).toUpperCase() + flight.destination.slice(1);
    const strengths = DEST_STRENGTHS[flight.destination] ?? [];
    const matchingTags = interests.filter((i) => strengths.includes(i));
    const tags = [...new Set([...matchingTags, ...strengths.slice(0, 3)])];

    const highlights: string[] = [];
    if (flight.airline) highlights.push(`${flight.airline} flights`);
    if (flight.stops === 0) highlights.push('Direct');
    else if (flight.stops > 0) highlights.push(`${flight.stops} stop${flight.stops > 1 ? 's' : ''}`);
    if (stay?.rating && stay.rating >= 4) highlights.push(`${stay.rating}-star hotel`);
    if (stay?.reviewScore && stay.reviewScore >= 8) highlights.push(`${stay.reviewScore}/10 reviews`);
    highlights.push(`${flight.nights} nights`);

    const formatDate = (d: string) => {
      const date = new Date(d);
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    };

    // Build pricing breakdown
    const pricing: PriceBreakdown = {
      flightCost: Math.round(flightConv.gbp),
      hotelCost: Math.round(hotelConv.gbp),
      hotelEstimated: !stay,
      subtotal: Math.round(subtotalPerPerson),
      margin: Math.round(margin),
      marginType: MARGIN_CONFIG.mode === 'passthrough' ? 'none' : MARGIN_CONFIG.mode,
      total: Math.round(totalPerPerson),
    };

    // Build flight detail
    const flightDetail: FlightDetail = {
      airline: flight.airline,
      airlineLogo: flight.airlineLogo,
      cabinClass: flight.cabinClass,
      stops: flight.stops,
      outboundDeparture: flight.outboundDeparture,
      outboundArrival: flight.outboundArrival,
      returnDeparture: flight.returnDeparture,
      returnArrival: flight.returnArrival,
      baggageIncluded: flight.baggageIncluded,
      duffelOfferId: flight.offerId,
      totalDuration: flight.totalDuration,
    };

    // Build alternative flights (exclude cheapest, convert to GBP)
    const alternativeFlights: FlightOfferType[] = (flight.allOffers ?? [])
      .slice(1, 4) // skip cheapest (index 0), take next 3
      .map(offer => ({
        ...offer,
        pricePerPerson: Math.round(toGBP(offer.pricePerPerson, offer.currency).gbp),
      }));

    currencyKnownByIndex.set(deals.length, currencyKnown);
    deals.push({
      id: `duffel-${flight.destination}-${flight.departureDate}-${flight.airline.replace(/\s+/g, '')}-${index}`,
      destination: destName,
      country: getCountry(flight.destination),
      hotel: hotelName,
      image: stay?.photoUrl ?? getDestinationImage(flight.destination),
      dates: `${formatDate(flight.departureDate)} – ${formatDate(flight.returnDate)}`,
      nights: flight.nights,
      pricePerPerson: Math.round(totalPerPerson),
      originalPrice,
      dealConfidence: confidence,
      confidenceRationale: rationale,
      tags,
      highlights,
      pricing,
      flight: flightDetail,
      offerExpiresAt: flight.offerExpiresAt || null,
      priceContext: priceCtx,
      source: 'duffel',
      alternativeFlights,
    });

    // Collect price observations for logging
    for (const offer of (flight.allOffers ?? [])) {
      const offerGbp = toGBP(offer.pricePerPerson, offer.currency);
      priceObservations.push({
        route: routeKey,
        departureDate: flight.departureDate,
        returnDate: flight.returnDate,
        nights: flight.nights,
        pricePerPerson: offerGbp.gbp,
        currency: offer.currency,
        rawAmount: offer.pricePerPerson,
        airline: offer.airline,
        cabinClass: 'economy',
        observedAt: new Date().toISOString(),
        offerId: offer.offerId,
      });
    }
  }

  // Fire-and-forget price logging
  if (priceObservations.length > 0) {
    logPriceObservations(priceObservations).catch(() => {});
  }

  // Filter out deals exceeding budget (skip filtering for deals with unknown currency conversion)
  const filtered = budgetPerPerson != null
    ? deals.filter((d, i) => !currencyKnownByIndex.get(i) || d.pricePerPerson <= budgetPerPerson)
    : deals;

  // Sort by deal confidence descending
  filtered.sort((a, b) => b.dealConfidence - a.dealConfidence);

  return filtered;
}
