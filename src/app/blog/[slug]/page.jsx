import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { blogPosts } from '@/data/blogPosts';
import siteConfig from '@/data/siteConfig';

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) return {};
  return {
    title:       post.title,
    description: post.metaDescription || post.title,
    openGraph: {
      type:        'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) notFound();

  // Myth vs Fact: image display
  if (post.type === 'myth-fact') {
    return (
      <>
        <div className="bg-blush/50 pt-20 md:pt-24 pb-10">
          <div className="max-w-3xl mx-auto px-5 md:px-8">
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]} />
            <h1 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy mt-2">
              {post.title}
            </h1>
          </div>
        </div>
        <Section bg="morning-white">
          <div className="max-w-2xl space-y-8">
            <Image
              src={post.imageFile}
              alt={post.imageAlt && !post.imageAlt.startsWith('TODO')
                ? post.imageAlt
                : `Myth vs Fact: ${post.title}`
              }
              width={760}
              height={760}
              className="w-full h-auto rounded-card shadow-card"
              priority
            />
            <div className="flex gap-3">
              <Button variant="primary">Book a visit</Button>
              <Link href="/blog" className="inline-flex items-center font-body text-[14px] text-brand-navy/60 hover:text-brand-navy transition-colors py-3">
                ← More from the blog
              </Link>
            </div>
          </div>
        </Section>
      </>
    );
  }

  // Parent Guide: article layout
  return (
    <>
      <div className="bg-blush/50 pt-20 md:pt-24 pb-10">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title },
          ]} />
          <div className="flex items-center gap-3 mt-2 mb-4">
            <span className="font-body text-[11px] font-semibold text-brand-pink uppercase tracking-wide">Parent Guide</span>
            {post.readingTime && (
              <span className="font-body text-[12px] text-brand-navy/40">{post.readingTime} read</span>
            )}
          </div>
          <h1 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
            {post.title}
          </h1>
          {post.metaDescription && (
            <p className="font-body text-body-sm text-brand-navy/60 mt-4 leading-relaxed">
              {post.metaDescription}
            </p>
          )}
        </div>
      </div>

      <Section bg="morning-white">
        <div className="max-w-prose-dental">
          {/* Article body */}
          {post.sections && post.sections.length > 0 ? (
            <div className="space-y-8 font-body text-body-sm text-brand-navy/80 leading-relaxed">
              {post.sections.map((section, i) => (
                <div key={i} className="space-y-3">
                  {section.heading && (
                    <h2 className="font-display font-bold text-h3-mobile text-brand-navy">{section.heading}</h2>
                  )}
                  {section.body && <p>{section.body}</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center space-y-3">
              <p className="font-body text-body-sm text-brand-navy/50">
                This article is coming soon — check back shortly.
              </p>
            </div>
          )}

          {/* Related service link */}
          {post.relatedService && (
            <div className="mt-10 p-5 bg-sky-mist rounded-card space-y-2">
              <p className="font-body font-medium text-[14px] text-brand-navy/70">Related service</p>
              <Link
                href={post.relatedService}
                className="font-body font-semibold text-[15px] text-brand-pink hover:underline"
              >
                {post.relatedService.replace('/services/', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                {' '}→
              </Link>
            </div>
          )}

          {/* Booking prompt */}
          <div className="mt-10 space-y-4">
            <p className="font-display font-semibold text-h3-mobile text-brand-navy">
              Questions about your child's dental health?
            </p>
            <p className="font-body text-[14px] text-brand-navy/70">
              Book an appointment with Dr. Bhuvanesswari — {siteConfig.hours.display}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="primary">Book a visit</Button>
              <Link href="/blog" className="inline-flex items-center font-body text-[14px] text-brand-navy/60 hover:text-brand-navy transition-colors py-3">
                ← More from the blog
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
