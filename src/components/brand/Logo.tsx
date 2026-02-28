'use client';

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = '' }: LogoProps) {
  const scale = size / 60;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer dashed orbit — teal */}
      <path
        d="M10 30C10 18.9543 18.9543 10 30 10C41.0457 10 50 18.9543 50 30C50 41.0457 41.0457 50 30 50"
        stroke="var(--teal, #4ECDC4)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="0.1 6"
      />
      {/* Inner circle — coral */}
      <circle cx="30" cy="30" r="12" stroke="var(--accent, #E07A5F)" strokeWidth="3" fill="none" />
      {/* Map pin — coral */}
      <path
        d="M43 17C43 15.3431 44.3431 14 46 14C47.6569 14 49 15.3431 49 17C49 20 46 23 46 23C46 23 43 20 43 17Z"
        fill="var(--accent, #E07A5F)"
      />
    </svg>
  );
}
