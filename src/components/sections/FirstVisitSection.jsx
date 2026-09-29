'use client';

import Link from 'next/link';
import Section from '@/components/ui/Section';
import IllustrationImage from '@/components/ui/IllustrationImage';
import FaqAccordion from '@/components/ui/FaqAccordion';
import { faqs } from '@/data/faqs';

const visitSteps = [
  {
    number: '1',
    title:  'Arrive and settle in',
    body:   'Time for your child to take in the clinic at their own pace. No rush.',
  },
  {
    number: '2',
    title:  'Gentle check',
    body:   'Teeth, gums, jaw and bite — and how they are developing. Very young children can sit on a parent\'s lap. Parents stay throughout.',
  },
  {
    number: '3',
    title:  'Cavity-risk check',
    body:   'A quick look at how likely your child is to get cavities, so the prevention plan fits them specifically.',
  },
  {
    number: '4',
    title:  'Talk with you',
    body:   'Findings, brushing, diet, habits (thumb-sucking, pacifier) and a prevention plan. Your questions answered.',
  },
  {
    number: '5',
    title:  'Next check-up planned',
    body:   'Usually every six months — adjusted to your child\'s individual risk.',
  },
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
  "Talk about the visit simply and positively; avoid words like 'hurt' or 'pain'",
  "Show them the clinic photos on this site so the place feels familiar",
  "Don't promise a treat 'if you're brave' before the visit; praise afterwards instead",
  "A few tears or wriggles are normal — the team is used to it and there is no pressure",
  // Small reward (doctor confirmed stickers/small toy)
  "After the visit, there's a little surprise waiting for your child",
];

export default function FirstVisitSection() {
  // Homepage shows a curated subset of FAQs
  const homepageFaqs = faqs.filter(f =>
    ['when-first-visit', 'scared-child', 'laughing-gas-safe', 'stay-with-child',
     'same-day-appointment', 'adults-treated', 'location-timings'].includes(f.id)
  );

  return (
    <Section bg="blush" id="first-visit" className="bg-blush/50">
      <div className="space-y-12">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
              Your child's first visit
            </h2>
            <p className="font-body text-body-sm text-brand-navy/70 leading-relaxed">
              Unhurried and paced by your child. The first visit is an introduction — not a
              production-line check-up. Here's what to expect.
            </p>
          </div>
          {/* TODO Phase 5: TappableCharacter wrapper */}
          <IllustrationImage
            name="firstvisit-toddler-monkey"
            alt="Kuttan looking up curiously at a monkey hanging from a branch, both smiling"
            className="w-36 h-auto md:w-44 shrink-0"
          />
        </div>

        {/* Visit sequence */}
        <div>
          <h3 className="font-display font-semibold text-h3-mobile md:text-h3-desktop text-brand-navy mb-6">
            What happens
          </h3>
          <ol className="space-y-4">
            {visitSteps.map(step => (
              <li key={step.number} className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-pink text-white font-display font-bold text-[15px] shrink-0 mt-0.5">
                  {step.number}
                </span>
                <div>
                  <p className="font-body font-semibold text-[15px] text-brand-navy">{step.title}</p>
                  <p className="font-body text-[14px] text-brand-navy/70 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* What to bring / How to prepare */}
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display font-semibold text-h3-mobile text-brand-navy mb-4">What to bring</h3>
            <ul className="space-y-2">
              {whatToBring.map((item, i) => (
                <li key={i} className="flex gap-2 font-body text-[14px] text-brand-navy/75 leading-snug">
                  <span className="text-brand-green font-bold shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold text-h3-mobile text-brand-navy mb-4">How to prepare your child</h3>
            <ul className="space-y-2">
              {howToPrepare.map((item, i) => (
                <li key={i} className="flex gap-2 font-body text-[14px] text-brand-navy/75 leading-snug">
                  <span className="text-brand-green font-bold shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQ accordion */}
        <div>
          <h3 className="font-display font-semibold text-h3-mobile md:text-h3-desktop text-brand-navy mb-2">
            Frequently asked questions
          </h3>
          <FaqAccordion items={homepageFaqs} withSchema={false} />
          <div className="mt-6">
            <Link
              href="/first-visit"
              className="font-body font-medium text-brand-pink text-[15px] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy rounded"
            >
              All FAQs and first-visit details →
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
