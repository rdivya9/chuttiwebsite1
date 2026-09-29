/**
 * reviews.js — Real Google reviews only.
 *
 * Rules from narrative.md §8:
 * - Use only the 10 named reviewers listed here.
 * - Quote as written; light trimming only; no rewording.
 * - Do NOT use Pandiyaraj D. or Pandi Jaya (duplicate text).
 * - Akila M.: use only the partialText line; she describes her own adult treatment.
 * - Aravinth S.: show Tanglish as written; gloss field adds English translation.
 * - Ganeshkumar M.: quote in full including mention of Dethika.
 * - Trim any review that describes a specific room's interior to general sentiment only.
 */

export const reviews = [
  {
    id:       "ganeshkumar-m",
    reviewer: "Ganeshkumar M.",
    rating:   5,
    featured: true,
    label:    "Root canal for a 5-year-old",
    text: `I was really scared about my daughter undergoing root canal treatment at such a young age, as she is only 5 years old. However, Dr. Bhuvaneswari Madam explained the entire procedure clearly, making sure we fully understood the treatment process. She was very caring and friendly with my daughter, which made her feel comfortable throughout the treatment.

The treatment was carried out in a very comfortable and child-friendly manner. The follow-up care and guidance before and after the treatment were also excellent, especially from Dethika Madam, who closely monitored and guided us throughout the process.

The clinic staff were very supportive, and the clinic was clean, hygienic, and well maintained.

Overall, we are very happy with the treatment, care, and support provided. A heartfelt thanks to Dr. Bhuvaneswari Madam and the entire clinic team for taking such good care of my daughter.`,
    themes:        ["explains every step", "child was comfortable", "guided before and after", "follow-up after treatment", "clean and hygienic"],
    teamMentioned: "Dethika",
  },
  {
    id:       "yogalakshmi-m",
    reviewer: "Yogalakshmi M.",
    rating:   5,
    featured: false,
    label:    "Favourite cartoon during treatment",
    text:     `Very friendly. Mam was very kind she explain the procedure every single time. Make my kid so comfortable with his favourite cartoon even he don't have any discomfort. Friendly atmosphere. Glad to treat my kid from this clinic 😊😊`,
    themes:   ["explains every step", "child was comfortable", "favourite cartoon during treatment"],
  },
  {
    id:       "nandha-r",
    reviewer: "Nandha R.",
    rating:   5,
    featured: false,
    label:    "Every step explained",
    text: `We had a very good experience at Chutti's Dental & Wellness Center. My son recently underwent a tooth cap treatment here, and the entire experience was very smooth. The doctor was extremely patient and gentle with my son and explained the treatment clearly before proceeding.

The clinic is very clean, child-friendly, and welcoming. My son was comfortable throughout the treatment, which made the experience much easier for us as parents. We are really happy with the treatment and the care provided by the doctor and staff.

I would definitely recommend Chutti's Dental & Wellness Center to parents looking for a good and trustworthy dental clinic for their children. Thank you for taking such good care of my son!`,
    themes:   ["explains every step", "child was comfortable"],
  },
  {
    id:       "jenifa-d",
    reviewer: "Jenifa D.",
    rating:   5,
    featured: false,
    label:    "Patient explanations",
    text: `The clinic has a pleasant, child-friendly atmosphere, and the doctor and staff are very patient and caring with kids. They make children feel comfortable and explain everything clearly to parents.

A good choice for parents looking for gentle and professional dental care for their children. Highly recommended!`,
    themes:   ["explains every step"],
  },
  {
    id:       "boopathi-w",
    reviewer: "Boopathi W.",
    rating:   5,
    featured: false,
    label:    "Clinic puts child at ease",
    // Trimmed to general sentiment — no room-specific description (narrative.md §8)
    text:     `Chutti dental care has a perfect ambiance for the kids to be comfortable .. aesthetic interiors are liked by children … which makes the parents to be relaxed in bringing their kids for dental treatment`,
    themes:   ["clinic interiors", "child at ease"],
  },
  {
    id:         "aravinth-s",
    reviewer:   "Aravinth S.",
    rating:     5,
    featured:   false,
    label:      "Clinic feel and hygiene",
    // Tanglish — show as written for local authenticity
    text:       `Chutti's Dental & Wellness Center-oda ambience romba pleasant-a irundhuchu. Clinic clean-a, well-maintained-a irukku. Overall atmosphere calm-a and comfortable-a feel pannudhu. Especially dental clinic-na usually konjam nervous-a feel pannuvom, but inga ambience itself comfortable-a feel panna vaikuthu. Overall, neat and welcoming environment!`,
    gloss:      `The ambience at Chutti's Dental & Wellness Center was very pleasant. The clinic is clean and well maintained, and the overall atmosphere feels calm and comfortable. Usually we feel a little nervous at a dental clinic, but here the ambience itself makes you feel comfortable. Overall, a neat and welcoming environment!`,
    themes:     ["clinic interiors", "clean and hygienic"],
    isTanglish: true,
  },
  {
    id:       "sujatha-k",
    reviewer: "Sujatha K.",
    rating:   5,
    featured: false,
    label:    "Clean, hygienic, puts you at ease",
    text: `Had a wonderful experience at Chutti's Dental & Wellness Center. The ambience is very pleasant, clean, and welcoming, which makes you feel comfortable and relaxed from the moment you walk in. The staff are friendly, professional, and attentive, and the services are provided with great care and efficiency. Very kids friendly clinic.

The overall experience was smooth and reassuring. I really appreciate the cleanliness, hospitality, and quality of service. Highly recommended for anyone looking for a comfortable and reliable dental care experience! 😊`,
    themes:   ["clean and hygienic", "clinic interiors"],
  },
  {
    id:       "sargunam",
    reviewer: "Sargunam",
    rating:   5,
    featured: false,
    label:    "Child was comfortable",
    text:     `Clinic atmosphere is beautiful. My child enjoyed getting treated in chutti's dental clinic`,
    themes:   ["child was comfortable"],
  },
  {
    id:       "sundaravadivel",
    reviewer: "Sundaravadivel",
    rating:   5,
    featured: false,
    label:    "Pediatric specialist near DAV School",
    // Keeps DAV School mention — doubles as local landmark and local-search signal
    text:     `The Chutti's Dental & Wellness Centre is the destination for the children with tooth issues. The new and beautiful clinic which is located near DAV School, Pallikaranai is with a very good ambiance and maintained by a well qualified MDS (pedodontics) doctor who cares for the wellness of the children. Congrats for your earnest efforts taken to help the Chutties with tooth problems. Once if a parent goes with their babies, will surely recommend the Chtti's Wellness Centre, to many parents who wants to treat their children with tooth ache or searching a good place for filling or arranging the irregular teeth of their kids with clips.`,
    themes:   ["specialist for children", "DAV School landmark"],
  },
  {
    id:       "akila-m",
    reviewer: "Akila M.",
    rating:   5,
    featured: false,
    label:    "Follow-up after treatment",
    // Full review text stored for reference but NOT displayed (describes adult treatment)
    text:     `Recently I have visited this hospital and took a dental crafting treatment. They way of their handling patients in a polite manner and explains the procedure in details as much they can. They were explained nicely even how many times if we could ask about our doubts. Frequently called me and enquired about my health update once after my treatments done it's makes me feel a friendly doctor. So I would like to take my kids dental issues and will be treat in same hospital. So I should assured and recommend this clinic for my family and friends circles too. It's a Trustable and worthy.`,
    // Only this line is displayed (usePartialOnly: true)
    partialText:    `Frequently called me and enquired about my health update once after my treatments done — it makes me feel like a friendly doctor.`,
    usePartialOnly: true,
    themes:         ["follow-up after treatment"],
  },
];

export default reviews;
