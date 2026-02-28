// USP icon components — from Roami brand style guide
// Two-tone: coral (#E07A5F) primary strokes + teal (#4ECDC4) accent details

export function HiddenGemsIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="11" cy="11" r="7" stroke="var(--accent, #E07A5F)" strokeWidth="2" />
      <path d="M11 8L12 11L15 12L12 13L11 16L10 13L7 12L10 11L11 8Z" fill="var(--teal, #4ECDC4)" />
      <path d="M20 20L16 16" stroke="var(--accent, #E07A5F)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function BudgetTrackerIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="var(--accent, #E07A5F)" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" stroke="var(--teal, #4ECDC4)" strokeWidth="2" />
    </svg>
  );
}

export function ExpertSupportIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.5 3.5 15 4.5 16.5L3 21L7.5 19.5" stroke="var(--accent, #E07A5F)" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 12C9 12 10 13.5 12 13.5C14 13.5 15 12 15 12" stroke="var(--teal, #4ECDC4)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PriceAlertIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M18 8C18 4.68629 15.3137 2 12 2C8.68629 2 6 4.68629 6 8V11C6 13 4 15 4 15H20" stroke="var(--accent, #E07A5F)" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19" stroke="var(--teal, #4ECDC4)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function FlightDealsIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M21 12L15 20H13L15 12H7L4 15H2L4 12L2 9H4L7 12H15L13 4H15L21 12Z" stroke="var(--accent, #E07A5F)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19" cy="19" r="3" stroke="var(--teal, #4ECDC4)" strokeWidth="2" />
    </svg>
  );
}

export function HotelFindsIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17" stroke="var(--accent, #E07A5F)" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 14H21" stroke="var(--accent, #E07A5F)" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 10H11" stroke="var(--teal, #4ECDC4)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function EcoTravelIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21" stroke="var(--accent, #E07A5F)" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 21V12C12 9 15 7 18 7" stroke="var(--teal, #4ECDC4)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function LocalStaysIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 10L12 3L21 10V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10Z" stroke="var(--accent, #E07A5F)" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 21V12H15V21" stroke="var(--teal, #4ECDC4)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
