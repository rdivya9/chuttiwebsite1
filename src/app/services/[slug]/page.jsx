import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle, Clock, Eye, Smile, Heart } from 'lucide-react';
import PageHeaderScene from '@/components/ui/PageHeaderScene';
import Section from '@/components/ui/Section';
import FaqAccordion from '@/components/ui/FaqAccordion';
import Button from '@/components/ui/Button';
import IllustrationImage from '@/components/ui/IllustrationImage';
import { services } from '@/data/services';
import siteConfig from '@/data/siteConfig';

const alignerAdvantages = [
  {
    icon: Clock,
    title: 'Monitored from the first tooth',
    body: 'Dr. Bhuvanesswari has often been watching your child\'s jaw and bite develop for years before aligners are even discussed. The plan starts from a place of real knowledge.',
  },
  {
    icon: Eye,
    title: 'Root causes, not just crooked teeth',
    body: 'Habits like thumb-sucking, tongue-thrust and early tooth loss shape alignment. A pediatric specialist recognises these because she has seen the whole picture.',
  },
  {
    icon: Smile,
    title: 'Clear trays children can live with',
    body: 'Removable for eating, brushing and school. No metal, no brackets, no emergency wire visits. Children adapt faster than most parents expect.',
  },
  {
    icon: Heart,
    title: 'One doctor, one relationship',
    body: 'No referral to a stranger. The same doctor who knows your child\'s history, fears and habits is the one planning and monitoring the aligners.',
  },
];

export async function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const svc = services.find(s => s.slug === params.slug);
  if (!svc) return {};
  return {
    title: svc.title,
    description: svc.intro,
  };
}

// Chip showing typical age range for a treatment
function AgeChip({ ages }) {
  if (!ages) return null;
  return (
    <span className="inline-block px-3 py-1 bg-sky-mist text-brand-navy/60 font-body text-[12px] font-medium rounded-chip">
      {ages}
    </span>
  );
}

// Render a single treatment section
function TreatmentSection({ treatment }) {
  return (
    <div id={treatment.id} className="scroll-mt-24 space-y-4 py-8 border-b border-brand-navy/8 last:border-0">
      <div className="flex flex-wrap items-start gap-3">
        <h2 className="font-display font-bold text-h3-mobile md:text-h3-desktop text-brand-navy flex-1">
          {treatment.heading}
        </h2>
        <AgeChip ages={treatment.ages} />
      </div>

      {treatment.what && (
        <p className="font-body text-body-sm text-brand-navy/75 leading-relaxed">
          {treatment.what}
        </p>
      )}

      {treatment.steps && treatment.steps.length > 0 && (
        <ol className="space-y-2 pl-0">
          {treatment.steps.map((step, i) => (
            <li key={i} className="flex gap-3 font-body text-[14px] text-brand-navy/75 leading-relaxed">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-pink/10 text-brand-pink font-semibold text-[13px] shrink-0 mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      )}

      {treatment.why && (
        <div className="bg-leaf-mint/60 rounded-xl p-4 space-y-1">
          <p className="font-body text-[13px] font-semibold text-brand-navy">Why this matters</p>
          <p className="font-body text-[14px] text-brand-navy/75 leading-relaxed">{treatment.why}</p>
        </div>
      )}

      {treatment.expect && (
        <p className="font-body text-[14px] text-brand-navy/65 italic leading-relaxed">
          What to expect: {treatment.expect}
        </p>
      )}

      {treatment.importantNote && (
        <div className="bg-blush rounded-xl p-4">
          <p className="font-body text-[13px] text-brand-navy/70 leading-relaxed">
            <strong>Note:</strong> {treatment.importantNote}
          </p>
        </div>
      )}

      {treatment.linkTo && (
        <Link
          href={treatment.linkTo}
          className="inline-flex items-center gap-1 font-body font-medium text-brand-pink text-[14px] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy rounded"
        >
          Learn more →
        </Link>
      )}
    </div>
  );
}

export default function ServicePage({ params }) {
  const svc = services.find(s => s.slug === params.slug);
  if (!svc) notFound();

  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappPrefill)}`;
  const isEmergency = svc.slug === 'dental-emergencies';

  return (
    <>
      <PageHeaderScene
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: svc.title },
        ]}
        title={svc.title}
        intro={svc.intro}
        illustration={svc.headerIllustration}
        tint={svc.headerTint}
      />

      <Section bg="morning-white">
        <div className="max-w-3xl mx-auto">
          {/* Emergency note (if applicable) */}
          {svc.emergencyNote && (
            <div className="mb-8 bg-sun-yellow/40 border border-sun-yellow rounded-card p-4">
              <p className="font-body text-[14px] text-brand-navy/80 leading-relaxed">
                <strong>Important:</strong> {svc.emergencyNote}
              </p>
            </div>
          )}

          {/* Treatment sections */}
          <div>
            {svc.treatments.map(treatment => (
              <TreatmentSection key={treatment.id} treatment={treatment} />
            ))}
          </div>

          {/* Service-level notes (clear aligners) */}
          {svc.importantNotes && svc.importantNotes.length > 0 && (
            <div className="mt-4 space-y-1">
              {svc.importantNotes.map((note, i) => (
                <p key={i} className="font-body text-[13px] text-brand-navy/40 leading-relaxed">• {note}</p>
              ))}
            </div>
          )}

          {/* Aligner specialist section — clear-aligners page only */}
          {svc.slug === 'clear-aligners' && (
            <div className="mt-12 rounded-[24px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF8D6 0%, #FFFBEE 100%)' }}>
              <div className="p-6 md:p-10 space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <p className="font-body text-[12px] font-semibold uppercase tracking-widest text-brand-navy/50">Invisalign Provider</p>
                    <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy leading-tight">
                      Planned by someone who has watched your child's teeth grow.
                    </h2>
                  </div>
                  <IllustrationImage
                    name="aligners-teen-giraffe"
                    alt="A confident teen with a clear aligner tray beside a giraffe"
                    className="w-28 md:w-36 h-auto shrink-0"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {alignerAdvantages.map(({ icon: Icon, title, body }) => (
                    <div key={title} className="bg-white/70 rounded-2xl p-5 space-y-2 border border-brand-navy/6">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-sun-yellow shrink-0">
                          <Icon size={16} className="text-brand-navy" aria-hidden="true" />
                        </span>
                        <p className="font-display font-semibold text-[15px] text-brand-navy leading-snug">{title}</p>
                      </div>
                      <p className="font-body text-[13.5px] text-brand-navy/70 leading-relaxed">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FAQs */}
          {svc.faqs && svc.faqs.length > 0 && (
            <div className="mt-12 space-y-4">
              <h2 className="font-display font-bold text-h3-mobile md:text-h3-desktop text-brand-navy">
                Frequently asked questions
              </h2>
              <FaqAccordion items={svc.faqs} withSchema />
            </div>
          )}

          {/* Booking prompt */}
          <div className="mt-12 bg-sky-mist rounded-card p-6 md:p-8 space-y-4">
            {isEmergency ? (
              <>
                <p className="font-display font-semibold text-h3-mobile text-brand-navy">
                  Need a same-day appointment?
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappEmergencyPrefill)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-pink text-white font-body font-semibold text-btn rounded-pill hover:bg-[#c41d63] transition-colors shadow-sm"
                  >
                    <MessageCircle size={16} aria-hidden="true" />
                    WhatsApp for same-day
                  </a>
                  <a
                    href={`tel:${siteConfig.phoneTel}`}
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-brand-navy/20 bg-morning-white text-brand-navy font-body font-semibold text-btn rounded-pill hover:bg-brand-navy/5 transition-colors"
                  >
                    Call {siteConfig.phoneDisplay}
                  </a>
                </div>
              </>
            ) : (
              <>
                <p className="font-display font-semibold text-h3-mobile text-brand-navy">
                  Book an appointment
                </p>
                <p className="font-body text-[14px] text-brand-navy/70">
                  {siteConfig.hours.display} · By appointment
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="primary">Book a visit</Button>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-brand-navy/20 bg-morning-white text-brand-navy font-body font-semibold text-btn rounded-pill hover:bg-brand-navy/5 transition-colors"
                  >
                    <MessageCircle size={16} aria-hidden="true" />
                    WhatsApp us
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
