'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/95 backdrop-blur-md shadow-sm border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="hover:opacity-80 transition-opacity">
          <Image
            src="/icons/logo-full.png"
            alt="Roami"
            width={120}
            height={48}
            className="h-9 w-auto object-contain"
            priority
          />
        </a>
        <button
          onClick={scrollToWaitlist}
          className="bg-foreground hover:bg-foreground/90 text-white text-sm font-display font-medium px-5 py-2 rounded-lg transition-all duration-200 cursor-pointer"
        >
          Join Waitlist
        </button>
      </nav>
    </header>
  );
}
