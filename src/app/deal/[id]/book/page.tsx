'use client';

import { useSelectedDeal } from '@/lib/deal-store';
import ContactSection from '@/components/booking/ContactSection';
import Link from 'next/link';
import { useEffect } from 'react';

export default function BookPage() {
  const deal = useSelectedDeal();

  useEffect(() => {
    if (deal) {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'booking_intent',
          dealId: deal.id,
          destination: deal.destination,
        }),
      }).catch(() => {});
    }
  }, [deal]);

  if (!deal) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 px-6">
          <div className="text-5xl">✈️</div>
          <h1 className="font-display text-2xl font-bold text-foreground">Deal expired</h1>
          <p className="text-secondary max-w-sm">
            Flight prices change fast. Head back to search and we&apos;ll find you fresh deals.
          </p>
          <Link
            href="/"
            className="inline-block bg-accent hover:bg-accent/90 text-white font-display font-medium px-6 py-2.5 rounded-xl text-sm transition-all duration-200"
          >
            Search again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        {/* Back link */}
        <Link
          href={`/deal/${deal.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to deal
        </Link>

        <ContactSection deal={deal} travellers={2} />
      </div>
    </div>
  );
}
