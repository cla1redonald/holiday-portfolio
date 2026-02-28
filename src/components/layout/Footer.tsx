import Image from 'next/image';
import Wordmark from '@/components/brand/Wordmark';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-secondary text-sm">
        <div className="flex items-center gap-3">
          <Image
            src="/icons/logo-full.png"
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <Wordmark size="sm" className="text-foreground" />
        </div>
        <span>&copy; 2026 Roami</span>
        <div className="flex items-center gap-1.5">
          <span>Roam with</span>
          <Image
            src="/icons/heart-sparkle.png"
            alt="heart"
            width={18}
            height={18}
            className="w-4.5 h-4.5 object-contain inline-block"
          />
          <span>— your world, better explored</span>
        </div>
      </div>
    </footer>
  );
}
