'use client';

import { useSelectedDeal } from '@/lib/deal-store';
import DealDetail from '@/components/deal/DealDetail';
import Link from 'next/link';

export default function DealPage() {
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

  const handleBook = () => {
    // For now, scroll to waitlist on the homepage
    // Will be replaced with actual booking form in Phase A3
    window.location.href = '/#waitlist';
  };

  return <DealDetail deal={deal} onBook={handleBook} />;
}
