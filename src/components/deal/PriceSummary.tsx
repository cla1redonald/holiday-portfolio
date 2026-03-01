'use client';

import { useState } from 'react';
import type { Deal, DealAncillary } from '@/types';
import AncillarySelector from './AncillarySelector';
import ProTeaser from './ProTeaser';
import { trackBreakdownClick } from '@/lib/session-preferences';

interface PriceSummaryProps {
  deal: Deal;
  onBook: () => void;
}

export default function PriceSummary({ deal, onBook }: PriceSummaryProps) {
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [selectedAncillaries, setSelectedAncillaries] = useState<Set<string>>(new Set());

  const handleExpandBreakdown = () => {
    setBreakdownOpen(true);
    trackBreakdownClick();
  };

  const toggleAncillary = (serviceId: string) => {
    setSelectedAncillaries(prev => {
      const next = new Set(prev);
      if (next.has(serviceId)) next.delete(serviceId);
      else next.add(serviceId);
      return next;
    });
  };

  // Calculate total with selected ancillaries
  const ancillaryTotal = (deal.ancillaries ?? [])
    .filter((a: DealAncillary) => selectedAncillaries.has(a.serviceId))
    .reduce((sum: number, a: DealAncillary) => sum + a.customerPrice, 0);

  const totalWithExtras = deal.pricePerPerson + ancillaryTotal;

  const savings = deal.originalPrice - deal.pricePerPerson;
  const savingsPct = deal.originalPrice > deal.pricePerPerson
    ? Math.round((savings / deal.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-surface rounded-2xl border border-border/60 p-5 space-y-4">
      {/* Total price */}
      <div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-3xl font-bold text-accent">
            £{totalWithExtras}
          </span>
          {savingsPct > 0 && (
            <span className="text-secondary/50 text-sm font-mono line-through">
              £{deal.originalPrice}
            </span>
          )}
        </div>
        <p className="text-secondary text-sm mt-0.5">per person</p>
      </div>

      {/* Expandable breakdown */}
      {deal.pricing && (
        breakdownOpen ? (
          <div className="bg-muted rounded-xl p-3 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-secondary">Flights</span>
              <span className="font-mono text-foreground">£{deal.pricing.flightCost}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary">Hotel {deal.pricing.hotelEstimated && <span className="text-[10px]">(est.)</span>}</span>
              <span className="font-mono text-foreground">£{deal.pricing.hotelCost}</span>
            </div>
            {deal.pricing.markup > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Booking fee</span>
                <span className="font-mono text-foreground">£{deal.pricing.markup}</span>
              </div>
            )}
            {ancillaryTotal > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Extras</span>
                <span className="font-mono text-foreground">£{ancillaryTotal}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-semibold pt-1.5 border-t border-border/40">
              <span className="text-foreground">Total</span>
              <span className="font-mono text-accent">£{totalWithExtras}</span>
            </div>
          </div>
        ) : (
          <button
            onClick={handleExpandBreakdown}
            className="text-sm text-teal hover:text-teal/80 cursor-pointer transition-colors flex items-center gap-1"
          >
            See cost breakdown
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )
      )}

      {/* Ancillaries */}
      {deal.ancillaries && deal.ancillaries.length > 0 && (
        <AncillarySelector
          ancillaries={deal.ancillaries}
          selected={selectedAncillaries}
          onToggle={toggleAncillary}
        />
      )}

      {/* Confidence rationale */}
      <p className="text-[11px] text-secondary/60">{deal.confidenceRationale}</p>

      {/* CTA */}
      <button
        onClick={onBook}
        className="w-full bg-accent hover:bg-accent/90 text-white font-display font-semibold py-3 rounded-xl text-sm transition-all duration-200 cursor-pointer"
      >
        Book This Deal
      </button>

      {/* Pro teaser — appears after breakdown is expanded */}
      {breakdownOpen && <ProTeaser />}
    </div>
  );
}
