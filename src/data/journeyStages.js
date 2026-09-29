/**
 * journeyStages.js — The four Chutti Express train stops (Birth to 18 journey).
 *
 * Source: narrative.md §11 #4 (Birth to 18 timeline).
 * Used in the TrainJourney component (B6 in build-spec.md).
 * treatment chips link to the relevant treatment's anchor on its service page.
 */

export const journeyStages = [
  {
    id:               "babies",
    label:            "Babies",
    ageRange:         "Birth – 12 months",
    carriageIndex:    0,                     // Which carriage in the train (0 = first after engine)
    passengerAsset:   "train-passengers-babies",
    stopAsset:        "journey-stop-babies",
    color:            "blush",               // Card accent colour
    summary:
      "The first tooth changes everything. A dental home before the first birthday sets up a lifetime of healthy habits — and means we are watching from the very beginning.",
    carePoints: [
      "First dental visit by the first birthday (or within 6 months of the first tooth)",
      "Guidance on cleaning new teeth, fluoride, feeding and diet",
      "Cavity-risk assessment even before teeth come through",
      "A dental home from day one — the same doctor, from here to 18",
    ],
    chips: [
      { label: "Infant oral-health assessment", href: "/services/preventive-care#infant-oral-health" },
      { label: "First dental visit", href: "/services/preventive-care#dental-home" },
      { label: "Cavity-risk check", href: "/services/preventive-care#caries-risk-assessment" },
    ],
  },
  {
    id:               "toddlers",
    label:            "Toddlers",
    ageRange:         "1–3 years",
    carriageIndex:    1,
    passengerAsset:   "train-passengers-toddlers",
    stopAsset:        "journey-stop-toddlers",
    color:            "leaf-mint",
    summary:
      "Toddlers are curious about everything — including the dentist, when it is introduced gently. Early visits build confidence so the first filling (if it ever happens) is not the first time your child sits in a dental chair.",
    carePoints: [
      "Regular check-ups every 6 months (or as the cavity-risk plan recommends)",
      "Cavity-risk assessment and prevention plan",
      "Guidance on brushing, fluoride toothpaste amounts, and diet",
      "Habit guidance — thumb-sucking, pacifiers",
      "Gentle first treatments if needed, paced to your toddler",
    ],
    chips: [
      { label: "Cavity-risk check", href: "/services/preventive-care#caries-risk-assessment" },
      { label: "Habit guidance", href: "/services/early-orthodontics#habit-correction" },
      { label: "Fluoride application", href: "/services/preventive-care#fluoride-therapy" },
    ],
  },
  {
    id:               "kids",
    label:            "Kids",
    ageRange:         "4–12 years",
    carriageIndex:    2,
    passengerAsset:   "train-passengers-kids",
    stopAsset:        "journey-stop-kids",      // Reuses svc-gentle-bear-mirror.png (T2 asset)
    color:            "sky-mist",
    summary:
      "The school years bring mixed teeth, more independence — and more questions. Sealants, space maintainers, growth monitoring and early orthodontic guidance all happen here, alongside any treatment that is needed.",
    carePoints: [
      "Sealants on permanent molars as they come through",
      "Fillings, tooth caps and pulp therapy if needed",
      "Space maintainers if a baby tooth is lost early",
      "Growth and bite monitoring",
      "Early orthodontic guidance if needed",
      "Clear aligners for children who clinically need them",
      "Behaviour guidance and laughing gas for anxious children",
    ],
    chips: [
      { label: "Sealants", href: "/services/preventive-care#sealants" },
      { label: "Space maintainers", href: "/services/early-orthodontics#space-maintainers" },
      { label: "Growth monitoring", href: "/services/early-orthodontics#growth-monitoring" },
      { label: "Clear aligners", href: "/services/clear-aligners" },
    ],
  },
  {
    id:               "teens",
    label:            "Teens",
    ageRange:         "13–18 years",
    carriageIndex:    3,
    passengerAsset:   "train-passengers-teens",
    stopAsset:        "journey-stop-teens",     // Reuses aligners-teen-giraffe.png (T1 asset)
    color:            "sun-yellow",
    summary:
      "Teens have their own conversation with their doctor — not a modified version of what their parents hear. Prevention continues, and for many teens, aligners are the next step.",
    carePoints: [
      "Exclusive Teen Clinic — teens involved in their own treatment decisions",
      "Clear aligners (Invisalign) for teens at the right stage",
      "Continued prevention — check-ups, fluoride, professional cleaning",
      "Wisdom-tooth monitoring",
      "Dental care for teens with special healthcare needs",
    ],
    chips: [
      { label: "Clear aligners for teens", href: "/services/clear-aligners" },
      { label: "Exclusive Teen Clinic", href: "/services/clear-aligners#exclusive-teen-clinic" },
      { label: "Preventive care", href: "/services/preventive-care" },
    ],
  },
];

export default journeyStages;
