'use client';

import { useState, useRef, useEffect } from 'react';
import { Deal, SearchResult, SessionProfile, UserPreference } from '@/types';
import { getSessionProfile, updateSessionProfile, dismissPreference, getSelectedOrigins, saveSelectedOrigins } from '@/lib/session-preferences';
import SearchInput from './SearchInput';
import SuggestedQueries from './SuggestedQueries';
import DealGrid from './DealGrid';
import PreferencePanel from './PreferencePanel';
import SearchError from './SearchError';
import OriginSelector from './OriginSelector';

interface NlpSearchDemoProps {
  onQueryChange?: (query: string) => void;
}

class SearchApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function searchViaApi(query: string, sessionProfile: SessionProfile | null, origins?: string[], signal?: AbortSignal): Promise<SearchResult> {
  const res = await fetch('/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, sessionProfile, origins }),
    signal,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new SearchApiError(data.error ?? 'Search failed', res.status);
  }

  return res.json();
}

export default function NlpSearchDemo({ onQueryChange }: NlpSearchDemoProps) {
  const [query, setQuery] = useState('');
  const [deals, setDeals] = useState<Deal[]>([]);
  const [preferences, setPreferences] = useState<UserPreference[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [source, setSource] = useState<'duffel' | 'mock' | null>(null);
  const [sessionProfile, setSessionProfile] = useState<SessionProfile | null>(null);
  const [error, setError] = useState<{ type: 'rate_limit' | 'server_error' | 'network' | 'unavailable'; message: string; retryAfter?: number } | null>(null);
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>(['LHR']);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Initialize session profile and origin selection on mount
  useEffect(() => {
    setSessionProfile(getSessionProfile());
    setSelectedOrigins(getSelectedOrigins());
  }, []);

  // Abort in-flight request on unmount
  useEffect(() => () => { abortControllerRef.current?.abort(); }, []);

  const handleSearch = async (q: string) => {
    if (!q.trim()) return;

    // Abort any in-flight request
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    setHasSearched(true);
    onQueryChange?.(q);
    try {
      const result = await searchViaApi(q, sessionProfile, selectedOrigins, controller.signal);
      // Only update state if this is still the active request
      if (abortControllerRef.current !== controller) return;
      setDeals(result.deals);
      setPreferences(result.preferences);
      setSource(result.source ?? 'mock');

      // Update session profile with search data
      // Use canonical tags from deal tags (not display labels) for interest matching
      const allTags = result.deals.flatMap((d) => d.tags);
      const uniqueTags = [...new Set(allTags)];
      const intent = {
        destinations: result.deals.map((d) => d.destination.toLowerCase()),
        interests: uniqueTags,
        budgetPerPerson: result.budgetPerPerson ?? (result.deals.length > 0 ? result.deals[0].pricePerPerson : null),
        travellers: 1,
      };
      const updated = updateSessionProfile(intent, result.preferences);
      setSessionProfile(updated);
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
    } finally {
      // Only clear loading if this is still the active request
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  };

  const handleDismissPreference = (tag: string) => {
    const updated = dismissPreference(tag);
    setSessionProfile(updated);
    setPreferences((prev) => prev.filter((p) => p.label !== tag));
  };

  const handleOriginsChange = (origins: string[]) => {
    setSelectedOrigins(origins);
    saveSelectedOrigins(origins);
  };

  const handleSuggestedQuery = (q: string) => {
    setQuery(q);
    handleSearch(q);
  };

  return (
    <section className="relative min-h-screen bg-background">
      {/* Background texture */}
      <div className="absolute inset-0 noise-overlay" aria-hidden="true" />

      {/* Decorative blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[15%] right-[8%] w-64 h-64 rounded-full bg-teal/[0.04] blur-3xl" />
        <div className="absolute top-[40%] left-[5%] w-80 h-80 rounded-full bg-accent/[0.04] blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero + Search — the product IS the hero */}
        <div className={`transition-all duration-500 ease-out ${hasSearched ? 'pt-24 pb-4' : 'pt-32 sm:pt-40 pb-12'}`}>
          {/* Headline — shrinks after first search */}
          <div className={`text-center transition-all duration-500 ease-out ${hasSearched ? 'mb-6' : 'mb-10 sm:mb-14'}`}>
            {!hasSearched && (
              <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 text-sm text-secondary mb-8 card-shadow animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-soft" />
                <span>Now searching real flights</span>
              </div>
            )}
            <h1
              className={`font-display font-bold text-foreground tracking-tight leading-[1.08] transition-all duration-500 ease-out ${
                hasSearched
                  ? 'text-2xl sm:text-3xl mb-2'
                  : 'text-4xl sm:text-5xl md:text-[3.5rem] mb-5'
              }`}
            >
              {hasSearched ? (
                'Find your next city break'
              ) : (
                <>
                  Tell us how you travel.
                  <br />
                  <span className="text-accent">We&apos;ll find the deal.</span>
                </>
              )}
            </h1>
            {!hasSearched && (
              <p className="text-secondary text-lg sm:text-xl max-w-xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                Real flights, real prices. Just describe your ideal trip.
              </p>
            )}
          </div>

          {/* Search */}
          <div className={`max-w-2xl mx-auto transition-all duration-500 ${hasSearched ? '' : 'animate-fade-in-up'}`} style={!hasSearched ? { animationDelay: '200ms' } : undefined}>
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
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="pb-16">
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" style={{ animationDelay: '200ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" style={{ animationDelay: '400ms' }} />
              </div>
              <p className="text-sm text-secondary">
                Searching flights and building your deals...
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-surface rounded-2xl border border-border overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="h-48 animate-shimmer" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 animate-shimmer rounded-lg w-2/3" />
                    <div className="h-3 animate-shimmer rounded-lg w-1/2" />
                    <div className="h-7 animate-shimmer rounded-lg w-1/3 mt-2" />
                    <div className="flex gap-2 mt-3">
                      <div className="h-6 animate-shimmer rounded-full w-16" />
                      <div className="h-6 animate-shimmer rounded-full w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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

        {/* Results */}
        {!loading && hasSearched && deals.length > 0 && (
          <div className="pb-16 animate-fade-in">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-secondary">
                <span className="font-semibold text-foreground">{deals.length} deals</span> matched to your search
              </p>
            </div>
            <DealGrid deals={deals} />
            <PreferencePanel
              preferences={preferences}
              onDismiss={handleDismissPreference}
              searchCount={sessionProfile?.searchCount ?? 0}
            />

            {/* Search again */}
            <div className="mt-10 text-center">
              <button
                onClick={() => {
                  setHasSearched(false);
                  setDeals([]);
                  setQuery('');
                  setSource(null);
                }}
                className="text-sm text-secondary hover:text-accent transition-colors cursor-pointer"
              >
                Search again with different criteria
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && hasSearched && deals.length === 0 && !error && (
          <div className="text-center py-16 animate-fade-in">
            <p className="text-lg text-secondary mb-2">No deals found for that search.</p>
            <p className="text-sm text-secondary/70 max-w-md mx-auto mb-6">
              Try different dates, a higher budget, or a different destination. We search 447 destinations across Europe, North Africa, and the Middle East.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {[
                'Somewhere warm under £400',
                'Greek islands for a week',
                'City break with great food',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestedQuery(suggestion)}
                  className="text-sm px-3.5 py-1.5 rounded-full bg-surface border border-border/60 text-secondary hover:border-accent/40 hover:text-foreground transition-all cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setHasSearched(false);
                setDeals([]);
                setQuery('');
              }}
              className="text-accent hover:text-accent-hover text-sm font-medium cursor-pointer transition-colors"
            >
              Start over
            </button>
          </div>
        )}

        {/* Pre-search trust signals */}
        {!hasSearched && !loading && (
          <div className="pb-24 pt-8 text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-secondary/70">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Real-time flight prices
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                300+ airlines
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                No filters, no forms
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
