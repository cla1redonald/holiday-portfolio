import Image from 'next/image';

const pillars = [
  {
    title: 'Smart Planning',
    features: [
      { icon: '/icons/flight-deals.png', label: 'Flights' },
      { icon: '/icons/hotel-finds.png', label: 'Stays' },
      { icon: '/icons/packing-list.png', label: 'Packing' },
      { icon: '/icons/road-trips.png', label: 'Road trips' },
    ],
  },
  {
    title: 'Authentic Discovery',
    features: [
      { icon: '/icons/hidden-gems.png', label: 'Hidden gems' },
      { icon: '/icons/local-eats.png', label: 'Local eats' },
      { icon: '/icons/local-experiences.png', label: 'Experiences' },
      { icon: '/icons/eco-travel.png', label: 'Sustainable' },
    ],
  },
  {
    title: 'Seamless Utility',
    features: [
      { icon: '/icons/passport-check.png', label: 'Visa' },
      { icon: '/icons/currency-converter.png', label: 'Currency' },
      { icon: '/icons/budget-tracker.png', label: 'Budget' },
      { icon: '/icons/price-alerts.png', label: 'Alerts' },
    ],
  },
  {
    title: 'Travel Your Way',
    features: [
      { icon: '/icons/heart-sparkle.png', label: 'Solo' },
      { icon: '/icons/group-travel.png', label: 'Group' },
      { icon: '/icons/travel-journal.png', label: 'Journal' },
      { icon: '/icons/expert-support.png', label: 'Support' },
    ],
  },
];

export default function FeatureShowcase() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Everything for the journey
          </h2>
          <p className="text-secondary text-base max-w-md mx-auto">
            From daydream to departure to the diary entry after — we&apos;ve got you.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-surface border border-border rounded-3xl p-5 hover:border-accent/40 transition-all duration-200"
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
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
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

        {/* Heart sparkle text banner */}
        <div className="mt-12 flex justify-center">
          <div className="relative bg-muted border border-border rounded-2xl px-6 py-4 sm:px-10 sm:py-5 flex items-center gap-5 max-w-lg">
            <Image
              src="/icons/heart-sparkle-text.png"
              alt="Plan smart, save for later. Track fares, never overpay."
              width={280}
              height={100}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
