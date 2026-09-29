# Chutti's Dental & Wellness Center — Build Standard & Visual Story (v3)

> **For Claude Code.** Read this file together with `narrative.md`.
> - `narrative.md` = **what the site says** (positioning, copy rules, facts, reviews, services, FAQs).
> - This file = **how the site is built and how it looks and moves**.
>
> This file has three parts, kept deliberately separate:
> - **Part A — Tech Stack & Build Standard** (engineering rules)
> - **Part B — Visual Story & Execution Spec** (what every screen looks like and how it moves)
> - **Part C — Illustration & Asset Manifest** (every image file the site expects, with exact names)
>
> Where this file and `narrative.md` conflict on content or claims, `narrative.md` wins. Where they conflict on visuals, motion or engineering, this file wins.
>
> **Execution is the product.** The concept only works if the hero and the train journey are built with care: smooth on a mid-range Android phone, never blocking the booking button, and never looking like a template. If a spec here can't be met exactly, stop and flag it rather than shipping a simpler substitute silently.

---

# PART A — TECH STACK & BUILD STANDARD

## A1. Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 14 (App Router) | Server-rendered/static pages for SEO and speed |
| Language | JavaScript (JSX), no TypeScript | |
| Styling | Tailwind CSS v3 | Custom design tokens in `tailwind.config.js` (see B2) |
| Animation | Framer Motion v11 | Use `LazyMotion` + `m` components with `domAnimation` feature bundle; load `domMax` only in components that genuinely need it |
| Scroll choreography | Framer Motion `useScroll` + `useTransform` + `useSpring` | No scroll event listeners, no GSAP, no Lottie |
| Icons | Lucide React | Never emoji or Unicode glyphs as icons |
| Fonts | `next/font/google`, self-hosted | Two families only (see B2) |
| Images | `next/image` | Illustrations delivered as PNG, served as AVIF/WebP automatically |
| Hosting | Vercel | |
| Analytics | Vercel Analytics + GA4 (via `next/script`, `afterInteractive`) | Custom events listed in A9 |
| Package manager | npm | |

**Never do:** TypeScript; external UI kits (shadcn, MUI, Chakra, etc.); a database or CMS; heavy animation libraries (GSAP, Lottie, three.js); client-side-only rendering of page content; hardcoded clinic details in components; emoji as icons; auto-scrolling carousels.

## A2. Project Structure

```
src/
  app/
    layout.jsx                 # Root: fonts, Header, Footer, WhatsAppFloat, MobileCTA,
                               # BookingProvider + BookingModal, SchemaMarkup, Analytics
    page.jsx                   # Homepage
    not-found.jsx              # 404 (lost-in-the-jungle scene)
    our-approach/page.jsx
    dr-bhuvanesswari/page.jsx
    services/page.jsx          # Services overview
    services/[slug]/page.jsx   # 8 service pages: the 7 menu services + clear-aligners (from data/services.js)
    first-visit/page.jsx       # First Visit & FAQ
    reviews/page.jsx
    blog/page.jsx              # Blog index (filter: Parent Guides / Myth vs Fact)
    blog/[slug]/page.jsx       # One template renders both post types
    contact/page.jsx
    privacy/page.jsx           # Required: the booking form collects personal data
    api/booking/route.js       # Booking submission (server-side only)
    robots.js
    sitemap.js
  components/
    layout/      Header, Footer (NightJungleFooter), MobileCTA, WhatsAppFloat, Breadcrumbs
    booking/     BookingProvider (context), BookingModal, steps/*, VineProgress, SuccessScene
    hero/        JungleHero, CloudLayer, BirdFlight, LeafCurtain, GiraffeRise, HeroTrain,
                 MonkeyPeek, HeroContentCard, ScrollHint
    journey/     TrainJourney (Birth-to-18), JourneyStop, JourneyTrack
    characters/  TappableCharacter, FactBubble, HiddenDino
    sections/    WhyParents, ServicesOverview, EmergencyBand, PreventEarly, ComfortCare,
                 StraighterSmiles, MeetDoctor, InsideClinic, ParentReviews, FirstVisit,
                 FaqAccordion, ClosingDusk
    blog/        MythFactCard, PostCard, ShareButton, PostFilter
    ui/          Button, Section, LeafDivider, PageHeaderScene, IllustrationImage
    seo/         SchemaMarkup
  data/
    siteConfig.js      # SINGLE SOURCE OF TRUTH: name, phone, WhatsApp, address, landmark,
                       # hours, doctor, rating, review count, Google profile URL, social,
                       # brand tokens, feature flags
    services.js        # 8 service pages (see narrative.md Section 11 Services table): slug,
                       # menuLabel, title (H1), intro, treatments[] (each: heading with
                       # parent name + clinical term, what/why/what-to-expect, typical ages),
                       # FAQs, header illustration, navGroup
    reviews.js         # Real Google reviews only (see narrative.md Section 8)
    faqs.js            # Homepage + first-visit FAQs (from narrative.md)
    journeyStages.js   # 4 train stops (Babies, Toddlers, Kids, Teens)
    characters.js      # Cast registry: id, image paths, alt text, reaction type, fun fact
    blogPosts.js       # Both post types (see A8)
    illustrations.js   # Manifest mapping asset names → paths, sizes, alt text
  lib/
    whatsapp.js        # Provider-agnostic WhatsApp Business API adapter
    sheets.js          # Google Sheet webhook sender
    validateBooking.js
    analytics.js       # trackEvent() wrapper
public/
  illustrations/       # All PNGs from Part C, exact filenames
  photos/              # Real clinic + doctor photos
  og-image.jpg         # 1200×630
```

## A3. Architecture Rules

- **`siteConfig.js` is the single source of truth.** Phone, WhatsApp number, address, hours, rating and review count are stored once and imported everywhere. Changing the hours in one place updates the whole site.
- **Server components by default.** Only interactive pieces are client components (`'use client'`): hero, train journey, tappable characters, hidden dino, booking modal, FAQ accordion, share button, header scroll state.
- **All page text is server-rendered.** Headlines, service content, reviews, FAQs and blog text must be present in the initial HTML. Animations only move things that are already on the page.
- **`BookingProvider`** (React context) exposes `openBooking({ reason })` so any button can open the modal, optionally with a reason preselected (e.g. the aligner button preselects "Aligners / crooked teeth").
- **Dynamic service pages:** one `services/[slug]/page.jsx` renders all 8 service pages from `services.js`, with `generateStaticParams`. Each treatment inside a page renders as its own H2 section with an anchor id (e.g. `#pulp-therapy`) so menus, shortcuts and journey chips can link directly to it.
- **Dynamic blog pages:** one `blog/[slug]/page.jsx` renders both post types from `blogPosts.js`.
- **Illustrations are never CSS background images.** Always `next/image` (via a shared `IllustrationImage` component) with explicit `width`/`height` (prevents layout shift), meaningful `alt` for characters, `alt=""` + `aria-hidden` for pure decoration.

## A4. Booking System (two separate flows)

### Flow 1 — Booking pop-up → automatic WhatsApp message to the clinic
The parent fills the modal and taps **"Send booking request"**. The clinic receives a formatted WhatsApp message automatically. **WhatsApp does not open on the parent's phone.**

**Server route `POST /api/booking`:**
1. Validate input server-side (`lib/validateBooking.js`): required fields, Indian mobile number format (10 digits, optional +91), child's age from allowed list, text fields length-capped, strip HTML.
2. Spam protection: hidden honeypot field + minimum time-on-form check (reject submissions under ~3 seconds). No CAPTCHA.
3. In parallel (`Promise.allSettled`):
   - **WhatsApp:** `lib/whatsapp.js` sends an approved **template message** via the WhatsApp Business API to the clinic's number (`siteConfig.whatsapp`). Provider-agnostic adapter: supports Meta Cloud API directly or an Indian BSP (Interakt / AiSensy / WATI / Gupshup) chosen via env var.
   - **Google Sheet backup:** `lib/sheets.js` POSTs the same data (plus timestamp and page URL) to a Google Apps Script web-app URL that appends a row.
4. Response: success if **at least one** channel succeeded. If both fail, return an error and the modal shows a fallback: *"We couldn't send your request automatically. Tap here to send it on WhatsApp instead"* (opens a pre-filled `wa.me` link).
5. Never log personal data to the console in production.

**Message template (to be approved with the provider; variables in braces):**
```
New booking request — Chutti's website
Parent: {{parent_name}}
Phone: {{phone}}
Child: {{child_name}}, age {{age_group}}
Reason: {{reason}}
Preferred: {{preferred_date}}, {{preferred_slot}}
First visit: {{first_visit}}
About the child: {{notes}}
```

**Environment variables (Vercel):**
```
WHATSAPP_PROVIDER=meta|interakt|aisensy|wati|gupshup
WHATSAPP_API_KEY=
WHATSAPP_PHONE_NUMBER_ID=        # sender (Meta) or provider equivalent
WHATSAPP_TEMPLATE_NAME=
CLINIC_WHATSAPP_RECIPIENT=919500884242
GOOGLE_SHEET_WEBHOOK_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SITE_URL=
```
If the WhatsApp credentials are not yet available at build time, build the adapter fully, keep the Sheet path working, and flag it clearly in the handoff notes. Do not fake success.

**Optional (phase 2, feature flag `siteConfig.features.parentConfirmation`):** send the parent an automatic WhatsApp confirmation. Requires an explicit opt-in checkbox in the form.

### Flow 2 — WhatsApp button → normal chat
The floating button, the mobile bar and every "WhatsApp us" button open `https://wa.me/919500884242?text=<prefilled>` so the parent can type freely. Default prefill: *"Hi, I'd like to book an appointment for my child at Chutti's Dental."* The emergency band uses: *"Hi, my child needs a same-day appointment."*

### Form privacy
- Consent line under the submit button: *"By sending this, you agree to us contacting you about this appointment. See our Privacy Policy."* (link to `/privacy`).
- `/privacy` explains what is collected, why, where it goes (WhatsApp + Google Sheet), and how to request deletion (India DPDP Act-aware, plain language).

## A5. Performance Budget (hard gates, measured on mobile)

| Metric | Target |
|---|---|
| Lighthouse Performance (mobile) | ≥ 90 on every page |
| Lighthouse Accessibility / SEO / Best Practices | ≥ 95 |
| LCP | < 2.5 s on simulated 4G |
| CLS | < 0.05 |
| INP | < 200 ms |
| First-load JS (homepage) | ≤ 180 KB gzipped |
| Hero images, mobile, total | ≤ 450 KB |
| Any single illustration (served) | ≤ 150 KB desktop, ≤ 70 KB mobile |

**How to stay inside it:**
- **LCP element is the hero headline (text), never an image.** It renders from server HTML with the self-hosted display font (`display: 'swap'`, preloaded).
- Hero loading strategy: sky is a CSS gradient (no image). **Cloud images** get `priority`. Everything behind the clouds (canopy, foliage, bird, giraffe, train) loads with normal priority *while the clouds cover it*, so it's ready before the parent scrolls. See B4.
- All below-the-fold illustrations lazy-load (`next/image` default) with correct `sizes` so phones get small files.
- Provide mobile-specific art direction for wide hero layers (`<picture>`-style via two `IllustrationImage` instances toggled with Tailwind `hidden md:block`, or `getImageProps` with `media`).
- Animate only `transform` and `opacity`. Never animate `width`, `height`, `top`, `left`, `filter: blur` on large layers, or box-shadows.
- `will-change: transform` only on actively animating hero/journey layers, removed after the sequence settles.
- No scroll listeners; use `useScroll`. Wrap scroll-linked values in `useSpring` with gentle settings (e.g. `stiffness: 120, damping: 30`) for smoothness.
- Test on a real mid-range Android phone (or Chrome DevTools: Moto G Power profile, 4× CPU throttle, Fast 4G). The hero must stay at a smooth frame rate there.

## A6. Accessibility (baseline, not polish)

- **`prefers-reduced-motion: reduce`** → no pinned scroll sequences, no ambient loops. Hero and train journey render in their final, settled state; characters remain tappable and show fact bubbles without motion. Use Framer's `useReducedMotion()` and CSS media queries together.
- Body text contrast WCAG AA minimum (navy on light backgrounds). White text on brand pink only at large sizes (≥ 24px bold); otherwise navy text on pink tints.
- Every tappable character is a real `<button>` with an `aria-label` (e.g. "Giraffe — tap for a tooth fact"). Fact bubbles announced via an `aria-live="polite"` region.
- Visible keyboard focus on all interactive elements (custom focus ring in brand navy, 3px, offset 2px).
- Touch targets ≥ 44×44px with spacing between them.
- The pinned hero never traps keyboard or screen-reader users: the content card (headline + buttons) is first in DOM order; the illustrated scene is `aria-hidden` except the tappable characters.
- Language: `<html lang="en-IN">`.

## A7. SEO (always implement)

- `metadataBase`; per-page `title` + `description` using the locality rule from `narrative.md` (Pallikaranai; never "Anna Nagar" alone).
- OG image 1200×630 (jungle hero still + logo + headline), Twitter card.
- JSON-LD via `SchemaMarkup`:
  - `Dentist` + `LocalBusiness` with `medicalSpecialty: "Pediatric"`, address, geo, opening hours (all days 11:00–20:00), phone, `aggregateRating` (from `siteConfig`, only real values)
  - `Physician`/`Person` for Dr. Bhuvanesswari S. (MDS, Pediatric & Preventive Dentistry)
  - `FAQPage` on First Visit and each service page with FAQs
  - `BreadcrumbList` on all inner pages
  - `Article` (or `BlogPosting`) on blog posts
- `robots.js` (allow all), `sitemap.js` (all routes incl. service and blog slugs, auto-generated).
- Breadcrumbs visible on all inner pages.
- Keywords from `narrative.md` Section 14, used naturally in headings.

## A8. Blog (two post types, one template)

`blogPosts.js` entries have `type: 'guide' | 'myth-fact'`.

- **Parent Guides (`guide`):** written articles in the doctor's voice. Standard article layout (title, intro, body sections, related service link, booking prompt).
- **Myth vs Fact (`myth-fact`):** the doctor's card series, **rebuilt as a live HTML/CSS component (`MythFactCard`)**, never as an uploaded image:
  - Data per post: `seriesNumber`, `myth` (text), `fact` (text), `factPoints[]`, `takeaway`, `expandedText` (150–300 words), `relatedServiceSlug`, `publishedAt`.
  - Page structure: MythFactCard at top → expanded explanation as normal text → related service link → booking/WhatsApp prompt.
  - The card is real text (indexable, accessible), styled in the site's look (see B11). No text is baked into images.
  - Title written as a parent's question or statement (e.g. "Do milk teeth need treatment if they fall out anyway?").
- **Sharing:** `ShareButton` uses the Web Share API (`navigator.share({ title, url })`) on mobile; desktop fallback offers "Copy link" and "Share on WhatsApp" (`https://wa.me/?text=<title + URL>`). Every share sends the **post URL**, never an image.
- Blog index: filter chips (All · Parent Guides · Myth vs Fact), static grid (no carousel), newest first.

## A9. Analytics Events (`lib/analytics.js`)

| Event | When |
|---|---|
| `booking_open` | Modal opened (param: source button, preselected reason) |
| `booking_step` | Each step completed (param: step number) |
| `booking_submit_success` / `booking_submit_error` | After API response |
| `whatsapp_click` | Any wa.me link (param: location) |
| `call_click` | Any tel: link (param: location) |
| `character_tap` | A character tapped (param: character id) |
| `dino_found` | Hidden dino tapped (param: page) |
| `blog_share` | Share used (param: method) |

## A10. Design QA Tool

Install Impeccable alongside this build:
```bash
npx impeccable install
```
Then in Claude Code: `/impeccable init`. Before handoff: `/impeccable audit` and `/impeccable critique`, and resolve findings.

---

# PART B — VISUAL STORY & EXECUTION SPEC

## B1. The Visual Idea (read this first)

**A storybook jungle where four kids and their animal friends go on an adventure, and looking after their teeth is part of the fun.**

- **Why a jungle:** the clinic's own interiors have a forest with a dinosaur, giraffe and turtle. The website is the clinic, so a child who has seen the site recognises the place.
- **Why a train (the Chutti Express):** the train is named after the clinic and it is childhood. Its four carriages are the four stages of care (Babies, Toddlers, Kids, Teens), which is the clinic's "one dental home, birth to 18" promise.
- **Where dentistry comes in:** kids and animals do small, gentle, tooth-friendly things together (brushing side by side, a bear cub holding a little mirror, a teen with an aligner case). And **every animal has a tooth fact** that appears when a child taps it.
- **What it must never become:** a comic book, a cartoon clinic, or a playroom that makes parents doubt the clinical seriousness. The doctor is always a real photo, never illustrated. Clinical content always reads as calm and adult.

**The balance rule (applies to every section):** text lives in a clear **parent zone**, illustrations live in the **kid zone** (margins, edges, section openings). Illustrations never sit behind body text and never overlap buttons. Roughly **70% calm and clear, 30% playful**.

**Motion rule:** only two choreographed sequences exist on the whole site: the **Hero** and the **Birth-to-18 Train Journey**. Everything else is either still, a single reaction to a tap, or one very slow ambient loop. No fade-up-on-scroll on every section.

## B2. Design Tokens

### Colour
Sample the three brand colours directly from the logo file and replace the approximations below with exact values.

| Token | Approx. hex | Role |
|---|---|---|
| `brand-pink` | `#E0246F` | Primary buttons, key highlights, "Book" actions |
| `brand-navy` | `#16295C` | Headings, body text, footer base, focus rings |
| `brand-green` | `#6CBF4A` | Success states, small accents, leaf highlights |
| `sky-mist` | `#EAF6FC` | Hero sky top, light section backgrounds |
| `morning-white` | `#FBFDFF` | Default page background (cool white, **not cream**) |
| `sun-yellow` | `#FFE28A` | Aligner section tint, fact bubbles, emergency band tint (softened) |
| `blush` | `#FDE7EF` | Soft pink section tint (Myth side of cards, gentle highlights) |
| `leaf-mint` | `#E3F3DC` | Soft green section tint (Fact side of cards) |
| `dusk-violet` | `#6F5B9E` | Closing dusk scene gradient mid-tone |
| `night-navy` | `#0F1C40` | Footer night sky |

**Colour roles:** the **illustrations** carry the pastel fun (they come in their own soft palette). **UI colour** (buttons, headings, links) stays brand pink and navy. Do not tint whole sections in saturated brand pink. Never use the light-blue-and-teal "healthcare" palette as the main UI scheme.

### Typography
- **Display / headings:** **Baloo 2** (600–800). Rounded and warm with real character; suits a children's brand without looking like a SaaS template.
- **Body / UI:** **Figtree** (400, 500, 600). Clean and highly readable at small sizes.
- Load only these weights, Latin subset, via `next/font/google`.

| Style | Mobile | Desktop | Font / weight | Line-height |
|---|---|---|---|---|
| Hero headline | 36px | 60px | Baloo 2 / 800 | 1.05 |
| H2 section | 28px | 42px | Baloo 2 / 700 | 1.15 |
| H3 | 21px | 26px | Baloo 2 / 700 | 1.2 |
| Body | 17px | 18px | Figtree / 400 | 1.6 |
| Small / meta | 14px | 15px | Figtree / 500 | 1.5 |
| Button | 16px | 17px | Figtree / 600 | 1 |

- Body line length ≤ 70 characters.
- Sentence case everywhere. **No all-caps eyebrow labels** above headings. No single highlighted word in a different colour inside headlines. No "→" appended to buttons.

### Shape, spacing, depth
- Radius scale with hierarchy (not one radius everywhere): buttons fully rounded (pill), content cards 20px, photos in organic leaf-edged masks (B8), small chips 999px.
- Section vertical padding: 72px mobile, 120px desktop.
- Shadows: one soft, slightly navy-tinted shadow for raised elements only (modal, content card over hero). Most cards sit flat on tints.
- Section dividers: use the **leaf-edge dividers** (Part C) on at most 5 transitions on the homepage; all other transitions are clean edges.

## B3. Global Components

### Header
- Height 64px mobile / 76px desktop, `morning-white` at 90% opacity with backdrop blur once scrolled; fully transparent over the hero's first frame.
- Left: logo (from `siteConfig`). Desktop nav (centre-right): **Services ▾ · Aligners · First Visit · About ▾ · Blog · Contact**. Right: WhatsApp icon button (Lucide `MessageCircle`) + pink **"Book a visit"** pill.
- **Services ▾ dropdown (desktop):** the 7 menu labels from `narrative.md` Section 11 Services table, in this order: Preventive Care, Fillings, Crowns & Root Canal, Early Orthodontics, Dental Emergencies, Gentle Dentistry & Sedation, Special Needs Dentistry, Laser Dentistry. Arrange in two short columns with small Lucide icons; a bottom link **"See all services"** → `/services`. Opens on hover (with 150ms intent delay) and on click/Enter; closes on Esc and outside click; fully keyboard navigable.
- **About ▾ dropdown:** Our Approach, Dr. Bhuvanesswari.
- **Aligners** → `/services/clear-aligners`. **First Visit** → `/first-visit`.
- Mobile: logo + "Book" pill + menu button. Menu opens a full-height drawer with large tap targets and a small illustrated leaf corner (decoration only). Drawer items: Services (opens `/services`, no nested list), Aligners, First Visit, Our Approach, Dr. Bhuvanesswari, Blog, Contact, plus a full-width **Book a visit** button.
- On scroll down past the hero, header compresses (shadow appears, height −8px). No hide-on-scroll.

### WhatsApp float
Bottom-right, 56px circle, WhatsApp green is acceptable here for recognition. On mobile it sits **above** the MobileCTA bar. Opens Flow 2.

### MobileCTA bar (mobile only)
Sticky bottom bar, 64px, two equal buttons: **Book a visit** (pink, opens modal) and **Call** (navy outline, `tel:`). Hidden while the booking modal is open.

### Hidden dino (every page)
- The soft blue dinosaur (`dino-*` assets) appears once per page, small (48–80px), partly tucked behind something: a photo frame, a leaf divider, a card corner, the footer foliage.
- Placement per page is fixed in `characters.js` (not random), so it never overlaps text or buttons.
- Tap/click: dino does a small wiggle (rotate −6° → 6° → 0, 450ms) and a fact bubble says *"You found me! I'm the dino from the clinic wall."* Fires `dino_found`.
- Reduced motion: no wiggle, bubble only.

### Tappable characters (shared behaviour)
Built once as `TappableCharacter` and reused everywhere:
- Tap/click → one short reaction (≤ 700ms, see per-character list in B12) + a **fact bubble** with that animal's tooth fact.
- Only one bubble open at a time; auto-dismiss after 5s or on tap elsewhere; `Esc` closes.
- Fact bubble: rounded speech shape, `sun-yellow` background, navy Figtree 15px text, small tail pointing at the character, max-width 240px, appears with scale 0.9→1 + opacity (180ms).
- Hover on desktop: character lifts 4px (150ms). No hover effects on touch devices.

### Footer — Night Jungle (every page)
- Top edge: `footer-leaf-edge` silhouette strip (layered greens) overlapping the section above by 40px.
- Peeking over the edge: `footer-giraffe-peek` (left third) and `footer-monkey-peek` (right third).
- Base: `night-navy` with 12–18 tiny CSS fireflies/stars (2–3px dots, `sun-yellow`, slow opacity twinkle 3–6s, staggered). Reduced motion: static dots.
- Centre scene: `footer-goodnight` (kids and animals waving goodnight holding toothbrushes), small, with the line *"Brush before bed. Goodnight from the jungle."*
- Content (white/sky-mist text on navy, AA contrast): logo (on a small white rounded plate), address with landmark, hours, phone, WhatsApp, quick links, Google reviews link, privacy link, copyright.
- The hidden dino on the homepage can sleep in the footer foliage (`dino-sleeping`).

## B4. THE HERO (signature sequence #1) — detailed execution

### Concept
The page opens **above the clouds**. As the parent scrolls, the clouds drift apart, a bird flies down across the sky, the jungle's leaf curtain opens, a giraffe rises from behind the trees, and the jungle train rolls in carrying the four kids and baby animals. When it settles, the animals become tappable.

### Non-negotiable rules
1. **The content card is visible and usable from the first frame**, before any scrolling and before any animation: headline, subhead, doctor chip, **Book a visit** and **WhatsApp us** buttons. The cloud state is itself a complete, good-looking hero.
2. The sequence is **scroll-linked** (it moves with the parent's scroll, reverses if they scroll back up), not a timed movie they must wait through.
3. It must never feel like the page is "stuck." Pinned length is short (below), the scroll hint makes the behaviour obvious, and an **"Explore our services"** text button jumps straight past the hero.
4. Smooth on a mid-range Android phone, or it gets simplified (mobile spec below) until it is.

### Structure
- `JungleHero` is a section of height **260vh desktop / 190vh mobile**, containing a **sticky** inner stage (`position: sticky; top: 0; height: 100svh`). Scroll progress `p` (0 → 1) through the section drives the scene via `useScroll({ target, offset: ['start start', 'end end'] })`.
- The **content card** sits in the sticky stage above the scene (desktop: left 40% of the viewport, vertically centred; mobile: top of the viewport below the header, full width with 20px side padding).

### Layer stack (back to front)
| z | Layer | Asset(s) |
|---|---|---|
| 0 | Sky: CSS linear gradient, top `sky-mist` → horizon very pale peach `#FFF1E6` | none (CSS) |
| 1 | Far canopy silhouette across the bottom 45% | `hero-canopy-back` |
| 2 | Giraffe head + neck (rises from behind layer 3) | `hero-giraffe-head`, `hero-giraffe-head-blink` |
| 3 | Mid foliage, left and right clusters | `hero-foliage-mid-left`, `hero-foliage-mid-right` |
| 4 | Clearing ground with train track | `hero-ground-track` |
| 5 | Train: engine + 4 carriages + wheels + passengers + steam | `train-*` |
| 6 | Front leaf curtain, left and right | `hero-leaf-curtain-left`, `hero-leaf-curtain-right` |
| 7 | Monkey peeking from top-right foliage | `hero-monkey-peek`, `hero-monkey-arm` |
| 8 | Clouds (5 pieces) | `hero-cloud-1` … `hero-cloud-5` |
| 9 | Bird (hornbill) body + wings | `hero-bird-body`, `hero-bird-wing-up`, `hero-bird-wing-down` |
| 10 | Content card | HTML |
| 11 | Scroll hint, tap hint | HTML + Lucide |

### Frame 0 — page load, no scroll (the "above the clouds" state)
- Sky gradient fills the stage. **Clouds** cover roughly the lower 70% of the scene: 5 soft cloud pieces overlapping, two large (left and right), three smaller in between and higher.
- Behind the clouds, the jungle layers are already in position but hidden (clouds on top; curtain closed; giraffe down; train off-screen right).
- **Content card** fades in (opacity 0→1, y 12px→0, 400ms, starts immediately; the text is in the HTML so it is visible even if JS is slow).
- **Ambient cloud drift** (time-based, not scroll): each cloud drifts ±12px horizontally, 8–12s per cycle, different phase per cloud. Stops on reduced motion.
- After 1.5s with no scroll: **scroll hint** appears bottom-centre: a small rounded pill *"Scroll into the jungle"* with a Lucide `ChevronDown` gently bobbing (y 0→4px, 1.4s loop). Disappears once `p > 0.03`.

### Scroll timeline (p = 0 → 1)
All ranges overlap slightly so the scene never "waits." Values via `useTransform(p, [start, end], [from, to])`, smoothed with `useSpring`.

| p range | What happens | Exact transforms |
|---|---|---|
| 0.00 – 0.22 | **Clouds part.** Left clouds drift left, right clouds drift right, the higher middle ones rise and thin out. The jungle canopy is revealed underneath. | Left clouds: x 0 → −65vw, scale 1 → 1.15, opacity 1 → 0 (opacity only in last 40% of range). Right clouds: x 0 → +65vw, same scale/opacity. Middle clouds: y 0 → −30vh, opacity 1 → 0. Canopy: y +40px → 0. |
| 0.12 – 0.42 | **The bird flies in.** A hornbill enters from top-right, glides down in a gentle arc across the sky, and exits mid-left behind the foliage. | Bird: x from 105vw → −15vw, y follows an arc (use keyframe array: 8vh → 22vh → 30vh), rotate −8° → 4°. Wings flap on a **time-based** loop while the bird is visible: swap `wing-up`/`wing-down` every 180ms (or rotate the wing layer ±18°). Bird scale 0.9 → 1.05 as it "comes closer." |
| 0.28 – 0.58 | **The leaf curtain opens.** The big front leaves slide outward and rotate slightly, like curtains parting, revealing the clearing. Mid foliage moves slower (parallax depth). | Curtain left: x 0 → −42%, rotate 0 → −7°. Curtain right: x 0 → +42%, rotate 0 → 7°. Mid foliage left/right: x 0 → ∓12%. |
| 0.42 – 0.64 | **The giraffe rises** slowly from behind the mid foliage on the left-centre, stops, and blinks once. | Giraffe: y +140px → 0 (ease-out). At p ≈ 0.64, swap to `blink` frame for 160ms, then back (trigger once per pass using `useMotionValueEvent`). |
| 0.54 – 0.86 | **The train arrives.** Engine and carriages roll in from the right along the track and stop in the clearing (centre-right on desktop, below the content card on mobile). | Train group: x 110vw → 0. Wheels: rotate proportional to distance (`rotate = (distance / wheelCircumference) × 360`). Steam puffs: at p 0.62, 0.70, 0.78 spawn a `train-steam-puff` above the chimney: scale 0.6 → 1.3, y 0 → −40px, opacity 0.9 → 0 over 900ms (time-based once triggered). At arrival: a small spring settle (x overshoot −8px → 0, `stiffness 260, damping 18`). |
| 0.80 – 0.92 | **Passengers wave; the monkey peeks.** Kids and baby animals in the carriages give one gentle bob; the monkey swings down from the top-right foliage. | Passenger groups: y 0 → −6px → 0 (one bob, staggered 80ms per carriage). Monkey: y −120px → 0, rotate −10° → 0; monkey arm rotates 0 → 14° → 0 once. |
| 0.88 – 1.00 | **Scene settles and becomes interactive.** Tap hint appears; sticky stage releases; page continues to "Why Parents Choose Chutti's." | Tap hint pill near the train: *"Psst… tap the animals"* (Lucide `Hand` icon), fades in, auto-hides after 4s or on first tap. Enable `TappableCharacter` on giraffe, bird (now perched: `hero-bird-perched` on a branch of the right mid foliage), monkey, train (steam puff on tap), and each passenger group. |

**Carriage labels:** Babies, Toddlers, Kids, Teens are **HTML text** on small rounded signboards positioned over each carriage (never baked into images), so they're crisp, translatable and indexable. The **engine** carries a matching signboard reading **Chutti Express** (HTML text, positioned over the blank signboard area of `train-engine.png`).

**Fast scrolling:** because everything is `useTransform` on scroll progress, a fast scroll simply jumps elements to their later positions. No element may depend on a previous animation having "finished." Triggered one-shots (blink, steam) must check state so they don't stack.

**Scrolling back up:** the sequence reverses naturally. One-shot triggers re-arm when `p` drops below their threshold minus 0.05.

### Content card (final copy comes from `narrative.md`, hero section)
- Headline (Baloo 2 800), subhead (Figtree 18px), **doctor chip**: 44px round photo of Dr. Bhuvanesswari + *"Led by Dr. Bhuvanesswari S., MDS, Pediatric Dentist"*.
- Buttons: **Book a visit** (pink pill, opens modal) and **WhatsApp us** (white pill with navy text + WhatsApp icon). Below them a text button: **Explore our services** (Lucide `ChevronDown`), which smooth-scrolls to the Services section, skipping the rest of the hero sequence.
- Trust line (small): *5.0 on Google (13 reviews)* with a star icon · *Open all days, 11 AM – 8 PM*. (Render as two separate items, not a middle-dot string.)
- Card background: `morning-white` at 88% opacity with a subtle blur behind it, 24px radius, soft navy shadow, 28–40px padding. It must keep AA contrast over every frame of the scene.

### Mobile hero (≤ 767px)
- Sticky stage height `100svh`; section height 190vh.
- Content card at top (headline 36px). Scene occupies the lower ~55% of the viewport.
- Use **mobile variants** of wide layers (`-mobile` assets, Part C). Only **3 clouds** (1, 2, 3), one mid-foliage piece per side, curtains narrower.
- Bird path shorter (enters top-right, exits left at 40% height). Train scaled to fit the width (engine + 4 carriages at ~92vw total), sitting on the track at the bottom of the viewport.
- Monkey peek is skipped on screens < 360px wide.
- If the mid-range Android test drops frames, disable the parallax on mid foliage first, then the giraffe rise, before touching anything else.

### Reduced motion / no JS
- `prefers-reduced-motion`: no sticky pin (section height `auto`, stage `100svh`), render the **final settled scene** directly: no clouds, curtain open, giraffe up, bird perched, train in place, monkey visible. Characters remain tappable (bubble only, no movement).
- No JS: the server HTML shows the content card over the **settled scene** as well (clouds are added by JS on mount; the initial SSR state is the settled scene with clouds hidden via a `data-js` attribute that JS flips before first paint using a tiny inline script in `<head>`, to avoid a flash). Headline and buttons always present.

### Hero loading order
1. HTML + CSS + display font (headline visible immediately, LCP).
2. Cloud images (`priority`, small files).
3. Canopy, foliage, curtains, giraffe, ground, train (normal priority, load while clouds cover them).
4. Bird, monkey, steam (lazy, needed from p > 0.1).
Use correct `sizes` on each layer so phones download mobile widths.

## B5. Homepage Section-by-Section

For each section: layout, illustration (kid zone), motion. Copy comes from `narrative.md`.

### 1. Hero — see B4.

### 2. Why Parents Choose Chutti's
- Background: `morning-white`. Top edge: a soft grass/leaf divider continuing from the hero ground (`divider-grass-top`).
- Layout: H2 left-aligned; six facts in a 3×2 grid (desktop), 2×3 (tablet), single column (mobile). Each fact: small Lucide icon in a `leaf-mint` circle, bold short line, one supporting sentence. Not numbered (parallel items).
- Illustration: none except the hidden dino tucked at a card corner (homepage placement #1). This is the most "parent" section.
- Motion: none.

### 3. Services Overview + Emergency Band
- Background: `sky-mist` tint.
- Layout: H2 + one-line intro, then **seven service cards** (desktop: 4 + 3 centred; tablet: 2 columns; mobile: stacked). Each card: small spot image (that page's header illustration, cropped portrait, Part C), page title, 2-line plain-language summary, "Learn more" link to `/services/[slug]`. Cards are not numbered. A link below the grid: **See all services**.
- Kid zone: `services-bear-cub` (kid + honey bear cub) standing at the right edge of the heading row (desktop) / above the heading (mobile). Tappable.
- **Emergency band** directly below the cards: full-width rounded panel, `sun-yellow` at 45% tint, left: `emergency-lion-cub` (kid comforting lion cub with a small plaster), centre text *"Fall, chipped or knocked-out tooth, or sudden toothache? WhatsApp us for a same-day appointment."*, right: **WhatsApp for same-day** (primary) + **Call** (secondary). Calm, never red.
- Motion: none beyond tappable characters.

### 4. Birth to 18 — The Train Journey (signature sequence #2) — see B6.

### 5. Prevent Early
- Background: `morning-white`.
- Layout: H2 + intro paragraph; two columns: "What we look at" (list) and "What the plan can include" (list). Clinical term shown with plain-language phrasing (glossary in `narrative.md`).
- Kid zone: `approach-elephant-family` peeking in from the left edge at the section's top-left (desktop), small above heading (mobile). Tappable (elephant raises trunk).
- Motion: none.

### 6. Comfort Care
- Background: `leaf-mint` at 50%.
- Layout: H2 + intro; **Tell-Show-Do** as a genuine 3-step sequence (numbering allowed here): three small panels with `tsd-tell`, `tsd-show`, `tsd-do` illustrations and one line each. Below: two cards side by side: **Laughing gas, in-house** (with the real ConSed equipment photo, cropped tight) and **Children with special healthcare needs**. Line: *"Parents are welcome to stay in the room."*
- Kid zone: `comfort-turtle-walk` (child wearing sensory headphones walking hand-in-paw with the turtle) moving **very slowly** along the bottom edge of the section: x from −10% to 110% over **40 seconds**, looping, only while the section is in view (`useInView`). Reduced motion: static at 20% from left.
- Motion: only the turtle's slow walk.

### 7. Straighter Smiles (Aligners)
- Background: `sun-yellow` at 30% tint (the only yellow section; sets aligners apart subtly).
- Layout: text left (H2, the "why a pediatric specialist for aligners" points from `narrative.md` Section 9), right: `aligners-teen-giraffe` (teen with clear aligner case beside a tall giraffe) with `aligner-tray` illustration floating near the teen's hand.
- CTA: **Book an aligner consultation** (opens modal with reason preselected).
- Motion: aligner tray has a slow gentle float (y ±6px, 5s loop) while in view. Giraffe tappable.

### 8. Meet Dr. Bhuvanesswari (+ motto)
- Background: `morning-white`. The calmest section on the page.
- Layout: large real photo (left on desktop, top on mobile) in a soft organic leaf-edged mask (B8); right: name, credentials as small chips (MDS Pediatric & Preventive Dentistry · ~10 years in pediatric dentistry · Follows AAPD guidelines · Invisalign provider → render as separate chips, not a dot string), the short "why a pediatric dentist" note, and the **motto as her quote** in Baloo 2 28–36px: *"We don't just treat teeth. We create a great dental experience."*
- Kid zone: only two small leaf accents on the photo mask edge. No characters in this section.
- Motion: none.
- Link: "Meet Dr. Bhuvanesswari" → `/dr-bhuvanesswari`.

### 9. Inside the Clinic
- Background: `sky-mist` at 60%.
- Layout: H2 + one line (general interiors copy only, per `narrative.md`: no room-by-room descriptions). Photo mosaic: 1 large + 3–4 small (desktop), horizontal swipe row (mobile, user-controlled, snap scrolling, no autoplay). Photos in rounded/organic frames.
- Kid zone: hidden dino peeking from behind one photo (homepage placement #2 alternative, only one dino per page: choose this or #1, not both; recommended: here).
- Video slot: component accepts an optional YouTube ID from `siteConfig` and renders a **lite embed** (thumbnail + play button; loads the iframe only on tap).
- Motion: none.

### 10. What Parents Say
- Background: `morning-white`.
- Layout: 5.0 rating badge + "13 Google reviews" link; **featured card** (Ganeshkumar M.'s review, full) larger on the left/top; 4–6 shorter review cards in a static grid. Each card: reviewer name (first name + initial), the review, what it relates to (e.g. "Root canal for a 5-year-old", "Tooth cap"). No carousel.
- Kid zone: `reviews-sunbird` perched on the top edge of the featured card. Tappable (chirp reaction: small hop).
- Motion: none.

### 11. First Visit & FAQ
- Background: `blush` at 50%.
- Layout: H2; the visit as a short **sequence** (numbered allowed): Arrive & settle → Gentle check → Cavity-risk check → Talk with the parent → Plan the next visit. Then "What to bring" and "How to prepare your child" as two compact lists; then the FAQ accordion (Lucide `ChevronDown`, single-open, animated height via Framer `AnimatePresence` on the panel content with `overflow: hidden`).
- Kid zone: `firstvisit-toddler-monkey` (monkey hanging from a branch with the toddler peeking up) at the top-right. Tappable.
- Motion: accordion only.

### 12. Closing Scene — Jungle at Dusk
- Full-bleed section, min-height 80svh desktop / 70svh mobile.
- Background: CSS gradient from `sky-mist` (top, briefly) through soft peach to `dusk-violet` to `night-navy` at the bottom, so it flows into the night footer.
- Layers: `dusk-canopy` silhouette along the bottom; `dusk-group-watching` (the four kids and animal friends sitting together, seen from behind, watching the sky) small, bottom-centre; 3 balloons (`balloon-1/2/3`); CSS fireflies appearing towards the bottom.
- Motion (the one place for ambient boldness, gentle): balloons rise slowly (y +40px → −40px over 14–20s, different speeds, loop with fade at top), slight sway (rotate ±3°). Fireflies twinkle. Only while in view. Reduced motion: static composition.
- Content centred: *"Healthy Teeth. Happier Tomorrows."* (Baloo 2, white), one line of support, one **Book a visit** button (pink), WhatsApp text link.

### 13. Footer — Night Jungle (see B3).

## B6. BIRTH TO 18 — THE TRAIN JOURNEY (signature sequence #2)

### Concept
The same train from the hero now travels along a winding jungle track. It stops at four stations; at each stop, that carriage's stage card opens: age, what care looks like, and the key services at that age.

### Desktop (≥ 1024px): pinned horizontal journey
- Section height **300vh**; sticky stage `100svh`. Scroll progress `q` (0 → 1) drives the train along the track.
- Background: `sky-mist` top fading to a soft green meadow; `journey-track` (a gently curving track illustration, very wide) spans the stage; foliage clusters (`journey-foliage-*`) at intervals.
- The track is moved horizontally (x: 0 → −(trackWidth − viewportWidth)) while the train moves along a slight curve, so it feels like the camera follows the train.
- **Four stations** at q = 0.12, 0.37, 0.62, 0.87. Near each station (±0.08), the train eases to a near-stop (use a piecewise mapping so movement slows around stations) and that station's **stage card** rises from below the track (y 30px → 0, opacity 0 → 1). The previous card fades back to a compact label.
- Stage card: white, 20px radius, max-width 420px. Contents from `journeyStages.js`: stage name (Babies / Toddlers / Kids / Teens), age range, 2–3 lines of what care looks like, 3–4 treatment chips linking to the relevant treatment section on a service page (e.g. `/services/preventive-care#sealants`). Beside the card: that stage's passenger illustration (`journey-stop-babies`, `-toddlers`, `-kids`, `-teens`), which is tappable.
- Wheels rotate with distance; one steam puff per station arrival.
- A thin progress indicator (four dots connected by a line, labelled with the stage names) sits at the bottom of the stage and fills as `q` progresses. Clicking a dot scrolls to that station.

### Mobile and tablet (< 1024px): vertical journey (no horizontal pin)
- The track runs **top to bottom** down the left side (`journey-track-vertical`), and the train engine (small, rotated to travel downward, using `train-engine-top` asset) moves down the track as the parent scrolls through the section (not pinned; normal scroll with the engine position mapped to section progress).
- Stage cards stack vertically to the right of the track, each with its passenger illustration above the card. Each card reveals once (opacity + y 16px) when 30% in view. This is the only other place entrance motion is used.

### Reduced motion
No pin, no moving train. Four stage cards in a row (desktop) or stack (mobile) with the static track illustration behind them.

## B7. Inner Pages

### Shared inner-page template
1. **Page header scene** (`PageHeaderScene`): height 300px mobile / 380px desktop; soft tint background matching the page; the page's kid + animal illustration on the right (desktop) or below the title (mobile); H1 + one-line intro on the left; breadcrumbs above H1. Character tappable. A leaf-edge divider at the bottom.
2. Content sections (calm, text-first, from `narrative.md`), with the relevant FAQ accordion where applicable.
3. Booking prompt block (short line + **Book a visit** + **WhatsApp us**).
4. Night Jungle footer.
Hidden dino: one per page, placement listed in `characters.js`.

### Page → illustration pairing
| Page | Header illustration | Header tint |
|---|---|---|
| Our Approach | `approach-elephant-family` (elephant, calf, parent and child) | `leaf-mint` |
| Dr. Bhuvanesswari | **Her real photo** (no character); two small leaf accents only | `morning-white` |
| Services overview | `services-bear-cub` (kid + honey bear cub) | `sky-mist` |
| Preventive & Early Dental Care | `svc-healthy-panda` (kid + panda sharing a healthy snack) | `leaf-mint` |
| Fillings, Crowns & Tooth-Saving Care | `svc-gentle-bear-mirror` (kid + bear cub holding a little mirror, "open wide") | `sky-mist` |
| Growth, Habits & Early Orthodontics | `svc-growth-elephant` (girl + baby elephant measuring their height against a tree) | `blush` |
| Dental Injuries & Emergency Care | `emergency-lion-cub` | `sun-yellow` (30%) |
| Gentle Dentistry & Sedation | `svc-gentle-turtle` (child + turtle walking slowly together, no headphones) | `leaf-mint` |
| Special Needs Dental Care | `svc-special-needs-elephant` (child with sensory headphones sitting calmly with an elephant calf, holding a comfort toy) | `sky-mist` |
| Laser Dentistry & Frenectomy | `svc-laser-firefly` (toddler and the hornbill watching a friendly glowing firefly) | `morning-white` |
| Clear Aligners for Kids & Teens | `aligners-teen-giraffe` | `sun-yellow` (30%) |
| Your Child's First Visit | `firstvisit-toddler-monkey` | `blush` |
| Reviews | `reviews-sunbird` + `dusk-group-watching` crop, or the sunbird alone | `morning-white` |
| Blog | `blog-owl-reading` (owl reading a teeth book to two kids) | `blush` |
| Contact | `contact-parrot-wave` (kid + parrot waving) | `sky-mist` |
| 404 | `lost-monkey-map` (monkey and kid looking at a map, puzzled) + "This path isn't on our map" + buttons Home / Book a visit | `leaf-mint` |

Service pages are exactly the eight in `narrative.md` Section 11 (seven menu services + Clear Aligners), plus First Visit. No other service or group pages. The homepage Comfort Care section links to Gentle Dentistry & Sedation and Special Needs Dental Care.

## B8. Photo Treatment
- Real photos only for the clinic, doctor and equipment. Never stock photos of clinics, doctors or smiles.
- Frames: organic "leaf-edge" masks (SVG `clipPath` built from the `mask-leaf-*` shapes in Part C) for the doctor photo and the featured clinic photo; the rest use 20px rounded corners. Keep masks subtle: the photo must still read as a clean, professional photo.
- Crop the equipment photo tightly to the chair, mural and laughing-gas unit (exclude the AC unit, switchboard and cables).
- If a required photo is missing at build time, show a clearly labelled placeholder and **list it in the handoff notes**. Never ship a placeholder silently.

## B9. Booking Modal — Visual & Interaction
- Opens as a centred dialog (desktop, max-width 520px) or a bottom sheet (mobile, 92svh max, drag handle). Focus trapped; `Esc` closes; background scroll locked; returns focus to the trigger on close.
- **Three steps**, one question group per screen:
  1. *Who is the visit for?* Child's name (optional), **child's age** as large tappable chips (Under 1 · 1–3 · 4–6 · 7–12 · 13–18 → render as separate chips), first visit to Chutti's? (Yes/No chips)
  2. *What's the visit for?* Reason as tappable cards with small Lucide icons (from `narrative.md` Section 13 list); preferred date (native date input, min = today) and time slot chips within clinic hours
  3. *How do we reach you?* Parent's name, phone (`type="tel"`, `inputmode="numeric"`), "Tell us about your child" textarea with the prompt text from `narrative.md`, consent line, **Send booking request** button
- **Progress: a growing vine.** A thin leafy vine across the top of the modal grows (scaleX 0 → 0.33 → 0.66 → 1, origin left) with a small leaf appearing at each step. Cheap to build (one SVG path + CSS transform), charming, clear.
- Back button on steps 2–3; entered data kept when moving back.
- Inline validation on blur, plain-language errors (e.g. *"Please enter a 10-digit mobile number."*).
- Submitting state: button shows a small spinner + "Sending…"; disable double submit.
- **Success screen:** `success-celebration` illustration (kids and animals celebrating) with a gentle one-time pop (scale 0.9 → 1, 300ms) and small confetti-leaves (8–10 leaf images falling once, 1.2s; skipped on reduced motion). Text: *"Request sent! We'll call you to confirm a time."* + **Done** button + WhatsApp link for anything urgent.
- **Failure screen:** the `wa.me` fallback described in A4.

## B10. Tappable Character Reactions & Tooth Facts

Every fact below must be **reviewed and approved by Dr. Bhuvanesswari before launch** (store in `characters.js` with `approved: false` until confirmed; unapproved facts fall back to a friendly hello line, e.g. *"Hello! Have you brushed today?"*).

| Character | Reaction (≤ 700ms) | Tooth fact (draft) |
|---|---|---|
| Giraffe | Blink + slight head tilt | "I have no top front teeth. I use a tough pad instead!" |
| Hornbill (bird) | Wing flap + hop | "Birds don't have teeth. My big beak does all the work!" |
| Monkey | Quick swing / arm wave | "Many monkeys have 32 teeth, just like grown-ups!" |
| Elephant | Trunk raise | "My tusks are actually giant teeth!" |
| Bear cub | Happy bounce | "Bears have big flat back teeth for chewing, just like you!" |
| Panda | Munch (small head nod) | "My strong back teeth help me chew tough bamboo." |
| Turtle | Slow head pop out of shell | "I don't have teeth at all, just a hard beak!" |
| Lion cub | Tiny roar (mouth open, scale 1.05) | "I have milk teeth too, and they fall out just like yours!" |
| Owl | Head turn | "Owls don't have teeth. We swallow our food whole!" |
| Parrot | Head bob | "My beak keeps growing all my life!" |
| Sunbird | Hop | "My long beak helps me sip nectar from flowers." |
| Train | Steam puff + tiny bounce | "Next stop: healthy smiles!" |
| Kid passengers | One wave | Stage-specific tip, attributed to a kid by name where relevant (e.g. Toddlers: *"Kuttan's tip: brush twice a day with a rice-grain-sized smear of fluoride toothpaste."*; Kids: *"Chuttika's tip: …"*) → **doctor to approve** |
| Hidden dino | Wiggle | "You found me! I'm the dino from the clinic wall." |

Implementation: reactions use the character's alternate asset where provided (e.g. `-blink`, `-roar`) or simple transforms (rotate/scale/translate) on the single image. No sounds.

## B11. Myth vs Fact Card (live component) — visual spec
- Card max-width 760px, 24px radius, sits at the top of the post.
- Top strip: series label *"Myth vs Fact #01"* in Baloo 2 on a `brand-pink` hand-painted-style brush shape (`brush-stroke-pink` asset as background, text is HTML).
- **Myth panel:** `blush` background; heading "Myth" (Baloo 2, brand pink); the myth statement in Figtree 20px.
- **Fact panel:** `leaf-mint` background; heading "Fact" (Baloo 2, brand green darkened for AA); fact statement; `factPoints` as a checklist with Lucide `CircleCheck` icons; takeaway line in Baloo 2.
- One small character from the site cast in the corner (rotates by post: owl, bear cub, lion cub…), never a tooth character.
- Footer row inside the card: **Share** button (A8) + "Book a visit" link.
- Fully responsive; on mobile the panels stack (Myth above Fact).

## B12. Things That Must Not Happen (visual)
- No cartoon doctor or illustrated dentist anywhere.
- No tooth mascot or smiling-tooth character on the website.
- No objects with faces (toothbrush, toothpaste, floss characters) and no villain or germ characters (e.g. the doctor's Pasty, Brushy, Flossy, Rinsey, Plaqo stay off the website).
- No children shown in a dental chair, crying, or with instruments near the mouth in illustrations.
- No auto-advancing carousels, no autoplay video with sound, no sound effects.
- No fade-up entrance animation on every section; only the places specified above.
- No emoji or Unicode symbols as icons or decoration.
- No text baked into illustrations.
- No numbered markers on parallel lists (services, facts, reviews). Numbering only for Tell-Show-Do, the first-visit sequence and the journey stations.
- No stock photos of clinics, doctors, or "perfect smiles."
- The booking button and phone number are never hidden, delayed or covered by animation.

## B13. Pre-Ship Checklist
- [ ] Tested primarily at 375–390px width throughout development; tablet and desktop verified after
- [ ] Hero: content card visible and usable at frame 0 on mobile, before any scroll
- [ ] Hero and train journey smooth on a mid-range Android (or DevTools Moto G Power + 4× CPU throttle)
- [ ] Hero reverses cleanly on scroll-up; fast scroll never leaves layers mid-air; one-shots don't stack
- [ ] "Explore our services" skips the hero sequence correctly
- [ ] Reduced motion: no pins, settled scenes, characters still tappable
- [ ] Lighthouse mobile ≥ 90 performance, ≥ 95 accessibility/SEO/best practices on Home, a service page, First Visit and a blog post
- [ ] LCP element is the hero headline; CLS < 0.05 (all images have dimensions)
- [ ] Booking: all three steps work on mobile keyboard types; server validation; honeypot; WhatsApp + Sheet delivery verified with a real test submission; fallback screen verified by simulating failure
- [ ] WhatsApp float, MobileCTA bar and click-to-call present on every page
- [ ] Hidden dino present once on every page, never overlapping text/buttons
- [ ] Every character has alt text / aria-label; fact bubbles announced; keyboard focus visible
- [ ] All tooth facts marked `approved: true` by the doctor (or fallback lines active)
- [ ] Myth vs Fact posts render as live HTML (no text in images); Share sends the URL
- [ ] No placeholder photos or illustrations shipped silently; missing assets listed in handoff notes
- [ ] Copy checked against `narrative.md` "Words & Claims to Avoid"
- [ ] Compared with the agency's other live clinic sites (e.g. Bridges & Canals): no shared palette/layout family
- [ ] `/impeccable audit` and `/impeccable critique` run and resolved

---

# PART C — ILLUSTRATION & ASSET MANIFEST

> This is the complete list of image files the site expects. Filenames are exact; Claude Code references them from `data/illustrations.js`. If a file is missing at build time, use a clearly labelled placeholder and list it in the handoff notes.

## C1. Style Guide (for whoever creates the illustrations)

**Style anchor:** the soft blue dinosaur already provided (`dino-standing.png`). Every illustration must look like it belongs in the same picture book:
- Soft storybook look, pastel colours, gentle painted shading
- Rounded, simple shapes; friendly proportions (slightly larger heads, short limbs)
- Simple black dot eyes, small calm smiles; blush dots on cheeks are fine
- **No black outlines, no comic style, no glossy/3D look, no saturated primary colours**
- Plain background for export (transparent in the final file)
- **No text, letters or numbers inside any illustration**

**Palette for illustrations:** pastel versions of greens, sky blue, soft yellow, peach and pink, with brand navy used for the train body and night scenes and brand pink for flowers and small accents. Nothing neon.

**The four kids (recurring friend group)** — Indian children with a range of skin tones and hair, everyday clothes:
| Kid | Age | Look (suggested) |
|---|---|---|
| **Kuttan** (toddler, boy) | 2–3 | Round cheeks, short curly hair, comfy t-shirt and shorts |
| **Chuttika** (girl) | ~6 | Two braids or puffs, colourful frock or t-shirt and leggings; loves playing doctor, so in some scenes she carries a toy doctor kit or a toy stethoscope (never a full white coat, so she never reads as a real dentist) |
| Boy | ~9 | Short hair, t-shirt and shorts, a little adventurous |
| Teen | 14–15 | Ponytail or short hair (your choice of gender), casual t-shirt/hoodie, confident smile |

**Names:** the kid names (Chuttika, Kuttan) come from the doctor's own characters. The other two kids stay unnamed for now. Names appear only in kid-facing touches, never in parent-facing headings.

**Rules for kids:** always happy or curious; never in a dental chair, crying, scared, or with instruments near the mouth. Toothbrushes, a small hand mirror and an aligner case are fine. Smiles show healthy teeth that aren't glaring white. One child (the girl or the boy) wears **sensory headphones** in the Comfort Care scene only.

**Animals:** elephant (with calf), monkey, honey-brown bear cub (our own bear: no red shirt, nothing resembling Winnie the Pooh), panda, turtle, giraffe (with calf for the train), lion cub, owl, parrot, hornbill, sunbird. Same soft style as the dino.

## C2. How to Generate Consistently (AI workflow)

1. **Make the kids' character sheet first.** Generate one image with all four kids standing side by side (front view), in the dino's style. Regenerate until you're happy. Save it as `ref-kids-sheet.png`.
2. **For every other illustration, attach both references:** `dino-standing.png` + `ref-kids-sheet.png`, and use the base prompt below plus the item's line from the tables.
3. **Background removal:** if the tool can't export transparent PNGs, generate on plain white and remove the background (remove.bg, Photoshop, or Canva). Check edges for white halos.
4. **Separate moving parts:** items marked "Parts" need each part as its own file (e.g. the bird's wings). Easiest method: generate the full character, then generate the part alone with the same references ("just the left wing of this hornbill, same style"), or have a designer cut the parts out of the full image.
5. **Size:** export at the sizes in C4. Upscale with an AI upscaler if the tool outputs smaller.
6. **Check each file** against C1 before sending (style match, no outlines, no text, transparent background, generous empty padding around the subject).

**Base prompt (use every time, with both reference images attached):**
> *Soft storybook children's illustration in the exact style of the attached dinosaur: pastel colours, gentle painted shading, rounded shapes, simple black dot eyes, calm friendly smile, no black outlines, no comic style, no text. Kids must match the attached character sheet exactly. Plain white background, generous empty space around the subject.* **[Then add the item description.]**

## C3. Asset List

**Tiers:** **T1** = needed for launch (homepage + hero). **T2** = inner pages. **T3** = nice-to-have / phase 2.

### C3.1 Already provided
| File | Status |
|---|---|
| `dino-standing.png` | Provided (style anchor) |
| Logo (PNG) | Provided; highest-resolution version needed (see C5) |

### C3.2 Hero (T1)
| # | Filename | Description | Parts / variants | Size (px) |
|---|---|---|---|---|
| 1 | `hero-cloud-1.png` … `hero-cloud-5.png` | Five soft, fluffy pastel clouds of different sizes (2 large, 3 medium/small), slightly peach-tinted undersides | 5 separate files | Large 1800w, small 900w |
| 2 | `hero-canopy-back.png` | Distant jungle treeline silhouette, very soft and hazy, pale greens, wide panorama | + `hero-canopy-back-mobile.png` | 3200×900 / 1400×700 |
| 3 | `hero-foliage-mid-left.png` / `-right.png` | Mid-distance clusters of jungle trees and big leaves, one for each side, facing inward | + `-mobile` versions | 1600×1400 / 800×1000 |
| 4 | `hero-leaf-curtain-left.png` / `-right.png` | Big, lush foreground leaves (banana/monstera style) with a few pink flowers, forming curtains that together cover the scene; each ends in a natural leaf edge toward the centre | + `-mobile` versions | 1800×1800 / 900×1400 |
| 5 | `hero-ground-track.png` | A soft grassy jungle clearing with a small wooden train track running left to right, a few flowers and pebbles | + `-mobile` | 3200×600 / 1400×500 |
| 6 | `hero-giraffe-head.png` + `hero-giraffe-head-blink.png` | Giraffe head and long neck (neck cut off at the bottom, it rises from behind trees), looking toward the viewer, gentle smile. Blink version identical but eyes closed | 2 files, identical framing | 900×1600 |
| 7 | `hero-bird-body.png` + `hero-bird-wing-up.png` + `hero-bird-wing-down.png` | Friendly hornbill in flight, side view facing left; body without wings; wings as separate files in up and down positions | 3 files | 1000×800 (body) |
| 8 | `hero-bird-perched.png` | Same hornbill sitting on a branch, wings folded | 1 file | 800×800 |
| 9 | `hero-monkey-peek.png` + `hero-monkey-arm.png` | Cheeky little monkey hanging upside down / peeking down from leaves at top right, waving; arm as separate file | 2 files | 900×1200 |

### C3.3 The train (T1) — used in the hero and the journey
| # | Filename | Description | Parts / variants | Size (px) |
|---|---|---|---|---|
| 10 | `train-engine.png` | Soft storybook steam engine in brand navy with pink and green trim, a small chimney, side view facing left, **no wheels** (wheels are separate), empty driver's window (no driver), and a **blank signboard panel** on the side of the cab/boiler (the name "Chutti Express" is added in code) | 1 file | 1400×1000 |
| 11 | `train-wheel.png` | One train wheel, front view, perfectly circular (it will be rotated) | 1 file, reused | 400×400 |
| 12 | `train-carriage-a.png` / `train-carriage-b.png` | Open carriage, side view, no wheels, no passengers, **blank signboard area** on the side (label is added in code). Two colour variants (a: soft pink, b: soft green) | 2 files | 1100×700 |
| 13 | `train-passengers-babies.png` | Baby elephant calf sitting snugly (sized to sit inside a carriage, only the top half visible above the carriage edge), holding a baby rattle with its trunk | 1 file | 1000×700 |
| 14 | `train-passengers-toddlers.png` | The toddler and a baby monkey side by side, both waving | 1 file | 1000×700 |
| 15 | `train-passengers-kids.png` | The girl (~6) and the boy (~9) side by side, waving, one holding a toothbrush up like a flag | 1 file | 1000×700 |
| 16 | `train-passengers-teens.png` | The teen and a giraffe calf (neck sticking up above the carriage), both smiling | 1 file | 1000×900 |
| 17 | `train-steam-puff.png` | One soft round steam cloud puff | 1 file, reused | 500×400 |
| 18 | `train-engine-top.png` | The engine seen from above/front at a slight angle, for the vertical mobile journey (travelling downward) | 1 file | 800×1000 |

### C3.4 Homepage sections (T1)
| # | Filename | Description | Size (px) |
|---|---|---|---|
| 19 | `services-bear-cub.png` | The boy (~9) standing beside a honey-brown bear cub, both smiling and waving (used on homepage services + services overview page) | 1600×1400 |
| 20 | `emergency-lion-cub.png` | The girl (~6) gently comforting a lion cub who has a small plaster on its knee; both calm and reassured, not sad | 1400×1200 |
| 21 | `approach-elephant-family.png` | Mother elephant and calf with a parent holding a young child's hand, walking together | 1800×1200 |
| 22 | `tsd-tell.png` | Bear cub raising a paw as if explaining something to the girl, who listens curiously | 900×900 |
| 23 | `tsd-show.png` | Bear cub showing the girl a small hand mirror; she looks at it with interest | 900×900 |
| 24 | `tsd-do.png` | The girl smiling with her mouth open "ahh" while the bear cub holds the little mirror near (not in) her mouth; both happy | 900×900 |
| 25 | `comfort-turtle-walk.png` | A child wearing sensory headphones walking slowly hand-in-paw with a friendly turtle, side view facing right | 1400×900 |
| 26 | `aligners-teen-giraffe.png` | The teen standing tall and confident beside a tall giraffe, holding a small clear aligner case, big healthy smile | 1400×1800 |
| 27 | `aligner-tray.png` | A clear dental aligner tray drawn softly, slightly translucent pale blue-white, **no face**, gentle sparkle highlights | 900×600 |
| 28 | `reviews-sunbird.png` | Tiny sunbird perched, side view | 500×500 |
| 29 | `firstvisit-toddler-monkey.png` | Monkey hanging from a branch by its tail, the toddler peeking up at it curiously from below, both smiling | 1200×1400 |
| 30 | `dusk-canopy.png` | Jungle treeline silhouette in dusk colours (violet, deep teal, navy), wide | 3200×800 (+ `-mobile` 1400×600) |
| 31 | `dusk-group-watching.png` | The four kids and several animal friends (elephant calf, bear cub, giraffe, monkey) sitting together on a small hill, **seen from behind**, looking up at the sky | 1800×900 |
| 32 | `balloon-1.png`, `balloon-2.png`, `balloon-3.png` | Soft pastel hot-air balloons (pink, yellow-mint, sky-blue stripes), each its own file | 700×900 each |

### C3.5 Journey stops (T1)
| # | Filename | Description | Size (px) |
|---|---|---|---|
| 33 | `journey-track.png` | Very wide gently curving wooden track through a soft meadow and jungle edge, horizontal | 6000×900 |
| 34 | `journey-track-vertical.png` | Same track running top to bottom for mobile (narrow, tall) | 500×3000 |
| 35 | `journey-foliage-1.png` … `-3.png` | Three small clusters of jungle plants/flowers placed along the track | 900×700 each |
| 36 | `journey-stop-babies.png` | A parent gently holding a baby, with a mother elephant and her calf beside them | 1200×1000 |
| 37 | `journey-stop-toddlers.png` | The toddler and a little monkey brushing their teeth side by side | 1200×1000 |
| 38 | `journey-stop-kids.png` | Reuse `svc-gentle-bear-mirror.png` (see T2 #43) | — |
| 39 | `journey-stop-teens.png` | Reuse `aligners-teen-giraffe.png` | — |

### C3.6 Global (T1)
| # | Filename | Description | Size (px) |
|---|---|---|---|
| 40 | `footer-leaf-edge.png` | Horizontal strip of layered jungle leaf silhouettes (dark greens), top edge irregular, bottom edge straight | 3200×400 (+ `-mobile` 1400×300) |
| 41 | `footer-giraffe-peek.png` / `footer-monkey-peek.png` | Giraffe head and monkey peeking over a ledge, night-lit (slightly darker, moonlit tones) | 700×700 each |
| 42 | `footer-goodnight.png` | The four kids and animal friends waving goodnight, holding toothbrushes, night tones, small group | 1400×700 |
| — | `dino-peek.png` | The dino peeking from behind an edge (only head and front visible) | 700×700 |
| — | `dino-sitting.png` | The dino sitting, content | 700×700 |
| — | `dino-sleeping.png` | The dino curled up asleep (for the footer) | 800×500 |
| — | `success-celebration.png` | Kids and animals celebrating together (jumping, arms up), joyful | 1400×1000 |
| — | `confetti-leaf-1.png` … `-3.png` | Three small single leaves (green shades) for the success confetti | 200×200 each |
| — | `divider-grass-top.png` | Soft grass edge strip (top of section) | 3200×200 |
| — | `divider-leaf-1.png` / `divider-leaf-2.png` | Two leaf-edge section dividers (wavy leaf silhouettes, pastel greens) | 3200×220 each |
| — | `mask-leaf-1.png` / `mask-leaf-2.png` | Two organic leaf-edged blob shapes in solid black (used as photo masks) | 1200×1200 each |
| — | `brush-stroke-pink.png` | A single hand-painted brush stroke in brand pink (Myth vs Fact label background) | 1000×250 |

### C3.7 Inner pages (T2)
| # | Filename | Description | Size (px) |
|---|---|---|---|
| 43 | `svc-gentle-bear-mirror.png` | The boy (~9) and the bear cub; the bear holds a little mirror, the boy opens wide "ahh", both laughing | 1400×1200 |
| 44 | `svc-growth-elephant.png` | The girl (~6) and a baby elephant standing back-to-back against a tree trunk with small leaf marks, measuring who's taller, both smiling | 1400×1200 |
| 44a | `svc-gentle-turtle.png` | A child (no headphones) and the turtle walking slowly side by side, hand in paw, calm and happy | 1400×900 |
| 44b | `svc-special-needs-elephant.png` | A child wearing sensory headphones sitting calmly beside an elephant calf, holding a soft comfort toy; peaceful, dignified | 1400×1200 |
| 44c | `svc-laser-firefly.png` | The toddler and the hornbill watching a friendly glowing firefly with wonder (a soft light, no beams or devices) | 1400×1200 |
| 45 | `svc-healthy-panda.png` | The girl (~6) and a panda sharing a healthy snack (fruit slices, bamboo) | 1400×1200 |
| 46 | `blog-owl-reading.png` | A wise owl reading a book with a tooth picture on its cover to the girl and the boy | 1400×1200 |
| 47 | `contact-parrot-wave.png` | The teen or the boy waving, with a colourful parrot on their shoulder waving a wing | 1200×1200 |
| 48 | `lost-monkey-map.png` | The monkey and the toddler looking at an upside-down map, puzzled but smiling | 1400×1100 |
| 49 | `lion-cub-roar.png` | Lion cub alternate frame, mouth open in a tiny "roar" (for tap reaction) | 1400×1200 |

### C3.8 Nice-to-have (T3)
| Filename | Description |
|---|---|
| `dino-waving.png` | Dino waving (extra placement variety) |
| `hero-butterfly.png` | A pastel butterfly (can flutter near the curtain in the hero) |
| `brushing-timer-scene.png` | Kids and animals brushing together (future two-minute brushing timer) |
| Myth vs Fact corner characters | Small head-and-shoulders versions of owl, bear cub, lion cub, panda |

**Total for launch (T1):** about 75 files, many of them small parts, mobile variants or simple shapes (clouds, leaves, dividers). **T2:** 10 files.

## C4. File Specs
- **Format:** PNG with transparent background (the site converts to AVIF/WebP automatically). The only exception: `mask-leaf-*` are solid black shapes on transparent.
- **Size:** as listed (these are "2×" sizes; the site serves smaller versions to phones). If a file must be smaller, keep at least 60% of the listed width.
- **Padding:** leave ~5% empty space around every subject so nothing gets cropped.
- **Consistent light:** soft light from the top-left in all daytime illustrations; moonlit, cooler tones for footer/night items.
- **Naming:** exactly as listed, lowercase, hyphens, no spaces.

## C5. Other Assets Needed (photos, logo, links)
| Item | Details | Status |
|---|---|---|
| Logo | Highest-resolution PNG available; a vector (SVG) version before launch is strongly recommended (designer or Vectorizer.ai + cleanup) | PNG provided; vector pending |
| Doctor photo | Current photo provided (candid). A professional portrait in the clinic is strongly recommended for the hero chip and doctor section | Provided (candid) |
| Clinic photos | Exterior/entrance with signage, reception, waiting area, treatment area (tidy, cables hidden), laughing-gas unit, any close-up of kid-friendly details. Original phone files preferred over Google-compressed copies; only clinic-owned photos, never reviewers' photos | Partial (2 provided) |
| Google Business Profile URL | For map embed, reviews link and schema | Pending |
| YouTube video links (3) | For lite embeds on the doctor page / Inside the Clinic; transcripts help the doctor's own voice in copy | Pending |
| Myth vs Fact content | The **text** of each card (myth, fact, bullet points, takeaway) plus the series number, so the cards can be rebuilt as live HTML | Pending |
| Domain | For `NEXT_PUBLIC_SITE_URL`, sitemap and schema | Pending |
| WhatsApp Business API credentials | Provider, API key, sender number ID, approved template name | Pending |
| Google Sheet webhook | Apps Script web-app URL for booking backup | Pending |
| Doctor-approved tooth facts | Review of the B10 fact list | Pending |
