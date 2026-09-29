'use client';

import { Phone } from 'lucide-react';
import siteConfig from '@/data/siteConfig';
import { useBooking } from '@/components/booking/BookingProvider';

/**
 * MobileCTA — sticky bottom bar, mobile only.
 *
 * Two equal buttons:
 *   Left:  Book a visit (pink, opens booking modal)
 *   Right: Call (navy outline, tel: link)
 *
 * Hidden: on desktop (md:hidden) and while the booking modal is open.
 */
export default function MobileCTA() {
  const { openBooking, isOpen } = useBooking();

  if (isOpen) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex h-16 border-t border-brand-navy/10 bg-morning-white shadow-header">
      {/* Book a visit */}
      <button
        onClick={() => openBooking()}
        className={[
          'flex-1 flex items-center justify-center gap-2',
          'bg-brand-pink text-white font-body font-semibold text-btn',
          'transition-colors duration-150 active:bg-[#c41d63]',
          'focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-white',
        ].join(' ')}
      >
        Book a visit
      </button>

      {/* Divider */}
      <div className="w-px bg-brand-navy/10" aria-hidden="true" />

      {/* Call */}
      <a
        href={`tel:${siteConfig.phoneTel}`}
        className={[
          'flex-1 flex items-center justify-center gap-2',
          'bg-morning-white text-brand-navy font-body font-semibold text-btn',
          'transition-colors duration-150 active:bg-sky-mist',
          'focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-brand-navy',
        ].join(' ')}
        aria-label={`Call ${siteConfig.phoneDisplay}`}
      >
        <Phone size={18} aria-hidden="true" />
        Call
      </a>
    </div>
  );
}
