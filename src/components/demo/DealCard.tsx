'use client';

import Image from 'next/image';
import { Deal } from '@/types';

interface DealCardProps {
  deal: Deal;
}

function ConfidenceBadge({ score }: { score: number }) {
  // Teal for high confidence, yellow for medium, red for low
  const color =
    score >= 85 ? 'bg-teal/10 text-teal border-teal/30' :
    score >= 70 ? 'bg-yellow/20 text-amber-700 border-yellow/50' :
    'bg-red-50 text-red-700 border-red-200';

  const dot =
    score >= 85 ? 'bg-teal' :
    score >= 70 ? 'bg-yellow' :
    'bg-red-500';

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full border ${color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {score}% deal score
    </span>
  );
}

export default function DealCard({ deal }: DealCardProps) {
  const savings = deal.originalPrice - deal.pricePerPerson;
  const savingsPct = Math.round((savings / deal.originalPrice) * 100);

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <article aria-label={`${deal.destination} deal at ${deal.hotel}`} className="bg-surface rounded-3xl border border-border card-shadow hover:card-shadow-hover transition-all duration-200 overflow-hidden flex flex-col group hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={deal.image}
          alt={`${deal.destination}, ${deal.country}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Savings badge */}
        <div className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
          Save {savingsPct}%
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Destination */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground text-base leading-tight">{deal.destination}</h3>
              <p className="text-secondary text-sm">{deal.country}</p>
            </div>
            <ConfidenceBadge score={deal.dealConfidence} />
          </div>
          <p className="text-sm text-secondary mt-1">{deal.hotel}</p>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-1.5 text-sm text-secondary">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
          </svg>
          <span>{deal.dates} · {deal.nights} nights</span>
        </div>

        {/* Price */}
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-accent">
              £{deal.pricePerPerson}
            </span>
            <span className="text-secondary text-sm font-mono line-through">
              £{deal.originalPrice}
            </span>
            <span className="text-secondary text-xs">pp</span>
          </div>
          <p className="text-xs text-secondary mt-0.5">{deal.confidenceRationale}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {deal.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-muted border border-border text-secondary capitalize"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={scrollToWaitlist}
          className="mt-auto w-full border border-accent text-accent hover:bg-accent hover:text-white font-medium py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer group-hover:bg-accent group-hover:text-white"
        >
          View Deal <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}
