import Link from 'next/link';
import { Star } from 'lucide-react';
import PageHeaderScene from '@/components/ui/PageHeaderScene';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { reviews } from '@/data/reviews';
import siteConfig from '@/data/siteConfig';

export const metadata = {
  title: 'Parent Reviews',
  description: `${siteConfig.rating.value}★ on Google reviews. Read what parents say about Chutti's Dental & Wellness Center in Pallikaranai, Chennai.`,
};

function StarRow({ count = 5 }) {
  return (
    <span className="flex gap-0.5" aria-label={`${count} stars`}>
      {[...Array(count)].map((_, i) => (
        <Star key={i} size={14} className="fill-sun-yellow text-sun-yellow" aria-hidden="true" />
      ))}
    </span>
  );
}

export default function ReviewsPage() {
  const featured = reviews.find(r => r.featured);
  const others   = reviews.filter(r => !r.featured);

  return (
    <>
      <PageHeaderScene
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Reviews' }]}
        title="What parents say"
        intro={`${siteConfig.rating.value}★ on Google — every review five stars.`}
        illustration="reviews-sunbird"
        tint="morning-white"
      />

      <Section bg="morning-white">
        <div className="space-y-10 max-w-4xl">
          {/* Google badge */}
          <a
            href={siteConfig.rating.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 bg-sky-mist rounded-card border border-brand-navy/8 hover:border-brand-pink/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
          >
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-sun-yellow text-sun-yellow" aria-hidden="true" />
              ))}
            </span>
            <span className="font-body font-semibold text-brand-navy">{siteConfig.rating.value}★</span>
            <span className="font-body text-[14px] text-brand-navy/60 underline underline-offset-2">
              See reviews on Google
            </span>
          </a>

          {/* Featured review */}
          {featured && (
            <article className="bg-morning-white rounded-card p-6 md:p-8 shadow-card border-l-4 border-brand-pink space-y-4">
              <StarRow count={featured.rating} />
              {featured.label && (
                <p className="font-body text-meta-lg font-semibold text-brand-pink">{featured.label}</p>
              )}
              <blockquote className="font-body text-body-sm text-brand-navy/80 leading-relaxed whitespace-pre-line">
                "{featured.text}"
              </blockquote>
              <footer>
                <cite className="font-body font-semibold text-[15px] text-brand-navy not-italic">
                  {featured.reviewer}
                </cite>
                {featured.teamMentioned && (
                  <p className="font-body text-[13px] text-brand-navy/40 mt-0.5">
                    Also mentions: {featured.teamMentioned}
                  </p>
                )}
              </footer>
            </article>
          )}

          {/* Other reviews grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {others.map(review => {
              const displayText = review.usePartialOnly && review.partialText
                ? review.partialText
                : review.text;
              return (
                <article key={review.id} className="bg-morning-white rounded-card p-5 shadow-card space-y-3">
                  <div className="flex items-center justify-between">
                    <StarRow count={review.rating} />
                    {review.label && (
                      <span className="font-body text-[12px] text-brand-navy/40">{review.label}</span>
                    )}
                  </div>
                  <blockquote className="font-body text-[14px] text-brand-navy/75 leading-relaxed">
                    <p>"{displayText}"</p>
                    {review.isTanglish && review.gloss && (
                      <p className="mt-2 text-[13px] text-brand-navy/40 italic not-italic border-t border-brand-navy/10 pt-2">
                        {review.gloss}
                      </p>
                    )}
                  </blockquote>
                  <footer>
                    <cite className="font-body font-semibold text-[13px] text-brand-navy not-italic">
                      {review.reviewer}
                    </cite>
                  </footer>
                </article>
              );
            })}
          </div>

          {/* Link to Google */}
          <div className="text-center space-y-4">
            <a
              href={siteConfig.rating.googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-body font-medium text-brand-pink text-[15px] hover:underline"
            >
              Read and leave reviews on Google
            </a>
            <div className="pt-2">
              <Button variant="primary">Book a visit</Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
