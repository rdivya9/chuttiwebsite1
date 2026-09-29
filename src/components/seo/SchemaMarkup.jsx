import siteConfig from '@/data/siteConfig';

/**
 * SchemaMarkup — JSON-LD structured data for the entire site.
 *
 * Rendered once in the root layout (server component).
 * Includes:
 *   - Dentist + LocalBusiness (with opening hours, address, geo, rating)
 *   - Person / Physician (Dr. Bhuvanesswari)
 *
 * Page-level schemas (FAQPage, BreadcrumbList, BlogPosting) are added
 * in the relevant page components.
 *
 * Rules (narrative.md §4):
 *   - medicalSpecialty: "Pediatric" (not general dentistry)
 *   - aggregateRating uses only the real values from siteConfig.rating
 *   - "follows AAPD recommendations" — not "AAPD member" or "certified"
 *   - Address matches Google Business Profile exactly
 */
export default function SchemaMarkup() {
  const { name, address, hours, phone, doctor, rating, siteUrl } = siteConfig;

  const dentistSchema = {
    '@context':   'https://schema.org',
    '@type':      ['Dentist', 'LocalBusiness'],
    name,
    url:          siteUrl,
    telephone:    siteConfig.phoneTel,
    image:        `${siteUrl}/photos/logo.jpeg`,
    logo:         `${siteUrl}/photos/logo.jpeg`,
    medicalSpecialty: 'Pediatric',
    description:
      "Pediatric dental care for children from birth to 18 in Pallikaranai, Chennai. Led by Dr. Bhuvanesswari S., MDS (Pediatric & Preventive Dentistry). Prevention-first dental home: laughing gas, clear aligners, laser dentistry.",
    address: {
      '@type':           'PostalAddress',
      streetAddress:     `${address.street}, ${address.area}`,
      addressLocality:   address.locality,
      addressRegion:     address.state,
      postalCode:        address.pincode,
      addressCountry:    'IN',
    },
    geo: {
      '@type':     'GeoCoordinates',
      latitude:    address.geo.lat,
      longitude:   address.geo.lng,
    },
    openingHours: hours.structured,
    aggregateRating: {
      '@type':       'AggregateRating',
      ratingValue:   rating.value,
      reviewCount:   rating.count,
      bestRating:    5,
      worstRating:   1,
    },
    hasMap: rating.googleUrl,
    priceRange: '₹₹',
    areaServed: {
      '@type': 'City',
      name:    'Chennai',
    },
  };

  const doctorSchema = {
    '@context': 'https://schema.org',
    '@type':    ['Person', 'Physician'],
    name:       doctor.name,
    jobTitle:   `Founder, ${name}`,
    description:
      "MDS in Pediatric & Preventive Dentistry. Around 10 years in pediatric dentistry. Specialises in dental care for children from birth to 18, including preventive dentistry, laughing gas sedation, clear aligners and laser dentistry. Follows AAPD recommendations.",
    image:      `${siteUrl}${doctor.photo}`,
    worksFor: {
      '@type': 'Dentist',
      name,
    },
    medicalSpecialty: 'Pediatric',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(doctorSchema) }}
      />
    </>
  );
}
