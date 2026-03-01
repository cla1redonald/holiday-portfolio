'use client';

import type { Deal } from '@/types';

const CONTACT_EMAIL = 'hello@roami.world';
const WHATSAPP_NUMBER = '447730569793';

interface ContactSectionProps {
  deal: Deal;
  travellers: number;
}

function buildDealSummary(deal: Deal, travellers: number): string {
  const totalPrice = Math.round(deal.pricePerPerson * travellers);

  return [
    `Destination: ${deal.destination}`,
    `Dates: ${deal.dates} (${deal.nights} nights)`,
    deal.hotel ? `Hotel: ${deal.hotel}` : null,
    deal.flight?.airline ? `Airline: ${deal.flight.airline}` : null,
    `Travellers: ${travellers}`,
    `Price: £${Math.round(deal.pricePerPerson)}/person (£${totalPrice} total)`,
  ].filter(Boolean).join('\n');
}

export default function ContactSection({ deal, travellers }: ContactSectionProps) {
  const totalPrice = Math.round(deal.pricePerPerson * travellers);
  const summary = buildDealSummary(deal, travellers);

  const emailSubject = encodeURIComponent(`Booking request: ${deal.destination} – ${deal.dates}`);
  const emailBody = encodeURIComponent(`Hi Roami,\n\nI'd like to book this deal:\n\n${summary}\n\nPlease confirm availability and next steps.\n\nThanks!`);
  const emailHref = `mailto:${CONTACT_EMAIL}?subject=${emailSubject}&body=${emailBody}`;

  const whatsappText = encodeURIComponent(`Hi! I'd like to book this deal on Roami:\n\n${summary}\n\nCan you confirm availability?`);
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

  return (
    <div className="bg-surface rounded-2xl border border-border/60 p-6 space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground text-center">Book this deal</h2>

      {/* Deal summary */}
      <div className="flex items-start gap-4">
        {deal.image && (
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <img src={deal.image} alt={deal.destination} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-foreground">{deal.destination}</h3>
          <p className="text-sm text-secondary">{deal.dates} &middot; {deal.nights} nights</p>
          {deal.hotel && (
            <p className="text-sm text-secondary">{deal.hotel}</p>
          )}
          {deal.flight?.airline && (
            <p className="text-sm text-secondary">{deal.flight.airline}</p>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="bg-muted rounded-xl p-4">
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-sm text-secondary">{travellers} traveller{travellers > 1 ? 's' : ''}</span>
          </div>
          <div className="text-right">
            <span className="font-display text-2xl font-bold text-accent">£{totalPrice}</span>
            <span className="text-sm text-secondary ml-1">total</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-secondary">£{Math.round(deal.pricePerPerson)}/person</span>
        </div>
      </div>

      {/* Contact CTAs */}
      <div className="space-y-3">
        <p className="text-sm text-secondary text-center">
          Get in touch and we&apos;ll confirm your booking within 24 hours.
        </p>

        {/* Email CTA */}
        <a
          href={emailHref}
          className="flex items-center justify-center gap-2.5 w-full bg-accent hover:bg-accent/90 text-white font-display font-semibold py-3.5 rounded-xl text-sm transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email us to book
        </a>

        {/* WhatsApp CTA */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#22c55e] text-white font-display font-semibold py-3.5 rounded-xl text-sm transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp us to book
        </a>
      </div>

      {/* Trust signal */}
      <p className="text-xs text-secondary/60 text-center">
        No payment required now. We&apos;ll confirm availability and walk you through the next steps.
      </p>
    </div>
  );
}
