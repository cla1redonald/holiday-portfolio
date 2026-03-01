import { getSupabase } from './supabase';

export interface DestinationMatch {
  slug: string;
  name: string;
  iata: string;
  country: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  tags: string[];
  seedPriceGbp: number | null;
  similarity: number;
}

export async function findSimilarDestinations(
  queryEmbedding: number[],
  options?: { limit?: number; budgetPerPerson?: number | null },
): Promise<DestinationMatch[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase.rpc('match_destinations', {
      query_embedding: JSON.stringify(queryEmbedding),
      match_count: options?.limit ?? 5,
      similarity_threshold: 0.3,
    });

    if (error) {
      console.error('[destination-search] RPC error:', error.message);
      return [];
    }

    if (!data || !Array.isArray(data)) return [];

    return data.map((row: Record<string, unknown>) => ({
      slug: row.slug as string,
      name: row.name as string,
      iata: row.iata as string,
      country: row.country as string,
      latitude: row.latitude as number,
      longitude: row.longitude as number,
      imageUrl: row.image_url as string,
      tags: row.tags as string[],
      seedPriceGbp: row.seed_price_gbp as number | null,
      similarity: row.similarity as number,
    }));
  } catch (err) {
    console.error('[destination-search] failed:', err);
    return [];
  }
}

export async function getDestinationBySlug(
  slug: string,
): Promise<DestinationMatch | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('destinations')
      .select('slug, name, iata, country, latitude, longitude, image_url, tags, seed_price_gbp')
      .eq('slug', slug)
      .single();

    if (error || !data) return null;

    return {
      slug: data.slug,
      name: data.name,
      iata: data.iata,
      country: data.country,
      latitude: data.latitude,
      longitude: data.longitude,
      imageUrl: data.image_url,
      tags: data.tags,
      seedPriceGbp: data.seed_price_gbp,
      similarity: 1,
    };
  } catch {
    return null;
  }
}
