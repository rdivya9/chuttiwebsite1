/**
 * siteConfig.js — SINGLE SOURCE OF TRUTH
 *
 * All clinic details are stored here and imported everywhere.
 * Changing a value here updates every page instantly.
 * Never hardcode phone, address, hours, rating or review count in components.
 */

const siteConfig = {
  // ── Identity ────────────────────────────────────────────────────────────
  name:       "Chutti's Dental & Wellness Center",
  tagline:    "Healthy Teeth. Happier Tomorrows.",
  motto:      "We don't just treat teeth. We create a great dental experience.",
  mottoAlt:   "A great dental experience, not just a dental treatment.",

  // ── Contact ─────────────────────────────────────────────────────────────
  // Phone and WhatsApp are the same number. Store once, use everywhere.
  phone:          "9500884242",
  phoneDisplay:   "95008 84242",
  phoneTel:       "+919500884242",          // tel: link format
  whatsapp:       "919500884242",           // wa.me format (no +, no spaces)
  whatsappPrefill:
    "Hi, I'd like to book an appointment for my child at Chutti's Dental.",
  whatsappEmergencyPrefill:
    "Hi, my child needs a same-day appointment.",

  // ── Address ─────────────────────────────────────────────────────────────
  // Must match the clinic's Google Business Profile exactly.
  // "West Anna Nagar" appears only inside the street address, never in headings or SEO.
  address: {
    street:   "Plot No 1A, Gandhi Nagar 5th Street",
    area:     "West Anna Nagar",
    locality: "Pallikaranai",
    city:     "Chennai",
    state:    "Tamil Nadu",
    pincode:  "600100",
    full:     "Plot No 1A, Gandhi Nagar 5th Street, West Anna Nagar, Pallikaranai, Chennai, Tamil Nadu 600100",
    landmark: "Near DAV School, Pallikaranai",
    // Geo coordinates for schema (approximate — confirm with Google Maps)
    geo: { lat: 12.9432, lng: 80.2209 },
  },

  // ── Hours ────────────────────────────────────────────────────────────────
  hours: {
    display:    "All days, 11 AM – 8 PM",
    structured: "Mo-Su 11:00-20:00",  // schema.org openingHours format
    note:       "By appointment",
  },

  // ── Doctor ───────────────────────────────────────────────────────────────
  doctor: {
    name:           "Dr. Bhuvanesswari S.",
    shortName:      "Dr. Bhuvanesswari",
    qualification:  "MDS, Pediatric & Preventive Dentistry",
    role:           "Founder, Chutti's Dental & Wellness Center",
    experience:     "Around 10 years in pediatric dentistry",
    photo:          "/photos/dr-bhuvanesswari.jpeg",
    // Approved personal detail — publish only this line, nothing more until further approval
    personal:       "a mother of two herself",
  },

  // ── Social proof ─────────────────────────────────────────────────────────
  rating: {
    value:      5.0,
    count:      13,
    googleUrl:  "https://maps.app.goo.gl/QU9Cmb1tqTnsGRui8",
  },

  // ── Social / media ───────────────────────────────────────────────────────
  social: {
    youtube: "https://www.youtube.com/@ChuttisDentalCenter",
  },

  // YouTube video IDs — used for lite embeds (loads iframe only on tap)
  videos: {
    // Titles to be confirmed; used as aria-labels on play buttons
    clinicTour:   { id: "6CFbjesBTrI",  title: "Inside Chutti's Dental & Wellness Center" },
    doctorIntro:  { id: "S9-zsz9-25Q",  title: "Meet Dr. Bhuvanesswari" },
    patientStory: { id: "XndBctI83rw",  title: "A parent's experience at Chutti's Dental" },
  },

  // ── Assets ───────────────────────────────────────────────────────────────
  logo:    "/photos/logo.jpeg",
  ogImage: "/og-image.jpg",   // 1200×630 — create before launch

  // ── Site URL ─────────────────────────────────────────────────────────────
  // Update to the real domain before launch; also update NEXT_PUBLIC_SITE_URL in Vercel env
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://chuttisdentalcenter.vercel.app",

  // ── Feature flags ────────────────────────────────────────────────────────
  features: {
    // Send parent a WhatsApp confirmation on booking (requires opt-in checkbox + approved template)
    parentConfirmation: false,
    // Video slot in Inside the Clinic section
    clinicVideo: true,
  },

  // ── Payment modes (FAQ only — not shown anywhere else on the site) ────────
  paymentModes: ["UPI", "Card", "Cash"],

  // ── SEO defaults ─────────────────────────────────────────────────────────
  seo: {
    defaultTitle:       "Chutti's Dental & Wellness Center | Pediatric Dentist in Pallikaranai, Chennai",
    titleTemplate:      "%s | Chutti's Dental & Wellness Center",
    defaultDescription:
      "Pediatric dental care for children from birth to 18 in Pallikaranai, Chennai. Led by Dr. Bhuvanesswari S., MDS. Preventive dentistry, laughing gas, clear aligners. Open all days, 11 AM – 8 PM.",
    keywords: [
      "Pediatric Dentist in Pallikaranai Chennai",
      "Kids Dentist in Pallikaranai",
      "Kids Dentist in Chennai",
      "Children's Dentist near DAV School Pallikaranai",
      "Preventive Dentistry for Children",
      "Dental Home",
      "Caries-Risk Assessment",
      "Laughing Gas for Children",
      "Clear Aligners for Kids Chennai",
      "Invisalign for Kids and Teens",
      "Laser Frenectomy Children",
      "Children's Dental Emergency Chennai",
      "Dental Care for Children with Special Healthcare Needs",
    ],
  },
};

export default siteConfig;
