'use client';

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Globe */}
      <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="20" cy="20" rx="8" ry="14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 20h28" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12h24" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M8 28h24" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {/* Travel route - dotted arc */}
      <path
        d="M12 10C16 2 28 2 32 12"
        stroke="var(--accent, #E07A5F)"
        strokeWidth="2"
        strokeDasharray="3 3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Pin/heart at destination */}
      <circle cx="32" cy="12" r="3" fill="var(--accent, #E07A5F)" />
      <circle cx="32" cy="12" r="1.5" fill="white" />
    </svg>
  );
}
