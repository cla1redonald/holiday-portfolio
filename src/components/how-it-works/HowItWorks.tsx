'use client';

import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const steps = [
  {
    number: '01',
    icon: '/icons/local-experiences.png',
    title: 'Dream & Discover',
    description:
      "Let your curiosity lead. Tell Roami what moves you — quiet mountain mornings or neon-lit street food. Our friendly AI curates hidden gems, smart flights, and stays that feel like home. No more endless tabs.",
  },
  {
    number: '02',
    icon: '/icons/flight-deals.png',
    title: 'Roam without the friction',
    description:
      'Leave the logistics-stress at home. Navigate like a local with offline maps, get real-time visa guidance, and track your budget in a snap. We keep the path clear so you can keep your eyes on the horizon.',
  },
  {
    number: '03',
    icon: '/icons/travel-journal.png',
    title: 'Write your own story',
    description:
      'Every mile is a memory. Save the secret spots you found, coordinate with your crew, and archive the stories that matter. You do the wandering; we\'ll help you keep the magic.',
  },
];

export default function HowItWorks() {
  const header = useScrollReveal();
  const grid = useScrollReveal();

  return (
    <section className="py-20 bg-muted border-t border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={header.ref} className={`text-center mb-14 reveal ${header.isVisible ? 'visible' : ''}`}>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Your journey in 3 simple steps
          </h2>
          <p className="text-lg text-secondary max-w-lg mx-auto">
            From daydream to departure — effortlessly.
          </p>
        </div>

        {/* Steps */}
        <div ref={grid.ref} className={`grid grid-cols-1 md:grid-cols-3 gap-8 relative reveal-stagger ${grid.isVisible ? 'visible' : ''}`}>
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-14 left-[16.66%] right-[16.66%] h-px bg-border" aria-hidden="true" />

          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {/* Step number + icon */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-2xl bg-surface border-2 border-border flex items-center justify-center shadow-sm z-10 relative overflow-hidden">
                  <Image
                    src={step.icon}
                    alt=""
                    width={64}
                    height={64}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-teal text-white text-xs font-bold flex items-center justify-center z-20 shadow-sm">
                  {index + 1}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-secondary text-sm leading-relaxed max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
