'use client';

import { useState } from 'react';
import type { Deal, PassengerDetails } from '@/types';
import PassengerForm from './PassengerForm';
import ContactSection from './ContactSection';

interface BookingFormProps {
  deal: Deal;
  travellers: number;
}

function createEmptyPassenger(): PassengerDetails {
  return {
    title: 'mr',
    givenName: '',
    familyName: '',
    bornOn: '',
    gender: 'm',
    email: '',
    phoneNumber: '',
  };
}

type Step = 'passengers' | 'contact';

export default function BookingForm({ deal, travellers }: BookingFormProps) {
  const [step, setStep] = useState<Step>('passengers');
  const [passengers, setPassengers] = useState<PassengerDetails[]>(
    Array.from({ length: Math.max(travellers, 1) }, () => createEmptyPassenger())
  );

  const updatePassenger = (index: number, updated: PassengerDetails) => {
    setPassengers(prev => {
      const next = [...prev];
      next[index] = updated;
      return next;
    });
  };

  const isValid = passengers.every(p =>
    p.givenName.trim() && p.familyName.trim() && p.bornOn
  ) && passengers[0].email.trim();

  const handleContinue = () => {
    if (!isValid) return;
    setStep('contact');

    // Track booking intent
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'booking_intent',
        dealId: deal.id,
        destination: deal.destination,
        travellers,
      }),
    }).catch(() => {});
  };

  return (
    <div className="bg-surface rounded-2xl border border-border/60 p-5 space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-3">
        <div className={`flex items-center gap-2 text-sm font-medium ${step === 'passengers' ? 'text-accent' : 'text-secondary'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 'passengers' ? 'bg-accent text-white' : 'bg-accent/10 text-accent'}`}>1</span>
          Passengers
        </div>
        <div className="h-px flex-1 bg-border/60" />
        <div className={`flex items-center gap-2 text-sm font-medium ${step === 'contact' ? 'text-accent' : 'text-secondary'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 'contact' ? 'bg-accent text-white' : 'bg-border text-secondary'}`}>2</span>
          Book
        </div>
      </div>

      {step === 'passengers' && (
        <>
          <h2 className="font-display text-lg font-bold text-foreground">Passenger details</h2>
          {passengers.map((p, i) => (
            <PassengerForm key={i} index={i} value={p} onChange={updatePassenger} />
          ))}
          <button
            onClick={handleContinue}
            disabled={!isValid}
            className="w-full bg-accent hover:bg-accent/90 disabled:bg-secondary/30 disabled:cursor-not-allowed text-white font-display font-semibold py-3 rounded-xl text-sm transition-all duration-200 cursor-pointer"
          >
            Continue
          </button>
        </>
      )}

      {step === 'contact' && (
        <ContactSection
          deal={deal}
          passengers={passengers}
          travellers={travellers}
          onBack={() => setStep('passengers')}
        />
      )}
    </div>
  );
}
