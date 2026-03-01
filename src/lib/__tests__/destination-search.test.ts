import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockRpc = vi.fn();
const mockFrom = vi.fn();

vi.mock('../supabase', () => ({
  getSupabase: vi.fn(() => ({
    rpc: mockRpc,
    from: mockFrom,
  })),
}));

import { findSimilarDestinations, getDestinationBySlug } from '../destination-search';

describe('destination-search', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findSimilarDestinations', () => {
    it('returns ranked destinations from Supabase RPC', async () => {
      mockRpc.mockResolvedValue({
        data: [
          {
            slug: 'lisbon',
            name: 'Lisbon',
            iata: 'LIS',
            country: 'Portugal',
            latitude: 38.7223,
            longitude: -9.1393,
            image_url: 'https://example.com/lisbon.jpg',
            tags: ['food', 'culture'],
            seed_price_gbp: 320,
            similarity: 0.85,
          },
          {
            slug: 'barcelona',
            name: 'Barcelona',
            iata: 'BCN',
            country: 'Spain',
            latitude: 41.3874,
            longitude: 2.1686,
            image_url: 'https://example.com/barcelona.jpg',
            tags: ['food', 'beach'],
            seed_price_gbp: 350,
            similarity: 0.72,
          },
        ],
        error: null,
      });

      const fakeEmbedding = Array.from({ length: 1536 }, () => 0.1);
      const results = await findSimilarDestinations(fakeEmbedding, { limit: 5 });

      expect(results).toHaveLength(2);
      expect(results[0].slug).toBe('lisbon');
      expect(results[0].similarity).toBe(0.85);
      expect(results[1].slug).toBe('barcelona');
      expect(mockRpc).toHaveBeenCalledWith('match_destinations', {
        query_embedding: JSON.stringify(fakeEmbedding),
        match_count: 5,
        similarity_threshold: 0.3,
      });
    });

    it('returns empty array on RPC error', async () => {
      mockRpc.mockResolvedValue({
        data: null,
        error: { message: 'Function not found' },
      });

      const results = await findSimilarDestinations([0.1]);
      expect(results).toEqual([]);
    });

    it('returns empty array when Supabase is unavailable', async () => {
      const { getSupabase } = await import('../supabase');
      (getSupabase as ReturnType<typeof vi.fn>).mockReturnValueOnce(null);

      const results = await findSimilarDestinations([0.1]);
      expect(results).toEqual([]);
    });

    it('uses default limit of 5', async () => {
      mockRpc.mockResolvedValue({ data: [], error: null });
      await findSimilarDestinations([0.1]);
      expect(mockRpc).toHaveBeenCalledWith('match_destinations', expect.objectContaining({
        match_count: 5,
      }));
    });
  });

  describe('getDestinationBySlug', () => {
    it('returns a destination by slug', async () => {
      const mockSingle = vi.fn().mockResolvedValue({
        data: {
          slug: 'lisbon',
          name: 'Lisbon',
          iata: 'LIS',
          country: 'Portugal',
          latitude: 38.7223,
          longitude: -9.1393,
          image_url: 'https://example.com/lisbon.jpg',
          tags: ['food', 'culture'],
          seed_price_gbp: 320,
        },
        error: null,
      });
      const mockEq = vi.fn().mockReturnValue({ single: mockSingle });
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
      mockFrom.mockReturnValue({ select: mockSelect });

      const result = await getDestinationBySlug('lisbon');
      expect(result).not.toBeNull();
      expect(result!.slug).toBe('lisbon');
      expect(result!.similarity).toBe(1);
    });

    it('returns null when destination not found', async () => {
      const mockSingle = vi.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } });
      const mockEq = vi.fn().mockReturnValue({ single: mockSingle });
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
      mockFrom.mockReturnValue({ select: mockSelect });

      const result = await getDestinationBySlug('unknown');
      expect(result).toBeNull();
    });
  });
});
