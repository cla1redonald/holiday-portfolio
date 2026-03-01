'use client';

import { useSyncExternalStore } from 'react';
import type { Deal } from '@/types';

// ---------------------------------------------------------------------------
// Client-side deal store — holds the selected deal between pages
// Backed by sessionStorage so deals survive Next.js navigations
// ---------------------------------------------------------------------------

let selectedDeal: Deal | null = null;
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) listener();
}

// Hydrate from sessionStorage on first load
if (typeof window !== 'undefined') {
  try {
    const stored = sessionStorage.getItem('roami_selected_deal');
    if (stored) {
      selectedDeal = JSON.parse(stored);
    }
  } catch {
    // Ignore parse errors
  }
}

export function setSelectedDeal(deal: Deal) {
  selectedDeal = deal;
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem('roami_selected_deal', JSON.stringify(deal));
    } catch {
      // sessionStorage full or unavailable
    }
  }
  emitChange();
}

export function clearSelectedDeal() {
  selectedDeal = null;
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.removeItem('roami_selected_deal');
    } catch {
      // Ignore
    }
  }
  emitChange();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Deal | null {
  // Re-check sessionStorage if memory is empty (handles module re-init)
  if (!selectedDeal && typeof window !== 'undefined') {
    try {
      const stored = sessionStorage.getItem('roami_selected_deal');
      if (stored) {
        selectedDeal = JSON.parse(stored);
      }
    } catch {
      // Ignore
    }
  }
  return selectedDeal;
}

function getServerSnapshot(): Deal | null {
  return null;
}

export function useSelectedDeal(): Deal | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
