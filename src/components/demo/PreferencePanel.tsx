'use client';

import { UserPreference } from '@/types';

interface PreferencePanelProps {
  preferences: UserPreference[];
}

export default function PreferencePanel({ preferences }: PreferencePanelProps) {
  if (!preferences || preferences.length === 0) return null;

  return (
    <div className="mt-8 bg-surface border border-border rounded-2xl p-6 animate-fade-in">
      <div className="mb-4">
        <h3 className="font-semibold text-foreground text-base">
          Based on your search, we think you prefer...
        </h3>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        {preferences.map((pref) => (
          <div
            key={pref.label}
            className="flex items-center gap-3 bg-background rounded-xl px-4 py-2.5 border border-border"
          >
            <span className="text-xl">{pref.icon}</span>
            <div>
              <div className="text-sm font-medium text-foreground">{pref.label}</div>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-20 h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal rounded-full transition-all duration-700"
                    style={{ width: `${Math.round(pref.confidence * 100)}%` }}
                  />
                </div>
                <span className="text-xs text-secondary font-mono">
                  {Math.round(pref.confidence * 100)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-secondary italic">
        Your preferences get smarter with every search. This is just the start.
      </p>
    </div>
  );
}
