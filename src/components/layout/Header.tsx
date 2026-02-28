'use client';

import { useEffect, useState } from 'react';
import Wordmark from '@/components/brand/Wordmark';

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
        scrolled ? 'bg-surface shadow-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="text-foreground hover:text-accent transition-colors">
          <Wordmark size="md" />
        </a>
        <button
          onClick={scrollToWaitlist}
          className="bg-accent hover:bg-accent-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          Join Waitlist
        </button>
      </nav>
    </header>
  );
}
