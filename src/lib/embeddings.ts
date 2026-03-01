import OpenAI from 'openai';
import type { ParsedIntent } from '@/types';

let openaiClient: OpenAI | null = null;

function getOpenAI(): OpenAI | null {
  if (openaiClient) return openaiClient;
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  openaiClient = new OpenAI({ apiKey: key });
  return openaiClient;
}

const requestCache = new Map<string, number[]>();

export async function embedText(text: string): Promise<number[] | null> {
  const cached = requestCache.get(text);
  if (cached) return cached;

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
    requestCache.set(text, embedding);
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
