'use client';

import { FormEvent, useState } from 'react';

export default function WaitlistForm() {
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
          query: '',
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
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl mx-auto mb-6">
            🎉
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">You&apos;re on the list!</h2>
          <p className="text-white/80 text-lg">
            We&apos;ll let you know when Holiday Portfolio launches. Keep an eye on your inbox.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="py-20 bg-accent">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Be first when we launch
        </h2>
        <p className="text-white/80 text-lg mb-10">
          Join the waitlist and get early access, founder pricing, and no spam.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
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
          <div className="mt-4 flex items-center justify-center gap-3">
            <p className="text-white/90 text-sm">{errorMessage}</p>
            <button
              onClick={handleRetry}
              className="text-white underline text-sm cursor-pointer"
            >
              Try again
            </button>
          </div>
        )}

        {/* GDPR note */}
        <p className="mt-5 text-white/60 text-xs">
          We&apos;ll only email you about Holiday Portfolio. Unsubscribe anytime. No spam, ever.
        </p>
      </div>
    </section>
  );
}
