import Image from 'next/image';
import Link from 'next/link';
import PageHeaderScene from '@/components/ui/PageHeaderScene';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import siteConfig from '@/data/siteConfig';

export const metadata = {
  title: 'About Us',
  description: `Meet Dr. Bhuvanesswari S. (MDS, Pediatric & Preventive Dentistry), founder of Chutti's Dental & Wellness Center — and learn about our approach to pediatric dental care in Pallikaranai, Chennai.`,
};

const pillars = [
  {
    id:    'prevent-early',
    title: 'Prevent early.',
    body:  'Start before problems do. A dental home by the first birthday, an individual cavity-risk assessment for every child, and minimally invasive treatment that protects healthy tooth structure.',
  },
  {
    id:    'treat-gently',
    title: 'Treat gently.',
    body:  'Care adapted to each child\'s age, temperament, anxiety and past experiences. Behaviour guidance first; in-house laughing gas when clinically assessed and needed. Experience with children with special healthcare needs.',
  },
  {
    id:    'positive-experience',
    title: 'Create a positive dental experience.',
    body:  'Interiors children enjoy, a doctor who explains every step to parent and child, and follow-up after treatment. The goal is for every child to leave with a better relationship with dentistry than when they walked in.',
  },
  {
    id:    'birth-to-18',
    title: 'One dental home, birth to 18.',
    body:  'The same doctor and team as the child grows: infant checks, fillings and caps, habit correction, growth monitoring, early orthodontic guidance, and clear aligners at whatever age a child needs them. One relationship, not a new dentist every time.',
  },
];

const credentials = [
  'MDS, Pediatric & Preventive Dentistry',
  'Around 10 years in pediatric dentistry',
  'Follows AAPD recommendations',
  'Invisalign Provider',
  'Laser dentistry for selected procedures',
  'Experience with children with special healthcare needs',
];

export default function AboutPage() {
  return (
    <>
      <PageHeaderScene
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        title="About Chutti's Dental & Wellness Center"
        intro="A prevention-first dental home for children, from the first tooth to the teen years, led by a pediatric specialist who treats the child, not just the tooth."
        tint="leaf-mint"
      />

      {/* Meet the Doctor */}
      <Section bg="morning-white" id="dr-bhuvanesswari">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Photo */}
          <div className="flex justify-center md:justify-start">
            <div
              className="overflow-hidden rounded-2xl shadow-card w-80 md:w-[26rem]"
              style={{ aspectRatio: '4/5' }}
            >
              <Image
                src={siteConfig.doctor.photo}
                alt={`${siteConfig.doctor.name} — Founder, Chutti's Dental & Wellness Center`}
                width={480}
                height={640}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <p className="font-body text-meta-lg text-brand-pink font-semibold uppercase tracking-wide mb-1">
                Founder · MDS, Pediatric &amp; Preventive Dentistry
              </p>
              <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
                {siteConfig.doctor.name}
              </h2>
            </div>

            <p className="font-body text-body-sm text-brand-navy/75 leading-relaxed">
              Dr. Bhuvanesswari has around 10 years of experience in pediatric dentistry and is the
              founder of Chutti's Dental &amp; Wellness Center in Pallikaranai, Chennai.{' '}
              {siteConfig.doctor.personal ? `She is ${siteConfig.doctor.personal}.` : ''}
            </p>
            <p className="font-body text-body-sm text-brand-navy/75 leading-relaxed">
              Before any treatment plan, she takes time to understand each child — their age,
              development, habits, fears and past dental experiences. Her approach follows AAPD
              (American Academy of Pediatric Dentistry) recommendations: Dental Home, caries-risk
              assessment, minimally invasive dentistry, and evidence-based use of nitrous oxide.
            </p>
            <p className="font-body text-body-sm text-brand-navy/75 leading-relaxed">
              She has experience with children with special healthcare needs, uses laser dentistry for
              selected procedures, and is an Invisalign provider for clear aligners for children of
              any age who clinically need them.
            </p>

            <div className="flex flex-wrap gap-2">
              {credentials.map(c => (
                <span key={c} className="px-3 py-1.5 bg-leaf-mint text-brand-navy font-body text-[13px] font-medium rounded-chip">
                  {c}
                </span>
              ))}
            </div>

            <blockquote className="border-l-4 border-brand-pink pl-4">
              <p className="font-display font-semibold text-[17px] text-brand-navy italic">
                "Prevent early. Treat gently. Create a positive dental experience."
              </p>
            </blockquote>
          </div>
        </div>

        {/* In Her Own Words */}
        <div className="mt-12 rounded-[24px] p-6 md:p-10 space-y-5 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #FDE7EF 0%, #FFF5F9 100%)' }}
        >
          {/* Decorative quote mark */}
          <svg aria-hidden="true" className="absolute top-4 left-5 w-10 h-10 text-brand-pink/20 select-none pointer-events-none" viewBox="0 0 40 40" fill="currentColor">
            <path d="M0 20.6C0 10.4 6.2 3.6 18.6 0l2 3.8C13 5.8 9.4 9.8 8.6 15.4c.4-.1.9-.1 1.4-.1 4.4 0 7.4 3 7.4 7.2 0 4.4-3.2 7.6-7.8 7.6C4 30.1 0 26.3 0 20.6zm22 0C22 10.4 28.2 3.6 40.6 0l2 3.8C35 5.8 31.4 9.8 30.6 15.4c.4-.1.9-.1 1.4-.1 4.4 0 7.4 3 7.4 7.2 0 4.4-3.2 7.6-7.8 7.6-5.6 0-9.6-3.8-9.6-9.5z"/>
          </svg>

          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-pink pt-6">
            In her own words
          </p>

          <div className="space-y-4 font-body text-[15px] md:text-[16px] text-brand-navy/80 leading-loose">
            <p>
              I didn't come to pediatric dentistry by accident. When I was seven, I had a decayed tooth treated — I was frightened, I was crying, and the treatment went ahead anyway. That fear stayed with me for years. Once I moved into pediatric dentistry, I felt it was my responsibility to make sure no child left my chair carrying what I'd carried. We slow appointments down, explain everything to the child, and when a child can't cooperate yet, we work through desensitisation instead of forcing anything.
            </p>
            <p>
              I came to this field already a mother. In my early years of practice, every small patient reminded me of my own daughter — treating them with empathy, without ever scaring a child into cooperating, felt like the only honest way to practise.
            </p>
            <p>
              That empathy extends to parents too. I don't shame a mother who walks in with a child who has widespread decay. I know what it's like to be a working mother — some evenings I've come home too tired to make sure my own children brushed properly, and it showed up later as early white-spot lesions on their teeth. Because I'm a dentist, I caught it early. Most parents don't have that advantage. That's the whole reason Chutti's exists as a dedicated practice: so a visit here is something a child can actually enjoy, not just get through.
            </p>
          </div>

          <p className="font-body text-[14px] text-brand-navy/50 font-medium">
            — Dr. Bhuvanesswari S., MDS
          </p>
        </div>

        {/* Why a pediatric dentist */}
        <div className="mt-12 bg-sky-mist rounded-card p-6 md:p-8">
          <h3 className="font-display font-semibold text-h3-mobile md:text-h3-desktop text-brand-navy mb-3">
            Why a pediatric dentist?
          </h3>
          <p className="font-body text-body-sm text-brand-navy/75 leading-relaxed">
            A pedodontist completes an MDS — three years of postgraduate training beyond general
            dentistry — focused specifically on children's dental disease, how teeth and jaws grow,
            and how to manage children's fears and behaviour during treatment. The same family
            dentist who sees adults can treat children, but a pediatric specialist has trained
            extensively on children's unique needs. That distinction matters, especially for anxious
            children, complex treatment, or children with special healthcare needs.
          </p>
        </div>
      </Section>

      {/* Our Approach */}
      <Section bg="leaf-mint" id="our-approach" className="bg-leaf-mint/50">
        <div className="space-y-10">
          <div className="max-w-2xl space-y-4">
            <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
              Our approach
            </h2>
            <p className="font-body text-body-sm md:text-body-lg text-brand-navy/70 leading-relaxed">
              The clinic's philosophy comes from the doctor's own line:{' '}
              <em>"Prevent early. Treat gently. Create a positive dental experience."</em> A fourth
              pillar carries the "Wellness" meaning of the name.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {pillars.map(pillar => (
              <div key={pillar.id} className="bg-morning-white rounded-card p-6 shadow-card space-y-3">
                <h3 className="font-display font-bold text-h3-mobile text-brand-navy">
                  {pillar.title}
                </h3>
                <p className="font-body text-[14px] text-brand-navy/75 leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>

          {/* What "Wellness" means */}
          <div className="bg-morning-white rounded-card p-6 md:p-8 shadow-card space-y-3">
            <h3 className="font-display font-semibold text-h3-mobile text-brand-navy">
              What "Wellness" means in the name
            </h3>
            <p className="font-body text-body-sm text-brand-navy/75 leading-relaxed">
              "Wellness" is not spa or general wellbeing — it means complete dental care across the
              whole of childhood, newborn to 18, rather than one-off treatment when something hurts.
              The same doctor who checks a baby's gums is the one who fits an aligner for a teenager
              and monitors wisdom teeth at 17. That continuity of care is what the clinic was built
              around.
            </p>
          </div>
        </div>
      </Section>

      {/* Videos */}
      <Section bg="sky-mist" id="videos">
        <div className="space-y-6">
          <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
            Hear from us
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              siteConfig.videos.clinicTour,
              siteConfig.videos.doctorIntro,
              siteConfig.videos.patientStory,
            ].map((video) => (
              <div key={video.id} className="relative rounded-card overflow-hidden aspect-video bg-brand-navy/10 group">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={`Play video: ${video.title}`}
                  className="w-full h-full object-cover"
                />
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch on YouTube: ${video.title}`}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-brand-navy/20 group-hover:bg-brand-navy/35 transition-colors"
                >
                  <span className="flex items-center justify-center w-14 h-14 rounded-full bg-white/90 shadow-card group-hover:scale-105 transition-transform">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-brand-pink ml-1" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="font-body text-[13px] font-medium text-white drop-shadow text-center px-4">
                    {video.title}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section bg="morning-white">
        <div className="text-center space-y-4">
          <p className="font-display font-semibold text-h3-mobile text-brand-navy">
            Ready to bring your child in?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" href="/first-visit">Your child's first visit</Button>
            <Button variant="outline" href="/contact">Contact us</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
