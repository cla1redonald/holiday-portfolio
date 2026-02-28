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
}

export interface SearchResult {
  deals: Deal[];
  preferences: UserPreference[];
  query: string;
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
