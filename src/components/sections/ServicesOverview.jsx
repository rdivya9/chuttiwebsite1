import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import IllustrationImage from '@/components/ui/IllustrationImage';
import { services } from '@/data/services';

// Show 7 menu services (not clear-aligners — it has its own dedicated section)
const menuServices = services.filter(s => s.navGroup === 'services');

export default function ServicesOverview() {
  return (
    <Section bg="sky-mist" id="services" className="bg-sky-mist/50">
      <div className="space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
              What we offer
            </h2>
            <p className="font-body text-body-sm text-brand-navy/70">
              Complete dental care for every stage of childhood, in one place.
            </p>
          </div>
          {/* TODO Phase 5: TappableCharacter services-bear-cub here */}
          <IllustrationImage
            name="services-bear-cub"
            alt="A boy and a honey bear cub smiling and waving"
            className="w-24 h-auto md:w-32 self-end"
          />
        </div>

        {/* Service cards grid: 4 + 3 centred on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuServices.map((svc, i) => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              className={[
                'group flex flex-col gap-4 p-5 bg-morning-white rounded-card border border-brand-navy/8',
                'hover:border-brand-pink/30 hover:shadow-card transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2',
                // Last row: 3 cards centred → handled by grid auto placement
                i >= 4 ? 'lg:col-start-auto' : '',
              ].join(' ')}
            >
              {/* Spot illustration */}
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-sky-mist flex items-center justify-center">
                <IllustrationImage
                  name={svc.headerIllustration}
                  alt=""
                  className="w-full h-full object-contain p-2"
                />
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="font-display font-semibold text-[16px] text-brand-navy group-hover:text-brand-pink transition-colors leading-snug">
                  {svc.title}
                </h3>
                <p className="font-body text-[13px] text-brand-navy/65 leading-relaxed line-clamp-2">
                  {svc.intro}
                </p>
              </div>

              <span className="flex items-center gap-1 font-body text-[13px] font-medium text-brand-pink group-hover:gap-2 transition-all">
                Learn more <ArrowRight size={14} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-body font-medium text-brand-navy/70 text-[15px] hover:text-brand-pink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy rounded"
          >
            See all services <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
