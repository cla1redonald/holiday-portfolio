'use client';

import { useState } from 'react';
import { trackProInterest } from '@/lib/session-preferences';

export default function ProTeaser() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    trackProInterest(trimmed || undefined);

    // Fire-and-forget to tracking endpoint
    try {
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'pro_interest',
          email: trimmed || undefined,
        }),
      });
    } catch {
      // Best-effort tracking
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-teal/5 border border-teal/20 rounded-xl p-4 text-center">
        <p className="text-sm font-medium text-teal">Thanks! We&apos;ll let you know when Roami Pro launches.</p>
      </div>
    );
  }

  return (
    <div className="bg-muted rounded-xl p-4 space-y-2.5">
      <p className="text-sm font-medium text-foreground">Like seeing the breakdown?</p>
      <p className="text-[12px] text-secondary leading-relaxed">
        Roami Pro members see this on every deal + book at 2% instead of 5%.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 text-sm px-3 py-2 rounded-lg border border-border bg-surface text-foreground placeholder:text-secondary/40 focus:outline-none focus:ring-2 focus:ring-teal/30"
        />
        <button
          type="submit"
          className="bg-teal hover:bg-teal-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
        >
          Notify me
        </button>
      </form>
    </div>
  );
}
