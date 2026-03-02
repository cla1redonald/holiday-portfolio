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
 * Returns the label lowercased if no canonical tags match.
 */
export function normalizeToTags(label: string): string[] {
  const lower = label.toLowerCase();
  const matched = CANONICAL_TAGS.filter((tag) => lower.includes(tag));
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

export function getSessionProfile(): SessionProfile {
  if (typeof window === 'undefined') return createDefaultProfile();

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as SessionProfile;
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

export function trackBreakdownClick(): void {
  const profile = getSessionProfile();
  profile.breakdownClicks = (profile.breakdownClicks ?? 0) + 1;
  persist(profile);
}

export function trackProInterest(email?: string): void {
  const profile = getSessionProfile();
  profile.proInterestClicked = true;
  if (email) profile.proInterestEmail = email;
  persist(profile);
}

export function resetSession(): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}

const ORIGINS_KEY = 'roami_origins';
const DEFAULT_ORIGINS = ['LHR'];

export function getSelectedOrigins(): string[] {
  if (typeof window === 'undefined') return DEFAULT_ORIGINS;
  try {
    const raw = sessionStorage.getItem(ORIGINS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return DEFAULT_ORIGINS;
}

export function saveSelectedOrigins(origins: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(ORIGINS_KEY, JSON.stringify(origins));
  } catch {}
}
