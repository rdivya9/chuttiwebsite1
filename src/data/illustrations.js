/**
 * illustrations.js — Complete illustration manifest.
 *
 * Maps every asset name from build-spec.md Part C to its path, dimensions,
 * and alt text. IllustrationImage component imports from here.
 *
 * Status values:
 *   'ready'       — file is in public/illustrations/ and verified
 *   'placeholder' — not yet available; IllustrationImage shows a labelled placeholder
 *
 * All illustrations are 'placeholder' until the generated PNG files are placed
 * in public/illustrations/ with the exact filenames listed here.
 * Dimensions are the "2×" source sizes from build-spec C4.
 */

const illustrations = {
  // ── Style reference (provided) ───────────────────────────────────────────
  "dino-standing": {
    path:   "/illustrations/dino-standing.png",
    width:  700, height: 700,
    alt:    "",              // Decorative unless it's the hidden dino
    status: "placeholder",   // Update to 'ready' once file is confirmed in place
  },

  // ── Hero (T1) ────────────────────────────────────────────────────────────
  "hero-cloud-1":             { path: "/illustrations/hero-cloud-1.png",             width: 1800, height: 1200, alt: "",                          status: "ready" },
  "hero-cloud-2":             { path: "/illustrations/hero-cloud-2.png",             width: 1800, height: 1200, alt: "",                          status: "ready" },
  "hero-cloud-3":             { path: "/illustrations/hero-cloud-3.png",             width: 900,  height: 600,  alt: "",                          status: "ready" },
  "hero-cloud-4":             { path: "/illustrations/hero-cloud-4.png",             width: 900,  height: 600,  alt: "",                          status: "ready" },
  "hero-cloud-5":             { path: "/illustrations/hero-cloud-5.png",             width: 900,  height: 600,  alt: "",                          status: "ready" },
  "hero-canopy-back":         { path: "/illustrations/hero-canopy-back.png",         width: 3200, height: 900,  alt: "",                          status: "ready" },
  "hero-canopy-back-mobile":  { path: "/illustrations/hero-canopy-back-mobile.png",  width: 1400, height: 700,  alt: "",                          status: "ready" },
  "hero-foliage-mid-left":         { path: "/illustrations/hero-foliage-mid-left.png",         width: 1600, height: 1400, alt: "", status: "ready" },
  "hero-foliage-mid-right":        { path: "/illustrations/hero-foliage-mid-right.png",        width: 1600, height: 1400, alt: "", status: "ready" },
  "hero-foliage-mid-left-mobile":  { path: "/illustrations/hero-foliage-mid-left-mobile.png",  width: 800,  height: 1000, alt: "", status: "ready" },
  "hero-foliage-mid-right-mobile": { path: "/illustrations/hero-foliage-mid-right-mobile.png", width: 800,  height: 1000, alt: "", status: "ready" },
  "hero-leaf-curtain-left":        { path: "/illustrations/hero-leaf-curtain-left.png",        width: 1800, height: 1800, alt: "", status: "ready" },
  "hero-leaf-curtain-right":       { path: "/illustrations/hero-leaf-curtain-right.png",       width: 1800, height: 1800, alt: "", status: "ready" },
  "hero-leaf-curtain-left-mobile": { path: "/illustrations/hero-leaf-curtain-left-mobile.png", width: 900,  height: 1400, alt: "", status: "ready" },
  "hero-leaf-curtain-right-mobile":{ path: "/illustrations/hero-leaf-curtain-right-mobile.png",width: 900,  height: 1400, alt: "", status: "ready" },
  "hero-ground-track":        { path: "/illustrations/hero-ground-track.png",        width: 3200, height: 600,  alt: "",                          status: "ready" },
  "hero-ground-track-mobile": { path: "/illustrations/hero-ground-track-mobile.png", width: 1400, height: 500,  alt: "",                          status: "ready" },
  "hero-giraffe-head":        { path: "/illustrations/hero-giraffe-head.png",        width: 941,  height: 1672, alt: "A friendly giraffe peeking up from behind the jungle trees", status: "ready" },
  "hero-giraffe-head-blink":  { path: "/illustrations/hero-giraffe-head-blink.png",  width: 941,  height: 1672, alt: "",                          status: "ready" },
  "hero-giraffe-bush":        { path: "/illustrations/hero-giraffe-bush.png",        width: 1683, height: 935,  alt: "",                          status: "ready" },
  "hero-bird-body":           { path: "/illustrations/hero-bird-body.png",           width: 1000, height: 800,  alt: "A friendly hornbill in flight", status: "ready" },
  "hero-bird-wing-up":        { path: "/illustrations/hero-bird-wing-up.png",        width: 1000, height: 800,  alt: "",                          status: "ready" },
  "hero-bird-wing-down":      { path: "/illustrations/hero-bird-wing-down.png",      width: 1000, height: 800,  alt: "",                          status: "ready" },
  "hero-bird-perched":        { path: "/illustrations/hero-bird-perched.png",        width: 800,  height: 800,  alt: "A friendly hornbill perched on a branch", status: "ready" },
  "hero-monkey-peek":         { path: "/illustrations/hero-monkey-peek.png",         width: 900,  height: 1200, alt: "A cheeky monkey peeking down from the jungle canopy", status: "ready" },
  "hero-monkey-arm":          { path: "/illustrations/hero-monkey-arm.png",          width: 900,  height: 1200, alt: "",                          status: "ready" },

  // ── Train (T1) ───────────────────────────────────────────────────────────
  "train-engine":             { path: "/illustrations/train-engine.png",             width: 1400, height: 1000, alt: "The Chutti Express storybook steam engine", status: "ready" },
  "train-wheel":              { path: "/illustrations/train-wheel.png",              width: 400,  height: 400,  alt: "",                          status: "ready" },
  "train-carriage-a":         { path: "/illustrations/train-carriage-a.png",         width: 1100, height: 700,  alt: "",                          status: "ready" },
  "train-carriage-b":         { path: "/illustrations/train-carriage-b.png",         width: 1100, height: 700,  alt: "",                          status: "ready" },
  "train-passengers-babies":  { path: "/illustrations/train-passengers-babies.png",  width: 1000, height: 700,  alt: "A baby elephant calf riding in the Babies carriage", status: "ready" },
  "train-passengers-toddlers":{ path: "/illustrations/train-passengers-toddlers.png",width: 1000, height: 700,  alt: "Kuttan and a baby monkey waving from the Toddlers carriage", status: "ready" },
  "train-passengers-kids":    { path: "/illustrations/train-passengers-kids.png",    width: 1000, height: 700,  alt: "Chuttika and the boy waving from the Kids carriage, one holding a toothbrush like a flag", status: "ready" },
  "train-passengers-teens":   { path: "/illustrations/train-passengers-teens.png",   width: 1000, height: 900,  alt: "The teen and a giraffe calf smiling from the Teens carriage", status: "ready" },
  "train-steam-puff":         { path: "/illustrations/train-steam-puff.png",         width: 500,  height: 400,  alt: "",                          status: "ready" },
  "train-engine-top":         { path: "/illustrations/train-engine-top.png",         width: 800,  height: 1000, alt: "The Chutti Express seen from the front, travelling downward", status: "ready" },

  // ── Homepage sections (T1) ───────────────────────────────────────────────
  "services-bear-cub":        { path: "/illustrations/services-bear-cub.png",        width: 1600, height: 1400, alt: "A boy and a honey bear cub smiling and waving", status: "placeholder" },
  "emergency-lion-cub":       { path: "/illustrations/emergency-lion-cub.png",       width: 1400, height: 1200, alt: "Chuttika gently comforting a lion cub with a small plaster on its knee", status: "placeholder" },
  "approach-elephant-family": { path: "/illustrations/approach-elephant-family.png", width: 1800, height: 1200, alt: "A parent walking hand-in-hand with a young child, alongside a mother elephant and her calf", status: "placeholder" },
  "tsd-tell":                 { path: "/illustrations/tsd-tell.png",                 width: 900,  height: 900,  alt: "A bear cub gently explaining something to Chuttika, who listens curiously", status: "placeholder" },
  "tsd-show":                 { path: "/illustrations/tsd-show.png",                 width: 900,  height: 900,  alt: "A bear cub showing Chuttika a small hand mirror", status: "placeholder" },
  "tsd-do":                   { path: "/illustrations/tsd-do.png",                   width: 900,  height: 900,  alt: "Chuttika smiling with her mouth open while the bear cub holds a mirror nearby", status: "placeholder" },
  "comfort-turtle-walk":      { path: "/illustrations/comfort-turtle-walk.png",      width: 1400, height: 900,  alt: "A child wearing sensory headphones walking slowly with a friendly turtle, holding hands", status: "placeholder" },
  "aligners-teen-giraffe":    { path: "/illustrations/aligners-teen-giraffe.png",    width: 1400, height: 1800, alt: "A confident teen holding a clear aligner case, standing beside a tall giraffe", status: "placeholder" },
  "aligner-tray":             { path: "/illustrations/aligner-tray.png",             width: 900,  height: 600,  alt: "A clear dental aligner tray illustrated softly",  status: "placeholder" },
  "reviews-sunbird":          { path: "/illustrations/reviews-sunbird.png",          width: 500,  height: 500,  alt: "A tiny sunbird perched on a twig",               status: "placeholder" },
  "firstvisit-toddler-monkey":{ path: "/illustrations/firstvisit-toddler-monkey.png",width: 1200, height: 1400, alt: "Kuttan looking up curiously at a monkey hanging from a branch", status: "placeholder" },
  "dusk-canopy":              { path: "/illustrations/dusk-canopy.png",              width: 3200, height: 800,  alt: "",                          status: "placeholder" },
  "dusk-canopy-mobile":       { path: "/illustrations/dusk-canopy-mobile.png",       width: 1400, height: 600,  alt: "",                          status: "placeholder" },
  "dusk-group-watching":      { path: "/illustrations/dusk-group-watching.png",      width: 1800, height: 900,  alt: "The four children and their animal friends sitting together on a hill, watching the evening sky", status: "placeholder" },
  "balloon-1":                { path: "/illustrations/balloon-1.png",                width: 700,  height: 900,  alt: "",                          status: "placeholder" },
  "balloon-2":                { path: "/illustrations/balloon-2.png",                width: 700,  height: 900,  alt: "",                          status: "placeholder" },
  "balloon-3":                { path: "/illustrations/balloon-3.png",                width: 700,  height: 900,  alt: "",                          status: "placeholder" },

  // ── Journey stops (T1) ──────────────────────────────────────────────────
  "journey-track":            { path: "/illustrations/journey-track.png",            width: 6000, height: 900,  alt: "",                          status: "placeholder" },
  "journey-track-vertical":   { path: "/illustrations/journey-track-vertical.png",   width: 500,  height: 3000, alt: "",                          status: "placeholder" },
  "journey-foliage-1":        { path: "/illustrations/journey-foliage-1.png",        width: 900,  height: 700,  alt: "",                          status: "placeholder" },
  "journey-foliage-2":        { path: "/illustrations/journey-foliage-2.png",        width: 900,  height: 700,  alt: "",                          status: "placeholder" },
  "journey-foliage-3":        { path: "/illustrations/journey-foliage-3.png",        width: 900,  height: 700,  alt: "",                          status: "placeholder" },
  "journey-stop-babies":      { path: "/illustrations/journey-stop-babies.png",      width: 1200, height: 1000, alt: "A parent holding a baby, with a mother elephant and her calf beside them", status: "placeholder" },
  "journey-stop-toddlers":    { path: "/illustrations/journey-stop-toddlers.png",    width: 1200, height: 1000, alt: "Kuttan and a little monkey brushing their teeth together", status: "placeholder" },
  // journey-stop-kids reuses svc-gentle-bear-mirror (T2 — placeholder until Phase 5)
  "journey-stop-kids":        { path: "/illustrations/svc-gentle-bear-mirror.png",   width: 1400, height: 1200, alt: "The boy and the bear cub with a hand mirror, laughing", status: "placeholder" },
  // journey-stop-teens reuses aligners-teen-giraffe (T1)
  "journey-stop-teens":       { path: "/illustrations/aligners-teen-giraffe.png",    width: 1400, height: 1800, alt: "A confident teen standing beside a tall giraffe, holding an aligner case", status: "placeholder" },

  // ── Global (T1) ─────────────────────────────────────────────────────────
  "footer-leaf-edge":         { path: "/illustrations/footer-leaf-edge.png",         width: 3200, height: 400,  alt: "",                          status: "placeholder" },
  "footer-leaf-edge-mobile":  { path: "/illustrations/footer-leaf-edge-mobile.png",  width: 1400, height: 300,  alt: "",                          status: "placeholder" },
  "footer-giraffe-peek":      { path: "/illustrations/footer-giraffe-peek.png",      width: 700,  height: 700,  alt: "A giraffe peeking over the jungle edge in soft moonlight", status: "placeholder" },
  "footer-monkey-peek":       { path: "/illustrations/footer-monkey-peek.png",       width: 700,  height: 700,  alt: "A monkey peeking over the jungle edge with a sleepy smile", status: "placeholder" },
  "footer-goodnight":         { path: "/illustrations/footer-goodnight.png",         width: 1400, height: 700,  alt: "The four children and their animal friends waving goodnight, each holding a toothbrush", status: "placeholder" },
  "dino-peek":                { path: "/illustrations/dino-peek.png",                width: 700,  height: 700,  alt: "The friendly dino from the clinic wall peeking out curiously", status: "placeholder" },
  "dino-sitting":             { path: "/illustrations/dino-sitting.png",             width: 700,  height: 700,  alt: "The friendly dino from the clinic wall sitting contentedly", status: "placeholder" },
  "dino-sleeping":            { path: "/illustrations/dino-sleeping.png",            width: 800,  height: 500,  alt: "The friendly dino from the clinic wall curled up asleep", status: "placeholder" },
  "success-celebration":      { path: "/illustrations/success-celebration.png",      width: 1400, height: 1000, alt: "The four children and their animal friends jumping and cheering together", status: "placeholder" },
  "confetti-leaf-1":          { path: "/illustrations/confetti-leaf-1.png",          width: 200,  height: 200,  alt: "",                          status: "placeholder" },
  "confetti-leaf-2":          { path: "/illustrations/confetti-leaf-2.png",          width: 200,  height: 200,  alt: "",                          status: "placeholder" },
  "confetti-leaf-3":          { path: "/illustrations/confetti-leaf-3.png",          width: 200,  height: 200,  alt: "",                          status: "placeholder" },
  "divider-grass-top":        { path: "/illustrations/divider-grass-top.png",        width: 3200, height: 200,  alt: "",                          status: "placeholder" },
  "divider-leaf-1":           { path: "/illustrations/divider-leaf-1.png",           width: 3200, height: 220,  alt: "",                          status: "placeholder" },
  "divider-leaf-2":           { path: "/illustrations/divider-leaf-2.png",           width: 3200, height: 220,  alt: "",                          status: "placeholder" },
  "mask-leaf-1":              { path: "/illustrations/mask-leaf-1.png",              width: 1200, height: 1200, alt: "",                          status: "placeholder" },
  "mask-leaf-2":              { path: "/illustrations/mask-leaf-2.png",              width: 1200, height: 1200, alt: "",                          status: "placeholder" },
  "brush-stroke-pink":        { path: "/illustrations/brush-stroke-pink.png",        width: 1000, height: 250,  alt: "",                          status: "placeholder" },

  // ── Inner pages (T2) ────────────────────────────────────────────────────
  "svc-gentle-bear-mirror":   { path: "/illustrations/svc-gentle-bear-mirror.png",   width: 1400, height: 1200, alt: "The boy and the bear cub with a hand mirror, both laughing", status: "placeholder" },
  "svc-healthy-panda":        { path: "/illustrations/svc-healthy-panda.png",        width: 1400, height: 1200, alt: "Chuttika and a panda sharing healthy fruit snacks", status: "placeholder" },
  "svc-growth-elephant":      { path: "/illustrations/svc-growth-elephant.png",      width: 1400, height: 1200, alt: "Chuttika and a baby elephant measuring their heights against a tree", status: "placeholder" },
  "svc-gentle-turtle":        { path: "/illustrations/svc-gentle-turtle.png",        width: 1400, height: 900,  alt: "Kuttan walking slowly with a friendly turtle, holding hands", status: "placeholder" },
  "svc-special-needs-elephant":{ path: "/illustrations/svc-special-needs-elephant.png", width: 1400, height: 1200, alt: "A child wearing sensory headphones sitting calmly beside an elephant calf, holding a comfort toy", status: "placeholder" },
  "svc-laser-firefly":        { path: "/illustrations/svc-laser-firefly.png",        width: 1400, height: 1200, alt: "Kuttan and the hornbill watching a glowing firefly with wonder", status: "placeholder" },
  "blog-owl-reading":         { path: "/illustrations/blog-owl-reading.png",         width: 1400, height: 1200, alt: "A wise owl reading a storybook to Chuttika and the boy", status: "placeholder" },
  "contact-parrot-wave":      { path: "/illustrations/contact-parrot-wave.png",      width: 1200, height: 1200, alt: "The teen waving with a colourful parrot on her shoulder", status: "placeholder" },
  "lost-monkey-map":          { path: "/illustrations/lost-monkey-map.png",          width: 1400, height: 1100, alt: "The monkey and Kuttan looking puzzled at an upside-down map, both smiling", status: "placeholder" },
  "lion-cub-roar":            { path: "/illustrations/lion-cub-roar.png",            width: 1400, height: 1200, alt: "",                          status: "placeholder" },

  // ── Nice-to-have (T3) ───────────────────────────────────────────────────
  "dino-waving":              { path: "/illustrations/dino-waving.png",              width: 700,  height: 700,  alt: "The friendly dino waving",  status: "placeholder" },
  "hero-butterfly":           { path: "/illustrations/hero-butterfly.png",           width: 400,  height: 400,  alt: "",                          status: "placeholder" },
  "brushing-timer-scene":     { path: "/illustrations/brushing-timer-scene.png",     width: 1400, height: 900,  alt: "The four children and animals brushing their teeth together", status: "placeholder" },
};

export default illustrations;
