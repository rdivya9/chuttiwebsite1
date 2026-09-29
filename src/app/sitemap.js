import siteConfig from '@/data/siteConfig';
import { services } from '@/data/services';
import { blogPosts } from '@/data/blogPosts';

export default function sitemap() {
  const base = siteConfig.siteUrl;
  const now  = new Date().toISOString();

  // ── Static routes ──────────────────────────────────────────────────────
  const staticRoutes = [
    { url: base,                          lastModified: now, priority: 1.0 },
    { url: `${base}/first-visit`,         lastModified: now, priority: 0.9 },
    { url: `${base}/about`,               lastModified: now, priority: 0.8 },
    { url: `${base}/services`,            lastModified: now, priority: 0.9 },
    { url: `${base}/reviews`,             lastModified: now, priority: 0.7 },
    { url: `${base}/blog`,                lastModified: now, priority: 0.8 },
    { url: `${base}/contact`,             lastModified: now, priority: 0.8 },
    { url: `${base}/privacy`,             lastModified: now, priority: 0.3 },
  ];

  // ── Service pages ──────────────────────────────────────────────────────
  const serviceRoutes = services.map((s) => ({
    url:          `${base}/services/${s.slug}`,
    lastModified: now,
    priority:     0.85,
  }));

  // ── Blog posts ─────────────────────────────────────────────────────────
  const blogRoutes = blogPosts.map((post) => ({
    url:          `${base}/blog/${post.slug}`,
    lastModified: post.publishedAt || now,
    priority:     0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
