import IllustrationImage from '@/components/ui/IllustrationImage';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

/**
 * PageHeaderScene — shared header template for all inner pages.
 *
 * Height: 300px mobile / 380px desktop
 * Layout: H1 + intro left (desktop) or top (mobile); illustration right (desktop) / below (mobile)
 * Leaf-edge divider at the bottom (Phase 5: real divider illustration)
 *
 * The illustration is always tappable (TappableCharacter wired in Phase 5).
 */
export default function PageHeaderScene({
  breadcrumbs = [],
  title,
  intro,
  illustration,     // illustration name key from illustrations.js
  illustrationAlt,
  tint = 'sky-mist', // matches headerTint from services data
}) {
  const tintMap = {
    'leaf-mint':    'bg-leaf-mint',
    'sky-mist':     'bg-sky-mist',
    'blush':        'bg-blush',
    'sun-yellow':   'bg-sun-yellow/30',
    'morning-white':'bg-morning-white',
  };

  return (
    <div className={`${tintMap[tint] || 'bg-sky-mist'} pt-20 md:pt-24 pb-0 relative overflow-hidden`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[160px] md:min-h-[200px]">
          {/* Text */}
          <div className="space-y-4 order-1">
            <h1 className="font-display font-extrabold text-h2-mobile md:text-h2-desktop text-brand-navy leading-[1.1]">
              {title}
            </h1>
            {intro && (
              <p className="font-body text-body-sm md:text-body-lg text-brand-navy/70 max-w-prose-dental leading-relaxed">
                {intro}
              </p>
            )}
          </div>

          {/* Illustration */}
          {illustration && (
            <div className="order-2 flex justify-center md:justify-end">
              <IllustrationImage
                name={illustration}
                alt={illustrationAlt || ''}
                className="w-auto h-36 md:h-44 object-contain"
              />
            </div>
          )}
        </div>
      </div>

      {/* Leaf-edge divider — Phase 5: replace with IllustrationImage divider-leaf-1 */}
      <div
        aria-hidden="true"
        className="w-full h-6 bg-morning-white"
        style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }}
      />
    </div>
  );
}
