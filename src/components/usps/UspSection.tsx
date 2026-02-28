const usps = [
  {
    icon: '💸',
    title: 'Price-first discovery',
    description:
      'Find great deals, not just destinations. Every price is scored against 90-day historic averages so you know when it\'s genuinely good.',
  },
  {
    icon: '📅',
    title: 'Your year of travel, planned',
    description:
      'Track your travel budget, trips booked, and what fits next. Not trip-by-trip — year-by-year. One view, no spreadsheets.',
  },
  {
    icon: '🔒',
    title: 'UK-native, ATOL-protected',
    description:
      'Built for UK travellers. Package holidays come with ATOL protection as standard. No small print surprises.',
  },
  {
    icon: '👁️',
    title: 'Visible preferences',
    description:
      'See exactly what we think you like — and correct us. Your preference profile is transparent, editable, and always yours.',
  },
  {
    icon: '🔔',
    title: 'Deal alerts that matter',
    description:
      'Porto hit £240 for your May dates? We\'ll tell you. Only deals YOU\'d actually want — not every deal on the internet.',
  },
  {
    icon: '✈️',
    title: 'Packages assembled for you',
    description:
      'Flights, hotels, transfers combined from the best sources. Better prices, less hassle, more time planning what to eat.',
  },
];

export default function UspSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Why Holiday Portfolio?
          </h2>
          <p className="text-lg text-secondary max-w-lg mx-auto">
            Everything a frequent city-breaker actually needs — finally in one place.
          </p>
        </div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-2xl p-6 hover:border-accent hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-2xl mb-4 group-hover:border-accent transition-colors duration-200">
                {usp.icon}
              </div>
              <h3 className="font-semibold text-foreground text-base mb-2">{usp.title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{usp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
