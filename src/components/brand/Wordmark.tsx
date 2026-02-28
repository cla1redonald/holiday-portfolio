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
        viewBox="-2 -12 120 48"
        fill="none"
        className="block w-full overflow-visible"
        style={{ height: s.routeH }}
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
      >
        {/* Route: starts bottom-left, swoops up, loops into a circle, curves right to heart */}
        <path
          d="M0 34C14 34 20 14 40 6C52 0 58 -2 66 5C74 12 70 24 62 24C54 24 52 10 62 2C72 -6 86 -2 94 4C98 7 101 5 105 2"
          stroke="var(--teal, #4ECDC4)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeDasharray="0.5 6"
          fill="none"
        />
        {/* Heart — larger, at the end of the route */}
        <path
          d="M104 0C104 0 99 -8 104 -11C107 -13 110 -12 111 -9C112 -12 115 -13 118 -11C123 -8 118 0 111 6C104 0 104 0 104 0Z"
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
