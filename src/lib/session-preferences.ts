'use client';

import { SessionProfile, UserPreference } from '@/types';

const STORAGE_KEY = 'roami_session_profile';

// Canonical tag vocabulary used in deal-builder scoring
const CANONICAL_TAGS = [
  'food', 'culture', 'nightlife', 'beach', 'budget', 'architecture',
  'art', 'historic', 'romantic', 'shopping', 'luxury',
];

/**
 * Extract canonical tags from a display label (e.g. "Great food scene" → ["food"]).
 * Uses word-boundary matching to avoid false positives (e.g. "party" matching "art").
 * Returns the label lowercased if no canonical tags match.
 */
export function normalizeToTags(label: string): string[] {
  const lower = label.toLowerCase();
  const matched = CANONICAL_TAGS.filter((tag) => new RegExp(`\\b${tag}\\b`).test(lower));
  return matched.length > 0 ? matched : [lower];
}

function generateId(): string {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function createDefaultProfile(): SessionProfile {
  return {
    sessionId: generateId(),
    searchCount: 0,
    interests: {},
    destinations: {},
    budgetSignals: [],
    travelStyle: {},
    dismissedPreferences: [],
    createdAt: new Date().toISOString(),
    lastSearchAt: new Date().toISOString(),
  };
}

function isNumberRecord(val: unknown): val is Record<string, number> {
  if (!val || typeof val !== 'object' || Array.isArray(val)) return false;
  return Object.values(val).every((v) => typeof v === 'number');
}

/** Validate and coerce parsed data to a safe SessionProfile, falling back to defaults. */
function validateProfile(data: unknown): SessionProfile {
  if (!data || typeof data !== 'object') return createDefaultProfile();
  const p = data as Record<string, unknown>;
  const defaults = createDefaultProfile();
  return {
    sessionId: typeof p.sessionId === 'string' ? p.sessionId : defaults.sessionId,
    searchCount: typeof p.searchCount === 'number' ? p.searchCount : 0,
    interests: isNumberRecord(p.interests) ? p.interests : {},
    destinations: isNumberRecord(p.destinations) ? p.destinations : {},
    budgetSignals: Array.isArray(p.budgetSignals)
      ? p.budgetSignals.filter((n): n is number => typeof n === 'number').slice(0, 50)
      : [],
    travelStyle: isNumberRecord(p.travelStyle) ? p.travelStyle : {},
    dismissedPreferences: Array.isArray(p.dismissedPreferences)
      ? p.dismissedPreferences.filter((s): s is string => typeof s === 'string').slice(0, 100)
      : [],
    createdAt: typeof p.createdAt === 'string' ? p.createdAt : defaults.createdAt,
    lastSearchAt: typeof p.lastSearchAt === 'string' ? p.lastSearchAt : defaults.lastSearchAt,
  };
}

export function getSessionProfile(): SessionProfile {
  if (typeof window === 'undefined') return createDefaultProfile();

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      return validateProfile(JSON.parse(raw));
    }
  } catch {
    // Corrupted data — start fresh
  }

  const profile = createDefaultProfile();
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  return profile;
}

function persist(profile: SessionProfile): SessionProfile {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // sessionStorage full or unavailable — continue with in-memory profile
  }
  return profile;
}

export function updateSessionProfile(
  intent: {
    destinations: string[];
    interests: string[];
    budgetPerPerson: number | null;
    travellers: number;
  },
  preferences: UserPreference[],
): SessionProfile {
  const profile = getSessionProfile();

  profile.searchCount += 1;
  profile.lastSearchAt = new Date().toISOString();

  // Accumulate destinations
  for (const dest of intent.destinations) {
    const key = dest.toLowerCase();
    profile.destinations[key] = (profile.destinations[key] ?? 0) + 1;
  }

  // Accumulate interests
  for (const interest of intent.interests) {
    const key = interest.toLowerCase();
    profile.interests[key] = (profile.interests[key] ?? 0) + 1;
  }

  // Track budget signals
  if (intent.budgetPerPerson != null) {
    profile.budgetSignals.push(intent.budgetPerPerson);
  }

  // Accumulate travel style from preferences using canonical tags (non-dismissed only)
  for (const pref of preferences) {
    const tags = normalizeToTags(pref.label);
    if (tags.some((t) => profile.dismissedPreferences.includes(t))) continue;
    for (const tag of tags) {
      profile.travelStyle[tag] = (profile.travelStyle[tag] ?? 0) + 1;
    }
  }

  return persist(profile);
}

export function dismissPreference(tag: string): SessionProfile {
  const profile = getSessionProfile();

  // Store canonical tags so they match deal-builder's scoring vocabulary
  const tags = normalizeToTags(tag);
  for (const t of tags) {
    if (!profile.dismissedPreferences.includes(t)) {
      profile.dismissedPreferences.push(t);
    }
  }

  return persist(profile);
}

export function resetSession(): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}
