import Link from 'next/link';
import Button from '@/components/ui/Button';
import IllustrationImage from '@/components/ui/IllustrationImage';

export const metadata = {
  title: 'Page not found',
};

/**
 * 404 — "Lost in the jungle" scene.
 * Full illustration: lost-monkey-map (T2 — Phase 5).
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-morning-white flex flex-col items-center justify-center px-5 py-24 text-center">
      <div className="max-w-md mx-auto space-y-8">
        {/* Illustration — Phase 5 */}
        <div className="flex justify-center">
          <IllustrationImage
            name="lost-monkey-map"
            className="w-64 h-auto"
            alt="The monkey and Kuttan looking puzzled at an upside-down map, both smiling"
          />
        </div>

        <div className="space-y-3">
          <h1 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
            This path isn't on our map
          </h1>
          <p className="font-body text-body-sm text-brand-navy/70 max-w-prose-dental mx-auto">
            The page you were looking for doesn't seem to exist. Let's get you back to the jungle.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/" variant="primary">Back to Home</Button>
          <Button href="/contact" variant="outline">Contact us</Button>
        </div>
      </div>
    </div>
  );
}
