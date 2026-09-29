/**
 * blogPosts.js — Blog content data.
 *
 * Two types:
 *   'guide'     — SEO-optimised parent education articles, written in the doctor's voice.
 *                 Full article body is stored here as sections[].
 *   'myth-fact' — Myth vs Fact cards, displayed as images from public/photos/blog/.
 *                 The actual image files are: myth-vs-fact-1.webp, -2.webp, -3.webp
 *
 * Note: narrative.md §8 specifies MythFactCard as live HTML (indexable, accessible).
 *   The current implementation uses the provided image files as agreed.
 *   If live HTML is needed for SEO later, replace `imageFile` with a data structure
 *   matching B11 in build-spec.md and rebuild as the MythFactCard component.
 *
 * Doctor must review all guide content before publishing.
 * Article body content is STUB — fill in before Phase 6.
 */

export const blogPosts = [
  // ── Myth vs Fact (image cards) ───────────────────────────────────────────
  {
    type:        "myth-fact",
    id:          "myth-vs-fact-01",
    slug:        "myth-vs-fact-01",
    title:       "Myth vs Fact #01",
    publishedAt: "2025-09-01",
    imageFile:   "/photos/blog/myth-vs-fact-1.webp",
    // TODO: update imageAlt once the card content is confirmed with the doctor
    imageAlt:    "Myth vs Fact card #1 — children's dental health",
    approved:    false,
  },
  {
    type:        "myth-fact",
    id:          "myth-vs-fact-02",
    slug:        "myth-vs-fact-02",
    title:       "Myth vs Fact #02",
    publishedAt: "2025-09-08",
    imageFile:   "/photos/blog/myth-vs-fact-2.webp",
    imageAlt:    "Myth vs Fact card #2 — children's dental health",
    approved:    false,
  },
  {
    type:        "myth-fact",
    id:          "myth-vs-fact-03",
    slug:        "myth-vs-fact-03",
    title:       "Myth vs Fact #03",
    publishedAt: "2025-09-15",
    imageFile:   "/photos/blog/myth-vs-fact-3.webp",
    imageAlt:    "Myth vs Fact card #3 — children's dental health",
    approved:    false,
  },

  // ── Parent Guides ─────────────────────────────────────────────────────
  {
    type:           "guide",
    id:             "when-should-baby-first-see-dentist",
    slug:           "when-should-baby-first-see-dentist",
    title:          "When should my baby first see a dentist?",
    metaDescription:"Most parents wait until a problem appears. Here is why the first birthday is the right milestone — and what happens at that first visit.",
    publishedAt:    "2025-09-22",
    readingTime:    "4 min",
    relatedService: "/services/preventive-care",
    approved:       true,
    sections: [
      {
        body: `Most parents bring their child to the dentist when something hurts or looks wrong. That's completely understandable — a dental visit feels unnecessary when the teeth look fine. But by the time a cavity is visible, it has already been developing for months. The first dental visit is not about treating problems. It's about preventing them.`,
      },
      {
        heading: "When, exactly?",
        body: `The American Academy of Pediatric Dentistry (AAPD) — whose recommendations Dr. Bhuvanesswari follows — advises a dental visit by the first birthday, or within six months of the first tooth appearing, whichever comes first. That often means a visit when your baby has just one or two teeth.\n\nIf your child is already past the first birthday and hasn't been seen yet, that is completely fine. Come now — there's no catch-up to do, just a plan to start from here.`,
      },
      {
        heading: "What is the point of checking one or two teeth?",
        body: `Quite a lot, actually. At the first visit, Dr. Bhuvanesswari:\n\n• Checks the gums, the emerging teeth and your baby's jaw development\n• Assesses cavity risk — based on your baby's feeding habits, fluoride use, family dental history and the condition of the existing teeth\n• Gives you specific, up-to-date guidance on cleaning those first teeth, fluoride toothpaste amounts, and feeding habits that affect tooth health (including night feeds and bottle use)\n• Sets up a dental home — a regular practice that knows your child's history, so nothing starts from scratch when something does need attention`,
      },
      {
        heading: "Does my baby need fluoride toothpaste already?",
        body: `Yes — as soon as the first tooth appears. A smear the size of a grain of rice is the right amount for children under 3. This is different from what many parents were told a generation ago. The evidence is clear: fluoride at this concentration is safe and protective. Dr. Bhuvanesswari will confirm the right amount for your baby's age at the visit.`,
      },
      {
        heading: "Will my baby cooperate?",
        body: `Babies don't cooperate in the way older children do — and that's expected. Very young children can stay on a parent's lap for the whole visit. Dr. Bhuvanesswari works around the child's natural reactions, and the visit is always unhurried. A few wiggles and protests are completely normal.`,
      },
      {
        heading: "The bigger reason to start early",
        body: `Children who visit the dentist from infancy are dramatically less anxious about dental care as they grow. The clinic becomes a familiar place, the doctor a familiar face. A child who had a calm first visit at 10 months is much less likely to be the 6-year-old who refuses to open their mouth.\n\nStarting early is the single most effective thing you can do for your child's long-term relationship with dental care.`,
      },
    ],
  },
  {
    type:           "guide",
    id:             "are-milk-teeth-worth-treating",
    slug:           "are-milk-teeth-worth-treating",
    title:          "Are milk teeth worth treating? What parents should know",
    metaDescription:"Baby teeth fall out anyway — so why treat them? A pediatric dentist explains what is at stake and when treatment is worth it.",
    publishedAt:    "2025-09-29",
    readingTime:    "5 min",
    relatedService: "/services/fillings-crowns-root-canal",
    approved:       true,
    sections: [
      {
        body: `"But it's just a baby tooth — it'll fall out anyway."\n\nThis is probably the most common reason parents wait before treating a cavity in a young child. It's an understandable thought. And it's also why untreated cavities in baby teeth are one of the most common causes of dental pain in children under 10.`,
      },
      {
        heading: "Why baby teeth matter more than you'd think",
        body: `Baby teeth are not simply temporary placeholders that do nothing while they wait to fall out. They do several important jobs:\n\n• They hold space for the adult teeth developing underneath. When a baby tooth is lost too early — from a cavity or extraction — the neighbouring teeth drift into the gap. The adult tooth then has nowhere to come through correctly, and may need orthodontic treatment that could have been avoided.\n\n• They are used for chewing for years. A 4-year-old with a painful back molar cannot chew properly. This affects nutrition, eating habits and weight.\n\n• They affect speech. The front teeth play a role in forming sounds. Children who lose front teeth early sometimes develop speech patterns that need correction.\n\n• Some baby teeth stay until age 10 or 12. The back molars (second primary molars) are not replaced by adult teeth until the child is around 10–12 years old. "Just a baby tooth" can mean another 6–8 years in the mouth.`,
      },
      {
        heading: "What happens if a cavity is left untreated?",
        body: `A small cavity becomes a large cavity. A large cavity reaches the nerve of the tooth (the pulp), causing infection and pain. An infected baby tooth can affect the adult tooth forming directly beneath it — in some cases, the infection damages the developing permanent tooth before it has even emerged.\n\nAn infection in a baby tooth can also spread to surrounding tissue. What started as something that "would have fallen out anyway" can become a genuine dental emergency.`,
      },
      {
        heading: "When is treatment worth it?",
        body: `Almost always, when a cavity is present and the tooth has a reasonable amount of time left in the mouth. Dr. Bhuvanesswari will tell you honestly if a tooth is close enough to natural loss that watching and waiting is the right call — there are cases where that's true. But those are a minority.\n\nFor most cavities in most baby teeth: treating early and conservatively is much simpler, more comfortable and less expensive than treating later when the cavity has grown. A small filling done now is almost always the right call over a root canal or extraction done in a year.`,
      },
      {
        heading: "What about the fear of treatment?",
        body: `This is the real concern for most parents — not the tooth itself, but the worry about what treating it will be like for their child.\n\nDr. Bhuvanesswari's approach to this is Tell-Show-Do: explaining every step to the child before doing it, moving at the child's pace, and never rushing. Parents stay in the room throughout. For children who need extra help feeling calm, laughing gas (nitrous oxide) is available after a clinical assessment.\n\nThe reviews from parents who came in worried — and left relieved — reflect this consistently.`,
      },
    ],
  },
  {
    type:           "guide",
    id:             "brushing-by-age",
    slug:           "brushing-by-age",
    title:          "How to brush your child's teeth: a guide by age",
    metaDescription:"A rice grain, a pea, or a full strip? Electric or manual? The right answer changes as your child grows — here is what to do at each stage.",
    publishedAt:    "2025-10-06",
    readingTime:    "5 min",
    relatedService: "/services/preventive-care",
    approved:       true,
    sections: [
      {
        body: `Brushing advice has changed significantly over the past decade, and what your parents did — or what the back of the toothpaste tube says — isn't always what the evidence supports now. Here is what Dr. Bhuvanesswari recommends at each stage of childhood.`,
      },
      {
        heading: "Before the first tooth (birth onwards)",
        body: `Clean your baby's gums after feeds with a clean, damp cloth or a soft silicone finger brush. This clears milk residue, introduces the habit of mouth cleaning before any teeth appear, and helps your baby get used to having something in their mouth. It takes about 30 seconds.`,
      },
      {
        heading: "First tooth to age 3",
        body: `As soon as the first tooth appears, start brushing twice a day with a soft-bristled infant toothbrush and a smear of fluoride toothpaste — the size of a grain of rice. This is a smaller amount than most parents expect, but the evidence is clear that this amount is safe and effective for very young children.\n\nAt this age, you are doing the brushing. Hold your baby with their head resting against your body, or lie them on a changing mat. Brush for two minutes, covering all surfaces of every tooth. Don't rinse after — letting the fluoride stay on the teeth is part of how it works.`,
      },
      {
        heading: "Ages 3–6",
        body: `Move up to a pea-sized amount of toothpaste. Continue brushing for your child twice a day, but start letting them "have a go" afterwards — it helps them build the habit and motor skill, but don't count on their brushing as the actual clean.\n\nAt this stage: no rinsing after brushing, or only a brief spit (not a full rinse with water). An electric toothbrush is fine and often more effective for wiggly children.`,
      },
      {
        heading: "Ages 6–9",
        body: `Children at this age are developing the motor control to brush independently, but most don't do it well until they're closer to 9 or 10. The rule most pediatric dentists use: supervise and check until your child can write in cursive — a proxy for the fine motor control brushing actually needs.\n\nA timer (two minutes), a disclosing tablet once a week (they show where plaque is left behind), and a parent check after brushing all help at this age.`,
      },
      {
        heading: "Ages 9 and older",
        body: `By around 9–10, most children can brush independently and effectively — but reinforcement helps. Electric toothbrushes with pressure sensors are excellent for this age group; they remove plaque more consistently and prevent brushing too hard (which damages enamel and gums).\n\nFlossing becomes important once teeth are touching — usually from around age 6–7, but this varies. Dr. Bhuvanesswari will advise at the check-up.`,
      },
      {
        heading: "A few things that matter more than people realise",
        body: `• Brush last thing at night, every night. Night-time saliva flow drops, so teeth are more vulnerable. The morning brush matters, but the night brush is the critical one.\n\n• Don't let your child eat or drink anything (except water) after the last brush of the day.\n\n• Brush time matters more than brush technique. Two minutes of imperfect brushing is better than 30 seconds of perfect brushing.\n\n• Replace the toothbrush every three months, or sooner after illness.`,
      },
    ],
  },
  {
    type:           "guide",
    id:             "what-is-caries-risk-assessment",
    slug:           "what-is-caries-risk-assessment",
    title:          "What is a cavity-risk assessment, and why does my child need one?",
    metaDescription:"Not every child has the same risk of getting cavities. A cavity-risk assessment (CRA) finds out what is specific to your child — and shapes their prevention plan.",
    publishedAt:    "2025-10-13",
    readingTime:    "4 min",
    relatedService: "/services/preventive-care",
    approved:       true,
    sections: [
      {
        body: `Two children can eat the same diet, brush the same way, and end up with very different cavity histories. One sails through childhood without a single filling; the other seems to develop cavities regularly despite doing everything right.\n\nThis is because cavity risk is personal. It depends on genetics, the specific bacteria in your child's mouth, the strength of their enamel, their saliva composition, and a dozen other factors that a standard check-up doesn't capture. That's what a cavity-risk assessment (Caries-Risk Assessment, or CRA) is designed to understand.`,
      },
      {
        heading: "What does the CRA look at?",
        body: `Dr. Bhuvanesswari's CRA is a structured assessment that considers:\n\n• Your child's age and stage of dental development\n• Any existing cavities or previous cavity history\n• Plaque levels and brushing effectiveness\n• Fluoride use — both at home (toothpaste) and professionally (treatments at the clinic)\n• Diet and feeding: sugar frequency, night feeds, bottle use, snacking patterns\n• Saliva flow and quality (low saliva flow significantly increases risk)\n• Medical and developmental factors that may affect dental health\n\nFrom this, Dr. Bhuvanesswari places your child in a low, moderate or high risk category.`,
      },
      {
        heading: "Why does the category matter?",
        body: `Because the prevention plan is completely different depending on the risk level.\n\nA low-risk child may only need a professional fluoride application every 12 months. A high-risk child might need it every three months, along with dietary counselling, prescription-strength fluoride toothpaste for home use, and more frequent check-ups.\n\nA generic "brush twice a day and avoid sweets" recommendation doesn't account for this. The CRA makes the prevention plan specific to your child.`,
      },
      {
        heading: "How often is it done?",
        body: `The CRA is built into the regular check-up — it doesn't require a separate appointment. As your child grows, their risk profile changes. The factors that made a 2-year-old high risk (night feeds, early enamel) may not apply at 6. Dr. Bhuvanesswari reassesses at each visit and adjusts the plan accordingly.`,
      },
      {
        heading: "What if my child is already at high risk?",
        body: `High risk doesn't mean cavities are inevitable — it means the prevention plan needs to work harder. Most high-risk children who follow their plan consistently do well. The CRA tells us where to focus effort, not just that something is wrong.`,
      },
    ],
  },
  {
    type:           "guide",
    id:             "clear-aligners-for-children",
    slug:           "clear-aligners-for-children",
    title:          "Clear aligners for children: what age is right?",
    metaDescription:"Aligners are not just for teenagers. A pediatric dentist explains how growing jaws affect the timing, and what to look for in your child.",
    publishedAt:    "2025-10-20",
    readingTime:    "5 min",
    relatedService: "/services/clear-aligners",
    approved:       true,
    sections: [
      {
        body: `Many parents assume aligners are for teenagers — something you do when all the adult teeth are through and the jaw has finished growing. That's a reasonable assumption, but it's not quite right. The question isn't really "what age" — it's "what stage of development." And the answer is different for every child.`,
      },
      {
        heading: "Why timing matters in a growing jaw",
        body: `A child's jaw is not a miniature adult jaw. It grows and changes continuously from infancy through the mid-teens, and the type of orthodontic treatment that works best depends on where in that growth curve the child is.\n\nFor some problems — particularly those involving how the jaw itself is developing, not just the position of individual teeth — acting earlier, while the jaw is still growing, can be more effective than waiting. An expander at age 7 may accomplish in months what braces and aligners would struggle to do at 14.\n\nFor other problems, waiting until most adult teeth have come through produces a more predictable result.\n\nThis is why the timing question needs to be answered by someone who has been watching your child's jaw develop — not a fixed age rule.`,
      },
      {
        heading: "What a pediatric dentist sees that a general dentist might not",
        body: `Dr. Bhuvanesswari has often been watching her patients' dental development since infancy. She knows which teeth came through early, which were lost too soon, what habits (thumb-sucking, tongue-thrust) may have affected the bite, and what the jaw looks like across multiple years — not just today.\n\nThis context matters enormously for aligner planning. A treatment planned with that full picture is different from one planned by someone seeing the child's teeth for the first time.`,
      },
      {
        heading: "What aligners can and cannot do in children",
        body: `Clear aligners move teeth. They are excellent for straightening individual teeth, closing gaps and correcting mild to moderate bite issues. They cannot reshape the jaw itself — that's a different kind of treatment.\n\nFor some children, a phase of early treatment (interceptive orthodontics) — which may or may not include aligners — is the right first step. For others, waiting until most adult teeth are through and then using aligners is the right approach. For some, a combination of both.\n\nDr. Bhuvanesswari will tell you honestly which category your child is in, and what waiting would mean if you choose not to act now.`,
      },
      {
        heading: "Practical considerations for children",
        body: `Clear aligners require compliance — the child needs to wear them for 20–22 hours a day, removing them only for eating, brushing and sports. This means they are generally not the right choice for very young children who may lose them, forget to put them back, or not understand the need to keep them in.\n\nFor most children, aligners become practical from around age 8–10, depending on maturity. Dr. Bhuvanesswari will assess this at the consultation.\n\nThe practical benefits for children and teenagers: no metal in the mouth, no food restrictions, easy to brush, and almost invisible at school.`,
      },
    ],
  },
  {
    type:           "guide",
    id:             "helping-anxious-child-at-dentist",
    slug:           "helping-anxious-child-at-dentist",
    title:          "How to help your anxious child at the dentist",
    metaDescription:"Dental anxiety is common in children — and in parents. Here is what actually helps before, during and after the visit.",
    publishedAt:    "2025-10-27",
    readingTime:    "5 min",
    relatedService: "/services/gentle-dentistry-sedation",
    approved:       true,
    sections: [
      {
        body: `Dental anxiety in children is extremely common — and it's not always because of a bad experience. Some children are anxious the very first time, simply because of the unfamiliarity, the sounds, the lights, or the sensation of someone working in their mouth. Others become anxious after a difficult experience elsewhere.\n\nAs a parent, your instinct is to reassure. Some reassurances help. Some actually make things worse. Here's what the evidence and experience say.`,
      },
      {
        heading: "Before the visit",
        body: `• Talk about it simply and positively. "We're going to see the dentist — she's going to count your teeth and make sure they're healthy." Keep it short. The more detail you add, the more questions a child will have, and the more opportunity for anxiety to build.\n\n• Avoid certain words. "It won't hurt" is the most well-intentioned thing that can actually increase anxiety — it introduces the idea of pain before the child was thinking about it. Similarly: "There won't be any injections," "It's not scary." Focus on what will happen, not on what won't.\n\n• Show them the clinic beforehand. The photos on this website are there for exactly this reason. A child who has seen the room, the chair and the doctor's face is walking into somewhere familiar, not somewhere unknown.\n\n• Don't promise rewards for bravery before the visit. This turns the visit into a test — "will I be brave enough?" — which adds pressure. Praise and celebrate after, not before.\n\n• Book the right time. A rested, fed child handles the visit much better than a tired or hungry one. Avoid nap time for young children.`,
      },
      {
        heading: "At the clinic",
        body: `• Stay calm yourself. Children read parents' emotions with extraordinary accuracy. If you are visibly anxious, they will be anxious. Keeping your own body language relaxed — even when you feel worried inside — genuinely helps.\n\n• Share your concerns with the doctor, not in front of your child. If you're worried about how your child will respond, tell Dr. Bhuvanesswari before the appointment starts, or note it in the booking form. She can plan around it. Discussing it in front of your child gives them something to be anxious about.\n\n• Let the doctor lead. Dr. Bhuvanesswari uses Tell-Show-Do — she explains what she's going to do, shows the child the instrument, then does it. This pacing, and this approach to managing surprise, is more effective than a parent trying to manage the child's reaction in real time.`,
      },
      {
        heading: "What if your child has already had a bad experience?",
        body: `This is one of the most common situations — a child who has cried, refused, or had a genuinely difficult visit somewhere else.\n\nTell us in the booking form. Dr. Bhuvanesswari will plan the first visit as a pure settling-in appointment — no treatment, just meeting, looking around, and sitting in the chair. For some children, it takes two or three visits before any treatment starts. That's completely fine. The goal is for each visit to be slightly easier than the last.\n\nLaughing gas (nitrous oxide) is also an option for children who need extra help feeling calm, after a clinical assessment. It's not used for every anxious child — but for children who are genuinely struggling, it can turn a difficult visit into a manageable one.`,
      },
      {
        heading: "What definitely doesn't help",
        body: `• Using the dentist as a threat ("If you don't brush, the dentist will hurt you"). This is the single most effective way to create dental anxiety that lasts into adulthood.\n\n• Dragging a child in when they're genuinely distressed and pushing through the treatment anyway. For very young children, this can create a fear response that is hard to undo.\n\n• Saying "almost done" repeatedly when it isn't. Children know.`,
      },
      {
        heading: "The bigger picture",
        body: `Dental anxiety in childhood predicts dental avoidance in adulthood. Adults who haven't seen a dentist in years almost always have a memory from childhood that explains it.\n\nThe single most important thing you can do for your child's long-term dental health is make sure the early visits feel safe. That doesn't mean the visits need to be perfect — a few tears or wriggles are completely normal. It means the child leaves feeling okay about coming back.`,
      },
    ],
  },
];

export default blogPosts;
