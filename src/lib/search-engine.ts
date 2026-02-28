import { Deal, SearchResult, UserPreference } from '@/types';
import { dealsData } from './deals-data';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface ParsedQuery {
  tags: string[];
  destinations: string[];
  budgetCeiling: number | null;
  preferences: UserPreference[];
}

function parseQuery(query: string): ParsedQuery {
  const lower = query.toLowerCase();
  const tokens = lower.split(/\s+/);
  const tags: string[] = [];
  const destinations: string[] = [];
  const preferences: UserPreference[] = [];
  let budgetCeiling: number | null = null;

  // Climate
  if (/warm|sunny|hot|sun|heat/.test(lower)) {
    tags.push('warm');
    preferences.push({ label: 'Warm weather', confidence: 0.9, icon: '☀️' });
  }
  if (/cold|cool|winter|snow/.test(lower)) {
    tags.push('cold');
    preferences.push({ label: 'Cool climate', confidence: 0.85, icon: '❄️' });
  }

  // Budget extraction
  const budgetMatch = lower.match(/under\s*[£$]?\s*(\d+)/);
  if (budgetMatch) {
    budgetCeiling = parseInt(budgetMatch[1], 10);
    tags.push('budget');
    preferences.push({ label: 'Budget-conscious', confidence: 0.9, icon: '💰' });
  } else if (/cheap|budget|affordable/.test(lower)) {
    tags.push('budget');
    preferences.push({ label: 'Budget-conscious', confidence: 0.8, icon: '💰' });
  }
  if (/expensive|luxury|treat|splurge|5.star|five.star/.test(lower)) {
    tags.push('luxury');
    preferences.push({ label: 'Luxury travel', confidence: 0.85, icon: '✨' });
  }

  // Food
  if (/food|eat|restaurant|foodie|cuisine|dining|gastro/.test(lower)) {
    tags.push('food');
    preferences.push({ label: 'Great food scene', confidence: 0.85, icon: '🍽️' });
  }

  // Culture
  if (/culture|museum|history|historic|heritage|architecture/.test(lower)) {
    tags.push('culture');
    tags.push('architecture');
    tags.push('historic');
    preferences.push({ label: 'Culture & history', confidence: 0.85, icon: '🏛️' });
  }

  // Beach
  if (/beach|sea|coast|ocean|swim|snorkel/.test(lower)) {
    tags.push('beach');
    preferences.push({ label: 'Beach & coast', confidence: 0.88, icon: '🏖️' });
  }

  // Nightlife
  if (/nightlife|bar|bars|party|club|night out/.test(lower)) {
    tags.push('nightlife');
    preferences.push({ label: 'Nightlife', confidence: 0.8, icon: '🍸' });
  }

  // Romantic
  if (/romantic|romance|couples|couple|anniversary|honeymoon/.test(lower)) {
    tags.push('romantic');
    preferences.push({ label: 'Romantic getaway', confidence: 0.9, icon: '💕' });
  }

  // Active
  if (/active|hike|hiking|outdoor|adventure|sport/.test(lower)) {
    tags.push('active');
    preferences.push({ label: 'Active & outdoors', confidence: 0.8, icon: '🏃' });
  }

  // Artsy
  if (/art|gallery|galleries|creative|design/.test(lower)) {
    tags.push('artsy');
    preferences.push({ label: 'Art & design', confidence: 0.8, icon: '🎨' });
  }

  // Riverside
  if (/river|waterfront|harbour/.test(lower)) {
    tags.push('riverside');
    preferences.push({ label: 'Waterfront', confidence: 0.75, icon: '🌊' });
  }

  // Known destinations
  const knownDestinations = [
    'lisbon', 'barcelona', 'amsterdam', 'rome', 'porto', 'prague', 'dubrovnik', 'marrakech',
  ];
  for (const dest of knownDestinations) {
    if (lower.includes(dest)) {
      destinations.push(dest);
    }
  }

  // Duration hints — influences tags indirectly (weekend = short trips favoured)
  const durationTokens = tokens.join(' ');
  if (/weekend|2 night|3 night|short/.test(durationTokens)) {
    // No tag, but could influence scoring later
  }

  return { tags: [...new Set(tags)], destinations, budgetCeiling, preferences };
}

function scoreDeal(deal: Deal, parsed: ParsedQuery): number {
  let score = 0;

  // Tag matches
  for (const tag of parsed.tags) {
    if (deal.tags.includes(tag)) {
      score += 10;
    }
  }

  // Destination match
  for (const dest of parsed.destinations) {
    if (deal.destination.toLowerCase() === dest) {
      score += 20;
    }
  }

  // Budget ceiling match
  if (parsed.budgetCeiling !== null) {
    if (deal.pricePerPerson <= parsed.budgetCeiling) {
      score += 15;
    } else {
      score -= 20; // penalise over-budget deals
    }
  }

  return score;
}

export async function searchDeals(query: string): Promise<SearchResult> {
  // Simulate API latency
  const latency = 300 + Math.random() * 300;
  await delay(latency);

  if (!query.trim()) {
    // Return top confidence deals by default
    const topDeals = [...dealsData]
      .sort((a, b) => b.dealConfidence - a.dealConfidence)
      .slice(0, 6);
    return { deals: topDeals, preferences: [], query };
  }

  const parsed = parseQuery(query);

  // Score all deals
  const scored = dealsData.map((deal) => ({
    deal,
    score: scoreDeal(deal, parsed),
  }));

  // Sort by score, then by dealConfidence as tiebreaker
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.deal.dealConfidence - a.deal.dealConfidence;
  });

  // Take top 6, but NEVER return zero results — fall back to top confidence deals
  let topScored = scored.slice(0, 6).map((s) => s.deal);

  // If no matches scored positively, fall back to highest confidence
  if (scored[0].score <= 0 || topScored.length === 0) {
    topScored = [...dealsData]
      .sort((a, b) => b.dealConfidence - a.dealConfidence)
      .slice(0, 6);
  }

  return {
    deals: topScored,
    preferences: parsed.preferences,
    query,
  };
}
