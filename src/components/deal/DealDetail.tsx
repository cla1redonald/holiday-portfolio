'use client';

import Image from 'next/image';
import type { Deal } from '@/types';
import FlightTimeline from './FlightTimeline';
import PriceSummary from './PriceSummary';

interface DealDetailProps {
  deal: Deal;
  onBook: () => void;
}

function ConfidenceBadge({ score }: { score: number }) {
  const color =
    score >= 85 ? 'bg-teal/10 text-teal' :
    score >= 70 ? 'bg-yellow/20 text-amber-700' :
    'bg-red-50 text-red-700';

  return (
    <span className={`inline-flex items-center gap-1 text-sm font-semibold font-mono px-3 py-1 rounded-full ${color}`}>
      {score}% confidence
    </span>
  );
}

export default function DealDetail({ deal, onBook }: DealDetailProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero image */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <Image
          src={deal.image}
          alt={`${deal.destination}, ${deal.country}`}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-bold text-white text-2xl sm:text-3xl md:text-4xl drop-shadow-sm">
                {deal.destination}
              </h1>
              <p className="text-white/80 text-lg mt-1">{deal.country}</p>
              <p className="text-white/60 text-sm mt-1">{deal.dates} · {deal.nights} nights</p>
            </div>
            {/* Confidence score removed — internal metric, not useful for users */}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left column — details */}
          <div className="lg:col-span-3 space-y-8">
            {/* Hotel info */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5Zm0 3h.008v.008h-.008V10.5Zm0 3h.008v.008h-.008V13.5Z" />
                </svg>
                {deal.hotel}
              </h2>
              {deal.hotel !== 'Hotel TBC' && (
                <p className="text-sm text-secondary">Accommodation for {deal.nights} nights</p>
              )}
            </div>

            {/* Flight timeline */}
            {deal.flight && <FlightTimeline flight={deal.flight} />}

            {/* Tags */}
            {deal.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">What makes this destination great</h3>
                <div className="flex flex-wrap gap-2">
                  {deal.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-3 py-1 rounded-full bg-muted text-secondary capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Price context */}
            {deal.priceContext && deal.priceContext.source !== 'seed' && (
              <div className="bg-muted rounded-xl p-4 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Price intelligence</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {deal.priceContext.marketMedian && (
                    <div>
                      <span className="text-secondary">Market median</span>
                      <p className="font-mono font-semibold text-foreground">£{deal.priceContext.marketMedian}</p>
                    </div>
                  )}
                  {deal.priceContext.percentile !== null && (
                    <div>
                      <span className="text-secondary">Price percentile</span>
                      <p className="font-mono font-semibold text-foreground">Top {deal.priceContext.percentile}%</p>
                    </div>
                  )}
                  {deal.priceContext.trend && (
                    <div>
                      <span className="text-secondary">Price trend</span>
                      <p className={`font-semibold capitalize ${
                        deal.priceContext.trend === 'falling' ? 'text-teal' :
                        deal.priceContext.trend === 'rising' ? 'text-amber-600' :
                        'text-foreground'
                      }`}>{deal.priceContext.trend}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-secondary">Based on</span>
                    <p className="font-mono font-semibold text-foreground">{deal.priceContext.sampleCount} observations</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right column — price summary (sticky) */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-8">
              <PriceSummary deal={deal} onBook={onBook} />
            </div>
          </div>
        </div>

        {/* Back to search */}
        <div className="mt-12 text-center">
          <a
            href="/"
            className="text-sm text-teal hover:text-teal/80 transition-colors inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to search
          </a>
        </div>
      </div>
    </div>
  );
}
