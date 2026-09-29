'use client';

import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * FaqAccordion — single-open animated FAQ list.
 *
 * Animated height via CSS max-height transition (avoids Framer Motion dependency here,
 * keeps the accordion lightweight for server-rendered pages).
 *
 * Used on: First Visit, every service page, homepage.
 * Also renders an FAQPage JSON-LD schema when `withSchema` is true.
 */
export default function FaqAccordion({ items = [], withSchema = false, className = '' }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(prev => (prev === i ? null : i));

  const schema = withSchema && items.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type':    'FAQPage',
        mainEntity: items.map(item => ({
          '@type':          'Question',
          name:             item.q,
          acceptedAnswer:   { '@type': 'Answer', text: item.a },
        })),
      }
    : null;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <dl className={`divide-y divide-brand-navy/10 ${className}`}>
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.id || i} className="py-1">
              <dt>
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-btn-${i}`}
                  className={[
                    'w-full flex items-center justify-between gap-4 py-4 px-1 text-left',
                    'font-display font-semibold text-h3-mobile text-brand-navy',
                    'hover:text-brand-pink transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-1 rounded-lg',
                  ].join(' ')}
                >
                  <span className="leading-snug">{item.q}</span>
                  <ChevronDown
                    size={20}
                    aria-hidden="true"
                    className={`shrink-0 text-brand-navy/50 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-pink' : ''}`}
                  />
                </button>
              </dt>
              <dd
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
                className={[
                  'overflow-hidden transition-all duration-300 ease-in-out',
                  isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0',
                ].join(' ')}
              >
                <div className="pb-5 px-1 font-body text-body-sm text-brand-navy/80 leading-relaxed whitespace-pre-line max-w-prose-dental">
                  {item.a}
                </div>
              </dd>
            </div>
          );
        })}
      </dl>
    </>
  );
}
