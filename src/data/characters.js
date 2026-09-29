/**
 * characters.js — Cast registry for all tappable characters and the hidden dino.
 *
 * Source: build-spec.md B10 + B3 (hidden dino).
 *
 * IMPORTANT: All tooth facts are pending doctor approval.
 * `approved: false` means the component falls back to `fallbackFact`.
 * Send the B10 fact list to Dr. Bhuvanesswari; once she approves / corrects each line,
 * set `approved: true` and update the `fact` text if needed.
 *
 * Kid-passenger tips: the doctor must also fill in the Chuttika and teen tips.
 */

export const characters = [
  // ── Hero / homepage animals ──────────────────────────────────────────────
  {
    id:           "giraffe",
    name:         "Giraffe",
    ariaLabel:    "Giraffe — tap for a tooth fact",
    asset:        "hero-giraffe-head",           // base image
    assetAlt:     "hero-giraffe-head-blink",     // reaction frame
    reaction:     "blink",                       // swap assetAlt for 160ms
    fact:         "I have no top front teeth. I use a tough pad instead!",
    fallbackFact: "Hello! Have you brushed today?",
    approved:     false,
    pages:        ["home", "clear-aligners"],
  },
  {
    id:           "hornbill",
    name:         "Hornbill",
    ariaLabel:    "Hornbill — tap for a tooth fact",
    asset:        "hero-bird-perched",
    assetAlt:     null,                          // wing-flap via CSS rotate on hero-bird-wing-up
    reaction:     "wing-flap",                   // rotate wing layer ±18° once
    fact:         "Birds don't have teeth — my big beak does all the work!",
    fallbackFact: "Hello! Have you brushed today?",
    approved:     false,
    pages:        ["home"],
  },
  {
    id:           "monkey",
    name:         "Monkey",
    ariaLabel:    "Monkey — tap for a tooth fact",
    asset:        "hero-monkey-peek",
    assetAlt:     null,
    reaction:     "arm-wave",                    // rotate hero-monkey-arm 0→14°→0 once
    fact:         "Many monkeys have 32 teeth, just like grown-ups!",
    fallbackFact: "Hello! Have you brushed today?",
    approved:     false,
    pages:        ["home"],
  },
  {
    id:           "elephant",
    name:         "Elephant",
    ariaLabel:    "Elephant — tap for a tooth fact",
    asset:        "approach-elephant-family",
    assetAlt:     null,
    reaction:     "trunk-raise",                 // translateY -12px on trunk element
    fact:         "My tusks are actually giant teeth!",
    fallbackFact: "Hello! Have you brushed today?",
    approved:     false,
    pages:        ["home", "our-approach", "preventive-care", "early-orthodontics"],
  },
  {
    id:           "bear-cub",
    name:         "Bear cub",
    ariaLabel:    "Bear cub — tap for a tooth fact",
    asset:        "services-bear-cub",
    assetAlt:     null,
    reaction:     "bounce",                      // scale 1→1.08→1 over 300ms
    fact:         "Bears have big flat back teeth for chewing, just like you!",
    fallbackFact: "Hello! Have you brushed today?",
    approved:     false,
    pages:        ["home", "services", "fillings-crowns-root-canal", "gentle-dentistry-sedation"],
  },
  {
    id:           "panda",
    name:         "Panda",
    ariaLabel:    "Panda — tap for a tooth fact",
    asset:        "svc-healthy-panda",
    assetAlt:     null,
    reaction:     "munch",                       // small head-nod: rotateZ 0→5°→0
    fact:         "My strong back teeth help me chew tough bamboo.",
    fallbackFact: "Hello! Have you brushed today?",
    approved:     false,
    pages:        ["preventive-care"],
  },
  {
    id:           "turtle",
    name:         "Turtle",
    ariaLabel:    "Turtle — tap for a tooth fact",
    asset:        "comfort-turtle-walk",
    assetAlt:     null,
    reaction:     "head-pop",                    // translateY -8px (head emerges from shell)
    fact:         "I don't have teeth at all — just a hard beak!",
    fallbackFact: "Hello! Have you brushed today?",
    approved:     false,
    pages:        ["home", "gentle-dentistry-sedation"],
  },
  {
    id:           "lion-cub",
    name:         "Lion cub",
    ariaLabel:    "Lion cub — tap for a tooth fact",
    asset:        "emergency-lion-cub",
    assetAlt:     "lion-cub-roar",               // mouth-open "roar" frame
    reaction:     "roar",                        // swap assetAlt + scale 1→1.05→1
    fact:         "I have milk teeth too, and they fall out just like yours!",
    fallbackFact: "Hello! Have you brushed today?",
    approved:     false,
    pages:        ["home", "dental-emergencies"],
  },
  {
    id:           "owl",
    name:         "Owl",
    ariaLabel:    "Owl — tap for a tooth fact",
    asset:        "blog-owl-reading",
    assetAlt:     null,
    reaction:     "head-turn",                   // rotateZ 0→-15°→0 over 400ms
    fact:         "Owls don't have teeth. We swallow our food whole!",
    fallbackFact: "Hello! Have you brushed today?",
    approved:     false,
    pages:        ["blog"],
  },
  {
    id:           "parrot",
    name:         "Parrot",
    ariaLabel:    "Parrot — tap for a tooth fact",
    asset:        "contact-parrot-wave",
    assetAlt:     null,
    reaction:     "head-bob",                    // translateY 0→-6px→0 twice
    fact:         "My beak keeps growing all my life!",
    fallbackFact: "Hello! Have you brushed today?",
    approved:     false,
    pages:        ["contact"],
  },
  {
    id:           "sunbird",
    name:         "Sunbird",
    ariaLabel:    "Sunbird — tap for a tooth fact",
    asset:        "reviews-sunbird",
    assetAlt:     null,
    reaction:     "hop",                         // translateY 0→-8px→0 once
    fact:         "My long beak helps me sip nectar from flowers.",
    fallbackFact: "Hello! Have you brushed today?",
    approved:     false,
    pages:        ["home", "reviews"],
  },
  {
    id:           "giraffe-aligner",
    name:         "Giraffe",
    ariaLabel:    "Giraffe — tap for a tooth fact",
    asset:        "aligners-teen-giraffe",
    assetAlt:     null,
    reaction:     "blink",
    fact:         "I have no top front teeth. I use a tough pad instead!",
    fallbackFact: "Hello! Have you brushed today?",
    approved:     false,
    pages:        ["home", "clear-aligners"],
  },

  // ── Train characters ─────────────────────────────────────────────────────
  {
    id:           "train",
    name:         "Chutti Express",
    ariaLabel:    "Chutti Express — tap for a fact",
    asset:        "train-engine",
    assetAlt:     "train-steam-puff",
    reaction:     "steam",                       // spawn steam-puff above chimney + tiny bounce
    fact:         "Next stop: healthy smiles!",
    fallbackFact: "Next stop: healthy smiles!",
    approved:     true,                          // Safe, no clinical claim
    pages:        ["home"],
  },
  {
    id:           "passenger-babies",
    name:         "Baby elephant",
    ariaLabel:    "Baby elephant — tap for a tip",
    asset:        "train-passengers-babies",
    assetAlt:     null,
    reaction:     "wave",
    // Kid tip — doctor to approve
    fact:         "TODO — doctor to provide a baby dental tip (e.g. start cleaning gums before the first tooth)",
    fallbackFact: "Hello! Have you brushed today?",
    approved:     false,
    pages:        ["home"],
  },
  {
    id:           "passenger-toddlers",
    name:         "Kuttan and monkey",
    ariaLabel:    "Kuttan and the monkey — tap for a tip",
    asset:        "train-passengers-toddlers",
    assetAlt:     null,
    reaction:     "wave",
    fact:         "Kuttan's tip: brush twice a day with a rice-grain-sized smear of fluoride toothpaste.",
    fallbackFact: "Hello! Have you brushed today?",
    approved:     false,                         // Doctor to confirm the fluoride amount guidance
    pages:        ["home"],
  },
  {
    id:           "passenger-kids",
    name:         "Chuttika and the boy",
    ariaLabel:    "Chuttika and the boy — tap for a tip",
    asset:        "train-passengers-kids",
    assetAlt:     null,
    reaction:     "wave",
    // Doctor to fill in Chuttika's tip
    fact:         "Chuttika's tip: TODO — doctor to provide a brushing or cavity-prevention tip for school-age children.",
    fallbackFact: "Hello! Have you brushed today?",
    approved:     false,
    pages:        ["home"],
  },
  {
    id:           "passenger-teens",
    name:         "The teen",
    ariaLabel:    "The teen — tap for a tip",
    asset:        "train-passengers-teens",
    assetAlt:     null,
    reaction:     "wave",
    // Doctor to fill in the teen tip
    fact:         "Teen tip: TODO — doctor to provide a tip for teens (e.g. aligners, brushing with braces, or fluoride).",
    fallbackFact: "Hello! Have you brushed today?",
    approved:     false,
    pages:        ["home"],
  },

  // ── Hidden dino ──────────────────────────────────────────────────────────
  // One dino per page. Placement is fixed so it never overlaps text or buttons.
  // `dinoAsset` varies by page (peek, sitting, sleeping for footer).
  {
    id:           "dino",
    name:         "Dino",
    ariaLabel:    "Hidden dino — tap to say hello",
    asset:        "dino-peek",                   // default; overridden per page
    assetAlt:     null,
    reaction:     "wiggle",                      // rotateZ -6°→6°→0 over 450ms
    fact:         "You found me! I'm the dino from the clinic wall.",
    fallbackFact: "You found me! I'm the dino from the clinic wall.",
    approved:     true,
    // Per-page placements — fixed so dino never overlaps text/buttons
    placements: {
      home:                    { asset: "dino-peek",    position: "inside-clinic-photo-corner" },
      "our-approach":          { asset: "dino-sitting", position: "below-pillars-right" },
      "dr-bhuvanesswari":      { asset: "dino-peek",    position: "photo-mask-bottom-right" },
      services:                { asset: "dino-peek",    position: "services-grid-bottom-right" },
      "preventive-care":       { asset: "dino-sitting", position: "page-header-bottom-left" },
      "fillings-crowns-root-canal": { asset: "dino-peek", position: "page-header-bottom-right" },
      "early-orthodontics":    { asset: "dino-sitting", position: "faq-section-bottom-right" },
      "dental-emergencies":    { asset: "dino-peek",    position: "page-header-bottom-left" },
      "gentle-dentistry-sedation": { asset: "dino-sitting", position: "cards-section-right" },
      "special-needs-dentistry": { asset: "dino-peek",  position: "page-header-bottom-right" },
      "laser-dentistry":       { asset: "dino-sitting", position: "content-bottom-left" },
      "clear-aligners":        { asset: "dino-peek",    position: "page-header-bottom-right" },
      "first-visit":           { asset: "dino-sitting", position: "what-to-bring-right" },
      reviews:                 { asset: "dino-peek",    position: "review-grid-bottom-right" },
      blog:                    { asset: "dino-sitting", position: "blog-grid-bottom-left" },
      contact:                 { asset: "dino-peek",    position: "map-bottom-left" },
      "not-found":             { asset: "dino-sitting", position: "below-buttons" },
      footer:                  { asset: "dino-sleeping", position: "footer-foliage-left" },
    },
  },
];

export default characters;
