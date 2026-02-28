import Image from 'next/image';

interface UspItem {
  icon: string;
  title: string;
  description: string;
}

const usps: UspItem[] = [
  {
    icon: '/icons/hidden-gems.png',
    title: 'Discover smart value',
    description:
      'Find deals worth taking, not just cheap flights. Every price is scored against 90-day averages so you know when it\'s genuinely good.',
  },
  {
    icon: '/icons/budget-tracker.png',
    title: 'Your year of wandering, planned',
    description:
      'Track your travel budget, trips booked, and what fits next. Not trip-by-trip — year-by-year. One view, no spreadsheets.',
  },
  {
    icon: '/icons/passport-check.png',
    title: 'UK-native. ATOL-protected.',
    description:
      'Built for UK travellers. Package holidays come with ATOL protection as standard. We\'ve got you — no small print surprises.',
  },
  {
    icon: '/icons/heart-sparkle.png',
    title: 'Your preferences, visible',
    description:
      'See exactly what we think you like — and correct us. Your preference profile is transparent, editable, and always yours.',
  },
  {
    icon: '/icons/price-alerts.png',
    title: 'Alerts that spark joy',
    description:
      'Porto hit £240 for your May dates? We\'ll tell you. Only deals you\'d actually want — not every deal on the internet.',
  },
  {
    icon: '/icons/hotel-finds.png',
    title: 'Packages, effortlessly assembled',
    description:
      'Flights, hotels, transfers — combined from the best sources. Better prices, less hassle, more time deciding what to eat.',
  },
];

export default function UspSection() {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Why Roami?
          </h2>
          <p className="text-lg text-secondary max-w-lg mx-auto">
            Everything a modern wanderer needs — finally in one place.
          </p>
        </div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp, index) => {
            return (
              <div
                key={index}
                className="bg-surface border border-border rounded-3xl p-6 hover:border-accent card-shadow hover:card-shadow-hover transition-all duration-200 group"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                  <Image
                    src={usp.icon}
                    alt=""
                    width={56}
                    height={56}
                    className="w-14 h-14 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-200"
                  />
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
