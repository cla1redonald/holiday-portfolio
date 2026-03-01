/**
 * Auto-generate destination embeddings for all popular European cities
 * accessible via Duffel. Uses GPT-4o-mini to write descriptions, then
 * text-embedding-3-small to embed them.
 *
 * Usage: npx tsx scripts/auto-seed-destinations.ts
 *
 * Skips destinations that already exist in the database (won't overwrite curated ones).
 */

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { Duffel } from '@duffel/api';
import * as fs from 'fs';
import * as path from 'path';

// Load .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx);
    const value = trimmed.slice(eqIdx + 1);
    if (!process.env[key]) process.env[key] = value;
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const openaiKey = process.env.OPENAI_API_KEY!;
const duffelToken = process.env.DUFFEL_API_TOKEN!;

if (!supabaseUrl || !supabaseKey || !openaiKey || !duffelToken) {
  console.error('Missing required env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const openai = new OpenAI({ apiKey: openaiKey });
const duffel = new Duffel({ token: duffelToken });

// European + Mediterranean + North African countries reachable for city breaks from the UK
const COUNTRIES = [
  'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan',
  'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria',
  'Croatia', 'Cyprus', 'Czech Republic', 'Czechia',
  'Denmark', 'Estonia', 'Finland', 'France',
  'Georgia', 'Germany', 'Greece',
  'Hungary', 'Iceland', 'Ireland', 'Israel', 'Italy',
  'Jordan', 'Kosovo', 'Latvia', 'Lebanon', 'Lithuania', 'Luxembourg',
  'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Morocco',
  'Netherlands', 'North Macedonia', 'Norway',
  'Poland', 'Portugal', 'Romania', 'Russia',
  'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland',
  'Tunisia', 'Turkey', 'Ukraine', 'United Kingdom',
  'Egypt',
];

// Major city search terms to query Duffel Places API
const CITY_QUERIES = [
  // Already-covered countries but smaller cities
  'Alicante', 'Almeria', 'Cadiz', 'Girona', 'Ibiza', 'Las Palmas', 'Menorca',
  'Palma', 'Santander', 'Santiago de Compostela', 'Tenerife', 'Vigo', 'Zaragoza',
  // France
  'Ajaccio', 'Biarritz', 'Calvi', 'Carcassonne', 'Clermont-Ferrand', 'Corsica',
  'Lille', 'Montpellier', 'Nantes', 'Perpignan', 'Rennes', 'Strasbourg',
  // Italy
  'Amalfi', 'Bari', 'Bergamo', 'Brindisi', 'Genoa', 'Lecce', 'Olbia',
  'Perugia', 'Pisa', 'Rimini', 'Sardinia', 'Siena', 'Trapani', 'Trieste', 'Turin', 'Verona',
  // Germany
  'Bremen', 'Dresden', 'Dusseldorf', 'Frankfurt', 'Hannover', 'Leipzig',
  'Nuremberg', 'Stuttgart',
  // Greece
  'Chania', 'Kefalonia', 'Kos', 'Lefkada', 'Mykonos', 'Naxos', 'Paros',
  'Patras', 'Skiathos', 'Volos', 'Zakynthos',
  // Portugal
  'Azores', 'Braga', 'Coimbra', 'Ponta Delgada',
  // Scandinavia
  'Aarhus', 'Gothenburg', 'Malmo', 'Stavanger', 'Tromso', 'Turku',
  // Eastern Europe
  'Brasov', 'Cluj-Napoca', 'Constanta', 'Debrecen', 'Kosice', 'Lviv',
  'Ohrid', 'Plovdiv', 'Poznan', 'Sibiu', 'Timisoara', 'Varna', 'Wroclaw',
  // Balkans
  'Bar', 'Budva', 'Durres', 'Pula', 'Rovinj', 'Shkoder', 'Skopje',
  // Turkey
  'Bodrum', 'Cappadocia', 'Dalaman', 'Fethiye', 'Izmir', 'Trabzon',
  // North Africa & Middle East
  'Agadir', 'Casablanca', 'Essaouira', 'Fez', 'Tangier', 'Tunis',
  'Amman', 'Beirut', 'Tel Aviv',
  // Baltics extra
  'Kaunas', 'Tartu',
  // UK & Ireland
  'Belfast', 'Bristol', 'Cardiff', 'Cork', 'Galway', 'Inverness',
  'Liverpool', 'Manchester', 'Newcastle', 'York',
  // Switzerland
  'Basel', 'Bern', 'Interlaken', 'Lausanne', 'Lucerne',
  // Austria
  'Graz', 'Innsbruck',
  // Other
  'Batumi', 'Dubrovnik', 'Gibraltar', 'Larnaca', 'Limassol', 'Nicosia',
  'Paphos', 'Tbilisi', 'Yerevan',
];

interface CityCandidate {
  name: string;
  iata: string;
  country: string;
  latitude: number;
  longitude: number;
  slug: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function discoverCities(): Promise<CityCandidate[]> {
  const seen = new Set<string>();
  const candidates: CityCandidate[] = [];

  console.log(`Querying Duffel Places API for ${CITY_QUERIES.length} cities...`);

  for (const query of CITY_QUERIES) {
    try {
      const response = await duffel.suggestions.list({ query });
      const places = response.data ?? [];

      for (const place of places) {
        const p = place as unknown as {
          iata_code?: string;
          iata_city_code?: string;
          name?: string;
          city_name?: string;
          city?: { name?: string };
          latitude?: number;
          longitude?: number;
          type?: string;
        };

        const iata = p.iata_city_code ?? p.iata_code;
        if (!iata || seen.has(iata)) continue;

        const name = p.city_name ?? p.city?.name ?? p.name ?? query;
        const slug = slugify(name);

        if (seen.has(slug)) continue;
        seen.add(iata);
        seen.add(slug);

        candidates.push({
          name,
          iata,
          country: '', // We'll fill this from the description
          latitude: p.latitude ?? 0,
          longitude: p.longitude ?? 0,
          slug,
        });
      }
    } catch (err) {
      console.error(`  Failed to query "${query}":`, (err as Error).message);
    }
  }

  console.log(`Discovered ${candidates.length} unique cities from Duffel\n`);
  return candidates;
}

async function generateDescription(city: CityCandidate): Promise<{ description: string; country: string; tags: string[]; seedPrice: number } | null> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.7,
      max_tokens: 400,
      messages: [
        {
          role: 'system',
          content: `You write 100-150 word destination descriptions for a UK travel search engine.
Focus on: what makes this place special for a city break, food scene, cultural highlights, atmosphere, and value.
Write in a warm, knowledgeable, opinionated style. No generic filler.
Respond in JSON: {"description": "...", "country": "...", "tags": ["food","culture",...], "seed_price_gbp": 300}
Tags must be from: food, culture, historic, architecture, art, beach, nightlife, budget, luxury, romantic, nature, adventure, shopping, design, unique, hiking, skiing.
seed_price_gbp = estimated per-person cost for a 3-night trip from the UK (flights + hotel) in GBP.`,
        },
        {
          role: 'user',
          content: `Write a description for ${city.name} (IATA: ${city.iata}).`,
        },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return null;

    // Extract JSON from the response (handle markdown code blocks)
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      description: parsed.description,
      country: parsed.country ?? '',
      tags: parsed.tags ?? [],
      seedPrice: parsed.seed_price_gbp ?? null,
    };
  } catch (err) {
    console.error(`  GPT failed for ${city.name}:`, (err as Error).message);
    return null;
  }
}

async function main() {
  // 1. Get existing slugs so we don't overwrite curated descriptions
  const { data: existing } = await supabase.from('destinations').select('slug');
  const existingSlugs = new Set((existing ?? []).map((d: { slug: string }) => d.slug));
  console.log(`${existingSlugs.size} destinations already in database\n`);

  // 2. Discover cities from Duffel
  const candidates = await discoverCities();

  // 3. Filter out already-existing
  const newCities = candidates.filter(c => !existingSlugs.has(c.slug));
  console.log(`${newCities.length} new cities to process (skipping ${candidates.length - newCities.length} already in DB)\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const city of newCities) {
    process.stdout.write(`  ${city.name} (${city.iata}): generating description... `);

    // Generate description
    const generated = await generateDescription(city);
    if (!generated) {
      console.log('SKIP (GPT failed)');
      errorCount++;
      continue;
    }

    // Generate embedding
    process.stdout.write('embedding... ');
    try {
      const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: generated.description,
      });
      const embedding = embeddingResponse.data[0].embedding;

      // Upsert to Supabase
      const { error } = await supabase.from('destinations').upsert(
        {
          slug: city.slug,
          name: city.name,
          country: generated.country || city.country,
          iata: city.iata,
          latitude: city.latitude,
          longitude: city.longitude,
          image_url: `https://source.unsplash.com/800x600/?${encodeURIComponent(city.name + ' city')}`,
          description: generated.description,
          tags: generated.tags,
          seed_price_gbp: generated.seedPrice,
          embedding: JSON.stringify(embedding),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'slug' }
      );

      if (error) {
        console.log(`ERROR: ${error.message}`);
        errorCount++;
      } else {
        console.log('done');
        successCount++;
      }
    } catch (err) {
      console.log(`ERROR: ${(err as Error).message}`);
      errorCount++;
    }
  }

  console.log(`\nComplete: ${successCount} new destinations added, ${errorCount} errors`);
  console.log(`Total destinations in database: ${existingSlugs.size + successCount}`);
}

main().catch((err) => {
  console.error('Script failed:', err);
  process.exit(1);
});
