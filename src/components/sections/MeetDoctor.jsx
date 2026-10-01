import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import siteConfig from '@/data/siteConfig';

const credentials = [
  'MDS, Pediatric & Preventive Dentistry',
  'Around 10 years in pediatric dentistry',
  'Follows AAPD recommendations',
  'Invisalign Provider',
];

export default function MeetDoctor() {
  return (
    <Section bg="blush" id="meet-doctor">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* Doctor photo — organic leaf-edge mask via SVG clip-path */}
        {/* Phase 5: replace clip-path with mask-leaf-1 SVG clipPath */}
        <div className="flex justify-center md:justify-start order-2 md:order-1 md:pl-[1%] md:-translate-y-[9%]">
          <div className="relative w-88 md:w-[26rem]">
            {/* Soft leaf-edge frame (CSS approximation — Phase 5: real SVG mask) */}
            <div
              className="overflow-hidden rounded-2xl shadow-card"
              style={{ aspectRatio: '4/5' }}
            >
              <Image
                src={siteConfig.doctor.photo}
                alt="Dr. Bhuvanesswari S., MDS — Founder of Chutti's Dental & Wellness Center"
                width={480}
                height={640}
                className="w-full h-full object-cover object-top"
                sizes="(max-width: 768px) 288px, 320px"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="order-1 md:order-2 space-y-6">
          <div>
            <p className="font-body text-meta-lg text-brand-pink font-semibold mb-1 uppercase tracking-wide">
              Founder · MDS, Pediatric &amp; Preventive Dentistry
            </p>
            <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy leading-tight">
              {siteConfig.doctor.name}
            </h2>
          </div>

          <p className="font-display font-medium text-[17px] md:text-[19px] text-brand-navy/80 italic leading-snug">
            "A dentist who treats the child, not just the tooth."
          </p>

          <p className="font-body text-body-sm text-brand-navy/75 leading-relaxed">
            Before any treatment plan, Dr. Bhuvanesswari takes time to understand each child — their
            age, development, habits, fears and past dental experiences. She is{' '}
            {siteConfig.doctor.personal}.
          </p>

          {/* Credential chips */}
          <div className="flex flex-wrap gap-2">
            {credentials.map(c => (
              <span
                key={c}
                className="px-3 py-1.5 bg-leaf-mint text-brand-navy font-body text-[13px] font-medium rounded-chip"
              >
                {c}
              </span>
            ))}
          </div>

          {/* Why a pediatric dentist */}
          <div className="bg-morning-white rounded-card p-5 space-y-2">
            <h3 className="font-display font-semibold text-[16px] text-brand-navy">
              Why a pediatric dentist?
            </h3>
            <p className="font-body text-[14px] text-brand-navy/75 leading-relaxed">
              A pedodontist completes an MDS — three years of postgraduate training beyond general
              dentistry — focused on children's dental disease, how teeth and jaws grow, and managing
              children's fears and behaviour during treatment. Parents often don't know the
              difference; the distinction matters.
            </p>
          </div>

          {/* Motto pull-quote */}
          <blockquote className="border-l-4 border-brand-pink pl-4">
            <p className="font-display font-semibold text-[17px] text-brand-navy italic leading-snug">
              "Prevent early. Treat gently. Create a positive dental experience."
            </p>
          </blockquote>

          <Link
            href="/about#dr-bhuvanesswari"
            className="inline-flex items-center gap-1 font-body font-medium text-brand-pink text-[15px] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy rounded"
          >
            Read her full bio
          </Link>
        </div>
      </div>
    </Section>
  );
}
