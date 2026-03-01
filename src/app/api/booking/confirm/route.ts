import { NextRequest, NextResponse } from 'next/server';
import { getDuffel } from '@/lib/duffel-client';

interface PassengerInput {
  type: string;
  title: string;
  given_name: string;
  family_name: string;
  born_on: string;
  gender: string;
  email: string;
  phone_number: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { offerId, passengers, selectedServiceIds } = body;

    if (!offerId || typeof offerId !== 'string') {
      return NextResponse.json({ error: 'offerId is required' }, { status: 400 });
    }
    if (!passengers || !Array.isArray(passengers) || passengers.length === 0) {
      return NextResponse.json({ error: 'At least one passenger is required' }, { status: 400 });
    }

    const duffel = getDuffel();

    // Build selected services array if ancillaries were chosen
    const services = selectedServiceIds?.map((id: string) => ({
      id,
      quantity: 1,
    })) ?? [];

    // Create the order — in test mode, Duffel has unlimited balance
    // In production, this would use a payment intent from the card form
    const order = await duffel.orders.create({
      type: 'instant',
      selected_offers: [offerId],
       
      passengers: (passengers as PassengerInput[]).map((p, i) => ({
        id: `pas_${i}`,
        type: p.type || 'adult',
        title: p.title,
        given_name: p.given_name,
        family_name: p.family_name,
        born_on: p.born_on,
        gender: p.gender,
        email: p.email,
        phone_number: p.phone_number,
      })) as Parameters<typeof duffel.orders.create>[0]['passengers'],
      payments: [{ type: 'balance' as const, amount: '0', currency: 'GBP' }],
      services,
    });

    return NextResponse.json({
      orderId: order.data.id,
      bookingReference: order.data.booking_reference,
    });
  } catch (err) {
    console.error('Booking confirmation error:', err);
    const message = err instanceof Error ? err.message : 'Booking failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
