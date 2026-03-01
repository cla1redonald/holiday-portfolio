'use client';

import { SessionProfile, UserPreference } from '@/types';

const STORAGE_KEY = 'roami_session_profile';

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

  // Accumulate travel style from preferences (non-dismissed only)
  for (const pref of preferences) {
    if (profile.dismissedPreferences.includes(pref.label)) continue;
    const key = pref.label.toLowerCase();
    profile.travelStyle[key] = (profile.travelStyle[key] ?? 0) + 1;
  }

  return persist(profile);
}

export function dismissPreference(tag: string): SessionProfile {
  const profile = getSessionProfile();

  if (!profile.dismissedPreferences.includes(tag)) {
    profile.dismissedPreferences.push(tag);
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
