export default function TravelRoute({ className = '' }: { className?: string }) {
  return (
    <div className={`flex justify-center py-4 ${className}`} aria-hidden="true">
      <svg width="200" height="40" viewBox="0 0 200 40" fill="none">
        <path
          d="M10 30C40 5 80 35 100 15C120 -5 160 25 190 10"
          stroke="var(--border)"
          strokeWidth="2"
          strokeDasharray="6 4"
          strokeLinecap="round"
        />
        <circle cx="10" cy="30" r="4" fill="var(--teal, #4ECDC4)" />
        <circle cx="190" cy="10" r="4" fill="var(--accent, #E07A5F)" />
      </svg>
    </div>
  );
}
