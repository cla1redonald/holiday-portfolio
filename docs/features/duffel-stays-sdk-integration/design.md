# Design: Migrate Duffel Stays from Raw Fetch to SDK

## Overview

Replace the raw `fetch()` implementation of `searchStays()` in `src/lib/duffel-client.ts` (lines 159-264) with the official `@duffel/api` SDK method `duffel.stays.search()`. This brings Stays in line with `searchFlights()`, which already uses the SDK, and removes manual header management, body construction, and inline type definitions.

The Stays API currently returns 403 (requires Duffel sales enablement). The implementation must be fully built and ready to work once access is granted.

## Files to Modify

| File | Change |
|---|---|
| `src/lib/duffel-client.ts` | Rewrite `searchStays()` internals (lines 159-264) |

No other files need modification. The `StayResult` interface (lines 51-63) and function signature remain identical, so `deal-builder.ts` and all consumers are unaffected.

## Current Implementation (Raw Fetch)

```typescript
// Lines 159-264 of src/lib/duffel-client.ts
export async function searchStays(params: { ... }): Promise<StayResult[]> {
  const token = process.env.DUFFEL_API_TOKEN;
  if (!token) return [];

  // Manual guest list construction
  const guestsList = Array.from({ length: params.guests }, () => ({ type: 'adult' as const }));

  // Per-destination parallel search with withAbortableTimeout
  const searches = params.destinations.slice(0, 3).map((dest) =>
    withAbortableTimeout((signal) => (async () => {
      // Manual fetch with headers, body JSON, signal
      const res = await fetch('https://api.duffel.com/stays/search', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Duffel-Version': 'v2',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ data: { location: {...}, check_in_date, check_out_date, rooms, guests } }),
        signal,
      });
      // Inline type definitions for response
      // Manual error handling (res.ok check)
      // Manual JSON parsing and mapping to StayResult
    })(), 8000)
  );
}
```

### Problems with Current Approach

1. Bypasses the SDK singleton (`getDuffel()`) and reads `DUFFEL_API_TOKEN` directly
2. Manually sets `Duffel-Version`, `Authorization`, and content-type headers
3. Defines `StaysAccommodation` and `StaysResult` interfaces inline (duplicating SDK types)
4. Uses `withAbortableTimeout` with `AbortSignal` for fetch cancellation, but the SDK does not accept an `AbortSignal` parameter
5. Inconsistent error handling compared to the flights path

## Target Implementation (SDK)

### SDK Method Signature

```typescript
// From @duffel/api SDK types
duffel.stays.search(params: StaysSearchParams): Promise<DuffelResponse<StaysSearchResponse>>

// StaysSearchParams (location variant, which we use):
interface LocationSearchParams {
  location: {
    radius: number;
    geographic_coordinates: { latitude: number; longitude: number };
  };
  check_in_date: string;
  check_out_date: string;
  rooms: number;
  guests: Array<{ type: 'adult'; age?: number } | { type: 'child'; age: number }>;
  mobile?: boolean;
  free_cancellation_only?: boolean;
}

// StaysSearchResponse:
interface StaysSearchResponse {
  results: Array<StaysSearchResult>;
  created_at: string;
}

// StaysSearchResult:
interface StaysSearchResult {
  id: string;
  check_in_date: string;
  check_out_date: string;
  accommodation: StaysAccommodation; // has .name, .rating, .review_score, .photos
  rooms: number;
  guests: Array<Guest>;
  cheapest_rate_total_amount: string;
  cheapest_rate_currency: string;
  expires_at: string;
  // ... additional rate fields
}
```

### StayResult Field Mapping

The `StayResult` interface (lines 51-63) must remain unchanged. Here is the field mapping from SDK types:

| StayResult field | Source | SDK accessor |
|---|---|---|
| `destination` | function param | `dest` (loop variable) |
| `hotelName` | SDK | `result.accommodation.name` |
| `rating` | SDK | `result.accommodation.rating` (already `number \| null`) |
| `reviewScore` | SDK | `result.accommodation.review_score` (already `number \| null`) |
| `totalPrice` | SDK | `parseFloat(result.cheapest_rate_total_amount)` |
| `pricePerNight` | computed | `totalPrice / Math.max(nights, 1)` |
| `currency` | SDK | `result.cheapest_rate_currency` |
| `checkIn` | function param | `params.checkIn` |
| `checkOut` | function param | `params.checkOut` |
| `photoUrl` | SDK | `result.accommodation.photos?.[0]?.url ?? null` |
| `boardType` | hardcoded | `'room_only'` (Stays search does not return board info) |

All field types match exactly between the SDK's `StaysSearchResult` / `StaysAccommodation` and our `StayResult`. No type coercion is needed beyond `parseFloat` on amount strings.

## Proposed Code

```typescript
export async function searchStays(params: {
  destinations: string[];
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms?: number;
}): Promise<StayResult[]> {
  const duffel = getDuffel();
  const results: StayResult[] = [];
  const rooms = params.rooms ?? 1;
  const guests = Array.from({ length: params.guests }, () => ({
    type: 'adult' as const,
  }));

  const nights = Math.ceil(
    (new Date(params.checkOut).getTime() - new Date(params.checkIn).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const searches = params.destinations.slice(0, 3).map((dest) =>
    withTimeout(
      (async () => {
        const cityInfo = lookupCity(dest);
        if (!cityInfo) return [];

        try {
          const response = await duffel.stays.search({
            check_in_date: params.checkIn,
            check_out_date: params.checkOut,
            rooms,
            guests,
            location: {
              radius: 10,
              geographic_coordinates: {
                latitude: cityInfo.latitude,
                longitude: cityInfo.longitude,
              },
            },
          });

          const stayResults = response.data.results ?? [];
          console.log(`Stays in ${dest}: ${stayResults.length} results`);

          return stayResults
            .sort(
              (a, b) =>
                parseFloat(a.cheapest_rate_total_amount) -
                parseFloat(b.cheapest_rate_total_amount)
            )
            .slice(0, 3)
            .map((result) => {
              const totalPrice = parseFloat(result.cheapest_rate_total_amount);
              return {
                destination: dest,
                hotelName: result.accommodation.name,
                rating: result.accommodation.rating,
                reviewScore: result.accommodation.review_score,
                totalPrice,
                pricePerNight: totalPrice / Math.max(nights, 1),
                currency: result.cheapest_rate_currency,
                checkIn: params.checkIn,
                checkOut: params.checkOut,
                photoUrl: result.accommodation.photos?.[0]?.url ?? null,
                boardType: 'room_only',
              };
            });
        } catch (err: unknown) {
          const duffelErr = err as {
            errors?: Array<{ message: string; title: string; code?: string }>;
            meta?: { status?: number };
          };
          if (duffelErr.errors) {
            console.error(
              `Stays search failed for ${dest}:`,
              duffelErr.errors
                .map((e) => `${e.title}: ${e.message}`)
                .join(', ')
            );
          } else {
            console.error(`Stays search failed for ${dest}:`, err);
          }
          return [];
        }
      })(),
      8000
    )
  );

  const settled = await Promise.allSettled(searches);
  for (const result of settled) {
    if (result.status === 'fulfilled' && result.value) results.push(...result.value);
  }
  return results;
}
```

## Key Design Decisions

### 1. Switch from `withAbortableTimeout` to `withTimeout`

**Decision:** Use `withTimeout` (Promise.race) instead of `withAbortableTimeout` (AbortController).

**Rationale:** The SDK's `duffel.stays.search()` does not accept an `AbortSignal` parameter. There is no way to pass a signal through the SDK to cancel the underlying HTTP request. `withTimeout` races the SDK promise against a timer and returns `null` on timeout -- the same pattern used by `searchFlights()`. This makes both search functions consistent.

**Trade-off:** On timeout, the SDK request continues in the background until the HTTP response arrives or the SDK's own internal timeout triggers. This is acceptable because: (a) it mirrors the flights implementation, (b) the serverless function will terminate shortly after anyway, and (c) there is no user-visible impact since we already returned `null`.

### 2. Use `getDuffel()` singleton instead of raw token

**Decision:** Replace `process.env.DUFFEL_API_TOKEN` direct access with `getDuffel()`.

**Rationale:** The singleton is already established for flights. It handles missing-token errors with a clear exception, avoids creating multiple Duffel client instances, and reuses the client across warm serverless invocations.

**Behavior change:** The current code returns `[]` silently when the token is missing. The new code will throw via `getDuffel()`. This is the correct behavior -- a missing token is a configuration error, not an expected empty result. The calling code in the API route already has try/catch.

### 3. Error handling alignment with flights pattern

**Decision:** Use the same structured Duffel error destructuring pattern as `searchFlights()`.

**Rationale:** The SDK wraps API errors in a consistent format with an `errors` array. The current raw-fetch code handles HTTP status codes manually (`res.ok` check); the SDK throws on non-2xx responses, so we catch and destructure the same way as flights.

**403 handling specifically:** When the Stays API is not enabled for the account, the SDK will throw an error with a 403 status. The catch block logs the Duffel error details and returns `[]` for that destination, allowing other destinations and flights to proceed. No special-case 403 logic is needed.

### 4. Remove inline type definitions

**Decision:** Delete the inline `StaysAccommodation` and `StaysResult` interfaces (lines 214-224).

**Rationale:** The SDK provides fully typed `StaysSearchResult` and `StaysAccommodation` types. The inline definitions were necessary only because raw `fetch` returns untyped JSON. With the SDK, TypeScript infers the response shape from `duffel.stays.search()`.

### 5. Preserve `nights` computation outside the loop

**Decision:** Compute `nights` once before the destination loop, not inside each result mapping.

**Rationale:** `checkIn` and `checkOut` are the same for all destinations. Computing it once is cleaner. The current code computes it inside the inner `.map()` which runs for every result.

## Edge Cases

### 403 - Stays API Not Enabled

The Stays API requires separate commercial enablement from Duffel. Until enabled, all calls return 403.

- **Current behavior:** `res.ok` is false, logs error, returns `[]` per destination
- **New behavior:** SDK throws, catch block logs structured error, returns `[]` per destination
- **Net effect:** Identical user-visible behavior. Slightly better log output (structured error titles/messages vs. raw response text).

### Empty Results

- SDK returns `response.data.results` which may be an empty array
- The `?? []` fallback handles the case where `results` is `undefined` (defensive, unlikely with SDK)
- Empty results propagate correctly -- `deal-builder.ts` handles missing stays by using estimated hotel costs

### Timeout (8 seconds)

- `withTimeout` returns `null` after 8 seconds
- The `Promise.allSettled` loop skips `null` values (existing `&& result.value` guard)
- Matches the flights timeout behavior exactly

### `lookupCity` Returns Null

- Returns `[]` for unknown destinations (no change from current behavior)
- Logged implicitly by the empty results for that destination

### SDK Client Initialization Failure

- `getDuffel()` throws if `DUFFEL_API_TOKEN` is not set
- This exception propagates to the API route handler which has its own error boundary
- **Behavior change from current:** Currently returns `[]` silently. New code throws. This is intentional -- see Design Decision #2.

## Deleted Code

The following will be removed entirely:

1. **Lines 182-206:** Raw `fetch()` call with manual headers, body, and signal
2. **Lines 214-224:** Inline `StaysAccommodation` and `StaysResult` interface definitions
3. **Lines 208-210:** Manual `res.ok` / `res.text()` error handling
4. **Lines 226:** Manual `res.json()` parsing with type assertion
5. **Line 169:** Direct `process.env.DUFFEL_API_TOKEN` access

The `withAbortableTimeout` helper function (lines 26-39) will become unused after this change. It should be removed to avoid dead code, unless other code paths use it.

## Verification Checklist

Since the Stays API returns 403 until enabled, verification is limited to:

- [ ] TypeScript compiles without errors (`npx tsc --noEmit`)
- [ ] `searchStays()` function signature unchanged (no consumer impact)
- [ ] `StayResult` interface unchanged
- [ ] SDK params match the `StaysSearchParams` location variant type
- [ ] Error path: search with invalid/unenabled token logs structured error, returns `[]`
- [ ] Timeout path: `withTimeout` returns `null` after 8s, handled by `Promise.allSettled` loop
- [ ] `withAbortableTimeout` removed if no other callers exist
- [ ] `deal-builder.ts` works unchanged (it handles empty stays with estimated costs)
- [ ] Dev server starts and search queries produce flights (stays gracefully fail with 403)

## Future Enhancement: Duffel Places API

The Duffel Places API (`duffel.suggestions.list({ query: "lisbon" })`) returns city/airport data including latitude, longitude, IATA codes, and country codes. This could eventually replace the hardcoded `iata-codes.ts` city list, enabling:
- Dynamic city lookups (no static list to maintain)
- User-typed city names resolved via Duffel's fuzzy matching
- Automatic coordinate resolution for Stays search

This is out of scope for Issue #19 but noted as a natural follow-on. The SDK already has `duffel.suggestions.list()` available.

## Summary of Changes

| Aspect | Before (raw fetch) | After (SDK) |
|---|---|---|
| Client | Direct `fetch()` with manual auth | `getDuffel().stays.search()` |
| Auth | `Bearer ${token}` header | Handled by SDK singleton |
| Headers | Manual (`Duffel-Version`, etc.) | Handled by SDK |
| Request body | Manual `JSON.stringify` | SDK params object |
| Response typing | Inline interfaces + `as` cast | SDK-inferred types |
| Timeout | `withAbortableTimeout` + `AbortSignal` | `withTimeout` (Promise.race) |
| Error handling | `res.ok` + `res.text()` | Structured Duffel error catch |
| Missing token | Silent `return []` | Throws (config error) |
| Lines of code | ~105 (L159-264) | ~75 (estimated) |
