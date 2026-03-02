# Design: Mobile Responsiveness, Origin Selection, Error UX

**Date:** 2026-03-02
**Status:** Approved

---

## Feature 1: Mobile Responsiveness — Full Audit + Fix

### Approach

Use Playwright to screenshot every page at 3 breakpoints (375px iPhone SE, 768px iPad, 1280px desktop), catalogue all issues, then fix systematically.

### Known Issues

1. **DealCard** — no responsive classes. Fixed `h-48` image, fixed text sizes, fixed padding. Needs responsive image height, text scaling, and padding adjustments.
2. **BookingForm / PassengerForm** — unconditional `grid-cols-2` breaks on narrow screens. Should be `grid-cols-1 sm:grid-cols-2`.
3. **DealDetail** — verify `lg:grid-cols-5` stacks correctly on mobile. Check hero image height, text overflow on long destination names.
4. **Touch targets** — verify all interactive elements meet 44px minimum tap target.
5. **Book page** — `max-w-lg` is fine but verify contact CTAs are full-width on mobile.

### Process

1. Run Playwright at 375px, 768px, 1280px on `/`, `/deal/[id]`, `/deal/[id]/book`
2. Catalogue all visual issues
3. Fix each issue with mobile-first Tailwind classes
4. Re-screenshot to verify

---

## Feature 2: Origin Airport Multi-Select

### UX

Toggleable airport pill bar below the search input. All 9 UK airports shown as pills:

```
Departing from:
[LHR ✓] [LGW] [MAN] [STN] [EDI] [BHX] [BRS] [GLA] [LTN]
```

- LHR selected by default
- Tap to toggle on/off
- At least one must remain selected
- Pills wrap naturally with `flex-wrap` on mobile
- Persisted in `sessionStorage` via `session-preferences.ts`

### Styling (per style guide)

- Selected pill: `bg-accent/10 text-accent border border-accent/20 rounded-full` (coral badge style)
- Unselected pill: `bg-muted text-secondary border border-border rounded-full` (neutral badge style)
- Label "Departing from:" in Inter 500, `text-secondary`, `text-sm`
- Transition: `200ms ease` on background/border colour change

### Airport Data

```ts
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
```

Pills show the 3-letter code. Full name shown on hover (tooltip) on desktop, not needed on mobile.

### Data Flow

1. `NlpSearchDemo` holds `selectedOrigins: string[]` state (default `['LHR']`)
2. Passed to new `OriginSelector` component
3. On search, sent to `/api/search` as `origins: string[]` in the request body
4. `route.ts` passes `origins` to `searchFlights()` and `buildDeals()`
5. `duffel-client.ts` fans out parallel Duffel searches per origin, merges results
6. `deal-builder.ts` uses actual origin per flight for route key (`MAN-LIS` not `LHR-LIS`)
7. NLP override: if user says "from Manchester", that origin is used for that search regardless of pill selection

### Persistence

- Save to `sessionStorage` key `roami_origins` (array of codes)
- Load on mount, fall back to `['LHR']`
- Integrate with existing `session-preferences.ts` pattern

---

## Feature 3: Error UX — Friendly Actionable Banners

### Error States

| HTTP Status | Error Type | User Message | Action |
|-------------|-----------|-------------|--------|
| 429 | Rate limit | "You're searching too fast — try again in a minute." | Auto-countdown timer, auto-retry when timer expires |
| 500 | Server error | "Something went wrong with our search. Try again or simplify your query." | Retry button |
| 503 (fallback) | Service down | "Search is temporarily unavailable — we're working on it." | No action (come back later) |
| Network error | Offline/timeout | "Couldn't connect — check your internet and try again." | Retry button |

### Component: `SearchError`

Inline banner that replaces the results area (not a toast — too easy to miss).

```
┌─────────────────────────────────────────────────────┐
│  ⚠  Something went wrong with our search.           │
│     Try again or simplify your query.               │
│                                                     │
│     [Try again]                                     │
└─────────────────────────────────────────────────────┘
```

### Styling (per style guide)

- Background: `bg-muted` (Dune #F3F1EE) — NOT red, keep it warm and friendly
- Border: `border border-border` (Pebble)
- Border-radius: `rounded-2xl`
- Icon: warning triangle in `text-secondary`
- Message text: `text-foreground` for main message, `text-secondary` for sub-message
- Retry button: secondary style (`border border-accent text-accent hover:bg-accent hover:text-white`)
- Rate limit timer: `font-mono text-sm text-secondary`

### State Management

- Add `error: { type: string; message: string; retryAfter?: number } | null` to `NlpSearchDemo`
- Set on catch in `handleSearch`
- Clear on next search attempt
- Rate limit: parse `Retry-After` header or default to 60s
- Distinguish error from empty results: `hasSearched && !error && deals.length === 0` = no results; `hasSearched && error` = error

### Error Detection

```ts
// In NlpSearchDemo handleSearch catch block
if (!res.ok) {
  const data = await res.json().catch(() => ({}));
  if (res.status === 429) {
    setError({ type: 'rate_limit', message: data.error, retryAfter: 60 });
  } else if (res.status === 503) {
    setError({ type: 'unavailable', message: data.error });
  } else {
    setError({ type: 'server_error', message: data.error ?? 'Search failed' });
  }
  return;
}

// Network errors in outer catch
catch (err) {
  if (err instanceof DOMException && err.name === 'AbortError') return;
  setError({ type: 'network', message: 'Couldn\'t connect — check your internet and try again.' });
}
```

---

## Out of Scope

- Dark mode
- Internationalisation
- Non-UK airports
- Duffel payment integration
- New pages or routes
