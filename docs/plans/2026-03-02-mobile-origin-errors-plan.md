# Mobile Responsiveness, Origin Selection, Error UX — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make Roami mobile-ready, let users pick departure airports, and show friendly error messages instead of silent failures.

**Architecture:** Three independent features that share no state. Origin selection adds a new component + modifies the search data flow (client → API → Duffel). Error UX adds error state to NlpSearchDemo. Mobile fixes are pure Tailwind class changes. All three can be tested independently.

**Tech Stack:** React 19, Next.js App Router, Tailwind CSS v4, Vitest, Playwright (screenshots only)

**Design doc:** `docs/plans/2026-03-02-mobile-origin-errors-design.md`

---

## Task 1: Error UX — SearchError Component

**Files:**
- Create: `src/components/demo/SearchError.tsx`
- Test: `src/lib/__tests__/search-error.test.tsx`

**Step 1: Write the failing test**

Create `src/lib/__tests__/search-error.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchError from '@/components/demo/SearchError';

describe('SearchError', () => {
  it('renders rate limit message with countdown', () => {
    render(<SearchError type="rate_limit" message="Too many requests" retryAfter={60} onRetry={() => {}} onDismiss={() => {}} />);
    expect(screen.getByText(/too fast/i)).toBeDefined();
  });

  it('renders server error with retry button', () => {
    const onRetry = vi.fn();
    render(<SearchError type="server_error" message="Search failed" onRetry={onRetry} onDismiss={() => {}} />);
    const btn = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(btn);
    expect(onRetry).toHaveBeenCalled();
  });

  it('renders network error', () => {
    render(<SearchError type="network" message="Connection failed" onRetry={() => {}} onDismiss={() => {}} />);
    expect(screen.getByText(/connect/i)).toBeDefined();
  });

  it('renders unavailable message without retry', () => {
    render(<SearchError type="unavailable" message="Service down" onRetry={() => {}} onDismiss={() => {}} />);
    expect(screen.queryByRole('button', { name: /try again/i })).toBeNull();
  });

  it('calls onDismiss when X clicked', () => {
    const onDismiss = vi.fn();
    render(<SearchError type="server_error" message="Error" onRetry={() => {}} onDismiss={onDismiss} />);
    const btn = screen.getByRole('button', { name: /dismiss/i });
    fireEvent.click(btn);
    expect(onDismiss).toHaveBeenCalled();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/search-error.test.tsx`
Expected: FAIL — module not found

**Step 3: Write minimal implementation**

Create `src/components/demo/SearchError.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';

interface SearchErrorProps {
  type: 'rate_limit' | 'server_error' | 'network' | 'unavailable';
  message: string;
  retryAfter?: number;
  onRetry: () => void;
  onDismiss: () => void;
}

const ERROR_CONFIG = {
  rate_limit: {
    title: "You're searching too fast",
    subtitle: 'Try again in a moment.',
    showRetry: false,
    showCountdown: true,
  },
  server_error: {
    title: 'Something went wrong with our search',
    subtitle: 'Try again or simplify your query.',
    showRetry: true,
    showCountdown: false,
  },
  network: {
    title: "Couldn't connect",
    subtitle: 'Check your internet and try again.',
    showRetry: true,
    showCountdown: false,
  },
  unavailable: {
    title: 'Search is temporarily unavailable',
    subtitle: "We're working on it — try again shortly.",
    showRetry: false,
    showCountdown: false,
  },
};

export default function SearchError({ type, retryAfter, onRetry, onDismiss }: SearchErrorProps) {
  const config = ERROR_CONFIG[type];
  const [countdown, setCountdown] = useState(retryAfter ?? 0);

  useEffect(() => {
    if (!config.showCountdown || countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onRetry();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [config.showCountdown, countdown, onRetry]);

  return (
    <div className="bg-muted border border-border rounded-2xl p-6 text-center animate-fade-in">
      {/* Warning icon */}
      <div className="flex justify-center mb-3">
        <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      </div>

      <h3 className="font-display font-semibold text-foreground text-lg mb-1">{config.title}</h3>
      <p className="text-secondary text-sm mb-4">{config.subtitle}</p>

      {config.showCountdown && countdown > 0 && (
        <p className="font-mono text-sm text-secondary mb-4">{countdown}s</p>
      )}

      {config.showRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-white font-display font-medium px-5 py-2 rounded-xl text-sm transition-all duration-200 cursor-pointer"
        >
          Try again
        </button>
      )}

      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 text-secondary/50 hover:text-secondary transition-colors cursor-pointer"
        aria-label="Dismiss error"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
```

Note: The outer div needs `relative` added for the absolute-positioned dismiss button: `className="relative bg-muted ..."`.

**Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/__tests__/search-error.test.tsx`
Expected: PASS (5 tests)

**Step 5: Commit**

```bash
git add src/components/demo/SearchError.tsx src/lib/__tests__/search-error.test.tsx
git commit -m "feat: add SearchError component for friendly error banners"
```

---

## Task 2: Error UX — Wire Into NlpSearchDemo

**Files:**
- Modify: `src/components/demo/NlpSearchDemo.tsx`

**Step 1: Add error state and import**

At the top of `NlpSearchDemo.tsx`, add the import:
```tsx
import SearchError from './SearchError';
```

Add error state alongside existing state (after line 37):
```tsx
const [error, setError] = useState<{ type: 'rate_limit' | 'server_error' | 'network' | 'unavailable'; message: string; retryAfter?: number } | null>(null);
```

**Step 2: Update searchViaApi to preserve HTTP status**

Replace the `searchViaApi` function (lines 15-29) so the caller can distinguish error types:

```tsx
class SearchApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function searchViaApi(query: string, sessionProfile: SessionProfile | null, signal?: AbortSignal): Promise<SearchResult> {
  const res = await fetch('/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, sessionProfile }),
    signal,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new SearchApiError(data.error ?? 'Search failed', res.status);
  }

  return res.json();
}
```

**Step 3: Update handleSearch catch block**

Replace the catch block (lines 80-82) with error-type detection:

```tsx
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      if (abortControllerRef.current !== controller) return;
      console.error('Search error:', err);

      if (err instanceof SearchApiError) {
        if (err.status === 429) {
          setError({ type: 'rate_limit', message: err.message, retryAfter: 60 });
        } else if (err.status === 503) {
          setError({ type: 'unavailable', message: err.message });
        } else {
          setError({ type: 'server_error', message: err.message });
        }
      } else {
        setError({ type: 'network', message: 'Couldn\'t connect — check your internet and try again.' });
      }
    }
```

**Step 4: Clear error on new search**

Add `setError(null);` at the top of `handleSearch`, after `setLoading(true);` (line 57):
```tsx
    setLoading(true);
    setError(null);
    setHasSearched(true);
```

**Step 5: Add SearchError to the JSX**

Add an error display block between the loading skeleton and the results section. Insert after the loading block (after line 192) and before the results block (line 195):

```tsx
        {/* Error state */}
        {!loading && error && (
          <div className="pb-16">
            <SearchError
              type={error.type}
              message={error.message}
              retryAfter={error.retryAfter}
              onRetry={() => {
                setError(null);
                handleSearch(query);
              }}
              onDismiss={() => setError(null)}
            />
          </div>
        )}
```

**Step 6: Update empty state condition**

The "No deals found" empty state (line 227) should only show when there's no error. Change:
```tsx
{!loading && hasSearched && deals.length === 0 && (
```
to:
```tsx
{!loading && hasSearched && deals.length === 0 && !error && (
```

**Step 7: Run typecheck and tests**

Run: `npx tsc --noEmit && npx vitest run`
Expected: All pass

**Step 8: Commit**

```bash
git add src/components/demo/NlpSearchDemo.tsx
git commit -m "feat: wire error UX into search flow with type-specific banners"
```

---

## Task 3: Origin Selector — OriginSelector Component

**Files:**
- Create: `src/components/demo/OriginSelector.tsx`
- Test: `src/lib/__tests__/origin-selector.test.tsx`

**Step 1: Write the failing test**

Create `src/lib/__tests__/origin-selector.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import OriginSelector from '@/components/demo/OriginSelector';

describe('OriginSelector', () => {
  it('renders all 9 UK airports', () => {
    render(<OriginSelector selected={['LHR']} onChange={() => {}} />);
    expect(screen.getByText('LHR')).toBeDefined();
    expect(screen.getByText('LGW')).toBeDefined();
    expect(screen.getByText('MAN')).toBeDefined();
    expect(screen.getByText('EDI')).toBeDefined();
  });

  it('highlights selected airports', () => {
    render(<OriginSelector selected={['LHR', 'MAN']} onChange={() => {}} />);
    const lhr = screen.getByText('LHR').closest('button');
    const lgw = screen.getByText('LGW').closest('button');
    expect(lhr?.className).toContain('bg-accent');
    expect(lgw?.className).not.toContain('bg-accent');
  });

  it('toggles airport on click', () => {
    const onChange = vi.fn();
    render(<OriginSelector selected={['LHR']} onChange={onChange} />);
    fireEvent.click(screen.getByText('MAN'));
    expect(onChange).toHaveBeenCalledWith(['LHR', 'MAN']);
  });

  it('deselects airport on click', () => {
    const onChange = vi.fn();
    render(<OriginSelector selected={['LHR', 'MAN']} onChange={onChange} />);
    fireEvent.click(screen.getByText('MAN'));
    expect(onChange).toHaveBeenCalledWith(['LHR']);
  });

  it('prevents deselecting the last airport', () => {
    const onChange = vi.fn();
    render(<OriginSelector selected={['LHR']} onChange={onChange} />);
    fireEvent.click(screen.getByText('LHR'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/origin-selector.test.tsx`
Expected: FAIL — module not found

**Step 3: Write minimal implementation**

Create `src/components/demo/OriginSelector.tsx`:

```tsx
'use client';

const UK_AIRPORTS = [
  { code: 'LHR', name: 'London Heathrow' },
  { code: 'LGW', name: 'London Gatwick' },
  { code: 'MAN', name: 'Manchester' },
  { code: 'STN', name: 'London Stansted' },
  { code: 'EDI', name: 'Edinburgh' },
  { code: 'BHX', name: 'Birmingham' },
  { code: 'BRS', name: 'Bristol' },
  { code: 'GLA', name: 'Glasgow' },
  { code: 'LTN', name: 'London Luton' },
] as const;

interface OriginSelectorProps {
  selected: string[];
  onChange: (origins: string[]) => void;
}

export default function OriginSelector({ selected, onChange }: OriginSelectorProps) {
  const toggle = (code: string) => {
    if (selected.includes(code)) {
      if (selected.length <= 1) return; // Must keep at least one
      onChange(selected.filter((c) => c !== code));
    } else {
      onChange([...selected, code]);
    }
  };

  return (
    <div className="mt-3">
      <p className="text-sm text-secondary mb-2">Departing from:</p>
      <div className="flex flex-wrap gap-2">
        {UK_AIRPORTS.map(({ code, name }) => {
          const isSelected = selected.includes(code);
          return (
            <button
              key={code}
              onClick={() => toggle(code)}
              title={name}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-accent/10 text-accent border border-accent/20'
                  : 'bg-muted text-secondary border border-border hover:border-accent/30 hover:text-foreground'
              }`}
            >
              {code}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/__tests__/origin-selector.test.tsx`
Expected: PASS (5 tests)

**Step 5: Commit**

```bash
git add src/components/demo/OriginSelector.tsx src/lib/__tests__/origin-selector.test.tsx
git commit -m "feat: add OriginSelector component with multi-select airport pills"
```

---

## Task 4: Origin Selector — Wire Into Search Flow

**Files:**
- Modify: `src/components/demo/NlpSearchDemo.tsx`
- Modify: `src/lib/session-preferences.ts`

**Step 1: Add origin persistence to session-preferences.ts**

Add at the end of `src/lib/session-preferences.ts`:

```ts
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
```

**Step 2: Wire into NlpSearchDemo**

Import the new functions and component at the top of `NlpSearchDemo.tsx`:
```tsx
import { getSessionProfile, updateSessionProfile, dismissPreference, getSelectedOrigins, saveSelectedOrigins } from '@/lib/session-preferences';
import OriginSelector from './OriginSelector';
```

Add state (after the other useState calls):
```tsx
const [selectedOrigins, setSelectedOrigins] = useState<string[]>(['LHR']);
```

Add initialisation in the existing `useEffect` that loads the session profile:
```tsx
useEffect(() => {
  setSessionProfile(getSessionProfile());
  setSelectedOrigins(getSelectedOrigins());
}, []);
```

Add a handler:
```tsx
const handleOriginsChange = (origins: string[]) => {
  setSelectedOrigins(origins);
  saveSelectedOrigins(origins);
};
```

**Step 3: Pass origins to API call**

In `searchViaApi`, add `origins` to the request body. Update the function signature:

```tsx
async function searchViaApi(query: string, sessionProfile: SessionProfile | null, origins?: string[], signal?: AbortSignal): Promise<SearchResult> {
  const res = await fetch('/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, sessionProfile, origins }),
    signal,
  });
  // ... rest unchanged
}
```

Update the call in `handleSearch`:
```tsx
const result = await searchViaApi(q, sessionProfile, selectedOrigins, controller.signal);
```

**Step 4: Add OriginSelector to JSX**

Inside the search `div` (the `max-w-2xl` block), add the OriginSelector after SearchInput and before SuggestedQueries:

```tsx
<SearchInput
  value={query}
  onChange={setQuery}
  onSearch={handleSearch}
  loading={loading}
/>
<OriginSelector
  selected={selectedOrigins}
  onChange={handleOriginsChange}
/>
{!hasSearched && (
  <SuggestedQueries onSelect={handleSuggestedQuery} />
)}
```

**Step 5: Commit**

```bash
git add src/components/demo/NlpSearchDemo.tsx src/lib/session-preferences.ts
git commit -m "feat: wire origin selector into search flow with session persistence"
```

---

## Task 5: Origin Selector — Backend Multi-Origin Support

**Files:**
- Modify: `src/app/api/search/route.ts`
- Modify: `src/lib/duffel-client.ts`
- Modify: `src/lib/deal-builder.ts`

**Step 1: Accept origins in route.ts**

After parsing `body.query` (around line 121), add:

```ts
const origins: string[] | undefined = Array.isArray(body.origins)
  ? body.origins.filter((o: unknown): o is string => typeof o === 'string').slice(0, 9)
  : undefined;
```

Update the `searchFlights` call (line 215) to pass origins:
```ts
searchFlights({
  destinations,
  origins: origins ?? (intent.originAirport ? [intent.originAirport] : undefined),
  departureDate,
  returnDate,
  travellers: intent.travellers,
  resolvedDestinations,
}),
```

Update the `buildDeals` call (line 274) similarly:
```ts
const deals = await buildDeals({
  flights,
  stays,
  interests: intent.interests,
  travellers: intent.travellers,
  budgetPerPerson: intent.budgetPerPerson,
  origins: origins ?? (intent.originAirport ? [intent.originAirport] : undefined),
  sessionProfile,
  similarityScores: similarityMap,
  destinationTags,
  resolvedDestinations: resolvedMap,
});
```

**Step 2: Update duffel-client.ts searchFlights**

Change the `params` type (line 173-180) to accept `origins`:

```ts
export async function searchFlights(params: {
  destinations: string[];
  origins?: string[];
  departureDate: string;
  returnDate: string;
  travellers: number;
  resolvedDestinations?: ResolvedDestination[];
}): Promise<FlightResult[]> {
```

Replace the single-origin logic (line 182) with multi-origin fan-out:

```ts
const duffel = getDuffel();
const originCodes = params.origins?.length ? params.origins : ['LHR'];
const results: FlightResult[] = [];
```

The existing `searches` array maps over `destinations`. We need to map over `origins × destinations`. Replace the searches block (lines 197-359):

```ts
// Search flights for each origin × destination pair in parallel (capped)
const pairs: Array<{ origin: string; dest: string }> = [];
for (const origin of originCodes) {
  for (const dest of params.destinations.slice(0, 5)) {
    pairs.push({ origin, dest });
  }
}
// Cap total parallel searches to avoid Duffel rate limits
const cappedPairs = pairs.slice(0, 15);

const searches = cappedPairs.map(({ origin, dest }) => withTimeout((async () => {
  // ... existing per-destination logic, but use `origin` variable instead of the outer `origin` const
  // The body of the existing async function stays the same,
  // just replace every reference to the old `origin` const with the `origin` parameter from the pair
```

Key changes inside the per-search function:
- Line 207: `origin: origin,` (already uses variable)
- Line 213: `destination: origin,` stays as `origin`
- Add `origin` field to the returned `FlightResult` — or reuse the `destination` field pattern

Actually, the simplest approach: add `originAirport` to `FlightResult` so deal-builder knows which origin each flight came from.

Add to `FlightResult` interface (after line 157):
```ts
originAirport: string;
```

In the return object (around line 328), add:
```ts
originAirport: origin,
```

**Step 3: Update deal-builder.ts**

Change `BundleParams` (line 14-26) — replace `origin?: string` with `origins?: string[]`:

```ts
interface BundleParams {
  flights: FlightResult[];
  stays: StayResult[];
  interests: string[];
  travellers: number;
  budgetPerPerson: number | null;
  origins?: string[];
  // ... rest unchanged
}
```

Update route key generation (line 203 and lines 210-213). Each flight now carries its own `originAirport`:

```ts
// Remove: const originCode = origin ?? 'LHR';
// Replace route key generation with per-flight origin:
const routeKeys = flights.map((flight) => {
  const resolved = resolvedDestinations?.[flight.destination];
  const iata = resolved?.iata ?? flight.destination.toUpperCase();
  const originCode = flight.originAirport ?? 'LHR';
  return `${originCode}-${iata}`;
});
```

Also update the destructuring at line 199 — remove `origin` and add `origins` (though `origins` isn't used directly since each flight carries its own origin now).

**Step 4: Run typecheck and tests**

Run: `npx tsc --noEmit && npx vitest run`
Expected: All pass

**Step 5: Commit**

```bash
git add src/app/api/search/route.ts src/lib/duffel-client.ts src/lib/deal-builder.ts
git commit -m "feat: multi-origin flight search — fan out Duffel searches per selected airport"
```

---

## Task 6: Mobile Responsiveness — Playwright Audit

**Files:**
- No code changes — just screenshots and issue cataloguing

**Step 1: Install Playwright if not already**

Run: `npx playwright install chromium`

**Step 2: Start dev server**

Run: `npm run dev` (in background)

**Step 3: Screenshot all pages at 3 breakpoints**

Use Playwright MCP to navigate to `http://localhost:3000` at viewport widths 375px, 768px, and 1280px. Take screenshots of:
- Home page (pre-search)
- Home page (after a search — type a query and submit)
- `/deal/[id]` (click into a deal)
- `/deal/[id]/book` (click Book This Deal)

**Step 4: Catalogue all issues found**

Review screenshots for:
- Text overflow / truncation
- Elements too small to tap (< 44px)
- Horizontal scroll / overflow
- Layout breakage
- Padding / spacing issues
- Image aspect ratio problems

**Step 5: No commit — this task produces a list of issues for the next tasks**

---

## Task 7: Mobile Responsiveness — DealCard Fixes

**Files:**
- Modify: `src/components/demo/DealCard.tsx`

**Step 1: Add responsive image height**

Change (line 91):
```tsx
<div className="relative h-48 overflow-hidden">
```
to:
```tsx
<div className="relative h-40 sm:h-48 overflow-hidden">
```

**Step 2: Add responsive padding**

Change (line 145):
```tsx
<div className="p-4 flex flex-col flex-1 gap-2.5">
```
to:
```tsx
<div className="p-3.5 sm:p-4 flex flex-col flex-1 gap-2">
```

**Step 3: Add responsive price text**

Change (line 214):
```tsx
<span className="font-mono text-2xl font-bold text-accent">
```
to:
```tsx
<span className="font-mono text-xl sm:text-2xl font-bold text-accent">
```

**Step 4: Verify CTA touch target**

The "View Deal" button (line 274) has `py-2.5` which gives ~40px height. Change to ensure 44px minimum:
```tsx
<button
  onClick={handleViewDeal}
  className="w-full bg-accent hover:bg-accent/90 text-white font-display font-medium py-3 sm:py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer mt-1"
>
```

**Step 5: Run typecheck**

Run: `npx tsc --noEmit`
Expected: PASS

**Step 6: Commit**

```bash
git add src/components/demo/DealCard.tsx
git commit -m "fix: responsive DealCard — adaptive image height, padding, price text, touch targets"
```

---

## Task 8: Mobile Responsiveness — DealDetail + Book Page Fixes

**Files:**
- Modify: `src/components/deal/DealDetail.tsx`
- Modify: `src/app/deal/[id]/book/page.tsx`
- Modify: `src/components/booking/ContactSection.tsx`

**Step 1: DealDetail — fix hero overlay text on small screens**

In `DealDetail.tsx`, the hero text overlay (line 40-48) has `left-6 right-6` which may be tight on 375px. Change:
```tsx
<div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
```

And the heading (line 43):
```tsx
<h1 className="font-display font-bold text-white text-2xl sm:text-3xl md:text-4xl drop-shadow-sm">
```

**Step 2: DealDetail — price intelligence grid**

The 2-column grid at line 96 could be tight on small screens. Change:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
```

**Step 3: Book page — responsive padding**

In `book/page.tsx` (line 47):
```tsx
<div className="max-w-lg mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
```

**Step 4: ContactSection — full-width CTAs on mobile**

The CTAs in `ContactSection.tsx` (lines 105-126) are already `w-full`, which is good. Ensure `py-3.5` gives adequate touch target — it does (~44px). No change needed.

**Step 5: ContactSection — deal summary image on small screens**

The image at line 44 is `w-20 h-20`. On very small screens the text gets cramped. Change:
```tsx
<div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0">
```

**Step 6: Run typecheck**

Run: `npx tsc --noEmit`
Expected: PASS

**Step 7: Commit**

```bash
git add src/components/deal/DealDetail.tsx src/app/deal/[id]/book/page.tsx src/components/booking/ContactSection.tsx
git commit -m "fix: mobile responsiveness for deal detail and booking pages"
```

---

## Task 9: Mobile Responsiveness — Visual Verification

**Files:**
- No code changes

**Step 1: Re-screenshot all pages at 375px, 768px, 1280px**

Use Playwright to re-take screenshots of all pages after the fixes.

**Step 2: Compare before/after**

Verify:
- DealCards look good at all widths
- DealDetail hero text doesn't overflow
- Price intelligence grid stacks on mobile
- Book page has adequate padding
- All touch targets are 44px+
- No horizontal scroll on any page

**Step 3: Fix any remaining issues found**

If additional issues are spotted, fix them and commit.

---

## Task 10: Final Typecheck, Test Suite, Build

**Files:**
- No code changes expected

**Step 1: Run full test suite**

Run: `npx vitest run`
Expected: All tests pass (115 existing + new SearchError + OriginSelector tests)

**Step 2: Run typecheck**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 3: Run production build**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit any final fixes**

If anything needed fixing, commit it.

---

## Summary of Deliverables

| Feature | New Files | Modified Files |
|---------|-----------|----------------|
| Error UX | `SearchError.tsx`, `search-error.test.tsx` | `NlpSearchDemo.tsx` |
| Origin Selector | `OriginSelector.tsx`, `origin-selector.test.tsx` | `NlpSearchDemo.tsx`, `session-preferences.ts`, `route.ts`, `duffel-client.ts`, `deal-builder.ts` |
| Mobile Responsiveness | None | `DealCard.tsx`, `DealDetail.tsx`, `book/page.tsx`, `ContactSection.tsx` |
