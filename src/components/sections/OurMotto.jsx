import Section from '@/components/ui/Section';

// Using Nandha R.'s review theme: explains, child comfortable — a short confident quote
// Full review text is in reviews.js; this is a safe excerpt that captures the theme.
const PULL_QUOTE = {
  text: "The doctor was extremely patient and gentle with my son and explained the treatment clearly before proceeding. My son was comfortable throughout.",
  attribution: "Nandha R., parent",
};

export default function OurMotto() {
  return (
    <Section bg="sky-mist" id="our-motto">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
          A great dental experience — not just a dental treatment.
        </h2>

        <p className="font-body text-body-sm md:text-body-lg text-brand-navy/75 leading-relaxed">
          The goal is not only to complete the treatment. It is for every child to leave with a{' '}
          <strong>better relationship with dentistry than when they walked in</strong>. A child who
          feels safe at the dentist today is a teenager and adult who doesn't avoid dental care.
          That is what "Wellness" means in the clinic's name — not one-off treatment when something
          hurts, but a dental home across the whole of childhood.
        </p>

        {/* Pull quote */}
        <figure className="bg-morning-white rounded-card p-6 md:p-8 shadow-card text-left">
          <blockquote className="font-body text-body-sm md:text-body-lg text-brand-navy/80 italic leading-relaxed">
            "{PULL_QUOTE.text}"
          </blockquote>
          <figcaption className="mt-3 font-body text-meta-lg text-brand-navy/50 font-medium not-italic">
            — {PULL_QUOTE.attribution}
          </figcaption>
        </figure>

        {/* Doctor motto */}
        <p className="font-display font-semibold text-[18px] md:text-[22px] text-brand-pink leading-snug">
          "Prevent early. Treat gently. Create a positive dental experience."
        </p>
        <p className="font-body text-meta-lg text-brand-navy/50">
          — Dr. Bhuvanesswari S., MDS
        </p>
      </div>
    </Section>
  );
}
