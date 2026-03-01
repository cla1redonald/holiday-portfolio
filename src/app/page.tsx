'use client';

import { Suspense, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NlpSearchDemo from '@/components/demo/NlpSearchDemo';
import WaitlistForm from '@/components/waitlist/WaitlistForm';

function HomeContent() {
  const [lastQuery, setLastQuery] = useState('');

  return (
    <>
      <Header />
      <main>
        <NlpSearchDemo onQueryChange={setLastQuery} />
        <WaitlistForm lastQuery={lastQuery} />
      </main>
      <Footer />
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <HomeContent />
    </Suspense>
  );
}
