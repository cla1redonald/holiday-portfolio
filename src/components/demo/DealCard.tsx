'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Deal } from '@/types';
import { setSelectedDeal } from '@/lib/deal-store';
import { trackBreakdownClick } from '@/lib/session-preferences';
import PriceSparkline from './PriceSparkline';

interface DealCardProps {
  deal: Deal;
}

/** Format total minutes as "Xh Ym" */
function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/** Format stops count as human-readable text */
function formatStops(stops: number): string {
  if (stops === 0) return 'Direct';
  if (stops === 1) return '1 stop';
  return `${stops} stops`;
}

/** Calculate hours remaining until an ISO date string */
function hoursUntil(isoDate: string): number {
  const diff = new Date(isoDate).getTime() - Date.now();
  return Math.floor(diff / (1000 * 60 * 60));
}

function ConfidenceBadge({ score }: { score: number }) {
  const color =
    score >= 85 ? 'bg-teal/10 text-teal' :
    score >= 70 ? 'bg-yellow/20 text-amber-700' :
    'bg-red-50 text-red-700';

  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold font-mono px-2 py-0.5 rounded-full ${color}`}>
      {score}%
    </span>
  );
}

export default function DealCard({ deal }: DealCardProps) {
  const router = useRouter();
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  const savings = deal.originalPrice - deal.pricePerPerson;
  const savingsPct = deal.originalPrice > deal.pricePerPerson
    ? Math.round((savings / deal.originalPrice) * 100)
    : 0;

  const handleViewDeal = () => {
    setSelectedDeal(deal);
    router.push(`/deal/${deal.id}`);
  };

  const handleExpandBreakdown = () => {
    setBreakdownOpen(true);
    trackBreakdownClick();
  };

  // Extract airline from highlights if present (fallback for deals without flight data)
  const airlineHighlight = deal.highlights.find(h => h.toLowerCase().includes('flights'));

  // Price context badge logic
  const showPercentileBadge =
    deal.priceContext &&
    deal.priceContext.source !== 'seed' &&
    deal.priceContext.percentile !== null &&
    deal.priceContext.percentile <= 25;

  const showTrendWarning =
    deal.priceContext &&
    deal.priceContext.trend === 'rising';

  // Offer expiry logic
  const expiryHours = deal.offerExpiresAt ? hoursUntil(deal.offerExpiresAt) : null;
  const showExpiry = expiryHours !== null && expiryHours > 0 && expiryHours < 48;

  return (
    <article
      aria-label={`${deal.destination} deal at ${deal.hotel}`}
      className="bg-surface rounded-2xl border border-border/60 card-shadow hover:card-shadow-hover transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <Image
          src={deal.image}
          alt={`${deal.destination}, ${deal.country}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Price context badge (replaces savings badge when available) */}
        {showPercentileBadge ? (
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <div className="bg-accent text-white text-xs font-bold font-display px-2.5 py-1 rounded-lg">
              Top {deal.priceContext!.percentile}% cheapest
            </div>
            {showTrendWarning && (
              <div className="bg-amber-500 text-white text-xs font-bold font-display px-2 py-1 rounded-lg flex items-center gap-0.5">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                Rising
              </div>
            )}
          </div>
        ) : showTrendWarning && !savingsPct ? (
          <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold font-display px-2.5 py-1 rounded-lg flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
            Prices rising
          </div>
        ) : savingsPct > 0 ? (
          <div className="absolute top-3 left-3 bg-accent text-white text-xs font-bold font-display px-2.5 py-1 rounded-lg">
            {savingsPct}% below avg
          </div>
        ) : null}

        {/* Destination overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="font-display font-bold text-white text-xl leading-tight drop-shadow-sm">
                {deal.destination}
              </h3>
              <p className="text-white/80 text-sm">{deal.country}</p>
            </div>
            {/* Confidence score removed — internal metric, not useful for users */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 gap-2">
        {/* Hotel */}
        <p className="text-sm text-foreground font-medium leading-tight">{deal.hotel}</p>

        {/* Flight info + dates */}
        <div className="flex flex-col gap-1.5 text-sm text-secondary">
          {deal.flight ? (
            <>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                {deal.flight.airlineLogo && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={deal.flight.airlineLogo}
                    alt={deal.flight.airline}
                    width={16}
                    height={16}
                    className="rounded-sm"
                  />
                )}
                {deal.flight.airline} · {formatStops(deal.flight.stops)} · {formatDuration(deal.flight.totalDuration)}
              </span>

              {/* Alternative flights */}
              {deal.alternativeFlights && deal.alternativeFlights.length > 0 && (
                <p className="text-[11px] text-secondary/50 pl-5">
                  Also: {deal.alternativeFlights.slice(0, 2).map((alt, i) => (
                    <span key={alt.offerId}>
                      {i > 0 && ', '}
                      {alt.airline} £{alt.pricePerPerson}
                    </span>
                  ))}
                </p>
              )}
            </>
          ) : airlineHighlight ? (
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 flex-shrink-0 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
              {airlineHighlight}
            </span>
          ) : null}
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
            </svg>
            {deal.dates} · {deal.nights} nights
          </span>
        </div>

        {/* Ancillaries */}
        {deal.ancillaries && deal.ancillaries.length > 0 && (
          <p className="text-[11px] text-secondary/60">
            {deal.ancillaries.map((a, i) => (
              <span key={a.serviceId}>
                {i > 0 && ' · '}
                {a.category === 'bags' ? `Add bag from £${a.customerPrice}` : `Flexible cancellation £${a.customerPrice}`}
              </span>
            ))}
          </p>
        )}

        {/* Price */}
        <div className="mt-auto pt-2 border-t border-border/40">
          <div className="flex items-center gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xl sm:text-2xl font-bold text-accent">
                £{deal.pricePerPerson}
              </span>
              {savingsPct > 0 && (
                <span className="text-secondary/50 text-sm font-mono line-through">
                  £{deal.originalPrice}
                </span>
              )}
            </div>
            {deal.priceContext?.priceHistory && deal.priceContext.priceHistory.length >= 2 && (
              <PriceSparkline
                history={deal.priceContext.priceHistory}
                currentPrice={deal.pricePerPerson}
              />
            )}
            <span className="text-secondary text-xs ml-auto">per person</span>
          </div>

          {/* Price breakdown — gated behind expand link */}
          {deal.pricing && (
            breakdownOpen ? (
              <p className="text-[11px] text-secondary/60 mt-0.5">
                Flights £{deal.pricing.flightCost} · Hotel {deal.pricing.hotelEstimated ? '~' : ''}£{deal.pricing.hotelCost}
                {deal.pricing.markup > 0 && ` · £${deal.pricing.markup} booking fee`}
              </p>
            ) : (
              <button
                onClick={handleExpandBreakdown}
                className="text-[11px] text-teal hover:text-teal/80 mt-0.5 cursor-pointer transition-colors"
              >
                See cost breakdown ▼
              </button>
            )
          )}

          {/* Offer expiry */}
          {showExpiry && (
            <p className="text-[11px] text-amber-600 mt-0.5">
              Price held for {expiryHours}h
            </p>
          )}

          <p className="text-[11px] text-secondary/60 mt-1">{deal.confidenceRationale}</p>
        </div>

        {/* Tags */}
        {deal.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {deal.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-secondary capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleViewDeal}
          className="w-full bg-accent hover:bg-accent/90 text-white font-display font-medium py-3 sm:py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer mt-1"
        >
          View Deal
        </button>
      </div>
    </article>
  );
}
