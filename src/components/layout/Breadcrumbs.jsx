import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

/**
 * Breadcrumbs — visible on all inner pages.
 *
 * Also renders a BreadcrumbList JSON-LD schema inline.
 *
 * Usage:
 *   <Breadcrumbs items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Services', href: '/services' },
 *     { label: 'Preventive Care' },  // no href = current page
 *   ]} />
 */
export default function Breadcrumbs({ items = [] }) {
  if (items.length < 2) return null;

  const schema = {
    '@context':        'https://schema.org',
    '@type':           'BreadcrumbList',
    itemListElement:   items.map((item, i) => ({
      '@type':   'ListItem',
      position:  i + 1,
      name:      item.label,
      ...(item.href ? { item: `https://chuttisdentalcenter.vercel.app${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-1 text-meta text-brand-navy/60 font-body">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={i} className="flex items-center gap-1">
                {i > 0 && (
                  <ChevronRight size={14} aria-hidden="true" className="shrink-0 opacity-40" />
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-brand-pink transition-colors duration-150 underline underline-offset-2"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'text-brand-navy font-medium' : ''}>
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
