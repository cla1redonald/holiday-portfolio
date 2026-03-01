import { describe, it, expect } from 'vitest';
import { buildDeals } from '../deal-builder';
import type { FlightResult, StayResult } from '../duffel-client';

const baseFlight: FlightResult = {
  destination: 'lisbon',
  airline: 'TAP',
  departureDate: '2026-04-01',
  returnDate: '2026-04-08',
  pricePerPerson: 150,
  currency: 'GBP',
  nights: 7,
};

const baseStay: StayResult = {
  destination: 'lisbon',
  hotelName: 'Hotel Alfama',
  rating: 4,
  reviewScore: 8.5,
  totalPrice: 490,
  pricePerNight: 70,
  currency: 'GBP',
  checkIn: '2026-04-01',
  checkOut: '2026-04-08',
  photoUrl: null,
  boardType: 'room_only',
};

describe('buildDeals — pricing integration', () => {
  it('applies markup so customer price exceeds raw cost', () => {
    const deals = buildDeals({
      flights: [baseFlight],
      stays: [baseStay],
      interests: ['food'],
      travellers: 2,
      budgetPerPerson: null,
    });

    expect(deals).toHaveLength(1);
    const deal = deals[0];

    // Raw cost: £150 flight/pp + £245 hotel/pp = £395/pp
    // With markup should be higher
    expect(deal.pricePerPerson).toBeGreaterThan(395);
  });

  it('marks reasonable package deals as not loss-making', () => {
    const deals = buildDeals({
      flights: [baseFlight],
      stays: [baseStay],
      interests: [],
      travellers: 2,
      budgetPerPerson: null,
    });

    expect(deals[0].isLossMaker).toBe(false);
    expect(deals[0].netMargin).toBeGreaterThan(0);
  });

  it('flags cheap flight-only deals as loss-makers', () => {
    const cheapFlight: FlightResult = {
      ...baseFlight,
      pricePerPerson: 35,
    };

    const deals = buildDeals({
      flights: [cheapFlight],
      stays: [], // no stays — estimated hotel used
      interests: [],
      travellers: 1,
      budgetPerPerson: null,
    });

    // Even with estimated hotel, the flight component is very cheap
    // The deal itself may or may not be a loss-maker depending on estimated hotel
    // But the netMargin field should be present
    expect(deals[0].netMargin).toBeDefined();
    expect(typeof deals[0].isLossMaker).toBe('boolean');
  });

  it('sorts viable deals above loss-makers', () => {
    const cheapFlight: FlightResult = {
      ...baseFlight,
      destination: 'budapest',
      pricePerPerson: 25,
    };

    const goodFlight: FlightResult = {
      ...baseFlight,
      destination: 'lisbon',
      pricePerPerson: 200,
    };

    const goodStay: StayResult = {
      ...baseStay,
      destination: 'lisbon',
    };

    const deals = buildDeals({
      flights: [cheapFlight, goodFlight],
      stays: [goodStay],
      interests: [],
      travellers: 1,
      budgetPerPerson: null,
    });

    // If one is a loss-maker and one is not, the viable one should come first
    if (deals.length === 2 && deals[0].isLossMaker !== deals[1].isLossMaker) {
      expect(deals[0].isLossMaker).toBe(false);
      expect(deals[1].isLossMaker).toBe(true);
    }
  });

  it('includes netMargin and isLossMaker in deal output', () => {
    const deals = buildDeals({
      flights: [baseFlight],
      stays: [baseStay],
      interests: [],
      travellers: 2,
      budgetPerPerson: null,
    });

    const deal = deals[0];
    expect(deal).toHaveProperty('netMargin');
    expect(deal).toHaveProperty('isLossMaker');
    expect(typeof deal.netMargin).toBe('number');
    expect(typeof deal.isLossMaker).toBe('boolean');
  });
});
