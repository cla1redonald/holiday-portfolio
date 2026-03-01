import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border/50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-secondary/60 text-sm">
        <Image
          src="/icons/logo-full.png"
          alt="Roami"
          width={80}
          height={32}
          className="h-7 w-auto object-contain opacity-60"
        />
        <span>&copy; 2026 Roami</span>
        <span className="font-display text-secondary/40">Your world, better explored.</span>
      </div>
    </footer>
  );
}
