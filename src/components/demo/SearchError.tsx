'use client';

import { useState, useEffect } from 'react';

export interface SearchErrorProps {
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
} as const;

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
    <div className="relative bg-muted border border-border rounded-2xl p-6 text-center animate-fade-in">
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
    </div>
  );
}
