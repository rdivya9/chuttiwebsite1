import Section from '@/components/ui/Section';
import JungleSideVine from '@/components/ui/JungleSideVine';

// Using Nandha R.'s review theme: explains, child comfortable — a short confident quote
// Full review text is in reviews.js; this is a safe excerpt that captures the theme.
const PULL_QUOTE = {
  text: "The doctor was extremely patient and gentle with my son and explained the treatment clearly before proceeding. My son was comfortable throughout.",
  attribution: "Nandha R., parent",
};

export default function OurMotto() {
  return (
    <Section bg="sky-mist" id="our-motto">
      <JungleSideVine>
      <div className="max-w-3xl mx-auto space-y-10">
        <h2 className="font-display font-extrabold text-[28px] md:text-[44px] lg:text-[52px] text-brand-navy leading-[1.05]">
          A great dental experience —<br className="hidden md:block" /> not just a dental treatment.
        </h2>

        <p className="font-body text-body-sm md:text-body-lg text-brand-navy/75 leading-relaxed">
          The goal is not only to complete the treatment. It is for every child to leave with a{' '}
          <strong>better relationship with dentistry than when they walked in</strong>. A child who
          feels safe at the dentist today is a teenager and adult who doesn't avoid dental care.
          That is what "Wellness" means in the clinic's name — not one-off treatment when something
          hurts, but a dental home across the whole of childhood.
        </p>

        {/* Doctor motto — typographic centrepiece */}
        <div className="relative py-2">
          <blockquote className="space-y-3">
            <p className="font-display font-bold text-[22px] md:text-[32px] text-brand-pink leading-snug">
              Prevent early. Treat gently.<br className="hidden md:block" /> Create a positive dental experience.
            </p>
            <footer className="font-body text-[15px] text-brand-navy/50">
              — Dr. Bhuvanesswari S., MDS
            </footer>
          </blockquote>
        </div>

        {/* Pull quote */}
        <figure className="bg-morning-white rounded-card p-6 md:p-8 shadow-card">
          <blockquote className="font-body text-body-sm md:text-body-lg text-brand-navy/80 italic leading-relaxed">
            "{PULL_QUOTE.text}"
          </blockquote>
          <figcaption className="mt-3 font-body text-meta-lg text-brand-navy/50 font-medium not-italic">
            — {PULL_QUOTE.attribution}
          </figcaption>
        </figure>
      </div>
      </JungleSideVine>
    </Section>
  );
}
