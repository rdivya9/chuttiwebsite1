'use client';

import { Check } from 'lucide-react';
import Section from '@/components/ui/Section';
import IllustrationImage from '@/components/ui/IllustrationImage';
import Button from '@/components/ui/Button';
import { useBooking } from '@/components/booking/BookingProvider';

const points = [
  {
    title: 'Timing matters in a growing mouth.',
    body:  'A pediatric dentist monitors jaw development from early childhood, so she knows when a child will benefit from aligners and what approach fits their stage of growth. Aligners are available for children of any age who clinically need them — not only teenagers.',
  },
  {
    title: 'The full picture, not just straightening.',
    body:  'Habits like thumb-sucking, tongue-thrust and early tooth loss all affect alignment. Dr. Bhuvanesswari sees these because she has often been caring for the child\'s teeth all along.',
  },
  {
    title: 'Easy for children to live with.',
    body:  'Clear, removable trays — no metal brackets or wires. Easy to remove for eating, brushing and school.',
  },
  {
    title: 'Continuity.',
    body:  'The same doctor who knows your child\'s dental history plans the aligners. No starting over with a stranger.',
  },
];

export default function StraighterSmiles() {
  const { openBooking } = useBooking();

  return (
    <Section bg="sun-yellow" id="aligners" className="bg-sun-yellow/30">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="space-y-8 order-1">
          <div className="space-y-4">
            <div className="inline-block bg-brand-navy/8 text-brand-navy font-body font-semibold text-meta px-3 py-1 rounded-chip">
              Invisalign Provider
            </div>
            <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
              Straighter smiles, at the right time.
            </h2>
            <p className="font-body text-body-sm md:text-body-lg text-brand-navy/75 leading-relaxed">
              Planned by someone who has watched your child's teeth grow.
            </p>
          </div>

          <ul className="space-y-5">
            {points.map(({ title, body }) => (
              <li key={title} className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-green shrink-0 mt-0.5">
                  <Check size={13} className="text-white" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-body font-semibold text-[15px] text-brand-navy mb-0.5">{title}</p>
                  <p className="font-body text-[14px] text-brand-navy/70 leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => openBooking({ reason: 'Aligners / crooked teeth' })}
              className="px-6 py-3 bg-brand-pink text-white font-body font-semibold text-btn rounded-pill hover:bg-[#c41d63] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
            >
              Book an aligner consultation
            </button>
            <Button href="/services/clear-aligners" variant="outline">
              Learn more
            </Button>
          </div>
        </div>

        {/* Illustration */}
        <div className="order-2 flex flex-col items-center gap-4 relative">
          {/* TODO Phase 5: TappableCharacter wrapper + aligner-tray float animation */}
          <IllustrationImage
            name="aligners-teen-giraffe"
            alt="A confident teen holding a clear aligner case beside a tall giraffe"
            className="w-56 md:w-72 h-auto"
          />
          {/* Floating aligner tray */}
          <IllustrationImage
            name="aligner-tray"
            alt="A clear dental aligner tray"
            className="w-32 h-auto opacity-90"
          />
        </div>
      </div>
    </Section>
  );
}
