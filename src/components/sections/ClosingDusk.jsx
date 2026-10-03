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
        background: 'linear-gradient(to bottom, #fff8f3 0%, #f5e6d8 30%, #6F5B9E 65%, #0F1C40 100%)',
      }}
      aria-label="Closing call to action"
    >
      {/* Dusk canopy silhouette */}
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <IllustrationImage name="dusk-canopy" alt="" className="hidden md:block w-full h-auto" />
        <IllustrationImage name="dusk-canopy-mobile" alt="" className="md:hidden w-full h-auto" />
      </div>

      {/* Balloons */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-[8%] top-[10%] opacity-80">
          <IllustrationImage name="balloon-1" alt="" className="w-24 h-auto md:w-32" />
        </div>
        <div className="absolute right-[10%] top-[8%] opacity-80">
          <IllustrationImage name="balloon-2" alt="" className="w-20 h-auto md:w-28" />
        </div>
        <div className="absolute left-[28%] top-[4%] opacity-40">
          <IllustrationImage name="balloon-3" alt="" className="w-16 h-auto md:w-24" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 pt-16 pb-8 max-w-2xl mx-auto w-full">
        <h2 className="font-display font-extrabold text-h2-mobile md:text-h2-desktop text-brand-navy leading-[1.05] mb-3">
          Healthy Teeth. Happier Tomorrows.
        </h2>
        <p className="font-body text-body-sm text-brand-navy/70 mb-6">
          {siteConfig.hours.display} · Pallikaranai, Chennai
        </p>

        {/* Group watching — in flow so buttons sit below */}
        <IllustrationImage
          name="dusk-group-watching"
          alt=""
          className="w-80 md:w-[420px] h-auto"
          aria-hidden
        />

        <div className="flex flex-col sm:flex-row gap-3 justify-center -mt-4">
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
