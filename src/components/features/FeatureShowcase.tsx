'use client';

import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const pillars = [
  {
    title: 'Smart Planning',
    accent: 'bg-accent/10 border-accent/20',
    features: [
      { icon: '/icons/flight-deals.png', label: 'Flights' },
      { icon: '/icons/hotel-finds.png', label: 'Stays' },
      { icon: '/icons/packing-list.png', label: 'Packing' },
      { icon: '/icons/road-trips.png', label: 'Road trips' },
    ],
  },
  {
    title: 'Authentic Discovery',
    accent: 'bg-teal/10 border-teal/20',
    features: [
      { icon: '/icons/hidden-gems.png', label: 'Hidden gems' },
      { icon: '/icons/local-eats.png', label: 'Local eats' },
      { icon: '/icons/local-experiences.png', label: 'Experiences' },
      { icon: '/icons/eco-travel.png', label: 'Sustainable' },
    ],
  },
  {
    title: 'Seamless Utility',
    accent: 'bg-accent/10 border-accent/20',
    features: [
      { icon: '/icons/passport-check.png', label: 'Visa' },
      { icon: '/icons/currency-converter.png', label: 'Currency' },
      { icon: '/icons/budget-tracker.png', label: 'Budget' },
      { icon: '/icons/price-alerts.png', label: 'Alerts' },
    ],
  },
  {
    title: 'Travel Your Way',
    accent: 'bg-teal/10 border-teal/20',
    features: [
      { icon: '/icons/heart-sparkle.png', label: 'Solo' },
      { icon: '/icons/group-travel.png', label: 'Group' },
      { icon: '/icons/travel-journal.png', label: 'Journal' },
      { icon: '/icons/expert-support.png', label: 'Support' },
    ],
  },
];

export default function FeatureShowcase() {
  const header = useScrollReveal();
  const grid = useScrollReveal();

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={header.ref} className={`text-center mb-12 reveal ${header.isVisible ? 'visible' : ''}`}>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Everything for the journey
          </h2>
          <p className="text-secondary text-base max-w-md mx-auto">
            From daydream to departure to the diary entry after — we&apos;ve got you.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div ref={grid.ref} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger ${grid.isVisible ? 'visible' : ''}`}>
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className={`rounded-3xl p-5 border transition-all duration-200 hover:-translate-y-1 ${pillar.accent}`}
            >
              <h3 className="font-display font-semibold text-foreground text-sm mb-4 text-center">
                {pillar.title}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {pillar.features.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm">
                      <Image
                        src={feature.icon}
                        alt=""
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <span className="text-[11px] text-secondary text-center leading-tight font-medium">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
