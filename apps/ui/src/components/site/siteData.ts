export const primaryNavigation = [
  { label: "Mission", href: "/#mission" },
  { label: "Timeline", href: "/#timeline" },
  { label: "Programs", href: "/#programs" },
  { label: "Proof", href: "/#proof" },
  { label: "Hermes", href: "/#hermes" },
  { label: "Operations", href: "/ops" },
] as const

export const siteLinks = {
  donate: "/donate",
  dashboard: "https://pauli-hermes-agent-web.vercel.app",
  email: "mailto:info@nwkids.org",
  infoEmail: "info@nwkids.org",
  facebook: "https://www.facebook.com/nwkidsorg",
  instagram: "https://www.instagram.com/proyectoindigoazul/",
  linkedin: "https://www.linkedin.com/company/nwkids/",
  youtube: "https://www.youtube.com/@proyectoindigoazul",
} as const

export const socialLinks = [
  { label: "Instagram", href: siteLinks.instagram, key: "instagram" },
  { label: "Facebook", href: siteLinks.facebook, key: "facebook" },
  { label: "LinkedIn", href: siteLinks.linkedin, key: "linkedin" },
  { label: "YouTube", href: siteLinks.youtube, key: "youtube" },
  { label: "Email", href: siteLinks.email, key: "email" },
] as const

export type VerificationStatus = "confirmed" | "needs-review" | "planned"

export const verificationLabels: Record<VerificationStatus, string> = {
  confirmed: "Confirmed",
  "needs-review": "Needs proof",
  planned: "Planned",
} as const

export const heroFeatureCards = [
  {
    eyebrow: "What visitors should understand fast",
    title: "This is a school-in-public, not a pitch deck.",
    body: "The strongest version of the site tells people what exists today, what is being built next, and why the work matters in daily life.",
    bullets: [
      "Real land, real curriculum, real local relationships",
      "Practical work first, abstractions second",
      "Public-facing copy designed to reduce guesswork",
    ],
  },
  {
    eyebrow: "Seth-guided brand question",
    title: "Who are we helping students become?",
    body: "More self-sufficient. More bilingual. More rooted. More trusted with responsibility. That question should shape every headline, program description, and donation ask.",
  },
  {
    eyebrow: "Backend posture",
    title: "Hermes supports the operations layer.",
    body: "The frontend can stay simple and zero-secret while Hermes handles reporting, grant work, and future automation behind the scenes.",
  },
] as const

export const heroFactStrip = [
  {
    label: "What is live now",
    value: "Public homepage, donate flow, Hermes status",
  },
  {
    label: "What needs proof",
    value: "Photos, attributed testimonials, exact seasonal metrics",
  },
  {
    label: "What this page should do",
    value: "Explain the mission fast, then move people to timeline or donate",
  },
] as const

export const heroMedia = {
  src: "",
  alt: "New World Kids archive photography placeholder",
  caption: "Hero image slot ready for the first confirmed field photo.",
  status: "needs-review" as VerificationStatus,
} as const

export const homepageStats = [
  {
    value: "200+",
    label: "plant varieties growing on site",
    status: "confirmed" as VerificationStatus,
  },
  {
    value: "1.5",
    label: "acres in Paso de Guayabo, Puerto Vallarta",
    status: "confirmed" as VerificationStatus,
  },
  {
    value: "5+",
    label: "years of continuous operation",
    status: "confirmed" as VerificationStatus,
  },
  {
    value: "$0",
    label: "cost to every student, always",
    status: "confirmed" as VerificationStatus,
  },
  {
    value: "15-20",
    label: "local children engaged weekly",
    status: "confirmed" as VerificationStatus,
  },
] as const

export type TimelineEntry = {
  season: string
  year: string
  status: "past" | "current" | "future"
  title: string
  tagline: string
  body: string
  highlights: string[]
  photo: string
  photoAlt?: string
  sourceStatus: VerificationStatus
  imageStatus: VerificationStatus
  sourceNote: string
}

export const timelineEntries: TimelineEntry[] = [
  // TODO: Replace with real NWKids photos from Google Drive
  {
    season: "Season 1",
    year: "2020-2021",
    status: "past",
    title: "Land restoration",
    tagline: "Soil first. Systems second.",
    body: "We started with land repair so food, water, energy, and shelter could be taught on real ground.",
    highlights: [
      "1.5 acres secured",
      "Soil restoration started",
      "First planting cycles completed",
    ],
    photo: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400",
    sourceStatus: "confirmed",
    imageStatus: "planned",
    sourceNote: "Placeholder image",
  },
  // TODO: Replace with real NWKids photos from Google Drive
  {
    season: "Season 2",
    year: "2021-2022",
    status: "past",
    title: "Community roots",
    tagline: "Families started showing up every week.",
    body: "Local participation turned the site from an idea into a routine community learning space.",
    highlights: [
      "Weekly community sessions",
      "Youth participation increased",
      "Water systems piloted",
    ],
    photo: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400",
    sourceStatus: "confirmed",
    imageStatus: "planned",
    sourceNote: "Placeholder image",
  },
  // TODO: Replace with real NWKids photos from Google Drive
  {
    season: "Season 3",
    year: "2023-2024",
    status: "past",
    title: "Food forest thriving",
    tagline: "Biodiversity and consistency took hold.",
    body: "The farm matured into a dependable teaching site with strong biodiversity and recurring youth learning.",
    highlights: [
      "200+ plant varieties",
      "Soilless agriculture active",
      "Volunteer network stabilized",
    ],
    photo: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400",
    sourceStatus: "confirmed",
    imageStatus: "planned",
    sourceNote: "Placeholder image",
  },
  // TODO: Replace with real NWKids photos from Google Drive
  {
    season: "Season 4",
    year: "2024-2025",
    status: "past",
    title: "Infrastructure + school",
    tagline: "Built the base for structured programs.",
    body: "We built systems and learning infrastructure to host regular education and operating workflows.",
    highlights: [
      "Learning spaces upgraded",
      "Program structure formalized",
      "Trust reporting improved",
    ],
    photo: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=400",
    sourceStatus: "confirmed",
    imageStatus: "planned",
    sourceNote: "Placeholder image",
  },
  // TODO: Replace with real NWKids photos from Google Drive
  {
    season: "Season 5",
    year: "2025-2026",
    status: "current",
    title: "Programs + AI operations",
    tagline: "Education + Hermes operations running together.",
    body: "This season connects direct youth programming with the Hermes operations layer for proof, grants, and continuity.",
    highlights: [
      "Active youth programs",
      "Agent operations online",
      "Public proof cadence live",
    ],
    photo:
      "https://plus.unsplash.com/premium_photo-1673264933212-d78737f38e48?w=400",
    sourceStatus: "confirmed",
    imageStatus: "planned",
    sourceNote: "Placeholder image",
  },
  // TODO: Replace with real NWKids photos from Google Drive
  {
    season: "Season 6",
    year: "2027-2030",
    status: "future",
    title: "Scale + land ownership",
    tagline: "From one site to a durable model.",
    body: "We plan to secure long-term land and expand the model without losing hands-on quality.",
    highlights: [
      "Land ownership path",
      "Program replication",
      "Long-horizon financial resilience",
    ],
    photo:
      "https://plus.unsplash.com/premium_photo-1711434824963-ca894373272e?w=400",
    sourceStatus: "planned",
    imageStatus: "planned",
    sourceNote: "Future target",
  },
] as const

export const clarityCards = [
  {
    title: "What this is",
    body: "If a young person walks through our gate, they leave knowing how to grow food, filter water, generate power, and build shelter. Not theory. Not a workshop. Hands in the dirt, every week, for free.",
    bullets: [
      "Hands-on, not theory-first",
      "Built around a real food forest in Puerto Vallarta",
      "Designed to stay readable in one fast scan",
    ],
  },
  {
    title: "Who it helps",
    body: "Young people who need practical skills, cultural grounding, and a path into useful work instead of more abstract promises.",
    bullets: [
      "Local children in Paso de Guayabo",
      "Culture Shock students from Seattle",
      "Supporters who want visible, concrete outcomes",
    ],
  },
  {
    title: "What to do next",
    body: "Start with the timeline, then the programs, then donate or partner if the work feels like a promise worth backing.",
    bullets: [
      "See the six-season path before you read deeper",
      "Review what students actually learn",
      "Choose how to support the next milestone",
    ],
  },
] as const

export const programCards = [
  {
    title: "Culture Shock Program",
    eyebrow: "Seattle to Puerto Vallarta",
    body: "5 young adults, 18-25, earn-while-you-learn stipends, international travel, second language acquisition. Not a training program — a real job.",
    bullets: [
      "Small-group language and cultural immersion",
      "Earn-while-you-learn stipends",
      "Real application in Mexico, not a classroom simulation",
    ],
  },
  {
    title: "Proyecto Indigo Azul",
    eyebrow: "The living classroom",
    body: "Our 1.5-acre food forest and regenerative learning site where students practice soil restoration, water capture, off-grid systems, and natural building.",
    bullets: [
      "1.5 acres. 200+ plant species. 15-20 local children weekly. Free. No exceptions.",
      "Syntropic agriculture and low-water methods",
      "Designed to become 85% food self-sufficient over time",
    ],
  },
  {
    title: "Media and AI Revenue Studio",
    eyebrow: "Earned revenue for free education",
    body: "Design, media, and AI services help fund tuition-free programming so support does not rely on one funding source alone.",
    bullets: [
      "Creative services that produce cash flow",
      "Hermes-backed grant and operations support",
      "A model built for resilience, not dependence",
    ],
  },
] as const

export const trustSignals = [
  {
    title: "Concrete promise",
    body: "We do not promise vague transformation. We promise usable skills that help young people grow food, save water, generate energy, and build shelter.",
  },
  {
    title: "Public proof",
    body: "The site, the timeline, the budget framing, and the Hermes status feed all point back to one rule: show the work, then ask for trust.",
  },
  {
    title: "Funding clarity",
    body: "Programs stay free to students while revenue, grants, and donor support cover the operating load behind the scenes.",
  },
] as const

export const testimonialCards = [
  {
    quote:
      "Parents who were skeptical about another youth program changed their minds when they saw students engage differently here.",
    person: "Parent feedback from Everett",
    status: "needs-review" as VerificationStatus,
  },
  {
    quote:
      "We don't have polished testimonials yet. We have 5 years of showing up, 200 plant varieties growing, and kids who come back every week because they want to. The proof is in the soil.",
    person: "Community supporter",
    status: "needs-review" as VerificationStatus,
  },
  {
    quote:
      "Early program feedback keeps returning to the same point: the curriculum feels practical, creative, and grounded in lived experience.",
    person: "Volunteer-era testimonial summary",
    status: "needs-review" as VerificationStatus,
  },
] as const

export const dataPriorities = [
  {
    title: "Resolve sponsor language",
    body: "Pick one legal public wording for the fiscal sponsor and donation recipient.",
  },
  {
    title: "Upload seasonal photos",
    body: "We need confirmed images for Seasons 1 through 3 before the timeline can feel fully proven.",
  },
  {
    title: "Replace summary testimonials",
    body: "Swap the current summary cards for attributed quotes with names, roles, and permission status.",
  },
] as const

export const actionCards = [
  {
    title: "Donate",
    body: "Help finish the next build phase so the first student cohort can walk into a site that already works.",
    href: siteLinks.donate,
    variant: "internal",
  },
  {
    title: "Partner",
    body: "If you can offer funding, tools, curriculum, or aligned services, start with a direct conversation instead of a form maze.",
    href: siteLinks.email,
    variant: "external",
  },
  {
    title: "Track Hermes",
    body: "See the agent layer that supports grants, reporting, content, and operational follow-through behind the public site.",
    href: siteLinks.dashboard,
    variant: "external",
  },
] as const

export const hermesPrinciples = [
  "Help people become more capable, not more dependent.",
  "Make a real promise and keep it, especially when it is hard.",
  "Optimize for trust and consistency, not noise or novelty.",
  "Create stories worth sharing by doing work that people can point to.",
] as const
