'use client';

import Image from 'next/image';
import { useVariant } from '@/lib/useVariant';

export default function HeroSection() {
  const variant = useVariant();

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Decorative travel route background pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Dotted curved routes */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-30" preserveAspectRatio="xMidYMid slice">
          <path
            d="M-50 200 C100 80 250 320 450 150 C650 -20 800 280 1000 180"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="8 6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M-100 500 C150 380 300 600 500 450 C700 300 850 520 1100 400"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="8 6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Small dots at route endpoints */}
          <circle cx="120" cy="110" r="5" fill="var(--teal, #4ECDC4)" opacity="0.6" />
          <circle cx="450" cy="150" r="5" fill="var(--accent, #E07A5F)" opacity="0.6" />
          <circle cx="850" cy="220" r="4" fill="var(--teal, #4ECDC4)" opacity="0.5" />
          <circle cx="200" cy="450" r="4" fill="var(--accent, #E07A5F)" opacity="0.4" />
          <circle cx="600" cy="380" r="5" fill="var(--teal, #4ECDC4)" opacity="0.5" />
        </svg>
      </div>

      {/* Floating decorative illustrations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Traveller group — left side, partially visible */}
        <div className="hidden lg:block absolute left-6 xl:left-16 bottom-1/4 opacity-15">
          <Image
            src="/icons/traveller-group.png"
            alt=""
            width={200}
            height={200}
            className="w-40 xl:w-48 h-auto"
          />
        </div>
        {/* Group travel icon — right side */}
        <div className="hidden lg:block absolute right-6 xl:right-16 top-1/3 opacity-15">
          <Image
            src="/icons/group-travel.png"
            alt=""
            width={160}
            height={160}
            className="w-32 xl:w-40 h-auto"
          />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-surface border border-teal rounded-full px-4 py-1.5 text-sm text-secondary mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>Early access — join the waitlist</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.1] mb-6">
          {(() => {
            const parts = variant.headline.split(' — ');
            return parts.length > 1 ? (
              <>
                {parts[0]}
                <span className="text-accent"> — </span>
                {parts.slice(1).join(' — ')}
              </>
            ) : (
              variant.headline
            );
          })()}
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          {variant.subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToDemo}
            className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto"
          >
            Try it now — it&apos;s free
          </button>
          <button
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-foreground font-medium px-8 py-3.5 rounded-xl text-base border border-border hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer w-full sm:w-auto bg-surface"
          >
            Join Waitlist
          </button>
        </div>

        {/* Social proof */}
        <p className="mt-8 text-sm text-secondary">
          No credit card required · Free forever for early members
        </p>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={scrollToDemo}
            className="flex flex-col items-center gap-2 text-secondary hover:text-teal transition-colors cursor-pointer"
            aria-label="Scroll to demo"
          >
            <span className="text-xs uppercase tracking-widest">See the demo</span>
            <svg
              className="w-5 h-5 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
