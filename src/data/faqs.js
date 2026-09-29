/**
 * faqs.js — Homepage + First Visit FAQs.
 *
 * Source: narrative.md §11 #13 (First Visit & FAQ section).
 * Each FAQ is tagged with the persona it primarily serves so components
 * can filter or group them if needed.
 * All copy follows narrative.md §10 tone rules and §12 avoid list.
 */

export const faqs = [
  {
    id:      "what-is-pediatric-dentist",
    q:       "What is a pediatric dentist, and why not our family dentist?",
    personas: ["first-time", "referral"],
    a: `A pediatric dentist (pedodontist) has completed an MDS — three years of postgraduate training beyond general dentistry — focused specifically on children's dental disease, how teeth and jaws grow, and how to manage children's fears and behaviour during treatment.

Dr. Bhuvanesswari's training and her years in pediatric practice mean she approaches your child differently from a general dentist: she adjusts her language, pace and technique to your child's age and temperament, and she monitors how their teeth and jaw are developing over time, not just what needs fixing today.`,
  },
  {
    id:      "when-first-visit",
    q:       "When should my child first see a dentist?",
    personas: ["first-time"],
    a: `By the first birthday, or within six months of the first tooth appearing — whichever comes first. This is the guidance from the American Academy of Pediatric Dentistry (AAPD), which Dr. Bhuvanesswari's approach follows.

If your child is older and has never seen a dentist, that is fine — come now. There is no judgement, only a plan for what to do from here.`,
  },
  {
    id:      "baby-teeth-worth-treating",
    q:       "Are baby teeth worth treating if they'll fall out anyway?",
    personas: ["worried"],
    a: `Yes. Baby teeth are not just temporary placeholders. They hold space for adult teeth, help your child chew and speak clearly, and some stay in place until age 10–12. An untreated cavity in a baby tooth can become painful quickly, spread to neighbouring teeth, and even damage the adult tooth forming underneath it.

Treating a cavity in a baby tooth early is almost always simpler, less uncomfortable and less expensive than dealing with it after it has progressed.`,
  },
  {
    id:      "root-canal-cap-what-will-it-be-like",
    q:       "My child needs a root canal or cap. What will it be like?",
    personas: ["worried"],
    a: `Root canal treatment for children's teeth (called pulp therapy) is not the same experience as an adult root canal. Dr. Bhuvanesswari explains everything before it happens — to you and to your child, in simple words. Your child can sit on your lap or stay close to you throughout.

Many parents who arrive worried find that the child handled it much better than expected. The reviews on this clinic reflect that consistently. Laughing gas is available if your child needs extra help feeling calm, after a clinical assessment.`,
  },
  {
    id:      "scared-child",
    q:       "My child is very scared. What will you do?",
    personas: ["anxious"],
    a: `Start by not rushing anything. Dr. Bhuvanesswari uses Tell-Show-Do: she tells your child what is going to happen in simple words, shows them the instrument or step, and then does it — so nothing comes as a surprise. The visit is paced by your child.

Some children need two or three visits just to feel comfortable before any treatment starts, and that is completely fine. A few tears or wriggles are normal; the team is used to it and there is no pressure. Parents are always welcome to stay in the room.`,
  },
  {
    id:      "laughing-gas-safe",
    q:       "What is laughing gas, and is it safe for children?",
    personas: ["anxious"],
    a: `Laughing gas (nitrous oxide) is breathed through a small, comfortable nose mask. It makes your child feel calm and relaxed while staying completely awake — they can hear you, respond to the doctor and follow instructions throughout. The effect wears off within a few minutes of removing the mask.

It has been used in pediatric dentistry for decades and has a strong safety record. Dr. Bhuvanesswari assesses each child individually before recommending it — it is not used for every anxious child, only when it will genuinely help. She will explain what your child will feel before it is used.`,
  },
  {
    id:      "special-healthcare-needs",
    q:       "Do you see children with special healthcare needs?",
    personas: ["special-needs"],
    a: `Yes. Dr. Bhuvanesswari has experience with children who need extra time, a modified environment, or care planned around their medical history and developmental needs.

Please share as much as you can in the "Tell us about your child" field when you book — triggers, sensitivities to sound or light, what helps, what doesn't, a comfort object, your child's communication style. The more we know, the better we can prepare. Dr. Bhuvanesswari reviews every note before the appointment.`,
  },
  {
    id:      "aligners-what-age",
    q:       "What age can my child get aligners?",
    personas: ["aligners"],
    a: `Clear aligners are available for children of any age who clinically need them — not only teenagers. The right time depends on your child's dental development and what kind of movement is needed, not a fixed number.

Dr. Bhuvanesswari will assess your child and tell you whether now is the right time, or whether it makes sense to wait and what to watch for in the meantime.`,
  },
  {
    id:      "aligners-vs-braces",
    q:       "How do clear aligners work, and how are they different from braces?",
    personas: ["aligners"],
    a: `Aligners are a series of clear, custom-made removable trays. Each tray is worn for about one to two weeks, then replaced with the next one in the series, gradually moving the teeth into the planned position. They are removed for eating, brushing and sports.

Braces are fixed metal brackets bonded to the teeth, adjusted at regular visits. They are often more effective for complex movements but are more visible and require more care around eating and cleaning.

Dr. Bhuvanesswari will tell you which option is right for your child's specific situation at the aligner consultation.`,
  },
  {
    id:      "adults-treated",
    q:       "Do you treat adults?",
    personas: ["referral"],
    a: `No. Chutti's Dental & Wellness Center is dedicated to children from birth to 18. Every part of the clinic — the interiors, the approach, the training — is designed for children. We do not treat adults.`,
  },
  {
    id:      "tooth-knocked-out",
    q:       "My child's tooth got knocked out or broken. What should I do?",
    personas: ["urgent"],
    a: `Act quickly and WhatsApp or call for a same-day appointment.

If it is a permanent tooth: pick it up by the crown (white part), not the root. Do not scrub it. Store it in cold milk or gently in the child's cheek, and come immediately — time matters.

If it is a baby tooth: do not put it back in (this can damage the adult tooth underneath). Apply gentle pressure if the gum is bleeding. Bring the tooth with you.

If there is also a head injury, facial swelling with fever, or difficulty breathing or swallowing, go to the nearest hospital emergency first.`,
  },
  {
    id:      "same-day-appointment",
    q:       "Can I get a same-day appointment?",
    personas: ["urgent", "referral"],
    a: `Yes — for dental injuries and sudden toothache, WhatsApp or call us for a same-day appointment. Same-day slots are arranged through WhatsApp or phone, not through the online booking form (which is for planned visits).`,
  },
  {
    id:      "stay-with-child",
    q:       "Can I stay with my child during treatment?",
    personas: ["anxious"],
    a: `Yes. Parents are welcome in the treatment room throughout. For young children, Dr. Bhuvanesswari often works with the child sitting on the parent's lap. She will let you know if she ever needs you to step back briefly for a specific reason, but in general, your presence is encouraged.`,
  },
  {
    id:      "payment-modes",
    q:       "What payment options do you accept?",
    personas: ["referral"],
    // Payment modes from siteConfig — listed here only, nowhere else on the site.
    a: `We accept UPI, card payments and cash.`,
  },
  {
    id:      "location-timings",
    q:       "Where are you and what are your timings?",
    personas: ["referral"],
    a: `Chutti's Dental & Wellness Center is at Plot No 1A, Gandhi Nagar 5th Street, West Anna Nagar, Pallikaranai, Chennai, Tamil Nadu 600100. A useful landmark is near DAV School, Pallikaranai.

We are open all days — including weekends and public holidays — from 11 AM to 8 PM, by appointment.`,
  },
];

export default faqs;
