'use client';

import {
  HiddenGemsIcon,
  BudgetTrackerIcon,
  ExpertSupportIcon,
  PriceAlertIcon,
  FlightDealsIcon,
  HotelFindsIcon,
} from '@/components/icons/UspIcons';
import { ComponentType } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface UspItem {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const usps: UspItem[] = [
  {
    icon: HiddenGemsIcon,
    title: 'Discover smart value',
    description:
      'Find deals worth taking, not just cheap flights. Every price is scored against 90-day averages so you know when it\'s genuinely good.',
  },
  {
    icon: BudgetTrackerIcon,
    title: 'Your year of wandering, planned',
    description:
      'Track your travel budget, trips booked, and what fits next. Not trip-by-trip — year-by-year. One view, no spreadsheets.',
  },
  {
    icon: ExpertSupportIcon,
    title: 'UK-native. ATOL-protected.',
    description:
      'Built for UK travellers. Package holidays come with ATOL protection as standard. We\'ve got you — no small print surprises.',
  },
  {
    icon: FlightDealsIcon,
    title: 'Your preferences, visible',
    description:
      'See exactly what we think you like — and correct us. Your preference profile is transparent, editable, and always yours.',
  },
  {
    icon: PriceAlertIcon,
    title: 'Alerts that spark joy',
    description:
      'Porto hit £240 for your May dates? We\'ll tell you. Only deals you\'d actually want — not every deal on the internet.',
  },
  {
    icon: HotelFindsIcon,
    title: 'Packages, effortlessly assembled',
    description:
      'Flights, hotels, transfers — combined from the best sources. Better prices, less hassle, more time deciding what to eat.',
  },
];

export default function UspSection() {
  const header = useScrollReveal();
  const grid = useScrollReveal();

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={header.ref} className={`text-center mb-14 reveal ${header.isVisible ? 'visible' : ''}`}>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Why Roami?
          </h2>
          <p className="text-lg text-secondary max-w-lg mx-auto">
            Everything a modern wanderer needs — finally in one place.
          </p>
        </div>

        {/* USP Grid */}
        <div ref={grid.ref} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger ${grid.isVisible ? 'visible' : ''}`}>
          {usps.map((usp, index) => {
            const Icon = usp.icon;
            const iconBg = index % 2 === 0 ? 'bg-accent/10' : 'bg-teal/10';
            return (
              <div
                key={index}
                className="bg-surface border border-border rounded-3xl p-6 hover:border-accent card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${iconBg} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground text-base mb-2">{usp.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{usp.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
