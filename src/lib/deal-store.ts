'use client';

import { useSyncExternalStore } from 'react';
import type { Deal } from '@/types';

// ---------------------------------------------------------------------------
// Client-side deal store — holds the selected deal between pages
// ---------------------------------------------------------------------------

let selectedDeal: Deal | null = null;
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) listener();
}

export function setSelectedDeal(deal: Deal) {
  selectedDeal = deal;
  emitChange();
}

export function clearSelectedDeal() {
  selectedDeal = null;
  emitChange();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Deal | null {
  return selectedDeal;
}

function getServerSnapshot(): Deal | null {
  return null;
}

export function useSelectedDeal(): Deal | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
