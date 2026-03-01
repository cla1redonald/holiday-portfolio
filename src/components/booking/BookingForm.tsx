'use client';

import { useState } from 'react';
import type { Deal, PassengerDetails } from '@/types';
import PassengerForm from './PassengerForm';
import PaymentSection from './PaymentSection';

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

type Step = 'passengers' | 'payment' | 'confirming' | 'confirmed' | 'error';

export default function BookingForm({ deal, travellers }: BookingFormProps) {
  const [step, setStep] = useState<Step>('passengers');
  const [passengers, setPassengers] = useState<PassengerDetails[]>(
    Array.from({ length: Math.max(travellers, 1) }, () => createEmptyPassenger())
  );
  const [error, setError] = useState<string | null>(null);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleContinueToPayment = () => {
    if (!isValid) return;
    setError(null);
    setStep('payment');
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    setError(null);

    try {
      const offerId = deal.flight?.duffelOfferId;
      if (!offerId) {
        setError('No flight offer available for booking');
        setLoading(false);
        return;
      }

      const res = await fetch('/api/booking/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offerId,
          passengers: passengers.map(p => ({
            type: 'adult',
            title: p.title,
            given_name: p.givenName,
            family_name: p.familyName,
            born_on: p.bornOn,
            gender: p.gender,
            email: p.email || passengers[0].email,
            phone_number: p.phoneNumber || passengers[0].phoneNumber,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Booking confirmation failed');
      }

      const { bookingReference } = await res.json();
      setBookingRef(bookingReference);
      setStep('confirmed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed');
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'confirmed' && bookingRef) {
    return (
      <div className="bg-surface rounded-2xl border border-border/60 p-6 text-center space-y-4">
        <div className="text-4xl">🎉</div>
        <h2 className="font-display text-xl font-bold text-foreground">Booking confirmed!</h2>
        <p className="text-sm text-secondary">
          Your reference: <span className="font-mono font-semibold text-foreground">{bookingRef}</span>
        </p>
        <p className="text-sm text-secondary">
          You&apos;ll receive a confirmation email from the airline shortly.
        </p>
        <a
          href="/"
          className="inline-block bg-accent hover:bg-accent/90 text-white font-display font-medium px-6 py-2.5 rounded-xl text-sm transition-all duration-200"
        >
          Search more deals
        </a>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl border border-border/60 p-5 space-y-6">
      <h2 className="font-display text-lg font-bold text-foreground">
        {step === 'passengers' ? 'Passenger details' : 'Review & pay'}
      </h2>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">
          {error}
        </div>
      )}

      {step === 'passengers' && (
        <>
          {passengers.map((p, i) => (
            <PassengerForm key={i} index={i} value={p} onChange={updatePassenger} />
          ))}
          <button
            onClick={handleContinueToPayment}
            disabled={!isValid}
            className="w-full bg-accent hover:bg-accent/90 disabled:bg-secondary/30 disabled:cursor-not-allowed text-white font-display font-semibold py-3 rounded-xl text-sm transition-all duration-200 cursor-pointer"
          >
            Continue to payment
          </button>
        </>
      )}

      {(step === 'payment' || step === 'error') && (
        <PaymentSection
          totalAmount={deal.pricePerPerson * Math.max(travellers, 1)}
          onConfirm={handleConfirmBooking}
          loading={loading}
        />
      )}
    </div>
  );
}
