import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, Star } from 'lucide-react';
import siteConfig from '@/data/siteConfig';

// ── Firefly/star positions — fixed so they look intentional ──────────────
const STARS = [
  { top: '12%', left: '8%',  size: 2, duration: '3.8s', delay: '0s'    },
  { top: '22%', left: '18%', size: 3, duration: '5.2s', delay: '0.6s'  },
  { top: '8%',  left: '35%', size: 2, duration: '4.1s', delay: '1.2s'  },
  { top: '18%', left: '52%', size: 2, duration: '6.0s', delay: '0.3s'  },
  { top: '30%', left: '62%', size: 3, duration: '3.5s', delay: '1.8s'  },
  { top: '10%', left: '72%', size: 2, duration: '4.7s', delay: '0.9s'  },
  { top: '25%', left: '82%', size: 2, duration: '5.5s', delay: '0.0s'  },
  { top: '14%', left: '90%', size: 3, duration: '3.9s', delay: '1.5s'  },
  { top: '38%', left: '5%',  size: 2, duration: '4.3s', delay: '2.1s'  },
  { top: '42%', left: '28%', size: 2, duration: '5.8s', delay: '0.7s'  },
  { top: '35%', left: '45%', size: 3, duration: '4.0s', delay: '1.1s'  },
  { top: '48%', left: '68%', size: 2, duration: '3.6s', delay: '2.4s'  },
  { top: '40%', left: '78%', size: 2, duration: '5.1s', delay: '0.4s'  },
  { top: '20%', left: '95%', size: 2, duration: '4.6s', delay: '1.7s'  },
  { top: '50%', left: '15%', size: 3, duration: '3.3s', delay: '0.2s'  },
  { top: '55%', left: '55%', size: 2, duration: '5.4s', delay: '1.0s'  },
];

const quickLinks = [
  { label: 'Preventive Care',         href: '/services/preventive-care' },
  { label: 'Fillings & Crowns',       href: '/services/fillings-crowns-root-canal' },
  { label: 'Clear Aligners',          href: '/services/clear-aligners' },
  { label: 'Dental Emergencies',      href: '/services/dental-emergencies' },
  { label: 'Gentle Dentistry',        href: '/services/gentle-dentistry-sedation' },
  { label: 'Special Needs',           href: '/services/special-needs-dentistry' },
  { label: 'First Visit',             href: '/first-visit' },
  { label: 'About',                   href: '/about' },
  { label: 'Blog',                    href: '/blog' },
  { label: 'Contact',                 href: '/contact' },
];

export default function Footer() {
  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappPrefill)}`;

  return (
    <footer aria-label="Site footer" className="relative bg-night-navy overflow-hidden">

      {/* ── CSS stars / fireflies ──────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="footer-star absolute rounded-full bg-sun-yellow"
            style={{
              top: s.top,
              left: s.left,
              width:  s.size,
              height: s.size,
              '--duration': s.duration,
              '--delay':    s.delay,
            }}
          />
        ))}
      </div>

      {/* ── Leaf edge strip (illustration placeholder) ────────────────── */}
      {/* TODO Phase 5: replace with IllustrationImage name="footer-leaf-edge" */}
      <div
        aria-hidden="true"
        className="w-full h-16 bg-gradient-to-b from-[#1a3a1a] to-night-navy opacity-80 pointer-events-none"
        style={{ marginTop: -2 }}
      />

      {/* ── Giraffe + monkey peeking placeholders ─────────────────────── */}
      {/* TODO Phase 5: replace with footer-giraffe-peek and footer-monkey-peek illustrations */}

      {/* ── Goodnight scene + tagline ─────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center pt-6 pb-8 px-5">
        {/* TODO Phase 5: replace with IllustrationImage name="footer-goodnight" */}
        <div
          aria-hidden="true"
          className="w-48 h-20 bg-brand-navy/40 rounded-card border border-brand-navy/20 flex items-center justify-center mb-4"
        >
          <span className="text-white/30 text-xs font-body">footer-goodnight.png</span>
        </div>
        <p className="text-white/70 font-body text-[14px] text-center italic">
          Brush before bed. Goodnight from the jungle.
        </p>
      </div>

      {/* ── Main footer content ───────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Column 1: Logo + clinic info */}
          <div className="space-y-4">
            {/* Logo on a white rounded plate */}
            <div className="inline-flex items-center justify-center bg-white rounded-xl p-2 shadow-card">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={56}
                height={56}
                className="h-12 w-auto object-contain"
              />
            </div>

            <p className="text-white/80 font-body text-[14px] leading-relaxed max-w-[240px]">
              Pediatric dental care for children from birth to 18. Pallikaranai, Chennai.
            </p>

            {/* Rating badge */}
            <a
              href={siteConfig.rating.googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/70 text-[13px] font-body hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 rounded"
            >
              <span className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-sun-yellow text-sun-yellow" aria-hidden="true" />
                ))}
              </span>
              <span>
                {siteConfig.rating.value} · {siteConfig.rating.count} Google reviews
              </span>
            </a>
          </div>

          {/* Column 2: Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-display font-semibold text-[16px]">Contact</h3>
            <ul className="space-y-3">
              {/* Address */}
              <li className="flex gap-3">
                <MapPin size={16} className="text-brand-green shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-white/70 font-body text-[13px] leading-relaxed">
                  <address className="not-italic">
                    {siteConfig.address.street},<br />
                    {siteConfig.address.area}, {siteConfig.address.locality},<br />
                    {siteConfig.address.city} {siteConfig.address.pincode}
                  </address>
                  <p className="text-white/50 text-[12px] mt-1">{siteConfig.address.landmark}</p>
                </div>
              </li>

              {/* Hours */}
              <li className="flex gap-3">
                <Clock size={16} className="text-brand-green shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-white/70 font-body text-[13px]">
                  <p>{siteConfig.hours.display}</p>
                  <p className="text-white/50 text-[12px]">{siteConfig.hours.note}</p>
                </div>
              </li>

              {/* Phone */}
              <li className="flex gap-3">
                <Phone size={16} className="text-brand-green shrink-0 mt-0.5" aria-hidden="true" />
                <a
                  href={`tel:${siteConfig.phoneTel}`}
                  className="text-white/70 font-body text-[13px] hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>

              {/* WhatsApp */}
              <li>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-green font-body font-medium text-[13px] hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                >
                  WhatsApp us for an appointment
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick links */}
          <div className="space-y-4">
            <h3 className="text-white font-display font-semibold text-[16px]">Quick links</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 font-body text-[13px] hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Footer bottom bar ──────────────────────────────────────────── */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 font-body text-[12px]">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
            >
              Privacy Policy
            </Link>
            <a
              href={siteConfig.rating.googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
            >
              Reviews on Google
            </a>
            {/* For doctors — referral note, footer only */}
            <Link
              href="/contact#for-doctors"
              className="hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
            >
              For Doctors
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
