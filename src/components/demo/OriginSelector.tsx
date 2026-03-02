'use client';

const UK_AIRPORTS = [
  { code: 'LHR', name: 'London Heathrow' },
  { code: 'LGW', name: 'London Gatwick' },
  { code: 'MAN', name: 'Manchester' },
  { code: 'STN', name: 'London Stansted' },
  { code: 'EDI', name: 'Edinburgh' },
  { code: 'BHX', name: 'Birmingham' },
  { code: 'BRS', name: 'Bristol' },
  { code: 'GLA', name: 'Glasgow' },
  { code: 'LTN', name: 'London Luton' },
] as const;

interface OriginSelectorProps {
  selected: string[];
  onChange: (origins: string[]) => void;
}

export default function OriginSelector({ selected, onChange }: OriginSelectorProps) {
  const toggle = (code: string) => {
    if (selected.includes(code)) {
      if (selected.length <= 1) return;
      onChange(selected.filter((c) => c !== code));
    } else {
      onChange([...selected, code]);
    }
  };

  return (
    <div className="mt-3">
      <p className="text-sm text-secondary mb-2">Departing from:</p>
      <div className="flex flex-wrap gap-2">
        {UK_AIRPORTS.map(({ code, name }) => {
          const isSelected = selected.includes(code);
          return (
            <button
              key={code}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggle(code)}
              title={name}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-accent/10 text-accent border border-accent/20'
                  : 'bg-muted text-secondary border border-border hover:border-accent/30 hover:text-foreground'
              }`}
            >
              {code}
            </button>
          );
        })}
      </div>
    </div>
  );
}
