interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Wordmark({ size = 'md', className = '' }: WordmarkProps) {
  const sizes = {
    sm: { text: 'text-xl', routeH: 24 },
    md: { text: 'text-2xl', routeH: 32 },
    lg: { text: 'text-4xl', routeH: 48 },
  };
  const s = sizes[size];

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Dashed travel route + heart — decorative overlay above text */}
      <svg
        viewBox="0 -16 120 50"
        fill="none"
        className="block w-full overflow-visible"
        style={{ height: s.routeH }}
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
      >
        {/* Route: starts left, swoops up, loops into a full circle, curves right to heart */}
        <path
          d="M2 32C12 32 18 18 32 10C42 4 48 2 52 6C56 10 56 18 52 22C48 26 44 24 44 20C44 16 48 10 56 4C64 -2 76 -2 88 2C94 5 98 4 102 1"
          stroke="var(--teal, #4ECDC4)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="4 5"
          fill="none"
        />
        {/* Heart — at the end of the route */}
        <path
          d="M101 -1C101 -1 97 -7 101 -10C103.5 -12 106 -11 107 -8.5C108 -11 110.5 -12 113 -10C117 -7 113 -1 107 4C101 -1 101 -1 101 -1Z"
          fill="var(--accent, #E07A5F)"
        />
      </svg>

      {/* Text — DM Sans via font-display */}
      <span className={`font-display font-extrabold tracking-tight ${s.text} text-foreground leading-none block`}>
        roami
      </span>
    </div>
  );
}
