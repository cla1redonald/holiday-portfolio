import { Deal, DealAncillary, PriceBreakdown, FlightDetail, PriceContext, SessionProfile, FlightOffer as FlightOfferType } from '@/types';
import { FlightResult, StayResult } from './duffel-client';
import { getMarketPrice, getPricePercentile, logPriceObservations, PriceObservation } from './price-intelligence';
import { calculateDealPricing, isBelowMinimumFlightValue, filterViableAncillaries, AncillaryCategory } from './pricing';
import { getRate } from './fx-rates';

export interface ResolvedDestinationMeta {
  iata: string;
  country: string;
  imageUrl: string;
  seedPriceGbp: number | null;
}

interface BundleParams {
  flights: FlightResult[];
  stays: StayResult[];
  interests: string[];
  travellers: number;
  budgetPerPerson: number | null;
  origin?: string;
  sessionProfile?: SessionProfile | null;
  similarityScores?: Record<string, number>;
  destinationTags?: Record<string, string[]>;
  resolvedDestinations?: Record<string, ResolvedDestinationMeta>;
  markupPercentage?: number;
}

async function toGBP(amount: number, currency: string): Promise<{ gbp: number; known: boolean }> {
  if (currency === 'GBP') return { gbp: amount, known: true };
  const rate = await getRate(currency);
  return { gbp: amount * rate, known: rate !== 1.0 };
}

// ---------------------------------------------------------------------------
// 5-factor confidence scoring
// ---------------------------------------------------------------------------

interface ConfidenceInput {
  destination: string;
  totalPricePerPerson: number;
  departureDate: string;
  priceContext: PriceContext;
  sessionProfile?: SessionProfile | null;
  similarityScores?: Record<string, number>;
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
  const { destination, totalPricePerPerson, departureDate, priceContext, sessionProfile, similarityScores } = input;
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
    // Fallback: compare against market/seed price from Supabase
    const refPrice = priceContext.marketMedian ?? 350;
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
  // Purely semantic — cosine similarity from pgvector, no tag-based fallback.
  // If embedding failed or destination not in DB, score is simply 0.
  let interestMatchScore = 0;
  if (similarityScores?.[destination] != null) {
    const sim = similarityScores[destination];
    interestMatchScore = Math.round(sim * 20);
    if (sim >= 0.7) reasons.push('Strong match for your style');
    else if (sim >= 0.5) reasons.push('Good match for your preferences');
    else if (sim >= 0.3) reasons.push('Partial match');
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

    // Boost destinations the user has searched for repeatedly
    if (destSearchCount >= 2) {
      sessionAlignmentScore += 8;
    } else if (destSearchCount >= 1) {
      sessionAlignmentScore += 4;
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
// Build deals (async — fetches market price data)
// ---------------------------------------------------------------------------

export async function buildDeals(params: BundleParams): Promise<Deal[]> {
  const { flights, stays, travellers, budgetPerPerson, origin, sessionProfile, similarityScores, destinationTags, resolvedDestinations } = params;
  const deals: Deal[] = [];
  const currencyKnownByIndex = new Map<number, boolean>();
  const priceObservations: PriceObservation[] = [];
  const originCode = origin ?? 'LHR';

  // Warm FX cache for all currencies we'll need
  const currencies = new Set(flights.map(f => f.currency).concat(stays.map(s => s.currency)));
  await Promise.all([...currencies].map(c => getRate(c)));

  // Prefetch all market data in parallel to avoid sequential Redis calls
  const routeKeys = flights.map((flight) => {
    const resolved = resolvedDestinations?.[flight.destination];
    const iata = resolved?.iata ?? flight.destination.toUpperCase();
    return `${originCode}-${iata}`;
  });
  const marketDataPromises = routeKeys.map((key, i) => getMarketPrice(key, flights[i].nights));
  const marketDataResults = await Promise.all(marketDataPromises);

  // Pre-compute pricing for all flights so we can batch percentile lookups
  interface FlightPricing {
    stay: StayResult | undefined;
    hotelName: string;
    flightConv: { gbp: number; known: boolean };
    hotelConv: { gbp: number; known: boolean };
    currencyKnown: boolean;
    dealPricing: ReturnType<typeof calculateDealPricing>;
    subtotalPerPerson: number;
    markupPerPerson: number;
    totalPerPerson: number;
    flightTotalGBP: number;
  }

  const flightPricings: FlightPricing[] = await Promise.all(flights.map(async (flight) => {
    const destStays = stays
      .filter((s) => s.destination === flight.destination)
      .sort((a, b) => {
        const scoreA = a.reviewScore ?? 0;
        const scoreB = b.reviewScore ?? 0;
        if (scoreB !== scoreA) return scoreB - scoreA;
        return a.totalPrice - b.totalPrice;
      });

    const stay = destStays[0];
    const seedPrice = resolvedDestinations?.[flight.destination]?.seedPriceGbp;
    const defaultHotelPerNight = seedPrice ? Math.round((seedPrice * 0.5) / 3) : 65;
    const estimatedHotelPerNight = stay ? (stay.totalPrice / Math.max(flight.nights, 1)) : defaultHotelPerNight;
    const hotelTotal = stay ? stay.totalPrice : estimatedHotelPerNight * flight.nights;
    const hotelName = stay ? stay.hotelName : 'Hotel TBC';

    const hotelPerPerson = hotelTotal / Math.max(travellers, 1);
    const flightConv = await toGBP(flight.pricePerPerson, flight.currency);
    const hotelConv = stay ? await toGBP(hotelPerPerson, stay.currency) : { gbp: hotelPerPerson, known: true };
    const currencyKnown = flightConv.known && hotelConv.known;

    const flightTotalGBP = flightConv.gbp * Math.max(travellers, 1);
    const hotelTotalGBP = hotelConv.gbp * Math.max(travellers, 1);
    const isPackage = stay != null;

    const dealPricing = calculateDealPricing({ flightTotalGBP, hotelTotalGBP, travellers, isPackage, markupPercentage: params.markupPercentage });
    const subtotalPerPerson = flightConv.gbp + hotelConv.gbp;
    const markupPerPerson = dealPricing.markupRevenue / Math.max(travellers, 1);

    return {
      stay, hotelName, flightConv, hotelConv, currencyKnown,
      dealPricing, subtotalPerPerson, markupPerPerson,
      totalPerPerson: dealPricing.customerPricePerPerson,
      flightTotalGBP,
    };
  }));

  // Batch all percentile lookups in parallel
  const percentileResults = await Promise.all(
    flights.map((flight, i) =>
      getPricePercentile(flightPricings[i].totalPerPerson, routeKeys[i], flight.nights)
    )
  );

  for (const [index, flight] of flights.entries()) {
    const fp = flightPricings[index];
    const { stay, hotelName, flightConv, hotelConv, currencyKnown, dealPricing, subtotalPerPerson, markupPerPerson, totalPerPerson, flightTotalGBP } = fp;

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
      departureDate: flight.departureDate,
      priceContext: priceCtx,
      sessionProfile,
      similarityScores,
    });

    // Penalise confidence for loss-making deals
    const belowMinFlight = isBelowMinimumFlightValue(flightTotalGBP);
    const confidenceAdjustment = dealPricing.isLossMaker ? -15 : belowMinFlight ? -5 : 0;
    const adjustedConfidence = Math.max(Math.min(confidence + confidenceAdjustment, 98), 10);
    const adjustedRationale = dealPricing.isLossMaker
      ? rationale + ' · Low margin'
      : rationale;

    const destName = flight.destination.charAt(0).toUpperCase() + flight.destination.slice(1);
    const destTags = destinationTags?.[flight.destination] ?? [];
    const tags = destTags.slice(0, 5);

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
      markup: Math.round(markupPerPerson),
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
    const altOffers = (flight.allOffers ?? []).slice(1, 4);
    const alternativeFlights: FlightOfferType[] = await Promise.all(
      altOffers.map(async (offer) => ({
        ...offer,
        pricePerPerson: Math.round((await toGBP(offer.pricePerPerson, offer.currency)).gbp),
      }))
    );

    // Process ancillaries: convert to GBP, deduplicate by category, filter viable
    const categoryMap: Record<string, AncillaryCategory> = {
      baggage: 'bags',
      cancel_for_any_reason: 'flexibility',
    };
    const rawAnc = flight.ancillaries ?? [];
    const convertedAnc = await Promise.all(rawAnc.map(async (a) => ({
      ...a,
      gbpAmount: (await toGBP(a.amount, a.currency)).gbp,
      category: categoryMap[a.type] as AncillaryCategory | undefined,
    })));
    // Keep only known categories, deduplicate (cheapest per category)
    const byCat = new Map<AncillaryCategory, typeof convertedAnc[number]>();
    for (const a of convertedAnc) {
      if (!a.category) continue;
      const existing = byCat.get(a.category);
      if (!existing || a.gbpAmount < existing.gbpAmount) byCat.set(a.category, a);
    }
    const deduped = [...byCat.values()];
    const viable = filterViableAncillaries(deduped.map(a => ({ category: a.category!, priceGBP: a.gbpAmount })));
    const dealAncillaries: DealAncillary[] = viable.map((v, i) => ({
      serviceId: deduped[i].serviceId,
      category: v.category as 'bags' | 'flexibility',
      label: deduped[i].label,
      customerPrice: v.pricing.customerPrice,
    }));

    currencyKnownByIndex.set(deals.length, currencyKnown);
    deals.push({
      id: `duffel-${flight.destination}-${flight.departureDate}-${flight.airline.replace(/\s+/g, '')}-${index}`,
      destination: destName,
      country: resolvedDestinations?.[flight.destination]?.country ?? '',
      hotel: hotelName,
      image: stay?.photoUrl ?? resolvedDestinations?.[flight.destination]?.imageUrl ?? 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
      dates: `${formatDate(flight.departureDate)} – ${formatDate(flight.returnDate)}`,
      nights: flight.nights,
      pricePerPerson: Math.round(totalPerPerson),
      originalPrice,
      dealConfidence: adjustedConfidence,
      confidenceRationale: adjustedRationale,
      tags,
      highlights,
      pricing,
      flight: flightDetail,
      offerExpiresAt: flight.offerExpiresAt || null,
      priceContext: priceCtx,
      source: 'duffel',
      alternativeFlights,
      netMargin: Math.round(dealPricing.netMargin * 100) / 100,
      isLossMaker: dealPricing.isLossMaker,
      ancillaries: dealAncillaries,
    });

    // Collect price observations for logging
    for (const offer of (flight.allOffers ?? [])) {
      const offerGbp = await toGBP(offer.pricePerPerson, offer.currency);
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

  // Sort: viable deals first, then by deal confidence descending
  filtered.sort((a, b) => {
    const aLoss = a.isLossMaker ? 1 : 0;
    const bLoss = b.isLossMaker ? 1 : 0;
    if (aLoss !== bLoss) return aLoss - bLoss;
    return b.dealConfidence - a.dealConfidence;
  });

  return filtered;
}
