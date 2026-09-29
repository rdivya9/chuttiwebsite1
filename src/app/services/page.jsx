import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHeaderScene from '@/components/ui/PageHeaderScene';
import Section from '@/components/ui/Section';
import IllustrationImage from '@/components/ui/IllustrationImage';
import Button from '@/components/ui/Button';
import { services } from '@/data/services';

export const metadata = {
  title: 'Services',
  description: `Complete dental care for children from birth to 18 at Chutti's Dental & Wellness Center, Pallikaranai, Chennai. Preventive care, fillings, crowns, aligners, laughing gas, laser dentistry, and more.`,
};

// Symptom shortcuts at the top of the page
const shortcuts = [
  { label: 'Toothache',           href: '/services/fillings-crowns-root-canal' },
  { label: 'Chipped tooth',       href: '/services/dental-emergencies' },
  { label: 'Crooked teeth',       href: '/services/clear-aligners' },
  { label: 'Thumb-sucking',       href: '/services/early-orthodontics#habit-correction' },
  { label: 'First visit',         href: '/first-visit' },
  { label: 'Scared child',        href: '/services/gentle-dentistry-sedation' },
];

const menuServices = services.filter(s => s.navGroup === 'services');
const aligners     = services.find(s => s.slug === 'clear-aligners');

export default function ServicesPage() {
  return (
    <>
      <PageHeaderScene
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
        title="All services"
        intro="Complete dental care for every stage of childhood, from the first tooth to 18."
        illustration="services-bear-cub"
        illustrationAlt="A boy and a honey bear cub smiling and waving"
        tint="sky-mist"
      />

      <Section bg="morning-white">
        {/* What's happening shortcuts */}
        <div className="space-y-6 mb-12">
          <p className="font-body font-semibold text-[15px] text-brand-navy/60">
            What's happening?
          </p>
          <div className="flex flex-wrap gap-3">
            {shortcuts.map(s => (
              <Link
                key={s.href}
                href={s.href}
                className="px-4 py-2 bg-sky-mist text-brand-navy font-body font-medium text-[14px] rounded-chip hover:bg-brand-pink/10 hover:text-brand-pink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services grid */}
        <div className="space-y-8">
          <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
            Our services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {menuServices.map(svc => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group flex flex-col gap-4 p-5 bg-morning-white rounded-card border border-brand-navy/8 hover:border-brand-pink/30 hover:shadow-card transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
              >
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-sky-mist flex items-center justify-center">
                  <IllustrationImage name={svc.headerIllustration} alt="" className="w-full h-full object-contain p-3" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-display font-semibold text-[16px] text-brand-navy group-hover:text-brand-pink transition-colors">
                    {svc.title}
                  </h3>
                  <p className="font-body text-[13px] text-brand-navy/65 line-clamp-2 leading-relaxed">
                    {svc.intro}
                  </p>
                </div>
                <span className="flex items-center gap-1 font-body text-[13px] font-medium text-brand-pink group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            ))}

            {/* Clear Aligners — special card */}
            {aligners && (
              <Link
                href="/services/clear-aligners"
                className="group flex flex-col gap-4 p-5 bg-sun-yellow/20 rounded-card border border-sun-yellow hover:border-brand-pink/30 hover:shadow-card transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
              >
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-sun-yellow/30 flex items-center justify-center">
                  <IllustrationImage name="aligners-teen-giraffe" alt="" className="w-full h-full object-contain p-3" />
                </div>
                <div className="flex-1 space-y-1">
                  <span className="font-body text-[11px] font-semibold text-brand-pink uppercase tracking-wide">
                    Invisalign Provider
                  </span>
                  <h3 className="font-display font-semibold text-[16px] text-brand-navy group-hover:text-brand-pink transition-colors">
                    {aligners.title}
                  </h3>
                  <p className="font-body text-[13px] text-brand-navy/65 line-clamp-2 leading-relaxed">
                    {aligners.intro}
                  </p>
                </div>
                <span className="flex items-center gap-1 font-body text-[13px] font-medium text-brand-pink group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center space-y-4">
          <p className="font-display font-semibold text-h3-mobile text-brand-navy">
            Not sure what your child needs?
          </p>
          <p className="font-body text-body-sm text-brand-navy/70">
            Book a check-up and Dr. Bhuvanesswari will take it from there.
          </p>
          <Button variant="primary">Book a visit</Button>
        </div>
      </Section>
    </>
  );
}
