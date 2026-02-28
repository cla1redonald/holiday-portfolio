'use client';

import { Suspense, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/hero/HeroSection';
import NlpSearchDemo from '@/components/demo/NlpSearchDemo';
import HowItWorks from '@/components/how-it-works/HowItWorks';
import UspSection from '@/components/usps/UspSection';
import FeatureShowcase from '@/components/features/FeatureShowcase';
import WaitlistForm from '@/components/waitlist/WaitlistForm';
import TravelRoute from '@/components/brand/TravelRoute';

function HomeContent() {
  const [lastQuery, setLastQuery] = useState('');

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <NlpSearchDemo onQueryChange={setLastQuery} />
        <TravelRoute />
        <HowItWorks />
        <UspSection />
        <TravelRoute />
        <FeatureShowcase />
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
