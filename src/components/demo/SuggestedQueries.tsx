'use client';

const SUGGESTED_QUERIES = [
  { text: 'Somewhere warm under £300', icon: '☀️' },
  { text: 'Long weekend, great food', icon: '🍽️' },
  { text: 'Greek islands for a couple', icon: '🏝️' },
  { text: 'Nordic city break', icon: '🌊' },
  { text: 'Moroccan adventure under £400', icon: '🕌' },
  { text: 'Somewhere like Lisbon but quieter', icon: '🌿' },
  { text: 'Architecture and art in Eastern Europe', icon: '🏛️' },
  { text: 'Beach and nightlife, 5 nights', icon: '🏖️' },
];

interface SuggestedQueriesProps {
  onSelect: (query: string) => void;
}

export default function SuggestedQueries({ onSelect }: SuggestedQueriesProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-5 justify-center">
      <span className="text-xs text-secondary/50 uppercase tracking-wider font-medium mr-1">Try</span>
      {SUGGESTED_QUERIES.map((query, i) => (
        <button
          key={query.text}
          onClick={() => onSelect(query.text)}
          className="text-sm px-3.5 py-1.5 rounded-full bg-surface border border-border/60 text-secondary hover:border-accent/40 hover:text-foreground hover:bg-accent/[0.04] transition-all duration-200 cursor-pointer whitespace-nowrap card-shadow animate-fade-in"
          style={{ animationDelay: `${300 + i * 50}ms` }}
        >
          <span className="mr-1.5">{query.icon}</span>
          {query.text}
        </button>
      ))}
    </div>
  );
}
