// USP icon components — 24x24, 2px stroke, rounded caps/joins, currentColor

export function PriceTagIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Price tag shape */}
      <path d="M12.5 2H19a1 1 0 011 1v6.5a1 1 0 01-.29.71l-8.5 8.5a2 2 0 01-2.83 0l-4.58-4.59a2 2 0 010-2.83L12.5 2z" />
      {/* Tag hole */}
      <circle cx="16.5" cy="7.5" r="1.5" />
      {/* Checkmark on tag */}
      <path d="M9 12l1.5 1.5L13 11" strokeWidth="1.8" />
    </svg>
  );
}

export function CalendarYearIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Calendar body */}
      <rect x="3" y="4" width="18" height="18" rx="3" />
      {/* Header bar */}
      <path d="M3 9h18" />
      {/* Calendar pins */}
      <path d="M8 2v4M16 2v4" />
      {/* 12 dots representing months */}
      <circle cx="7.5" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="7.5" cy="17" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="17" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ShieldIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Shield */}
      <path d="M12 2L4 5.5v6.5c0 4.5 3.4 8.7 8 9.5 4.6-.8 8-5 8-9.5V5.5L12 2z" />
      {/* Tick */}
      <path d="M9 12l2 2 4-4" strokeWidth="2.2" />
    </svg>
  );
}

export function EyeIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Eye outline */}
      <path d="M2 12c2-5 5.5-8 10-8s8 3 10 8c-2 5-5.5 8-10 8S4 17 2 12z" />
      {/* Pupil */}
      <circle cx="12" cy="12" r="3" />
      {/* Sparkle top-right */}
      <path d="M18 5l.5-1.5.5 1.5M19 3.5h-1" strokeWidth="1.5" />
      {/* Sparkle small */}
      <path d="M20 8l.3-1 .3 1M20.6 7.5h-.6" strokeWidth="1.3" />
    </svg>
  );
}

export function BellAlertIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Bell body */}
      <path d="M15 17H9a3 3 0 01-3-3V9a6 6 0 1112 0v5a3 3 0 01-3 3z" />
      {/* Clapper */}
      <path d="M10.5 17c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5" />
      {/* Radiating lines */}
      <path d="M4 9.5C4 6 7.5 3 12 3M20 9.5C20 6 16.5 3 12 3" strokeOpacity="0.5" />
    </svg>
  );
}

export function PackageIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Back ticket/card */}
      <rect x="5" y="6" width="14" height="10" rx="2.5" strokeOpacity="0.4" />
      {/* Front ticket/card */}
      <rect x="3" y="8" width="14" height="10" rx="2.5" />
      {/* Ticket perforation line */}
      <path d="M3 13h14" strokeDasharray="2 2" />
      {/* Plane icon on ticket */}
      <path d="M8 11.5l2-1.5 2 1.5" strokeWidth="1.5" strokeOpacity="0.7" />
    </svg>
  );
}
