/**
 * services.js — All 8 service pages.
 *
 * Source: narrative.md §11 Services table + §4 care list + §10 glossary.
 * Rules: use "Caries-Risk Assessment (CRA)" never "CAMBRA"; plain-language
 * term first, clinical term alongside; no words from narrative.md §12 avoid list.
 * Every treatment gets its own heading with an anchor id so menus and chips
 * can deep-link to it (e.g. /services/preventive-care#sealants).
 */

export const services = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Preventive & Early Dental Care
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug:               "preventive-care",
    menuLabel:          "Preventive Care",
    title:              "Preventive & Early Dental Care",
    navGroup:           "services",
    headerIllustration: "svc-healthy-panda",
    headerTint:         "leaf-mint",
    intro:
      "The best dental treatment is the one your child never needs. Starting early — ideally before the first birthday — means we can keep teeth healthy from the beginning, not just repair them when something goes wrong.",
    treatments: [
      {
        id:       "infant-oral-health",
        heading:  "Infant oral-health assessment",
        ages:     "Birth – 12 months",
        what:
          "A gentle check of your baby's mouth, gums and any emerging teeth, along with guidance on feeding, cleaning and what to expect as more teeth come through.",
        why:
          "The first year sets the foundation. Habits like night feeds, how you clean new teeth and your baby's fluoride exposure all shape their cavity risk before they even have a full mouth of teeth.",
        expect:
          "Your baby can stay on your lap throughout. The visit is brief and unhurried — mostly a look and a chat with you about what you're seeing at home.",
      },
      {
        id:       "dental-home",
        heading:  "First dental visit and dental home setup",
        ages:     "By the first birthday",
        what:
          "The AAPD recommends a dental visit by the first birthday or within six months of the first tooth. This visit sets up your child's dental home — one practice, one doctor, consistent care across all of childhood.",
        why:
          "Children who visit the dentist early are less likely to need complex treatment later. A dental home means your child is never starting over with a stranger when something goes wrong.",
        expect:
          "A relaxed introduction, a gentle check, and a clear plan for how often to come back based on your child's individual risk.",
      },
      {
        id:       "caries-risk-assessment",
        heading:  "Cavity-risk check (Caries-Risk Assessment, CRA)",
        ages:     "All ages",
        what:
          "A structured look at how likely your child is to develop cavities, based on their age, teeth, brushing habits, diet, fluoride use, and medical or developmental factors. Every child's risk is different, so every prevention plan is different.",
        why:
          "A child who eats well, brushes well and has naturally strong enamel needs a different plan than one with a history of cavities. The CRA makes the plan specific rather than generic.",
        expect:
          "A short assessment built into the check-up. Dr. Bhuvanesswari goes through the findings with you and explains exactly what the plan covers.",
      },
      {
        id:       "fluoride-therapy",
        heading:  "Fluoride application to strengthen enamel",
        ages:     "All ages, frequency based on cavity risk",
        what:
          "A professional fluoride varnish or gel applied to the teeth at the check-up. Quick and comfortable — it sets in a few minutes.",
        why:
          "Fluoride strengthens tooth enamel and makes it more resistant to the acids that cause cavities. Professional application gives higher concentration than toothpaste alone, especially useful for children at higher risk.",
        expect:
          "Done in the same visit as the check-up. No special preparation needed; your child can eat and drink normally after a short wait.",
      },
      {
        id:       "sealants",
        heading:  "Protective coating on back teeth (pit-and-fissure sealants)",
        ages:     "Usually ages 6–14, as permanent molars come through",
        what:
          "A thin protective coating applied to the grooves on the biting surface of the back teeth. The grooves are natural traps for food and bacteria; the sealant seals them off.",
        why:
          "Most cavities in children form in these grooves. Sealants reduce that risk significantly without removing any tooth structure.",
        expect:
          "Painless and quick — no local anaesthesia needed. The tooth is cleaned, the sealant is applied and set with a small light, and it's done.",
      },
    ],
    faqs: [
      {
        q: "When should my child first see a dentist?",
        a: "By the first birthday, or within six months of the first tooth appearing — whichever comes first. Earlier is better, even if everything looks fine. Children who start early are less anxious about dental visits and less likely to need complex treatment later.",
      },
      {
        q: "My child is three and has never seen a dentist. Is it too late to start?",
        a: "Not at all. Older children who have never seen a dentist are welcome at any age. The first visit will include a gentle check, a cavity-risk assessment, and a catch-up plan. There is no judgement — only a plan for what to do from here.",
      },
      {
        q: "Does my child really need fluoride if we already use fluoride toothpaste?",
        a: "Professional fluoride application uses a higher concentration than toothpaste and is applied directly to the teeth, where it stays. For children at moderate or higher cavity risk, it makes a real difference on top of daily brushing.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Fillings, Crowns & Tooth-Saving Care
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug:               "fillings-crowns-root-canal",
    menuLabel:          "Fillings, Crowns & Root Canal",
    title:              "Fillings, Crowns & Tooth-Saving Care",
    navGroup:           "services",
    headerIllustration: "svc-gentle-bear-mirror",
    headerTint:         "sky-mist",
    intro:
      "When a cavity reaches a tooth, treating it early and conservatively saves the most natural tooth structure. Baby teeth matter — they hold space, help with chewing and speech, and affect how the adult teeth come through.",
    treatments: [
      {
        id:       "minimally-invasive-dentistry",
        heading:  "Treating early and conservatively (Minimally Invasive Dentistry, MID)",
        ages:     "All ages",
        what:
          "An approach that removes only what is damaged and preserves as much healthy tooth as possible. This may include early-stage treatments that stop a cavity before it becomes a filling, and filling materials that bond to the tooth rather than requiring large preparations.",
        why:
          "The less natural tooth structure removed, the stronger the tooth stays over time. Catching cavities early also means simpler, more comfortable treatment.",
        expect:
          "Dr. Bhuvanesswari will explain what she sees and why she is recommending the level of treatment she is. No treatment is done without explaining it first.",
      },
      {
        id:       "fillings",
        heading:  "Tooth-coloured fillings (pediatric restorations)",
        ages:     "All ages",
        what:
          "A composite (tooth-coloured) material that replaces the damaged part of a tooth after a cavity is cleaned out. It bonds directly to the tooth and blends in.",
        why:
          "Filling a cavity in a baby tooth is worth it — baby teeth are not just temporary. They hold the space for adult teeth, help your child chew and speak, and are present until age 10–12 for some teeth.",
        expect:
          "Dr. Bhuvanesswari uses behaviour guidance to help your child feel settled before and during treatment. The visit is paced to your child's comfort.",
      },
      {
        id:       "pediatric-crowns",
        heading:  "Tooth caps for children (pediatric crowns)",
        ages:     "All ages",
        what:
          "When a tooth is too damaged for a simple filling, a crown (tooth cap) covers and protects the whole tooth. Pediatric crowns are designed to fit children's smaller teeth and stay in place until the baby tooth falls out naturally.",
        why:
          "A crown restores the function of the tooth and prevents further breakdown, which can affect the child's ability to chew and the health of neighbouring teeth.",
        expect:
          "Usually done in one appointment. The process is explained step by step in simple words before anything is done. Parents are welcome to stay.",
      },
      {
        id:       "pulp-therapy",
        heading:  "Root canal treatment for children's teeth (pulp therapy)",
        ages:     "All ages",
        what:
          "When a cavity reaches the nerve of the tooth (the pulp), pulp therapy cleans the affected tissue and seals the tooth to prevent infection, usually followed by a crown. This is the children's equivalent of what adults call a root canal.",
        why:
          "Many parents are surprised to hear a baby tooth needs this treatment. But a deep infection in a baby tooth can damage the adult tooth forming underneath it. Treating it keeps the space, prevents pain, and protects the adult tooth.",
        expect:
          "Dr. Bhuvanesswari explains every step to you and your child before starting. The parent review on this clinic that parents mention most often describes exactly this treatment — the child was comfortable, the parent was guided throughout. Laughing gas is available if your child needs extra help staying calm.",
      },
    ],
    faqs: [
      {
        q: "Are baby teeth worth treating if they'll fall out anyway?",
        a: "Yes. Baby teeth are not just temporary — they hold the space for adult teeth, help with chewing and clear speech, and some stay until age 10 or 12. An untreated cavity in a baby tooth can become painful, spread to neighbouring teeth, and even affect the adult tooth developing underneath it.",
      },
      {
        q: "My child needs a root canal. What will it be like?",
        a: "Pulp therapy in children is not the same experience as a root canal in adults. Dr. Bhuvanesswari explains what she will do, step by step, before anything happens. Your child can sit on your lap or you can stay close. Laughing gas is available if your child needs extra help feeling calm. Many parents who come in worried leave relieved — the child handled it much better than expected.",
      },
      {
        q: "What if my child won't open their mouth or cooperate?",
        a: "This is normal, especially for a first treatment visit. Behaviour guidance — including Tell-Show-Do, where the doctor explains and shows everything before doing it — helps most children settle in. The visit is paced to your child, never rushed. If your child needs more support, laughing gas is an option after a clinical assessment.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Growth, Habits & Early Orthodontics
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug:               "early-orthodontics",
    menuLabel:          "Early Orthodontics",
    title:              "Growth, Habits & Early Orthodontics",
    navGroup:           "services",
    headerIllustration: "svc-growth-elephant",
    headerTint:         "blush",
    intro:
      "A child's jaw and bite develop continuously from infancy through the teen years. Watching how they grow — and acting at the right time — can prevent bigger problems later and often reduces the complexity of any treatment needed.",
    treatments: [
      {
        id:       "growth-monitoring",
        heading:  "Growth and development monitoring",
        ages:     "All ages",
        what:
          "At every check-up, Dr. Bhuvanesswari assesses how your child's teeth and jaw are developing: whether adult teeth are coming through on schedule, whether the bite looks right, and whether there are any early signs that growth needs guidance.",
        why:
          "Problems caught early are almost always simpler to treat. A child seen regularly has a doctor who already knows their dental history when something needs attention.",
        expect:
          "Part of the regular check-up — no separate appointment needed. Dr. Bhuvanesswari will tell you what she sees and whether anything needs to be watched or acted on.",
      },
      {
        id:       "space-maintainers",
        heading:  "Holding space for adult teeth (space maintainers)",
        ages:     "Usually ages 4–10",
        what:
          "A small appliance that holds the gap left when a baby tooth is lost early, so the adult tooth has room to come through in the right position.",
        why:
          "When a baby tooth is lost before its time — from a cavity, an injury, or early extraction — the neighbouring teeth can drift into the space. A space maintainer prevents this and avoids more complex orthodontic treatment later.",
        expect:
          "Fitted in one or two visits. Dr. Bhuvanesswari will explain whether one is needed and what it will look like.",
      },
      {
        id:       "habit-correction",
        heading:  "Help with thumb-sucking, tongue-thrusting and similar habits",
        ages:     "Usually ages 3–8 depending on the habit",
        what:
          "Habits like thumb-sucking, pacifier use beyond age 3–4, and tongue-thrusting can affect how the jaw grows and how the teeth meet. Early guidance — and when needed, a simple appliance — can redirect growth before it becomes a bigger problem.",
        why:
          "The jaw is still forming. Most habits resolve on their own, but prolonged or strong habits can shift the bite in ways that are harder to correct later.",
        expect:
          "A gentle, non-judgemental conversation with you and your child. Dr. Bhuvanesswari explains what she sees, whether it is a concern at this age, and what options look like if action is needed.",
      },
      {
        id:       "interceptive-orthodontics",
        heading:  "Guiding jaw and teeth growth early (interceptive orthodontics)",
        ages:     "Usually ages 6–10, while the jaw is still growing",
        what:
          "Targeted treatment during the growing years to guide the jaw into a better position or create space for adult teeth — before problems become bigger. This may involve removable appliances, expanders, or space management, depending on what is needed.",
        why:
          "Interceptive treatment does not always eliminate the need for braces later, but it can shorten and simplify that treatment considerably, and in some cases it is the most effective moment to act.",
        expect:
          "Dr. Bhuvanesswari will explain whether your child would benefit from interceptive treatment, what the options are, and what doing nothing would mean. There is no pressure; the decision is made with you.",
      },
      {
        id:       "clear-aligners-summary",
        heading:  "Clear aligners — Invisalign for children and teens",
        ages:     "Children of any age who clinically need them",
        what:
          "Clear, removable trays that gradually move teeth into a better position, without metal braces. Available for children of any age who clinically need them, planned around how the child is growing.",
        why:
          "A pediatric dentist who has watched your child's teeth develop since early childhood is ideally placed to decide when aligners are right and what approach fits their stage of growth.",
        expect:
          "A separate aligner consultation covers the options, timing, what to expect and how long treatment takes. See the Clear Aligners page for more.",
        linkTo:   "/services/clear-aligners",
      },
    ],
    faqs: [
      {
        q: "At what age should I bring my child for an orthodontic check?",
        a: "If you notice teeth coming through crooked, a bite that doesn't look right, or a persistent habit like thumb-sucking past age 4, bring it up at the next check-up. Dr. Bhuvanesswari monitors growth at every visit and will tell you if she sees something that needs attention or early action.",
      },
      {
        q: "Will my child definitely need braces later?",
        a: "Not necessarily. Early monitoring and interceptive treatment can reduce or eliminate the need for braces in some children. In others, some later treatment is still needed, but it is shorter and simpler because of what was done early. Dr. Bhuvanesswari will give you an honest picture of what she sees.",
      },
      {
        q: "My child sucks their thumb. Should I be worried?",
        a: "Thumb-sucking is normal and most children stop on their own by age 3–4. If the habit continues past that, or if it is strong and frequent, it can affect how the jaw grows. Bring it up at the check-up — Dr. Bhuvanesswari will tell you whether it is something to watch or act on.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Dental Injuries & Emergency Care
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug:               "dental-emergencies",
    menuLabel:          "Dental Emergencies",
    title:              "Dental Injuries & Emergency Care",
    navGroup:           "services",
    headerIllustration: "emergency-lion-cub",
    headerTint:         "sun-yellow",
    intro:
      "Falls, chips and knocked-out teeth happen. If your child has a dental injury or sudden toothache, WhatsApp us for a same-day appointment. The steps you take in the first few minutes can matter — here is what to do.",
    treatments: [
      {
        id:       "dental-trauma",
        heading:  "Dental trauma management",
        ages:     "All ages",
        what:
          "Assessment and treatment of injuries to the teeth, gums and jaw — from a small chip to a tooth knocked completely out. Treatment depends on the type of injury, which teeth are involved (baby or permanent), and how quickly the child is seen.",
        why:
          "Dental injuries are more common than most parents expect, especially in the toddler and school years. Quick action — and knowing what to do in the first few minutes — can make a significant difference to the outcome.",
        expect:
          "WhatsApp or call for a same-day appointment. Dr. Bhuvanesswari will assess the injury, explain what has happened and what the options are, and plan treatment based on the specific situation.",
      },
      {
        id:       "first-aid-knocked-out-permanent",
        heading:  "Knocked-out permanent tooth — first-aid steps",
        ages:     "School age and older",
        what: null,
        steps: [
          "Pick up the tooth by the crown (the white part), not the root.",
          "Do not scrub or rinse the root.",
          "If the tooth is dirty, rinse it gently in milk or the child's saliva — not tap water.",
          "Store it in a small cup of cold milk or ask your child to hold it gently between the cheek and gum (only if they are calm and old enough not to swallow it).",
          "Come immediately — time is critical. WhatsApp or call on the way.",
        ],
        why:
          "A permanent tooth knocked out completely can sometimes be replanted successfully if you act quickly and handle it correctly. Every minute matters.",
        expect: null,
      },
      {
        id:       "first-aid-knocked-out-baby",
        heading:  "Knocked-out baby tooth — first-aid steps",
        ages:     "Toddlers and young children",
        what:
          "A knocked-out baby tooth should not be put back into the socket — doing so can damage the adult tooth forming underneath. Keep the tooth, keep calm, and contact us.",
        steps: [
          "Do not put the tooth back in.",
          "Apply gentle pressure to the gum with a clean cloth if it is bleeding.",
          "Keep the tooth and bring it with you — the dentist will examine it.",
          "WhatsApp or call for a same-day appointment.",
        ],
        why:   null,
        expect: null,
      },
      {
        id:       "first-aid-chipped",
        heading:  "Chipped or broken tooth — first-aid steps",
        ages:     "All ages",
        steps: [
          "Save the broken piece if you can find it.",
          "Rinse your child's mouth gently with water.",
          "Apply a cold compress to the outside of the face if there is swelling.",
          "WhatsApp or call for a same-day appointment.",
        ],
        what:   null,
        why:    null,
        expect: null,
      },
      {
        id:       "sudden-toothache",
        heading:  "Sudden toothache or dental pain",
        ages:     "All ages",
        what:
          "A toothache that comes on suddenly, or pain that is getting worse, needs to be seen. Do not wait for a routine appointment.",
        steps: [
          "Give age-appropriate pain relief (paracetamol or ibuprofen) as directed on the packaging.",
          "Do not place aspirin directly on the gum.",
          "WhatsApp or call for a same-day appointment.",
        ],
        why:    null,
        expect: null,
      },
    ],
    emergencyNote:
      "If your child has facial swelling with a fever, difficulty breathing or swallowing, or if the injury also involved a head injury, go to the nearest hospital emergency first.",
    faqs: [
      {
        q: "Can I get a same-day appointment for a dental emergency?",
        a: "Yes — for dental injuries and sudden toothache, WhatsApp us for a same-day appointment. Same-day appointments are arranged through WhatsApp or by calling; the online booking form is for planned visits.",
      },
      {
        q: "My child has knocked out a tooth. What do I do right now?",
        a: "If it is a permanent tooth: pick it up by the crown (not the root), do not scrub it, store it in cold milk or the child's cheek, and come immediately. If it is a baby tooth: do not put it back in — apply gentle pressure if the gum is bleeding, and WhatsApp or call for a same-day appointment.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Gentle Dentistry & Sedation
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug:               "gentle-dentistry-sedation",
    menuLabel:          "Gentle Dentistry & Sedation",
    title:              "Gentle Dentistry & Sedation",
    navGroup:           "services",
    headerIllustration: "svc-gentle-turtle",
    headerTint:         "leaf-mint",
    intro:
      "Every child responds differently to dental treatment — some are fine from the first visit, others take a few visits to feel settled. The goal is for your child to leave with a better relationship with dentistry than when they arrived.",
    treatments: [
      {
        id:       "behaviour-guidance",
        heading:  "Behaviour guidance — Tell-Show-Do",
        ages:     "All ages",
        what:
          "Behaviour guidance covers the age-appropriate, gentle ways the team helps children feel safe during treatment. The core method is Tell-Show-Do: the doctor tells your child what is going to happen in simple words, shows them the instrument or step, and then does it — so nothing is a surprise. No child is rushed. A few tears or wriggles are normal and the team is used to it.",
        why:
          "Children who understand what is happening are less anxious. Each visit where the child feels safe makes the next one easier. The aim is less fear with every appointment, not just getting through the current one.",
        expect:
          "Parents are welcome to stay in the treatment room throughout. Dr. Bhuvanesswari involves your child directly — explaining to them, not just to you — so they feel like a participant, not just a patient.",
      },
      {
        id:       "laughing-gas",
        heading:  "Laughing gas, in-house (nitrous oxide sedation)",
        ages:     "Assessed individually; suitable for most ages",
        what:
          "Laughing gas (nitrous oxide) is breathed through a small, comfortable nose mask. It helps an anxious child feel calm and relaxed while staying completely awake and aware. It is not a general anaesthetic — your child can respond to instructions throughout the appointment. The effect wears off within a few minutes of removing the mask.",
        why:
          "For children who need more than behaviour guidance alone — whether from anxiety, a difficult experience elsewhere, or a longer procedure — laughing gas makes treatment safe and manageable without the risks of deeper sedation.",
        expect:
          "Used only after clinical assessment — not every child who is nervous needs it. Dr. Bhuvanesswari will discuss it with you first, explain what your child will experience, and answer your questions. The equipment is in-house, so there is no referral needed.",
        importantNote:
          "Laughing gas helps an anxious child feel calm while staying awake and relaxed. It is not a sleep medication. General anaesthesia is not offered at this clinic.",
      },
      {
        id:       "special-needs-brief",
        heading:  "Children with special healthcare needs",
        ages:     "All ages",
        what:
          "Dr. Bhuvanesswari has experience with children who need extra time, a modified environment, or care planned around medical and developmental needs. Every child is treated with dignity and the plan is built around their specific needs.",
        why:    null,
        expect:
          "See the Special Needs Dental Care page for more, including how to share information about your child before the visit.",
        linkTo: "/services/special-needs-dentistry",
      },
    ],
    faqs: [
      {
        q: "My child had a bad experience at another dentist and is now very scared. What will you do?",
        a: "This is one of the most common situations we see. Dr. Bhuvanesswari starts by listening — to you and to your child. She explains what she is going to do before doing anything, and the pace of the visit is set by your child, not a schedule. Some children need two or three visits just to get comfortable with the environment before any treatment happens. That is completely fine.",
      },
      {
        q: "What is laughing gas and is it safe for children?",
        a: "Laughing gas (nitrous oxide) is breathed through a small nose mask. It makes your child feel calm and relaxed while staying fully awake. The effect wears off within a few minutes. It has been used in pediatric dentistry for decades and is considered very safe. Dr. Bhuvanesswari assesses each child before recommending it — it is not used routinely, only when it will genuinely help.",
      },
      {
        q: "Can I stay with my child during treatment?",
        a: "Yes. Parents are always welcome in the treatment room. Dr. Bhuvanesswari will involve you in what is happening and let you know if she ever needs to ask you to step back briefly for a specific reason.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. Special Needs Dental Care
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug:               "special-needs-dentistry",
    menuLabel:          "Special Needs Dentistry",
    title:              "Special Needs Dental Care",
    navGroup:           "services",
    headerIllustration: "svc-special-needs-elephant",
    headerTint:         "sky-mist",
    intro:
      "Every child deserves dental care that fits them. Dr. Bhuvanesswari has experience working with children who need extra time, a modified environment, or care planned around their medical history and developmental needs.",
    treatments: [
      {
        id:       "special-needs-care",
        heading:  "Individualised care for children with special healthcare needs",
        ages:     "All ages",
        what:
          "Dental care planned around each child's specific medical, developmental and sensory needs. This may include longer appointments, a modified environment (adjusted lighting, reduced noise, familiar comfort objects), the option for a parent or carer to be closely involved throughout, and a treatment plan built around what the child can manage on a given day.",
        why:
          "Dental care can be more challenging for children with conditions that affect their sensory processing, behaviour, communication, or medical needs — and it is often more important, because some medications and conditions increase the risk of dental problems. Tailored care makes it possible.",
        expect:
          "Tell us about your child before the visit. The more we know — triggers, sensitivities, what helps, favourite items, communication preferences — the better we can prepare. Dr. Bhuvanesswari will review this and plan the visit around it.",
      },
      {
        id:       "tell-us-about-your-child",
        heading:  "Tell us about your child before the visit",
        ages:     "All ages",
        what:
          "The booking form has a \"Tell us about your child\" field. Use it to share anything that will help the visit go better: your child's triggers, sensitivities to sound or light, whether they need time to settle before anything happens, their communication style, a comfort toy or object, or anything from a previous dental visit that went well or didn't.",
        why:
          "A parent knows their child best. Information shared ahead of the visit means the team is prepared from the moment your child walks in — not learning on the day.",
        expect:
          "Dr. Bhuvanesswari reviews every note before the appointment. If she has questions or wants to speak with you before the visit, she will reach out.",
      },
    ],
    faqs: [
      {
        q: "Do you see children with special healthcare needs?",
        a: "Yes. Dr. Bhuvanesswari has experience with children who need extra time, a modified environment, or care adapted to their medical and developmental needs. Please share as much detail as you can in the \"Tell us about your child\" field when booking — it genuinely changes how we prepare.",
      },
      {
        q: "My child has sensory sensitivities. How do you handle that?",
        a: "Tell us before the visit. We can adjust the lighting, reduce sounds, allow extra settling time, keep a comfort toy nearby, and move through the visit at your child's pace. The team follows your lead and your child's.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. Laser Dentistry & Frenectomy
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug:               "laser-dentistry",
    menuLabel:          "Laser Dentistry",
    title:              "Laser Dentistry & Frenectomy",
    navGroup:           "services",
    headerIllustration: "svc-laser-firefly",
    headerTint:         "sky-mist",
    intro:
      "Laser dentistry allows certain procedures to be done with greater precision and often less discomfort than conventional methods. At Chutti's, laser is used for selected procedures where it is clinically the better choice.",
    treatments: [
      {
        id:       "laser-assisted",
        heading:  "Laser-assisted dental procedures",
        ages:     "All ages",
        what:
          "Laser technology can be used for specific soft-tissue procedures and selected restorative work where it reduces bleeding, speeds healing or improves precision. Dr. Bhuvanesswari uses laser for selected procedures where it offers a clinical benefit — not as a marketing feature.",
        why:
          "For some procedures, laser reduces the need for local anaesthesia, causes less bleeding, and means faster healing. For children who are anxious about needles or sensitive to the drill, this can make a real difference.",
        expect:
          "Dr. Bhuvanesswari will explain when laser is the right choice for your child's specific procedure and what the visit will involve.",
      },
      {
        id:       "frenectomy",
        heading:  "Tongue-tie and lip-tie release (laser frenectomy)",
        ages:     "Infants and older children, based on clinical need",
        what:
          "A frenectomy is the release of a tight or short frenum — the small piece of tissue that connects the tongue to the floor of the mouth (tongue-tie) or the upper lip to the gum (lip-tie). Laser frenectomy does this with precision and minimal bleeding.",
        why:
          "A tight tongue-tie in infants can affect breastfeeding. In older children, it can affect speech, dental hygiene or how the teeth meet. Treatment is based on clinical findings and functional concerns — each case is assessed individually.",
        expect:
          "Not every tight frenum needs treatment. Dr. Bhuvanesswari evaluates the frenum, its function and the clinical indication before recommending a frenectomy. The procedure itself is brief and recovery is typically quick.",
        importantNote:
          "Treatment is evaluated individually based on clinical findings and functional concerns. No specific improvements to feeding, speech or sleep can be promised.",
      },
    ],
    faqs: [
      {
        q: "My baby has a tongue-tie. Does it need to be released?",
        a: "Not always. A tongue-tie is only treated when it is causing a real functional problem — affecting breastfeeding, speech, or dental health. Dr. Bhuvanesswari will assess whether the frenum is clinically tight, whether it is causing the difficulties you are describing, and whether release is the right option. She will be honest if it is not.",
      },
      {
        q: "What is laser dentistry and is it safe for children?",
        a: "Dental laser is a focused beam of light used for selected soft-tissue and hard-tissue procedures. It is safe and well-established in pediatric dentistry. Dr. Bhuvanesswari uses it where it offers a genuine clinical benefit — reduced bleeding, more precision, faster healing — not for every procedure.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. Clear Aligners for Kids & Teens
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug:               "clear-aligners",
    menuLabel:          "Aligners",
    title:              "Clear Aligners for Kids & Teens",
    navGroup:           "aligners",              // Appears directly in header nav, not under Services
    headerIllustration: "aligners-teen-giraffe",
    headerTint:         "sun-yellow",
    intro:
      "Clear, removable aligners that gradually straighten teeth, planned by someone who has watched your child's teeth grow. Available for children of any age who clinically need them — not only teenagers.",
    signatureLines: [
      "Straighter smiles, planned by someone who has watched them grow.",
      "The right treatment, at the right age — from early guidance to clear aligners.",
    ],
    treatments: [
      {
        id:       "why-pediatric-specialist",
        heading:  "Why a pediatric specialist for your child's aligners",
        ages:     "All ages",
        what:
          "Timing matters in a growing mouth. A pediatric dentist monitors jaw development and tooth position from early childhood, so she knows when a child will benefit from aligners and what approach fits their stage of growth. Aligners are available for children of any age who clinically need them — not only teenagers.",
        why:
          "Habits like thumb-sucking, tongue-thrust and early tooth loss all affect alignment. Dr. Bhuvanesswari sees these because she has often been caring for the child's teeth all along. There is no starting over with a stranger.",
        expect:
          "A dedicated aligner consultation that covers the options, the right timing, what to expect, and how long treatment typically takes.",
      },
      {
        id:       "how-aligners-work",
        heading:  "How clear aligners work",
        ages:     "All ages",
        what:
          "A series of clear, custom-made removable trays, each worn for one to two weeks, gradually moving the teeth into the planned position. No metal brackets or wires. Easy to remove for eating, brushing and school.",
        why:
          "Children who can manage a removable appliance often do well with aligners. They are discreet, comfortable and straightforward to keep clean.",
        expect:
          "The number of trays — and how long treatment takes — depends on how much movement is needed. Dr. Bhuvanesswari will give you a clear picture of the plan at the consultation.",
      },
      {
        id:       "invisalign-provider",
        heading:  "Invisalign provider",
        ages:     "All ages",
        what:
          "Chutti's Dental is an Invisalign provider, offering the Invisalign system for children and teens of any age who clinically need it.",
        why:   null,
        expect: null,
      },
      {
        id:       "exclusive-teen-clinic",
        heading:  "Exclusive Teen Clinic",
        ages:     "13–18",
        what:
          "The Exclusive Teen Clinic is Dr. Bhuvanesswari's name for her approach to caring for teenage patients. Teens are spoken to directly, involved in decisions about their own treatment, and never talked down to. This runs in the same clinic, in the same hours — not a separate facility or separate timings.",
        why:
          "A 15-year-old needs a different conversation than a 5-year-old. Clear aligners for teens are planned around their stage of dental development, lifestyle and compliance.",
        expect: null,
      },
    ],
    importantNotes: [],
    faqs: [
      {
        q: "What age can my child get aligners?",
        a: "Clear aligners are available for children of any age who clinically need them — not only teenagers. The right age depends on the child's dental development, not a fixed number. Dr. Bhuvanesswari will assess your child and tell you whether now is the right time, or whether it is better to wait and what to watch for.",
      },
      {
        q: "How are clear aligners different from braces?",
        a: "Aligners are clear, removable trays — no metal brackets or wires. Your child takes them out for eating, brushing and sports. They are discreet and easy to live with at school. Braces are fixed and often more efficient for certain complex movements. Dr. Bhuvanesswari will tell you which is the better option for your child's specific situation.",
      },
      {
        q: "Why should I come here for aligners instead of a regular orthodontist?",
        a: "A pediatric dentist who has followed your child's dental development already knows their history — their bite, their habits, any early losses, how their jaw is growing. That context shapes the aligner plan. There is no starting over, and the plan is grounded in the full picture, not just the teeth as they look today.",
      },
    ],
  },
];

export default services;
