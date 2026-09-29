'use client';

import { MessageCircle } from 'lucide-react';
import siteConfig from '@/data/siteConfig';

/**
 * WhatsAppFloat — sticky bottom-right WhatsApp button (every page).
 *
 * Opens Flow 2: a normal WA chat with pre-filled text.
 * Never opens the booking modal — that is Flow 1.
 * On mobile it sits above the MobileCTA bar (mb-20 = 80px clearance).
 */
export default function WhatsAppFloat() {
  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappPrefill)}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp to book an appointment"
      className={[
        // Position: above MobileCTA bar on mobile
        'fixed bottom-24 right-4 z-40 md:bottom-6 md:right-6',
        // Size + shape
        'flex items-center justify-center w-14 h-14 rounded-full',
        // WhatsApp green — acceptable here for immediate brand recognition
        'bg-[#25D366] text-white',
        // Shadow + interaction
        'shadow-modal hover:scale-105 active:scale-95 transition-transform duration-150',
        // Focus ring
        'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-navy focus-visible:ring-offset-2',
      ].join(' ')}
    >
      <MessageCircle size={26} fill="white" strokeWidth={0} aria-hidden="true" />
    </a>
  );
}
