import Link from 'next/link';
import { Star } from 'lucide-react';
import Section from '@/components/ui/Section';
import IllustrationImage from '@/components/ui/IllustrationImage';
import { reviews } from '@/data/reviews';
import siteConfig from '@/data/siteConfig';

function StarRow({ count = 5 }) {
  return (
    <span className="flex gap-0.5" aria-label={`${count} stars`}>
      {[...Array(count)].map((_, i) => (
        <Star key={i} size={14} className="fill-sun-yellow text-sun-yellow" aria-hidden="true" />
      ))}
    </span>
  );
}

function ReviewCard({ review, featured = false }) {
  // Determine which text to show
  const displayText = review.usePartialOnly && review.partialText
    ? review.partialText
    : review.text;

  return (
    <article
      className={[
        'bg-morning-white rounded-card p-5 md:p-6 shadow-card flex flex-col gap-3',
        featured ? 'md:col-span-2 md:row-span-2 border-l-4 border-brand-pink' : '',
      ].join(' ')}
    >
      <div className="flex items-center justify-between gap-3">
        <StarRow count={review.rating} />
        {review.label && (
          <span className="font-body text-[12px] text-brand-navy/40 font-medium">{review.label}</span>
        )}
      </div>

      <blockquote className={`font-body leading-relaxed text-brand-navy/80 ${featured ? 'text-body-sm' : 'text-[14px]'}`}>
        <p>"{displayText}"</p>
        {review.isTanglish && review.gloss && (
          <p className="mt-3 text-[13px] text-brand-navy/50 italic not-italic border-t border-brand-navy/10 pt-3">
            {review.gloss}
          </p>
        )}
      </blockquote>

      <footer className="mt-auto pt-2">
        <cite className="font-body text-[13px] font-semibold text-brand-navy not-italic">
          {review.reviewer}
        </cite>
        {review.teamMentioned && (
          <p className="font-body text-[12px] text-brand-navy/40 mt-0.5">
            Also mentions: {review.teamMentioned}
          </p>
        )}
      </footer>
    </article>
  );
}

export default function ParentReviews() {
  const featured = reviews.find(r => r.featured);
  const others   = reviews.filter(r => !r.featured);

  return (
    <Section bg="morning-white" id="reviews">
      <div className="space-y-10">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
              What parents say
            </h2>
            {/* Rating badge */}
            <a
              href={siteConfig.rating.googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] font-body text-brand-navy/70 hover:text-brand-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy rounded"
            >
              <StarRow count={5} />
              <span className="font-semibold">{siteConfig.rating.value}★</span>
              <span>·</span>
              <span className="underline underline-offset-2">
                Google reviews
              </span>
            </a>
          </div>

          {/* Sunbird illustration — Phase 5: tappable */}
          <div className="shrink-0">
            <IllustrationImage
              name="reviews-sunbird"
              alt="A tiny sunbird perched on a twig"
              className="w-16 h-auto"
            />
          </div>
        </div>

        {/* Review grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
          {/* Featured review — spans 2 columns */}
          {featured && <ReviewCard review={featured} featured />}

          {/* Remaining reviews */}
          {others.map(r => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href={siteConfig.rating.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-body font-medium text-brand-pink text-[15px] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy rounded"
          >
            Read all reviews on Google
          </Link>
        </div>
      </div>
    </Section>
  );
}
