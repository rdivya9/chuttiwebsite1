import Link from 'next/link';
import PageHeaderScene from '@/components/ui/PageHeaderScene';
import Section from '@/components/ui/Section';
import FaqAccordion from '@/components/ui/FaqAccordion';
import Button from '@/components/ui/Button';
import VisitStepper from '@/components/ui/VisitStepper';
import { faqs } from '@/data/faqs';
import siteConfig from '@/data/siteConfig';

export const metadata = {
  title: "Your Child's First Visit",
  description: `What to expect at your child's first dental visit at Chutti's Dental & Wellness Center in Pallikaranai, Chennai. When to come, what happens, what to bring, and how to prepare your child.`,
};

const visitSteps = [
  { number: '1', title: 'Arrive and settle in', body: "Time for your child to take in the clinic at their own pace. There's no rush and no pressure. Very young children can sit on a parent's lap for the whole visit." },
  { number: '2', title: 'Gentle check', body: 'A gentle look at teeth, gums, jaw and bite, and how they are developing for your child\'s age. Parents stay in the room throughout.' },
  { number: '3', title: 'Cavity-risk check (Caries-Risk Assessment)', body: 'A quick assessment of how likely your child is to develop cavities, so the prevention plan fits them specifically — not a generic handout.' },
  { number: '4', title: 'Cleaning and fluoride if needed', body: 'X-rays only if there is a clinical reason to take them.' },
  { number: '5', title: 'A sit-down with you', body: "Findings, brushing technique, feeding and diet, habits (thumb-sucking, pacifier use), and a clear prevention plan. Your questions answered." },
  { number: '6', title: 'Next check-up planned', body: 'Usually every six months — adjusted to your child\'s individual risk.' },
];

const whatToBring = [
  "Your child's medical history — any conditions, allergies and current medicines",
  "Any previous dental records or X-rays",
  "Your list of questions",
  "A favourite toy or comfort item",
  "For babies: notes on feeding patterns (breast/bottle, night feeds), plus a spare set of clothes",
];

const howToPrepare = [
  "Book a time when your child is usually rested and fed — not naptime",
  "Talk about the visit simply and positively; avoid words like 'hurt', 'pain' or 'injection'",
  "Show them the clinic photos on this site so the place feels familiar before they arrive",
  "Don't promise a treat 'if you're brave' before the visit — praise afterwards instead",
  "If you have worries about your child's behaviour, share them with the doctor privately rather than in front of your child",
  "A few tears or wriggles are normal for a first visit — the team is used to it and there is no pressure",
  "After the visit, there's a little surprise waiting for your child",
];

export default function FirstVisitPage() {
  return (
    <>
      <PageHeaderScene
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: "First Visit" }]}
        title="Your child's first visit"
        intro="Unhurried and paced by your child. Here's exactly what to expect."
        illustration="firstvisit-toddler-monkey"
        illustrationAlt="Kuttan looking up curiously at a monkey hanging from a branch"
        tint="blush"
      />

      <Section bg="morning-white">
        <div className="max-w-3xl mx-auto space-y-12">

          {/* When to come */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-h3-mobile md:text-h3-desktop text-brand-navy">
              When to come
            </h2>
            <p className="font-body text-body-sm text-brand-navy/75 leading-relaxed">
              By the first birthday, or within six months of the first tooth appearing — whichever
              comes first. This is the AAPD recommendation, and it's what Dr. Bhuvanesswari's
              approach follows.
            </p>
            <p className="font-body text-body-sm text-brand-navy/75 leading-relaxed">
              If your child is older and has never seen a dentist, that is completely fine — come
              now. There is no judgement, only a plan for what to do from here.
            </p>
            <div className="bg-leaf-mint rounded-card p-4">
              <p className="font-body text-[14px] text-brand-navy/80">
                <strong>First visit duration:</strong> unhurried and paced by your child. We do not
                time appointments — the visit ends when your child is ready to go.
              </p>
            </div>
          </div>

          {/* What happens */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-h3-mobile md:text-h3-desktop text-brand-navy">
              Here's what to expect:
            </h2>
            <VisitStepper steps={visitSteps} defaultActive={4} />
          </div>

          {/* What to bring / How to prepare */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div
              className="rounded-2xl p-6 md:p-7"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.30) 100%)',
                borderLeft: '4px solid rgba(22,41,92,0.35)',
                boxShadow: '0 8px 32px rgba(22,41,92,0.10), inset 0 1px 0 rgba(255,255,255,0.95)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              <h2 className="font-display font-semibold text-[17px] text-brand-navy mb-4">What to bring</h2>
              <ul className="space-y-3">
                {whatToBring.map((item, i) => (
                  <li key={i} className="flex gap-3 font-body text-[13.5px] text-brand-navy/75 leading-snug">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-green shrink-0 mt-0.5">
                      <span className="text-white text-[10px] font-bold">✓</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-2xl p-6 md:p-7"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.30) 100%)',
                borderLeft: '4px solid rgba(22,41,92,0.35)',
                boxShadow: '0 8px 32px rgba(22,41,92,0.10), inset 0 1px 0 rgba(255,255,255,0.95)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              <h2 className="font-display font-semibold text-[17px] text-brand-navy mb-4">How to prepare your child</h2>
              <ul className="space-y-3">
                {howToPrepare.map((item, i) => (
                  <li key={i} className="flex gap-3 font-body text-[13.5px] text-brand-navy/75 leading-snug">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-green shrink-0 mt-0.5">
                      <span className="text-white text-[10px] font-bold">✓</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Full FAQ */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
              Frequently asked questions
            </h2>
            <FaqAccordion items={faqs} withSchema />
          </div>

          {/* Book CTA */}
          <div className="bg-sky-mist rounded-card p-6 md:p-8 space-y-4">
            <p className="font-display font-semibold text-h3-mobile text-brand-navy">
              Ready to book your child's first visit?
            </p>
            <p className="font-body text-[14px] text-brand-navy/70">
              {siteConfig.hours.display} · {siteConfig.address.landmark}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="primary">Book a visit</Button>
              <Button
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappPrefill)}`}
                variant="outline"
              >
                WhatsApp us
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
