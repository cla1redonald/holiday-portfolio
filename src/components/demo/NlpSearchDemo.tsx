'use client';

import { useState } from 'react';
import { Deal, SearchResult, UserPreference } from '@/types';
import { searchDeals } from '@/lib/search-engine';
import SearchInput from './SearchInput';
import SuggestedQueries from './SuggestedQueries';
import DealGrid from './DealGrid';
import PreferencePanel from './PreferencePanel';

interface NlpSearchDemoProps {
  onQueryChange?: (query: string) => void;
}

async function searchViaApi(query: string): Promise<SearchResult> {
  const res = await fetch('/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    if (data.fallback) {
      // API keys not configured or service error — fall back to mock
      return searchDeals(query);
    }
    throw new Error(data.error ?? 'Search failed');
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

  const handleSearch = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setHasSearched(true);
    onQueryChange?.(q);
    try {
      // Try real API first, fall back to mock engine
      const result = await searchViaApi(q).catch(() => {
        setSource('mock');
        return searchDeals(q);
      });
      setDeals(result.deals);
      setPreferences(result.preferences);
      setSource(result.source ?? 'mock');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedQuery = (q: string) => {
    setQuery(q);
    handleSearch(q);
  };

  return (
    <section id="demo" aria-labelledby="demo-heading" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 id="demo-heading" className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            See it in action
          </h2>
          <p className="text-lg text-secondary max-w-xl mx-auto">
            Tell us how you travel. We&apos;ll find deals that match.
          </p>
        </div>

        {/* Search area */}
        <div className="max-w-3xl mx-auto mb-10">
          <SearchInput
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
            loading={loading}
          />
          <SuggestedQueries onSelect={handleSuggestedQuery} />
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-surface rounded-3xl border border-border overflow-hidden animate-pulse">
                <div className="h-44 bg-border" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-border rounded w-2/3" />
                  <div className="h-3 bg-border rounded w-1/2" />
                  <div className="h-6 bg-border rounded w-1/3" />
                  <div className="h-8 bg-border rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && hasSearched && deals.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-secondary">
                Showing <span className="font-semibold text-foreground">{deals.length} deals</span> matched to your search
              </p>
            </div>
            {source === 'mock' && (
              <p className="text-xs text-secondary/70 text-center mb-4">
                Showing sample results — live pricing unavailable right now
              </p>
            )}
            <DealGrid deals={deals} />
            <PreferencePanel preferences={preferences} />
          </>
        )}

        {/* Empty state */}
        {!loading && hasSearched && deals.length === 0 && (
          <div className="text-center py-12 text-secondary">
            <p className="text-lg">No deals found. Try a different search.</p>
          </div>
        )}

        {/* Pre-search prompt */}
        {!hasSearched && !loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface border border-border mb-4">
              <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-secondary text-base">
              Start typing above to discover personalised deals
            </p>
            <p className="text-secondary text-sm mt-1">
              Try one of the suggested queries or describe your ideal trip
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
