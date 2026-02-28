import Logo from './Logo';

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Wordmark({ size = 'md', className = '' }: WordmarkProps) {
  const sizes = {
    sm: { logo: 24, text: 'text-lg' },
    md: { logo: 32, text: 'text-xl' },
    lg: { logo: 40, text: 'text-2xl' },
  };
  const s = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Logo size={s.logo} />
      <span className={`font-display font-bold tracking-tight ${s.text}`}>
        roami
      </span>
    </div>
  );
}
