'use client';

import { useBooking } from '@/components/booking/BookingProvider';
import IllustrationImage from '@/components/ui/IllustrationImage';
import siteConfig from '@/data/siteConfig';

/**
 * ClosingDusk — full-bleed dusk scene, final CTA before footer.
 *
 * Phase 5: balloons get ambient float animation; dusk-group-watching illustration added.
 * Gradient flows into the night-navy footer.
 */
export default function ClosingDusk() {
  const { openBooking } = useBooking();
  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappPrefill)}`;

  return (
    <section
      className="relative w-full min-h-[70svh] md:min-h-[80svh] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #EAF6FC 0%, #f5e6d8 30%, #6F5B9E 65%, #0F1C40 100%)',
      }}
      aria-label="Closing call to action"
    >
      {/* Dusk canopy silhouette — Phase 5: real dusk-canopy illustration */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0F1C40)',
        }}
      />

      {/* Balloons — Phase 5: ambient float animation */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-[10%] top-[15%] opacity-70">
          <IllustrationImage name="balloon-1" alt="" className="w-16 h-auto md:w-20" />
        </div>
        <div className="absolute right-[12%] top-[10%] opacity-60">
          <IllustrationImage name="balloon-2" alt="" className="w-14 h-auto md:w-18" />
        </div>
        <div className="absolute left-[25%] top-[5%] opacity-50">
          <IllustrationImage name="balloon-3" alt="" className="w-12 h-auto md:w-16" />
        </div>
      </div>

      {/* Dusk group watching — Phase 5: real illustration */}
      <div aria-hidden="true" className="absolute bottom-24 left-1/2 -translate-x-1/2 w-48 md:w-64 opacity-70 pointer-events-none">
        <IllustrationImage
          name="dusk-group-watching"
          alt=""
          className="w-full h-auto"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 py-16 space-y-6 max-w-lg mx-auto">
        <h2 className="font-display font-extrabold text-h2-mobile md:text-h2-desktop text-white leading-[1.05]">
          Healthy Teeth. Happier Tomorrows.
        </h2>
        <p className="font-body text-body-sm text-white/75">
          {siteConfig.hours.display} · Pallikaranai, Chennai
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => openBooking()}
            className="px-8 py-4 bg-brand-pink text-white font-body font-semibold text-btn-lg rounded-pill hover:bg-[#c41d63] transition-colors shadow-modal focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            Book a visit
          </button>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white/15 text-white font-body font-semibold text-btn-lg rounded-pill hover:bg-white/25 transition-colors backdrop-blur-sm border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
