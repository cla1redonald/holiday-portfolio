'use client';

import { useState } from 'react';
import type { Deal, PassengerDetails } from '@/types';
import PassengerForm from './PassengerForm';

interface BookingFormProps {
  deal: Deal;
  travellers: number;
  onComplete: (passengers: PassengerDetails[]) => void;
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

export default function BookingForm({ deal: _deal, travellers, onComplete }: BookingFormProps) {
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
    onComplete(passengers);
  };

  return (
    <div className="bg-surface rounded-2xl border border-border/60 p-5 space-y-6">
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
    </div>
  );
}
