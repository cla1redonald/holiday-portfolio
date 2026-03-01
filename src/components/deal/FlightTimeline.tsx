'use client';

import type { FlightDetail } from '@/types';

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '--:--';
  }
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  } catch {
    return '';
  }
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function formatStops(stops: number): string {
  if (stops === 0) return 'Direct';
  if (stops === 1) return '1 stop';
  return `${stops} stops`;
}

interface FlightTimelineProps {
  flight: FlightDetail;
}

function FlightLeg({ label, departure, arrival, airline, airlineLogo, stops, duration }: {
  label: string;
  departure: string;
  arrival: string;
  airline: string;
  airlineLogo: string | null;
  stops: number;
  duration: number;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex flex-col items-center pt-1">
        <div className="w-2.5 h-2.5 rounded-full bg-teal" />
        <div className="w-px h-12 bg-border" />
        <div className="w-2.5 h-2.5 rounded-full border-2 border-teal bg-surface" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-medium text-secondary uppercase tracking-wider mb-1">{label}</p>
        <div className="flex items-center gap-2 mb-1">
          {airlineLogo && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={airlineLogo} alt={airline} width={20} height={20} className="rounded-sm" />
          )}
          <span className="text-sm font-medium text-foreground">{airline}</span>
          <span className="text-[11px] text-secondary">· {formatStops(stops)} · {formatDuration(duration)}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div>
            <span className="font-mono font-semibold text-foreground">{formatTime(departure)}</span>
            <span className="text-[11px] text-secondary ml-1">{formatDate(departure)}</span>
          </div>
          <svg className="w-4 h-4 text-secondary/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
          <div>
            <span className="font-mono font-semibold text-foreground">{formatTime(arrival)}</span>
            <span className="text-[11px] text-secondary ml-1">{formatDate(arrival)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FlightTimeline({ flight }: FlightTimelineProps) {
  // Estimate half duration for each leg
  const halfDuration = Math.round(flight.totalDuration / 2);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
        Flights
      </h3>
      <FlightLeg
        label="Outbound"
        departure={flight.outboundDeparture}
        arrival={flight.outboundArrival}
        airline={flight.airline}
        airlineLogo={flight.airlineLogo}
        stops={flight.stops}
        duration={halfDuration}
      />
      <FlightLeg
        label="Return"
        departure={flight.returnDeparture}
        arrival={flight.returnArrival}
        airline={flight.airline}
        airlineLogo={flight.airlineLogo}
        stops={flight.stops}
        duration={halfDuration}
      />
      {flight.baggageIncluded && (
        <p className="text-[11px] text-secondary pl-5">Cabin bag included</p>
      )}
    </div>
  );
}
