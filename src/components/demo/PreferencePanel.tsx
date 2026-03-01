'use client';

import { UserPreference } from '@/types';

interface PreferencePanelProps {
  preferences: UserPreference[];
  onDismiss?: (tag: string) => void;
  searchCount?: number;
}

export default function PreferencePanel({ preferences, onDismiss, searchCount }: PreferencePanelProps) {
  if (!preferences || preferences.length === 0) return null;

  return (
    <div className="mt-8 bg-surface border border-border/60 rounded-2xl p-5 sm:p-6 animate-fade-in card-shadow">
      <h3 className="font-display font-semibold text-foreground text-sm mb-4">
        {searchCount && searchCount > 1
          ? `Based on your ${searchCount} searches...`
          : "We think you\u2019re looking for..."}
      </h3>

      <div className="flex flex-wrap gap-2.5">
        {preferences.map((pref) => (
          <div
            key={pref.label}
            className={`flex items-center gap-2.5 bg-background rounded-xl px-3.5 py-2 border ${
              pref.confidence >= 0.7 ? 'border-teal/30' : 'border-border/40'
            }`}
          >
            <span className="text-lg">{pref.icon}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">{pref.label}</span>
              <div className="w-12 h-1 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal rounded-full transition-all duration-700"
                  style={{ width: `${Math.round(pref.confidence * 100)}%` }}
                />
              </div>
              <span className="text-[11px] text-secondary font-mono">
                {Math.round(pref.confidence * 100)}%
              </span>
            </div>
            {onDismiss && (
              <button
                onClick={() => onDismiss(pref.label)}
                className="ml-0.5 text-secondary/40 hover:text-secondary transition-colors cursor-pointer"
                aria-label={`Dismiss ${pref.label}`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
