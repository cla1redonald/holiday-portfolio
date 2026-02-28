const steps = [
  {
    number: '01',
    icon: '💬',
    title: 'Tell us how you travel',
    description:
      "Type naturally — 'somewhere warm, great food, under £400'. No filters, no dropdowns. Just say what you want.",
  },
  {
    number: '02',
    icon: '🎯',
    title: 'Deals scored for you',
    description:
      'Every deal gets a confidence score based on YOUR preferences, not just price. See exactly why we think it\'s a good fit.',
  },
  {
    number: '03',
    icon: '🧠',
    title: 'Your feed gets smarter',
    description:
      'The more you search, the better we know you. Your deal feed becomes uniquely yours — no two feeds look the same.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-muted border-t border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            How it works
          </h2>
          <p className="text-lg text-secondary max-w-lg mx-auto">
            Three steps from idea to itinerary — in seconds, not hours.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-px bg-border" aria-hidden="true" />

          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {/* Step number + icon */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-surface border-2 border-border flex items-center justify-center text-3xl shadow-sm z-10 relative">
                  {step.icon}
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-teal text-white text-xs font-bold flex items-center justify-center z-20">
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
