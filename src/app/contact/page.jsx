import { MapPin, Clock, Phone, MessageCircle } from 'lucide-react';
import PageHeaderScene from '@/components/ui/PageHeaderScene';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import siteConfig from '@/data/siteConfig';

export const metadata = {
  title: 'Contact & Location',
  description: `Find Chutti's Dental & Wellness Center in Pallikaranai, Chennai. Near DAV School. Open all days, 11 AM – 8 PM. Call or WhatsApp ${siteConfig.phoneDisplay}.`,
};

export default function ContactPage() {
  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappPrefill)}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.full)}`;

  return (
    <>
      <PageHeaderScene
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        title="Visit us"
        intro="Open all days, 11 AM – 8 PM. Book by phone, WhatsApp or the form below."
        illustration="contact-parrot-wave"
        illustrationAlt="The teen waving with a colourful parrot on her shoulder"
        tint="sky-mist"
      />

      <Section bg="morning-white">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">

          {/* Contact details */}
          <div className="space-y-8">
            <div className="space-y-5">
              <h2 className="font-display font-bold text-h3-mobile md:text-h3-desktop text-brand-navy">
                Find us
              </h2>

              <div className="flex gap-4">
                <MapPin size={20} className="text-brand-green shrink-0 mt-1" aria-hidden="true" />
                <div className="space-y-1">
                  <address className="not-italic font-body text-body-sm text-brand-navy/80 leading-relaxed">
                    {siteConfig.address.full}
                  </address>
                  <p className="font-body text-[14px] text-brand-navy/50">{siteConfig.address.landmark}</p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[14px] font-medium text-brand-pink hover:underline"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock size={20} className="text-brand-green shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="font-body text-body-sm text-brand-navy/80">{siteConfig.hours.display}</p>
                  <p className="font-body text-[14px] text-brand-navy/50">{siteConfig.hours.note}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone size={20} className="text-brand-green shrink-0 mt-1" aria-hidden="true" />
                <a
                  href={`tel:${siteConfig.phoneTel}`}
                  className="font-body text-body-sm text-brand-navy/80 hover:text-brand-pink transition-colors"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button variant="primary">Book a visit</Button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-brand-navy/20 rounded-pill text-brand-navy font-body font-semibold text-btn hover:bg-brand-navy/5 transition-colors"
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp us
              </a>
            </div>

            {/* For doctors section */}
            <div id="for-doctors" className="bg-sky-mist rounded-card p-5 space-y-3 scroll-mt-24">
              <h3 className="font-display font-semibold text-[16px] text-brand-navy">For doctors</h3>
              <p className="font-body text-[14px] text-brand-navy/70 leading-relaxed">
                Pediatricians and general dentists are welcome to refer children for specialist
                pediatric care — including children with special healthcare needs, anxious children,
                laughing gas assessment, and clear aligners.
              </p>
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="font-body text-[14px] font-medium text-brand-pink hover:underline"
              >
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Map embed */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-h3-mobile md:text-h3-desktop text-brand-navy">
              Map
            </h2>
            {/* Google Maps embed — address matches Google Business Profile exactly */}
            <div className="w-full rounded-card overflow-hidden shadow-card aspect-square md:aspect-auto md:h-96">
              <iframe
                title="Chutti's Dental & Wellness Center on Google Maps"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.address.full)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 300 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="font-body text-[13px] text-brand-navy/50">
              Near DAV School, Pallikaranai, Chennai 600100
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
