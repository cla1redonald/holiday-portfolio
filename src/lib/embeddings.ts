import OpenAI from 'openai';
import { createHash } from 'crypto';
import type { ParsedIntent } from '@/types';
import { getRedis } from './redis';

let openaiClient: OpenAI | null = null;

function getOpenAI(): OpenAI | null {
  if (openaiClient) return openaiClient;
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  openaiClient = new OpenAI({ apiKey: key });
  return openaiClient;
}

// In-memory cache for the current warm invocation
const requestCache = new Map<string, number[]>();

const EMBEDDING_CACHE_TTL = 7 * 24 * 60 * 60; // 7 days in seconds

function embeddingCacheKey(text: string): string {
  const hash = createHash('sha256').update(text).digest('hex').slice(0, 16);
  return `emb:v1:${hash}`;
}

export async function embedText(text: string): Promise<number[] | null> {
  // Check in-memory cache first (fastest)
  const memCached = requestCache.get(text);
  if (memCached) return memCached;

  // Check Redis cache (survives cold starts)
  const redis = getRedis();
  if (redis) {
    try {
      const redisCached = await redis.get<number[]>(embeddingCacheKey(text));
      if (redisCached) {
        requestCache.set(text, redisCached);
        return redisCached;
      }
    } catch {
      // Redis miss — fall through to OpenAI
    }
  }

  const openai = getOpenAI();
  if (!openai) return null;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);

    const response = await openai.embeddings.create(
      { model: 'text-embedding-3-small', input: text },
      { signal: controller.signal },
    );

    clearTimeout(timer);
    const embedding = response.data[0].embedding;

    // Cache in memory
    requestCache.set(text, embedding);

    // Cache in Redis (best-effort, non-blocking)
    if (redis) {
      redis.set(embeddingCacheKey(text), embedding, { ex: EMBEDDING_CACHE_TTL }).catch(() => {});
    }

    return embedding;
  } catch (err) {
    console.error('[embeddings] embedText failed:', err);
    return null;
  }
}

export function buildQueryText(intent: ParsedIntent, rawQuery?: string): string {
  const parts: string[] = [];

  // Include the raw user query for better semantic matching
  if (rawQuery) {
    parts.push(rawQuery.trim() + '.');
  }

  if (intent.interests.length > 0) {
    parts.push(`Interests: ${intent.interests.join(', ')}.`);
  }

  if (intent.budgetPerPerson != null) {
    parts.push(`Budget-friendly trip under £${intent.budgetPerPerson} per person.`);
  }

  if (intent.nights) {
    parts.push(`${intent.nights}-night trip.`);
  }

  if (intent.travellers > 1) {
    parts.push(`Travelling as a group of ${intent.travellers}.`);
  }

  const preferences = intent.preferences
    .map((p) => p.label)
    .filter(Boolean);
  if (preferences.length > 0) {
    parts.push(`Style: ${preferences.join(', ')}.`);
  }

  return parts.join(' ') || 'European city break';
}
