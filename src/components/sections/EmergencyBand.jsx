import Link from 'next/link';
import { MessageCircle, Phone } from 'lucide-react';
import IllustrationImage from '@/components/ui/IllustrationImage';
import siteConfig from '@/data/siteConfig';

/**
 * EmergencyBand — calm (never alarming) strip after services.
 * sun-yellow tint, lion-cub illustration, WhatsApp + Call buttons.
 * Same-day via WhatsApp OR call (narrative.md §11 #11, confirmed by user Q20).
 */
export default function EmergencyBand() {
  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappEmergencyPrefill)}`;

  return (
    <div className="w-full bg-sun-yellow/45 py-8 px-5">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10">

        {/* Illustration */}
        {/* TODO Phase 5: TappableCharacter wrapper */}
        <div className="shrink-0">
          <IllustrationImage
            name="emergency-lion-cub"
            alt="Chuttika gently comforting a lion cub with a small plaster on its knee"
            className="w-28 h-auto md:w-36"
          />
        </div>

        {/* Text */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <p className="font-display font-bold text-h3-mobile md:text-h3-desktop text-brand-navy leading-snug">
            Fall, chipped or knocked-out tooth, or sudden toothache?
          </p>
          <p className="font-body text-body-sm text-brand-navy/75">
            WhatsApp or call us for a same-day appointment.{' '}
            <Link
              href="/services/dental-emergencies"
              className="text-brand-pink underline underline-offset-2 hover:no-underline font-medium"
            >
              First-aid steps
            </Link>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3 bg-brand-pink text-white font-body font-semibold text-btn rounded-pill hover:bg-[#c41d63] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
          >
            <MessageCircle size={18} aria-hidden="true" />
            WhatsApp for same-day
          </a>
          <a
            href={`tel:${siteConfig.phoneTel}`}
            className="flex items-center justify-center gap-2 px-5 py-3 border border-brand-navy/20 bg-morning-white text-brand-navy font-body font-semibold text-btn rounded-pill hover:bg-brand-navy/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
            aria-label={`Call ${siteConfig.phoneDisplay}`}
          >
            <Phone size={18} aria-hidden="true" />
            Call
          </a>
        </div>
      </div>
    </div>
  );
}
