'use client';

import { useVariant } from '@/lib/useVariant';

export default function HeroSection() {
  const variant = useVariant();

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-accent opacity-5 blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-accent opacity-5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-border opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-border opacity-15" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 text-sm text-secondary mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>Early access — join the waitlist</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.1] mb-6">
          {variant.headline.split(' — ').length > 1 ? (
            <>
              {variant.headline.split(' — ')[0]}
              <span className="text-accent"> — </span>
              {variant.headline.split(' — ')[1]}
            </>
          ) : (
            variant.headline
          )}
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
            className="flex flex-col items-center gap-2 text-secondary hover:text-accent transition-colors cursor-pointer"
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
