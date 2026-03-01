interface CityInfo {
  iata: string;
  country: string;
  latitude: number;
  longitude: number;
  image: string;
}

const cities: Record<string, CityInfo> = {
  lisbon: { iata: 'LIS', country: 'Portugal', latitude: 38.7223, longitude: -9.1393, image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&q=80' },
  barcelona: { iata: 'BCN', country: 'Spain', latitude: 41.3874, longitude: 2.1686, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80' },
  amsterdam: { iata: 'AMS', country: 'Netherlands', latitude: 52.3676, longitude: 4.9041, image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80' },
  rome: { iata: 'FCO', country: 'Italy', latitude: 41.9028, longitude: 12.4964, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80' },
  porto: { iata: 'OPO', country: 'Portugal', latitude: 41.1579, longitude: -8.6291, image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80' },
  prague: { iata: 'PRG', country: 'Czech Republic', latitude: 50.0755, longitude: 14.4378, image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80' },
  dubrovnik: { iata: 'DBV', country: 'Croatia', latitude: 42.6507, longitude: 18.0944, image: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=800&q=80' },
  marrakech: { iata: 'RAK', country: 'Morocco', latitude: 31.6295, longitude: -7.9811, image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&q=80' },
  paris: { iata: 'CDG', country: 'France', latitude: 48.8566, longitude: 2.3522, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80' },
  berlin: { iata: 'BER', country: 'Germany', latitude: 52.5200, longitude: 13.4050, image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80' },
  vienna: { iata: 'VIE', country: 'Austria', latitude: 48.2082, longitude: 16.3738, image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80' },
  budapest: { iata: 'BUD', country: 'Hungary', latitude: 47.4979, longitude: 19.0402, image: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?w=800&q=80' },
  copenhagen: { iata: 'CPH', country: 'Denmark', latitude: 55.6761, longitude: 12.5683, image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&q=80' },
  athens: { iata: 'ATH', country: 'Greece', latitude: 37.9838, longitude: 23.7275, image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80' },
  seville: { iata: 'SVQ', country: 'Spain', latitude: 37.3891, longitude: -5.9845, image: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=800&q=80' },
  florence: { iata: 'FLR', country: 'Italy', latitude: 43.7696, longitude: 11.2558, image: 'https://images.unsplash.com/photo-1543429258-c5ca3e3e7b1e?w=800&q=80' },
  edinburgh: { iata: 'EDI', country: 'United Kingdom', latitude: 55.9533, longitude: -3.1883, image: 'https://images.unsplash.com/photo-1506377585622-bedcbb5f6eaf?w=800&q=80' },
  nice: { iata: 'NCE', country: 'France', latitude: 43.7102, longitude: 7.2620, image: 'https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=800&q=80' },
  split: { iata: 'SPU', country: 'Croatia', latitude: 43.5081, longitude: 16.4402, image: 'https://images.unsplash.com/photo-1555990538-1e0c3a7c8a59?w=800&q=80' },
  malaga: { iata: 'AGP', country: 'Spain', latitude: 36.7213, longitude: -4.4214, image: 'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=800&q=80' },
};

export function lookupCity(name: string): CityInfo | undefined {
  return cities[name.toLowerCase()];
}

export function lookupByIata(iata: string): { city: string; info: CityInfo } | undefined {
  for (const [city, info] of Object.entries(cities)) {
    if (info.iata === iata.toUpperCase()) {
      return { city, info };
    }
  }
  return undefined;
}

export function getAllCities(): Array<{ city: string } & CityInfo> {
  return Object.entries(cities).map(([city, info]) => ({ city, ...info }));
}

export function getDestinationImage(destination: string): string {
  const info = lookupCity(destination);
  return info?.image ?? 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80';
}

export function getCountry(destination: string): string {
  const info = lookupCity(destination);
  return info?.country ?? '';
}
