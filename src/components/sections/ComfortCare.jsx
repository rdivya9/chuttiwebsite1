import Image from 'next/image';
import Section from '@/components/ui/Section';
import IllustrationImage from '@/components/ui/IllustrationImage';
import Button from '@/components/ui/Button';

const tsdSteps = [
  {
    number: '1',
    label:  'Tell',
    asset:  'tsd-tell',
    alt:    'Bear cub gently explaining what will happen to Chuttika, who listens curiously',
    copy:   'The doctor explains what is going to happen, in simple words your child can understand.',
  },
  {
    number: '2',
    label:  'Show',
    asset:  'tsd-show',
    alt:    'Bear cub showing Chuttika a small hand mirror',
    copy:   'She shows the instrument or step — so nothing comes as a surprise.',
  },
  {
    number: '3',
    label:  'Do',
    asset:  'tsd-do',
    alt:    'Chuttika smiling with her mouth open while the bear cub holds a mirror nearby, both happy',
    copy:   'Then she does it. The aim is less fear with every visit, never more.',
  },
];

export default function ComfortCare() {
  return (
    <Section bg="leaf-mint" id="comfort-care" className="relative overflow-hidden">
      <div className="space-y-12">
        {/* Heading */}
        <div className="max-w-2xl space-y-4">
          <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
            Treat gently.
          </h2>
          <p className="font-body text-body-sm md:text-body-lg text-brand-navy/75 leading-relaxed">
            Care adapted to each child's age, temperament, anxiety and past experiences. Some
            children are fine from day one; others need time. The pace is always set by your child.
          </p>
        </div>

        {/* Tell-Show-Do */}
        <div className="space-y-6">
          <h3 className="font-display font-semibold text-h3-mobile md:text-h3-desktop text-brand-navy">
            Behaviour guidance — Tell, Show, Do
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {tsdSteps.map((step) => (
              <div key={step.number} className="bg-morning-white rounded-card p-5 shadow-card space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-pink text-white font-display font-bold text-[15px]">
                    {step.number}
                  </span>
                  <span className="font-display font-bold text-[18px] text-brand-navy">{step.label}</span>
                </div>
                <IllustrationImage
                  name={step.asset}
                  alt={step.alt}
                  className="w-full h-auto rounded-xl"
                />
                <p className="font-body text-[14px] text-brand-navy/75 leading-relaxed">{step.copy}</p>
              </div>
            ))}
          </div>
          <p className="font-body text-[14px] text-brand-navy/60 italic">
            Parents are welcome to stay in the treatment room throughout. A few tears or wriggles are
            normal for a first visit — the team is used to it and there is no pressure.
          </p>
        </div>

      </div>
    </Section>
  );
}
