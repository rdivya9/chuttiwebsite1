'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
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
  const [activeStep, setActiveStep] = useState(3);

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
              Unhurried and paced by your child.<br />
              The first visit is an introduction —<br />not a production-line check-up.
            </p>
          </div>
          {/* TODO Phase 5: TappableCharacter wrapper */}
          <IllustrationImage
            name="firstvisit-toddler-monkey"
            alt="Kuttan looking up curiously at a monkey hanging from a branch, both smiling"
            className="w-36 h-auto md:w-44 shrink-0"
          />
        </div>

        {/* Visit sequence — interactive stepper */}
        <div className="-mt-16">
          <h3 className="font-display font-semibold text-h3-mobile md:text-h3-desktop text-brand-navy mb-6">
            Here's what to expect:
          </h3>
          <ol className="space-y-0">
            {visitSteps.map((step, i) => {
              const isActive = i === activeStep;
              const isDone   = i < activeStep;
              return (
                <li key={step.number} className="flex gap-4">

                  {/* Left column: circle + connector */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setActiveStep(i)}
                      className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
                      style={{
                        background: isActive ? '#E0246F' : isDone ? '#6CBF4A' : 'rgba(224,36,111,0.12)',
                        color: isActive || isDone ? '#fff' : '#E0246F',
                      }}
                      aria-expanded={isActive}
                    >
                      <span className="font-display font-bold text-[14px]">
                        {isDone ? '✓' : step.number}
                      </span>
                    </button>
                    {i < visitSteps.length - 1 && (
                      <div className="w-[2px] flex-1 min-h-[12px] bg-brand-pink/20 my-1" aria-hidden="true" />
                    )}
                  </div>

                  {/* Right column: content */}
                  <div
                    className={`flex-1 rounded-2xl px-4 py-3 mb-2 cursor-pointer transition-all duration-200 ${
                      isActive ? 'bg-brand-pink/8 border border-brand-pink/20' : 'hover:bg-brand-pink/5'
                    }`}
                    onClick={() => setActiveStep(i)}
                  >
                    <p className={`font-body font-semibold text-[15px] leading-snug transition-colors ${isActive ? 'text-brand-pink' : 'text-brand-navy'}`}>
                      {step.title}
                    </p>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          key="body"
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="font-body text-[14px] text-brand-navy/70 leading-relaxed overflow-hidden"
                        >
                          {step.body}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                </li>
              );
            })}
          </ol>
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
            <h3 className="font-display font-semibold text-[17px] text-brand-navy mb-4">What to bring</h3>
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
            <h3 className="font-display font-semibold text-[17px] text-brand-navy mb-4">How to prepare your child</h3>
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
