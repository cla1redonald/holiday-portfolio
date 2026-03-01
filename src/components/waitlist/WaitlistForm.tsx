'use client';

import { FormEvent, useState } from 'react';

interface WaitlistFormProps {
  lastQuery?: string;
}

export default function WaitlistForm({ lastQuery = '' }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          variant: new URLSearchParams(window.location.search).get('v') ?? 'a',
          query: lastQuery,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? 'Something went wrong. Please try again.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const handleRetry = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  if (status === 'success') {
    return (
      <section id="waitlist" className="py-20 bg-foreground">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-4xl mb-5">&#10003;</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">Welcome aboard</h2>
          <p className="text-white/60 text-base">
            We&apos;ll be in touch when it&apos;s time to set off.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="py-16 sm:py-20 bg-foreground relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-[20%] w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-[10%] w-80 h-80 rounded-full bg-teal/10 blur-3xl" />
      </div>

      <div className="relative max-w-lg mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
          Ready to roam?
        </h2>
        <p className="text-white/50 text-base mb-8">
          Join the waitlist for early access and founder pricing.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            name="email"
            autoComplete="email"
            required
            className="flex-1 bg-white/10 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 text-base outline-none focus:border-white/30 focus:bg-white/15 transition-all font-display"
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-accent hover:bg-accent-hover text-white font-display font-semibold px-6 py-3 rounded-xl disabled:opacity-60 transition-all duration-200 cursor-pointer whitespace-nowrap text-sm"
          >
            {status === 'loading' ? 'Joining...' : 'Join'}
          </button>
        </form>

        {status === 'error' && (
          <div role="alert" className="mt-4 flex items-center justify-center gap-3">
            <p className="text-white/70 text-sm">{errorMessage}</p>
            <button
              onClick={handleRetry}
              className="text-white/50 hover:text-white underline text-sm cursor-pointer transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        <p className="mt-4 text-white/25 text-xs">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
