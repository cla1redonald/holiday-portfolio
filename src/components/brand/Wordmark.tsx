import Logo from './Logo';

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Wordmark({ size = 'md', className = '' }: WordmarkProps) {
  const sizes = {
    sm: { logo: 24, text: 'text-lg', heart: 8 },
    md: { logo: 32, text: 'text-xl', heart: 10 },
    lg: { logo: 40, text: 'text-2xl', heart: 12 },
  };
  const s = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Logo size={s.logo} />
      <span className={`font-display font-bold tracking-tight ${s.text} relative`}>
        roam
        <span className="relative inline-block">
          i
          {/* Heart above the i — brand signature */}
          <svg
            width={s.heart}
            height={s.heart}
            viewBox="0 0 12 12"
            fill="var(--accent, #E07A5F)"
            className="absolute -top-[0.6em] left-1/2 -translate-x-1/2"
            aria-hidden="true"
          >
            <path d="M6 10.5C6 10.5 1 7 1 4C1 2.34 2.34 1 4 1C5.05 1 5.72 1.58 6 2C6.28 1.58 6.95 1 8 1C9.66 1 11 2.34 11 4C11 7 6 10.5 6 10.5Z" />
          </svg>
        </span>
      </span>
    </div>
  );
}
