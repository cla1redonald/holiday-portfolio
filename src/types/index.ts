export interface Deal {
  id: string;
  destination: string;
  country: string;
  hotel: string;
  image: string;
  dates: string;
  nights: number;
  pricePerPerson: number;
  originalPrice: number;
  dealConfidence: number;
  confidenceRationale: string;
  tags: string[];
  highlights: string[];
  /** Net margin in GBP (negative = loss-maker). Only set for Duffel deals. */
  netMargin?: number;
  /** True if this deal costs us more than we earn */
  isLossMaker?: boolean;
}

export interface SearchResult {
  deals: Deal[];
  preferences: UserPreference[];
  query: string;
  source?: 'duffel' | 'mock';
}

export interface UserPreference {
  label: string;
  confidence: number;
  icon: string;
}

export interface VariantConfig {
  id: 'a' | 'b' | 'c';
  headline: string;
  subheadline: string;
}

export interface ParsedIntent {
  destinations: string[];
  originAirport: string | null;
  budgetPerPerson: number | null;
  departureWindow: { earliest: string; latest: string } | null;
  nights: number;
  interests: string[];
  travellers: number;
  preferences: UserPreference[];
}
