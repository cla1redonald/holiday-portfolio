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
  pricing?: PriceBreakdown;
  flight?: FlightDetail | null;
  offerExpiresAt?: string | null;
  priceContext?: PriceContext;
  source?: 'duffel' | 'mock';
  alternativeFlights?: FlightOffer[];
  /** Net margin in GBP (negative = loss-maker). Only set for Duffel deals. */
  netMargin?: number;
  /** True if this deal costs us more than we earn */
  isLossMaker?: boolean;
  /** Available ancillary services (bags, flexible cancellation) with customer pricing */
  ancillaries?: DealAncillary[];
}

export interface SearchResult {
  deals: Deal[];
  preferences: UserPreference[];
  query: string;
  source?: 'duffel' | 'mock';
  sessionId?: string;
  budgetPerPerson?: number | null;
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

export interface PriceBreakdown {
  flightCost: number;         // raw flight cost per person (GBP)
  hotelCost: number;          // raw hotel cost per person (GBP)
  hotelEstimated: boolean;    // true if hotel cost is estimated (no stays data)
  subtotal: number;           // flightCost + hotelCost (pre-markup)
  markup: number;             // from pricing engine (5% order markup)
  total: number;              // subtotal + markup = customer price per person
}

export interface FlightDetail {
  airline: string;
  airlineLogo: string | null;
  cabinClass: string;
  stops: number;
  outboundDeparture: string;
  outboundArrival: string;
  returnDeparture: string;
  returnArrival: string;
  baggageIncluded: boolean;
  duffelOfferId: string;
  totalDuration: number;      // minutes
}

export interface PricePoint {
  date: string;   // YYYY-MM-DD
  price: number;  // GBP per person
}

export interface PriceContext {
  marketMedian: number | null;
  percentile: number | null;    // 0-100, where this price sits in observed distribution
  sampleCount: number;
  trend: 'rising' | 'falling' | 'stable' | null;
  source: 'observed' | 'seed';
  priceHistory?: PricePoint[];  // recent daily price points for sparkline
}

export interface SessionProfile {
  sessionId: string;
  searchCount: number;
  interests: Record<string, number>;       // interest tag -> count of times expressed
  destinations: Record<string, number>;    // destination -> count of times searched
  budgetSignals: number[];                 // budget values from each search
  travelStyle: Record<string, number>;     // style labels -> count
  dismissedPreferences: string[];          // tags the user explicitly dismissed
  createdAt: string;
  lastSearchAt: string;
  breakdownClicks?: number;                // times user expanded a cost breakdown
  proInterestClicked?: boolean;            // clicked "Notify me" on Pro teaser
  proInterestEmail?: string;               // email if provided via Pro teaser
}

export interface PassengerDetails {
  title: 'mr' | 'mrs' | 'ms' | 'miss' | 'dr';
  givenName: string;
  familyName: string;
  bornOn: string;    // YYYY-MM-DD
  gender: 'm' | 'f';
  email: string;
  phoneNumber: string;
}

export interface BookingConfirmation {
  orderId: string;
  bookingReference: string;
}

export interface DealAncillary {
  serviceId: string;
  category: 'bags' | 'flexibility';
  label: string;
  customerPrice: number;
}

export interface FlightOffer {
  offerId: string;
  pricePerPerson: number;
  currency: string;
  airline: string;
  airlineLogo: string | null;
  stops: number;
  totalDuration: number;
}
