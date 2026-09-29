import { Baloo_2, Figtree } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import MobileCTA from '@/components/layout/MobileCTA';
import { BookingProvider } from '@/components/booking/BookingProvider';
import BookingModal from '@/components/booking/BookingModal';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import siteConfig from '@/data/siteConfig';

// ── Fonts (self-hosted via next/font/google) ─────────────────────────────
const baloo2 = Baloo_2({
  subsets:  ['latin'],
  weight:   ['600', '700', '800'],
  variable: '--font-baloo2',
  display:  'swap',
  preload:  true,
});

const figtree = Figtree({
  subsets:  ['latin'],
  weight:   ['400', '500', '600'],
  variable: '--font-figtree',
  display:  'swap',
  preload:  true,
});

// ── Root metadata ────────────────────────────────────────────────────────
export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default:  siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.defaultDescription,
  keywords:    siteConfig.seo.keywords,
  openGraph: {
    type:        'website',
    locale:      'en_IN',
    url:         siteConfig.siteUrl,
    siteName:    siteConfig.name,
    title:       siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [
      {
        url:    '/og-image.jpg',
        width:  1200,
        height: 630,
        alt:    `${siteConfig.name} — Pediatric Dentist in Pallikaranai, Chennai`,
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images:      ['/og-image.jpg'],
  },
  robots:     { index: true, follow: true },
  alternates: { canonical: siteConfig.siteUrl },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${baloo2.variable} ${figtree.variable}`}>
      <head>
        <SchemaMarkup />
        {/*
          Tiny inline script: sets data-js on <html> before first paint.
          Purpose: hero SSR shows the settled scene; JS flips to "clouds on top" without flash.
          This is render-blocking by design — it's < 100 bytes and executes in < 1ms.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-js','1')`,
          }}
        />
        {/* GA4 — only loads when NEXT_PUBLIC_GA_ID is set */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        )}
      </head>
      <body>
        <BookingProvider modal={BookingModal}>
          {/* Skip to content — keyboard / screen reader */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-navy focus:text-white focus:rounded-pill focus:font-body focus:font-semibold focus:text-sm"
          >
            Skip to main content
          </a>

          <Header />

          <main id="main-content">
            {children}
          </main>

          <Footer />
          <WhatsAppFloat />
          <MobileCTA />
        </BookingProvider>
      </body>
    </html>
  );
}
