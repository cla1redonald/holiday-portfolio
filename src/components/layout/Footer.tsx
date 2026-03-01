import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-secondary text-sm">
        <Image
          src="/icons/logo-full.png"
          alt="Roami"
          width={90}
          height={36}
          className="h-8 w-auto object-contain"
        />
        <span>&copy; 2026 Roami</span>
        <span>Your world, better explored.</span>
      </div>
    </footer>
  );
}
