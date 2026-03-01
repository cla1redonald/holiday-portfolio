'use client';

import { useSelectedDeal } from '@/lib/deal-store';
import BookingForm from '@/components/booking/BookingForm';
import Link from 'next/link';

export default function BookPage() {
  const deal = useSelectedDeal();

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
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
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

        {/* Deal summary card */}
        <div className="bg-surface rounded-2xl border border-border/60 p-5">
          <div className="flex items-start gap-4">
            {deal.image && (
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img src={deal.image} alt={deal.destination} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-lg font-bold text-foreground">{deal.destination}</h1>
              <p className="text-sm text-secondary">{deal.dates} &middot; {deal.nights} nights</p>
              {deal.hotel && (
                <p className="text-sm text-secondary mt-0.5">{deal.hotel}</p>
              )}
              <p className="font-display font-bold text-accent mt-1">
                £{Math.round(deal.pricePerPerson)}<span className="text-xs font-normal text-secondary"> /person</span>
              </p>
            </div>
          </div>
        </div>

        {/* Booking form */}
        <BookingForm deal={deal} travellers={2} />
      </div>
    </div>
  );
}
