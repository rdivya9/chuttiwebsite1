import { Check } from 'lucide-react';
import Section from '@/components/ui/Section';
import IllustrationImage from '@/components/ui/IllustrationImage';

const whatWeLookAt = [
  'Your child\'s age and stage of dental development',
  'Past cavities or current decay',
  'How well teeth are being brushed and plaque levels',
  'Fluoride use at home',
  'Diet, feeding habits and sugar exposure',
  'Medical or developmental factors that affect dental health',
];

const whatThePlanCanInclude = [
  'Guidance on brushing technique and the right amount of fluoride toothpaste',
  'Diet and feeding advice',
  'Professional fluoride application at the right intervals',
  'Protective coatings on back teeth (sealants) when the time is right',
  'Regular monitoring visits, timed to your child\'s specific risk',
  'Minimally invasive treatment when a cavity is found early — saving as much natural tooth as possible',
];

export default function PreventEarly() {
  return (
    <Section bg="sky-mist" id="prevent-early">
      <div className="space-y-10">

        {/* Top: heading + illustration */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-4">
            <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
              Prevent early.
            </h2>
            <p className="font-body text-body-sm md:text-body-lg text-brand-navy/75 leading-relaxed">
              Start before problems do. Dr. Bhuvanesswari follows AAPD recommendations: a dental
              home by the first birthday, a cavity-risk check for every child, and minimally invasive
              treatment that protects healthy tooth structure when action is needed.
            </p>
            <p className="font-body text-body-sm text-brand-navy/70 leading-relaxed">
              Every child's risk is different — one child brushes well, eats little sugar and has
              naturally strong enamel; another has had cavities before and needs closer monitoring.
              The cavity-risk check (Caries-Risk Assessment, CRA) makes the prevention plan specific
              to your child, not a generic advice sheet.
            </p>
          </div>
          <div className="flex justify-center">
            <IllustrationImage
              name="approach-elephant-family"
              alt="A parent walking with a young child alongside a mother elephant and her calf — one dental home across all of childhood"
              className="w-full max-w-xs md:max-w-full h-auto"
            />
          </div>
        </div>

        {/* Full-width glass cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Card 1 */}
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
            <h3 className="font-display font-semibold text-[17px] text-brand-navy mb-4">
              What we look at
            </h3>
            <ul className="space-y-3">
              {whatWeLookAt.map((item, i) => (
                <li key={i} className="flex gap-3 font-body text-[13.5px] text-brand-navy/75 leading-snug">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-green shrink-0 mt-0.5">
                    <Check size={10} className="text-white" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 */}
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
            <h3 className="font-display font-semibold text-[17px] text-brand-navy mb-4">
              What the plan can include
            </h3>
            <ul className="space-y-3">
              {whatThePlanCanInclude.map((item, i) => (
                <li key={i} className="flex gap-3 font-body text-[13.5px] text-brand-navy/75 leading-snug">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-green shrink-0 mt-0.5">
                    <Check size={10} className="text-white" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </Section>
  );
}
