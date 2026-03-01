import Anthropic from '@anthropic-ai/sdk';
import { ParsedIntent, UserPreference } from '@/types';

// Singleton pattern: reuses the client across warm serverless invocations
let anthropicClient: Anthropic | null = null;

function getAnthropic(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not configured');
  if (!anthropicClient) {
    anthropicClient = new Anthropic({ apiKey });
  }
  return anthropicClient;
}

const SYSTEM_PROMPT = `You are a travel search intent parser. Given a natural language travel query, extract structured intent as JSON.

Return ONLY valid JSON matching this schema:
{
  "destinations": string[],       // City names (lowercase) the user wants to visit. If they don't name specific cities, suggest 3-4 that match their description (e.g. "somewhere warm" → ["lisbon", "barcelona", "athens", "malaga"])
  "originAirport": string|null,   // IATA code of departure airport, parsed from phrases like "from Manchester", "departing Gatwick", "flying out of Edinburgh". Known UK airports: LHR (Heathrow), LGW (Gatwick), MAN (Manchester), STN (Stansted), EDI (Edinburgh), BHX (Birmingham), BRS (Bristol), GLA (Glasgow), LTN (Luton). Default: null if not mentioned.
  "budgetPerPerson": number|null, // Max budget per person in GBP. Extract from phrases like "under £400", "budget friendly" (use 300), "luxury" (use null)
  "departureWindow": {"earliest": "YYYY-MM-DD", "latest": "YYYY-MM-DD"} | null, // Travel dates. If "May" → first and last day of May. If "next month" → first and last day of next month. If "weekend" → next Friday to Sunday. If unspecified → null
  "nights": number,               // Trip duration in nights. "weekend" = 2, "long weekend" = 3, "week" = 7. Default: 3
  "interests": string[],          // Tags: "food", "culture", "beach", "nightlife", "romantic", "active", "art", "architecture", "historic", "shopping", "nature", "luxury", "budget"
  "travellers": number,           // Number of people. "couple" = 2, "solo" = 1, "family" = 4. Default: 2
  "preferenceLabels": [{"label": string, "confidence": number, "icon": string}] // Human-readable preference tags inferred from the query, with confidence 0-1 and an emoji icon
}

Known cities: lisbon, barcelona, amsterdam, rome, porto, prague, dubrovnik, marrakech, paris, berlin, vienna, budapest, copenhagen, athens, seville, florence, edinburgh, nice, split, malaga

Today's date: ${new Date().toISOString().split('T')[0]}

Rules:
- Always return 2-6 destinations, even if the user doesn't name any
- For vague queries like "somewhere nice", pick diverse popular destinations
- For "warm" → Mediterranean/Southern Europe cities
- For "cheap" → Porto, Prague, Budapest, Marrakech, Athens
- For "food" → Lisbon, Barcelona, Rome, Florence, Marrakech
- Match the user's language and intent naturally
- Do NOT include markdown formatting or code blocks — return raw JSON only`;

const KNOWN_ORIGINS = new Set([
  'LHR', 'LGW', 'MAN', 'STN', 'EDI', 'BHX', 'BRS', 'GLA', 'LTN',
]);

function validateOriginAirport(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const code = raw.trim().toUpperCase();
  return KNOWN_ORIGINS.has(code) ? code : null;
}

function sanitizeQuery(raw: string): string {
  // Remove null bytes and control characters (keep newlines and tabs)
  let sanitized = raw.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Strip lines that look like role overrides or injection attempts
  const injectionPatterns = /^(system\s*:|assistant\s*:|ignore previous|forget (your|all|previous)|you are now|new instructions|disregard)/im;
  sanitized = sanitized
    .split('\n')
    .filter((line) => !injectionPatterns.test(line.trim()))
    .join('\n');

  // Truncate to 500 characters (defense in depth)
  return sanitized.slice(0, 500).trim();
}

export async function parseSearchQuery(query: string): Promise<ParsedIntent> {
  const client = getAnthropic();
  const sanitized = sanitizeQuery(query);

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: sanitized }],
  });

  const text = message.content[0].type === 'text' ? message.content[0].text : '';

  try {
    const parsed = JSON.parse(text);

    const preferences: UserPreference[] = (parsed.preferenceLabels ?? []).map(
      (p: { label: string; confidence: number; icon: string }) => ({
        label: p.label,
        confidence: p.confidence,
        icon: p.icon,
      })
    );

    const destinations = (parsed.destinations ?? [])
      .filter((d: unknown) => typeof d === 'string' && d.length > 0 && d.length < 100)
      .slice(0, 3);
    const travellers = Math.min(Math.max(parsed.travellers ?? 2, 1), 9);
    const nights = Math.min(Math.max(parsed.nights ?? 3, 1), 30);

    return {
      destinations,
      originAirport: validateOriginAirport(parsed.originAirport),
      budgetPerPerson: parsed.budgetPerPerson ?? null,
      departureWindow: parsed.departureWindow ?? null,
      nights,
      interests: parsed.interests ?? [],
      travellers,
      preferences,
    };
  } catch {
    // If Haiku returns malformed JSON, return a sensible default
    return {
      destinations: ['lisbon', 'barcelona', 'amsterdam', 'rome'],
      originAirport: null,
      budgetPerPerson: null,
      departureWindow: null,
      nights: 3,
      interests: [],
      travellers: 2,
      preferences: [],
    };
  }
}
