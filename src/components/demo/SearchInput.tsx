'use client';

import { useEffect, useRef, useState } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  loading?: boolean;
}

export default function SearchInput({ value, onChange, onSearch, loading }: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const [focused, setFocused] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (newValue.trim()) {
        onSearch(newValue);
      }
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && localValue.trim()) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      onSearch(localValue);
    }
  };

  const handleSubmit = () => {
    if (localValue.trim()) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      onSearch(localValue);
    }
  };

  return (
    <div
      className={`relative flex items-center bg-surface rounded-2xl transition-all duration-300 overflow-hidden ${
        focused ? 'search-shadow-focus' : 'search-shadow'
      }`}
    >
      {/* Search icon */}
      <div className="flex-shrink-0 pl-5 pr-3">
        <svg
          className={`w-5 h-5 transition-colors duration-200 ${focused ? 'text-accent' : 'text-secondary/50'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Somewhere warm, good food, under £400..."
        className="flex-1 py-4 sm:py-5 pr-4 text-foreground placeholder-secondary/40 bg-transparent outline-none text-base sm:text-lg font-display font-medium"
        aria-label="Search for holiday deals"
      />

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !localValue.trim()}
        className="flex-shrink-0 bg-accent hover:bg-accent-hover disabled:bg-secondary/20 text-white font-display font-semibold px-6 sm:px-8 py-4 sm:py-5 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed text-sm sm:text-base"
        aria-label="Search"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Searching
          </span>
        ) : (
          'Search'
        )}
      </button>
    </div>
  );
}
