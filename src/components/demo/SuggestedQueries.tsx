'use client';

const SUGGESTED_QUERIES = [
  'Somewhere warm under £300',
  'Long weekend in May, good food',
  'Romantic city break',
  'Culture trip under £400',
  'Beach holiday, budget',
  'Luxury weekend away',
];

interface SuggestedQueriesProps {
  onSelect: (query: string) => void;
}

export default function SuggestedQueries({ onSelect }: SuggestedQueriesProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <span className="text-sm text-secondary self-center mr-1">Try:</span>
      {SUGGESTED_QUERIES.map((query, i) => {
        // Alternate between coral and teal hover states
        const isEven = i % 2 === 0;
        const hoverClass = isEven
          ? 'hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent'
          : 'hover:border-teal hover:text-teal focus-visible:border-teal focus-visible:text-teal';
        return (
          <button
            key={query}
            onClick={() => onSelect(query)}
            className={`text-sm px-3 py-1.5 rounded-full border border-border bg-surface focus-visible:outline-none text-secondary transition-all duration-150 cursor-pointer whitespace-nowrap ${hoverClass}`}
          >
            {query}
          </button>
        );
      })}
    </div>
  );
}
