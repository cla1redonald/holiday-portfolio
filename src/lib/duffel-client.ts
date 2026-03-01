import { Duffel } from '@duffel/api';
import { getDestinationBySlug } from './destination-search';

// Creates a Duffel client using the API token from environment
export function getDuffel(): Duffel {
  const token = process.env.DUFFEL_API_TOKEN;
  if (!token) throw new Error('DUFFEL_API_TOKEN not configured');
  try {
    return new Duffel({ token });
  } catch {
    // Fallback for environments where Duffel is provided as a factory function
    return (Duffel as unknown as (opts: { token: string }) => Duffel)({ token });
  }
}

/** Parse an ISO 8601 duration string (e.g. "PT2H30M") into total minutes */
function parseISODuration(iso: string | undefined | null): number {
  if (!iso) return 0;
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return 0;
  return (parseInt(match[1] ?? '0', 10) * 60) + parseInt(match[2] ?? '0', 10);
}

/** Calculate total duration in minutes from an array of segments */
function calcSegmentsDuration(segments: Array<{ duration?: string | null }>): number {
  return segments.reduce((sum, seg) => sum + parseISODuration((seg as Record<string, unknown>).duration as string | undefined), 0);
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  let timer: ReturnType<typeof setTimeout>;
  return Promise.race([
    promise.then((v) => { clearTimeout(timer); return v; }),
    new Promise<null>((resolve) => { timer = setTimeout(() => resolve(null), ms); }),
  ]);
}


// Cache for resolved destinations (1-hour TTL)
const resolveCache = new Map<string, { data: { iata: string; name: string; country: string; latitude: number; longitude: number; imageUrl: string } | null; expiresAt: number }>();

export interface ResolvedDestination {
  slug?: string;
  iata: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  tags?: string[];
  seedPriceGbp?: number | null;
}

/**
 * Resolve a destination by slug/name. Checks Supabase first, then falls back
 * to Duffel Places API.
 */
export async function resolveDestination(query: string): Promise<ResolvedDestination | null> {
  const key = query.toLowerCase();
  const cached = resolveCache.get(key);
  if (cached && cached.expiresAt > Date.now()) return cached.data;

  // 1. Try Supabase destinations table
  const dbMatch = await getDestinationBySlug(key);
  if (dbMatch) {
    const result: ResolvedDestination = {
      iata: dbMatch.iata,
      name: dbMatch.name,
      country: dbMatch.country,
      latitude: dbMatch.latitude,
      longitude: dbMatch.longitude,
      imageUrl: dbMatch.imageUrl,
    };
    resolveCache.set(key, { data: result, expiresAt: Date.now() + 3_600_000 });
    return result;
  }

  // 2. Fall back to Duffel Places API
  try {
    const duffel = getDuffel();
    const response = await duffel.suggestions.list({ query: key });
    const places = response.data ?? [];
    const city = places.find((p) => (p as unknown as { type?: string }).type === 'city') ?? places[0];
    if (city) {
      const cityAny = city as unknown as {
        iata_code?: string;
        name?: string;
        city_name?: string;
        latitude?: number;
        longitude?: number;
      };
      if (cityAny.iata_code) {
        const result: ResolvedDestination = {
          iata: cityAny.iata_code,
          name: cityAny.city_name ?? cityAny.name ?? key,
          country: '',
          latitude: cityAny.latitude ?? 0,
          longitude: cityAny.longitude ?? 0,
          imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
        };
        resolveCache.set(key, { data: result, expiresAt: Date.now() + 3_600_000 });
        return result;
      }
    }
  } catch (err) {
    console.error('[duffel-client] resolveDestination Duffel fallback failed:', err);
  }

  // Short TTL for null results so transient failures don't poison the cache
  resolveCache.set(key, { data: null, expiresAt: Date.now() + 300_000 });
  return null;
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

export interface AncillaryResult {
  serviceId: string;
  type: 'baggage' | 'cancel_for_any_reason';
  amount: number;
  currency: string;
  label: string;
  passengerIds: string[];
}

export interface FlightResult {
  destination: string;
  airline: string;
  departureDate: string;
  returnDate: string;
  pricePerPerson: number;
  currency: string;
  nights: number;
  offerId: string;
  offerExpiresAt: string;
  cabinClass: string;
  stops: number;
  outboundDeparture: string;
  outboundArrival: string;
  returnDeparture: string;
  returnArrival: string;
  baggageIncluded: boolean;
  airlineLogo: string | null;
  totalDuration: number;
  allOffers: FlightOffer[];
  ancillaries: AncillaryResult[];
}

export interface StayResult {
  destination: string;
  hotelName: string;
  rating: number | null;
  reviewScore: number | null;
  totalPrice: number;
  pricePerNight: number;
  currency: string;
  checkIn: string;
  checkOut: string;
  photoUrl: string | null;
  boardType: string;
}

export async function searchFlights(params: {
  destinations: string[];
  origin?: string;
  departureDate: string;
  returnDate: string;
  travellers: number;
  resolvedDestinations?: ResolvedDestination[];
}): Promise<FlightResult[]> {
  const duffel = getDuffel();
  const origin = params.origin ?? 'LHR';
  const results: FlightResult[] = [];

  // Build a lookup map from pre-resolved destinations
  const resolvedMap = new Map<string, ResolvedDestination>();
  for (const rd of params.resolvedDestinations ?? []) {
    resolvedMap.set(rd.slug ?? '', rd);
  }

  // Passengers array — matching Duffel docs exactly
  const passengers = Array.from({ length: params.travellers }, () => ({
    type: 'adult' as const,
  }));

  // Search flights to each destination in parallel (max 3), with per-search timeout
  const searches = params.destinations.slice(0, 3).map((dest) => withTimeout((async () => {
    const resolved = resolvedMap.get(dest) ?? await resolveDestination(dest);
    if (!resolved) return null;
    const cityInfo = { iata: resolved.iata, latitude: resolved.latitude, longitude: resolved.longitude };

    try {
      // Following: https://duffel.com/docs/guides/getting-started-with-flights
      const offerRequest = await duffel.offerRequests.create({
        slices: [
          {
            origin: origin,
            destination: cityInfo.iata,
            departure_date: params.departureDate,
            // Required by SDK type CreateOfferRequestSlice even though Duffel docs say optional
            departure_time: null,
            arrival_time: null,
          },
          {
            origin: cityInfo.iata,
            destination: origin,
            departure_date: params.returnDate,
            // Required by SDK type CreateOfferRequestSlice even though Duffel docs say optional
            departure_time: null,
            arrival_time: null,
          },
        ],
        passengers,
        cabin_class: 'economy',
        return_offers: false,
      });

      // Fetch cheapest offers using paginated pattern (recommended by Duffel)
      const offersResponse = await duffel.offers.list({
        offer_request_id: offerRequest.data.id,
        sort: 'total_amount',
        limit: 5,
      });
      const offers = offersResponse.data ?? [];

      // Take cheapest offer (already sorted by total_amount)
      const cheapest = offers[0];

      if (!cheapest) return null;

      // Fetch ancillaries for cheapest offer (requires separate call — list endpoint strips available_services)
      let ancillaries: AncillaryResult[] = [];
      try {
        const detailed = await duffel.offers.get(cheapest.id, { return_available_services: true });
        const services = (detailed.data as unknown as { available_services?: Array<{
          id: string;
          type: 'baggage' | 'cancel_for_any_reason';
          total_amount: string;
          total_currency: string;
          passenger_ids: string[];
          metadata?: { maximum_weight_kg?: number | null; type?: string };
        }> }).available_services ?? [];

        ancillaries = services.map(svc => ({
          serviceId: svc.id,
          type: svc.type,
          amount: parseFloat(svc.total_amount),
          currency: svc.total_currency,
          label: svc.type === 'baggage'
            ? `${svc.metadata?.maximum_weight_kg ?? '23'}kg checked bag`
            : 'Cancel for any reason',
          passengerIds: svc.passenger_ids ?? [],
        }));
      } catch {
        // Non-critical — deals work fine without ancillaries
      }

      const nights = Math.ceil(
        (new Date(params.returnDate).getTime() - new Date(params.departureDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      // Use type assertions for nested Duffel fields the SDK types may not fully expose
      const cheapestAny = cheapest as unknown as Record<string, unknown>;
      const slices = (cheapestAny.slices ?? []) as Array<{
        segments: Array<{
          departing_at: string;
          arriving_at: string;
          duration?: string | null;
        }>;
      }>;

      const outboundSlice = slices[0];
      const returnSlice = slices[1];

      const outboundSegments = outboundSlice?.segments ?? [];
      const returnSegments = returnSlice?.segments ?? [];

      const stops = outboundSegments.length > 0 ? outboundSegments.length - 1 : 0;

      const outboundDeparture = outboundSegments[0]?.departing_at ?? params.departureDate;
      const outboundArrival = outboundSegments[outboundSegments.length - 1]?.arriving_at ?? params.departureDate;
      const returnDeparture = returnSegments[0]?.departing_at ?? params.returnDate;
      const returnArrival = returnSegments[returnSegments.length - 1]?.arriving_at ?? params.returnDate;

      const allSegments = [...outboundSegments, ...returnSegments];
      const totalDuration = calcSegmentsDuration(allSegments);

      const offerPassengers = (cheapestAny.passengers ?? []) as Array<{
        baggages?: Array<unknown>;
      }>;
      const baggageIncluded = (offerPassengers[0]?.baggages?.length ?? 0) > 0;

      const owner = cheapestAny.owner as { name?: string; logo_symbol_url?: string | null } | undefined;
      const airlineLogo = owner?.logo_symbol_url ?? null;

      // Build allOffers from all returned offers (up to 5)
      const allOffers: FlightOffer[] = offers.map((offer) => {
        const offerAny = offer as unknown as Record<string, unknown>;
        const offerSlices = (offerAny.slices ?? []) as Array<{
          segments: Array<{ duration?: string | null }>;
        }>;
        const offerOutbound = offerSlices[0]?.segments ?? [];
        const offerReturn = offerSlices[1]?.segments ?? [];
        const offerOwner = offerAny.owner as { name?: string; logo_symbol_url?: string | null } | undefined;

        return {
          offerId: offer.id,
          pricePerPerson: parseFloat(offer.total_amount) / params.travellers,
          currency: offer.total_currency,
          airline: offerOwner?.name ?? 'Airline',
          airlineLogo: offerOwner?.logo_symbol_url ?? null,
          stops: offerOutbound.length > 0 ? offerOutbound.length - 1 : 0,
          totalDuration: calcSegmentsDuration([...offerOutbound, ...offerReturn]),
        };
      });

      return {
        destination: dest,
        airline: owner?.name ?? 'Airline',
        departureDate: params.departureDate,
        returnDate: params.returnDate,
        pricePerPerson: parseFloat(cheapest.total_amount) / params.travellers,
        currency: cheapest.total_currency,
        nights,
        offerId: cheapest.id,
        offerExpiresAt: (cheapestAny.expires_at as string) ?? '',
        cabinClass: 'economy',
        stops,
        outboundDeparture,
        outboundArrival,
        returnDeparture,
        returnArrival,
        baggageIncluded,
        airlineLogo,
        totalDuration,
        allOffers,
        ancillaries,
      };
    } catch (err: unknown) {
      const duffelErr = err as { errors?: Array<{ message: string; title: string }> };
      if (duffelErr.errors) {
        console.error(`Flight search failed for ${dest}:`, duffelErr.errors.map(e => `${e.title}: ${e.message}`).join(', '));
      } else {
        console.error(`Flight search failed for ${dest}:`, err);
      }
      return null;
    }
  })(), 8000));

  const settled = await Promise.allSettled(searches);
  for (const result of settled) {
    if (result.status === 'fulfilled' && result.value) results.push(result.value);
  }

  return results;
}

// Stays API — requires separate access from Duffel (contact sales)
export async function searchStays(params: {
  destinations: string[];
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms?: number;
  resolvedDestinations?: ResolvedDestination[];
}): Promise<StayResult[]> {
  const duffel = getDuffel();
  const results: StayResult[] = [];
  const rooms = params.rooms ?? 1;
  const guests = Array.from({ length: params.guests }, () => ({
    type: 'adult' as const,
  }));

  // Build a lookup map from pre-resolved destinations
  const resolvedMap = new Map<string, ResolvedDestination>();
  for (const rd of params.resolvedDestinations ?? []) {
    resolvedMap.set(rd.slug ?? '', rd);
  }

  const nights = Math.ceil(
    (new Date(params.checkOut).getTime() - new Date(params.checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const searches = params.destinations.slice(0, 3).map((dest) =>
    withTimeout(
      (async () => {
        const resolved = resolvedMap.get(dest) ?? await resolveDestination(dest);
        if (!resolved) return [];
        const cityInfo = { latitude: resolved.latitude, longitude: resolved.longitude };

        try {
          const response = await duffel.stays.search({
            check_in_date: params.checkIn,
            check_out_date: params.checkOut,
            rooms,
            guests,
            location: {
              radius: 10,
              geographic_coordinates: {
                latitude: cityInfo.latitude,
                longitude: cityInfo.longitude,
              },
            },
          });

          const stayResults = response.data.results ?? [];

          return stayResults
            .sort(
              (a: { cheapest_rate_total_amount: string }, b: { cheapest_rate_total_amount: string }) =>
                parseFloat(a.cheapest_rate_total_amount) -
                parseFloat(b.cheapest_rate_total_amount)
            )
            .slice(0, 3)
            .map((result: {
              cheapest_rate_total_amount: string;
              cheapest_rate_currency: string;
              accommodation: {
                name: string;
                rating: number | null;
                review_score: number | null;
                photos?: Array<{ url: string }>;
              };
            }) => {
              const totalPrice = parseFloat(result.cheapest_rate_total_amount);
              return {
                destination: dest,
                hotelName: result.accommodation.name,
                rating: result.accommodation.rating,
                reviewScore: result.accommodation.review_score,
                totalPrice,
                pricePerNight: totalPrice / Math.max(nights, 1),
                currency: result.cheapest_rate_currency,
                checkIn: params.checkIn,
                checkOut: params.checkOut,
                photoUrl: result.accommodation.photos?.[0]?.url ?? null,
                boardType: 'room_only',
              };
            });
        } catch (err: unknown) {
          const duffelErr = err as {
            errors?: Array<{ message: string; title: string; code?: string }>;
            meta?: { status?: number };
          };
          if (duffelErr.errors) {
            console.error(
              `Stays search failed for ${dest}:`,
              duffelErr.errors
                .map((e) => `${e.title}: ${e.message}`)
                .join(', ')
            );
          } else {
            console.error(`Stays search failed for ${dest}:`, err);
          }
          return [];
        }
      })(),
      8000
    )
  );

  const settled = await Promise.allSettled(searches);
  for (const result of settled) {
    if (result.status === 'fulfilled' && result.value) results.push(...result.value);
  }
  return results;
}
