import { Deal } from '@/types';
import { FlightResult, StayResult } from './duffel-client';
import { getDestinationImage, getCountry } from './iata-codes';

interface BundleParams {
  flights: FlightResult[];
  stays: StayResult[];
  interests: string[];
  travellers: number;
  budgetPerPerson: number | null;
}

// Reference prices (Q1 2026). Review quarterly — used for deal confidence scoring.
const AVG_PRICES: Record<string, number> = {
  lisbon: 320, barcelona: 350, amsterdam: 380, rome: 340,
  porto: 280, prague: 260, dubrovnik: 400, marrakech: 300,
  paris: 400, berlin: 300, vienna: 340, budapest: 250,
  copenhagen: 420, athens: 310, seville: 290, florence: 360,
  edinburgh: 280, nice: 380, split: 350, malaga: 270,
};

export const AVG_PRICES_LAST_UPDATED = '2026-03';

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

function calculateDealConfidence(
  destination: string,
  totalPricePerPerson: number,
  interests: string[]
): { confidence: number; rationale: string } {
  const avgPrice = AVG_PRICES[destination] ?? 350;
  const savings = ((avgPrice - totalPricePerPerson) / avgPrice) * 100;

  let confidence = 50; // base
  const reasons: string[] = [];

  // Price scoring (up to +30)
  if (savings > 20) {
    confidence += 30;
    reasons.push(`${Math.round(savings)}% below average price`);
  } else if (savings > 10) {
    confidence += 20;
    reasons.push(`${Math.round(savings)}% below average`);
  } else if (savings > 0) {
    confidence += 10;
    reasons.push('Competitively priced');
  } else {
    reasons.push('Standard pricing');
  }

  // Interest match scoring (up to +20)
  const strengths = DEST_STRENGTHS[destination] ?? [];
  const matchCount = interests.filter((i) => strengths.includes(i)).length;
  if (matchCount >= 3) {
    confidence += 20;
    reasons.push('Strong match for your interests');
  } else if (matchCount >= 2) {
    confidence += 15;
    reasons.push('Good match for your preferences');
  } else if (matchCount >= 1) {
    confidence += 10;
    reasons.push('Partial match for your style');
  }

  return {
    confidence: Math.min(confidence, 98),
    rationale: reasons.join(' · '),
  };
}

export function buildDeals({ flights, stays, interests, travellers, budgetPerPerson }: BundleParams): Deal[] {
  const deals: Deal[] = [];
  const currencyKnownByIndex = new Map<number, boolean>();

  for (const [index, flight] of flights.entries()) {
    // Find the best stay for this destination
    const destStays = stays
      .filter((s) => s.destination === flight.destination)
      .sort((a, b) => {
        // Prefer higher review scores, then lower price
        const scoreA = a.reviewScore ?? 0;
        const scoreB = b.reviewScore ?? 0;
        if (scoreB !== scoreA) return scoreB - scoreA;
        return a.totalPrice - b.totalPrice;
      });

    const stay = destStays[0];

    // If no stays data (e.g. Stays API not enabled), estimate hotel cost
    const estimatedHotelPerNight = stay ? (stay.totalPrice / Math.max(flight.nights, 1)) : 65;
    const hotelTotal = stay ? stay.totalPrice : estimatedHotelPerNight * flight.nights;
    const hotelName = stay ? stay.hotelName : 'Hotel TBC';

    const hotelPerPerson = hotelTotal / Math.max(travellers, 1);
    const flightConv = toGBP(flight.pricePerPerson, flight.currency);
    const hotelConv = stay ? toGBP(hotelPerPerson, stay.currency) : { gbp: hotelPerPerson, known: true };
    const currencyKnown = flightConv.known && hotelConv.known;
    const totalPerPerson = flightConv.gbp + hotelConv.gbp;
    const avgPrice = AVG_PRICES[flight.destination] ?? 350;
    const originalPrice = totalPerPerson < avgPrice ? avgPrice : Math.round(totalPerPerson);

    const { confidence, rationale } = calculateDealConfidence(
      flight.destination,
      totalPerPerson,
      interests
    );

    const destName = flight.destination.charAt(0).toUpperCase() + flight.destination.slice(1);
    const strengths = DEST_STRENGTHS[flight.destination] ?? [];
    const matchingTags = interests.filter((i) => strengths.includes(i));
    const tags = [...new Set([...matchingTags, ...strengths.slice(0, 3)])];

    const highlights: string[] = [];
    if (flight.airline) highlights.push(`${flight.airline} flights`);
    if (stay?.rating && stay.rating >= 4) highlights.push(`${stay.rating}-star hotel`);
    if (stay?.reviewScore && stay.reviewScore >= 8) highlights.push(`${stay.reviewScore}/10 reviews`);
    highlights.push(`${flight.nights} nights`);

    const formatDate = (d: string) => {
      const date = new Date(d);
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    };

    currencyKnownByIndex.set(deals.length, currencyKnown);
    deals.push({
      id: `duffel-${flight.destination}-${index}-${Math.random().toString(36).slice(2, 7)}`,
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
    });
  }

  // Filter out deals exceeding budget (skip filtering for deals with unknown currency conversion)
  const filtered = budgetPerPerson != null
    ? deals.filter((d, i) => !currencyKnownByIndex.get(i) || d.pricePerPerson <= budgetPerPerson)
    : deals;

  // Sort by deal confidence descending
  filtered.sort((a, b) => b.dealConfidence - a.dealConfidence);

  return filtered;
}
