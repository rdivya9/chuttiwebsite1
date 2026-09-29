import Image from 'next/image';
import Link from 'next/link';
import PageHeaderScene from '@/components/ui/PageHeaderScene';
import Section from '@/components/ui/Section';
import { blogPosts } from '@/data/blogPosts';

export const metadata = {
  title: 'Parent Guides & Myth vs Fact',
  description: "Evidence-based dental health guides for parents, from Chutti's Dental & Wellness Center. Brushing by age, first visits, aligners, and more.",
};

const guides   = blogPosts.filter(p => p.type === 'guide');
const mythFact = blogPosts.filter(p => p.type === 'myth-fact');

export default function BlogPage() {
  return (
    <>
      <PageHeaderScene
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
        title="Parent guides"
        intro="Evidence-based articles to help you care for your child's teeth — written in Dr. Bhuvanesswari's voice."
        illustration="blog-owl-reading"
        illustrationAlt="A wise owl reading a storybook to Chuttika and the boy"
        tint="blush"
      />

      <Section bg="morning-white">
        <div className="space-y-16">

          {/* Parent Guides grid */}
          <div className="space-y-8">
            <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
              Parent Guides
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {guides.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-3 p-5 bg-morning-white rounded-card border border-brand-navy/8 hover:border-brand-pink/30 hover:shadow-card transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-body text-[11px] font-semibold text-brand-pink uppercase tracking-wide">
                      Parent Guide
                    </span>
                    {post.readingTime && (
                      <span className="font-body text-[12px] text-brand-navy/40">{post.readingTime}</span>
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-[16px] text-brand-navy group-hover:text-brand-pink transition-colors leading-snug">
                    {post.title}
                  </h3>
                  {post.metaDescription && (
                    <p className="font-body text-[13px] text-brand-navy/60 leading-relaxed line-clamp-3">
                      {post.metaDescription}
                    </p>
                  )}
                  <div className="mt-auto pt-2">
                    {!post.approved && (
                      <span className="font-body text-[11px] text-brand-navy/30 italic">
                        Coming soon
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Myth vs Fact image section */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
                Myth vs Fact
              </h2>
              <p className="font-body text-body-sm text-brand-navy/60">
                Common misconceptions about children's dental health — and what's actually true.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {mythFact.map(post => (
                <div key={post.slug} className="rounded-card overflow-hidden shadow-card">
                  <Image
                    src={post.imageFile}
                    alt={post.imageAlt && !post.imageAlt.startsWith('TODO')
                      ? post.imageAlt
                      : `Myth vs Fact card: ${post.title}`
                    }
                    width={600}
                    height={600}
                    className="w-full h-auto"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
            <p className="font-body text-[13px] text-brand-navy/40">
              More cards coming soon.
            </p>
          </div>

        </div>
      </Section>
    </>
  );
}
