import { Duffel } from '@duffel/api';
import { lookupCity } from './iata-codes';

let duffelClient: Duffel | null = null;

function getDuffel(): Duffel {
  const token = process.env.DUFFEL_API_TOKEN;
  if (!token) throw new Error('DUFFEL_API_TOKEN not configured');
  if (!duffelClient) {
    duffelClient = new Duffel({ token });
  }
  return duffelClient;
}

export interface FlightResult {
  destination: string;
  airline: string;
  departureDate: string;
  returnDate: string;
  pricePerPerson: number;
  currency: string;
  nights: number;
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
}): Promise<FlightResult[]> {
  const duffel = getDuffel();
  const origin = params.origin ?? 'LHR';
  const results: FlightResult[] = [];

  // Passengers array — matching Duffel docs exactly
  const passengers = Array.from({ length: params.travellers }, () => ({
    type: 'adult' as const,
  }));

  // Search flights to each destination in parallel (max 3)
  const searches = params.destinations.slice(0, 3).map(async (dest) => {
    const cityInfo = lookupCity(dest);
    if (!cityInfo) return null;

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
      console.log(`Flights to ${dest} (${cityInfo.iata}): ${offers.length} offers`);

      // Take cheapest offer (already sorted by total_amount)
      const cheapest = offers[0];

      if (!cheapest) return null;

      const nights = Math.ceil(
        (new Date(params.returnDate).getTime() - new Date(params.departureDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      return {
        destination: dest,
        airline: cheapest.owner?.name ?? 'Airline',
        departureDate: params.departureDate,
        returnDate: params.returnDate,
        pricePerPerson: parseFloat(cheapest.total_amount) / params.travellers,
        currency: cheapest.total_currency,
        nights,
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
  });

  const settled = await Promise.all(searches);
  for (const result of settled) {
    if (result) results.push(result);
  }

  return results;
}

// Stays API — requires separate access from Duffel (contact sales)
// Using direct fetch since the SDK may not handle Stays errors well
export async function searchStays(params: {
  destinations: string[];
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms?: number;
}): Promise<StayResult[]> {
  const token = process.env.DUFFEL_API_TOKEN;
  if (!token) return [];

  const results: StayResult[] = [];
  const rooms = params.rooms ?? 1;
  const guestsList = Array.from({ length: params.guests }, () => ({
    type: 'adult' as const,
  }));

  const searches = params.destinations.slice(0, 3).map(async (dest) => {
    const cityInfo = lookupCity(dest);
    if (!cityInfo) return [];

    try {
      const res = await fetch('https://api.duffel.com/stays/search', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Duffel-Version': 'v2',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            location: {
              radius: 10,
              geographic_coordinates: {
                latitude: cityInfo.latitude,
                longitude: cityInfo.longitude,
              },
            },
            check_in_date: params.checkIn,
            check_out_date: params.checkOut,
            rooms,
            guests: guestsList,
          },
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error(`Stays search ${dest}: ${res.status} - ${text.slice(0, 200)}`);
        return [];
      }

      interface StaysAccommodation {
        name: string;
        rating: number | null;
        review_score: number | null;
        photos?: Array<{ url: string }>;
      }
      interface StaysResult {
        cheapest_rate_total_amount: string;
        cheapest_rate_currency: string;
        accommodation: StaysAccommodation;
      }

      const data = await res.json() as { data: { results?: StaysResult[] } };
      const stayResults = data.data.results ?? [];
      console.log(`Stays in ${dest}: ${stayResults.length} results`);

      return stayResults
        .sort((a, b) => parseFloat(a.cheapest_rate_total_amount) - parseFloat(b.cheapest_rate_total_amount))
        .slice(0, 3)
        .map((result) => {
          const nights = Math.ceil(
            (new Date(params.checkOut).getTime() - new Date(params.checkIn).getTime()) / (1000 * 60 * 60 * 24)
          );
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
    } catch (err) {
      console.error(`Stays search failed for ${dest}:`, err);
      return [];
    }
  });

  const settled = await Promise.all(searches);
  for (const stayArr of settled) {
    results.push(...stayArr);
  }
  return results;
}
