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
      <section id="waitlist" className="py-20 bg-accent">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-6">&#10003;</div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">Welcome aboard!</h2>
          <p className="text-white/80 text-lg">
            You&apos;re on the list. We&apos;ll be in touch when it&apos;s time to set off — keep an eye on your inbox.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="py-20 bg-accent">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        {/* Header */}
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
          Ready to roam?
        </h2>
        <p className="text-white/80 text-lg mb-10">
          Join the waitlist for early access and founder pricing. Your next adventure starts here.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            name="email"
            autoComplete="email"
            required
            className="flex-1 bg-white/95 text-foreground placeholder-secondary rounded-xl px-4 py-3 text-base outline-none focus:ring-2 focus:ring-white/50 transition-all"
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-foreground text-white font-semibold px-6 py-3 rounded-xl hover:bg-foreground/90 disabled:opacity-60 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
          </button>
        </form>

        {/* Error */}
        {status === 'error' && (
          <div role="alert" className="mt-4 flex items-center justify-center gap-3">
            <p className="text-white/90 text-sm">{errorMessage}</p>
            <button
              onClick={handleRetry}
              className="text-white underline text-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent rounded"
            >
              Try again
            </button>
          </div>
        )}

        {/* GDPR note */}
        <p className="mt-5 text-white/60 text-xs">
          We&apos;ll only email you about Roami. Unsubscribe anytime. No spam, ever.
        </p>
      </div>
    </section>
  );
}
