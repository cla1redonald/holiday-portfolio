import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/hero/HeroSection';
import NlpSearchDemo from '@/components/demo/NlpSearchDemo';
import HowItWorks from '@/components/how-it-works/HowItWorks';
import UspSection from '@/components/usps/UspSection';
import WaitlistForm from '@/components/waitlist/WaitlistForm';

export default function HomePage() {
  return (
    <Suspense>
      <Header />
      <main>
        <HeroSection />
        <NlpSearchDemo />
        <HowItWorks />
        <UspSection />
        <WaitlistForm />
      </main>
      <Footer />
    </Suspense>
  );
}
