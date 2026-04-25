export const primaryNavigation = [
  { label: "Mission", href: "/#mission" },
  { label: "Programs", href: "/#programs" },
  { label: "Timeline", href: "/#timeline" },
  { label: "Proof", href: "/#proof" },
  { label: "Hermes", href: "/#hermes" },
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

export const homepageStats = [
  { value: "200+", label: "plant varieties growing today" },
  { value: "1.5", label: "acres in Paso de Guayabo" },
  { value: "5+", label: "years of boots-on-the-ground work" },
  { value: "$0", label: "tuition for accepted students" },
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
}

export const timelineEntries: TimelineEntry[] = [
  {
    season: "Season 1",
    year: "2020",
    status: "past",
    title: "The land. The idea. The leap.",
    tagline: "Completely degraded soil. Pure vision.",
    body: "Volunteers from Seattle's Culture Shock program arrived in Paso de Guayabo and rented 1.5 acres that could barely support life. Soil restoration started anyway.",
    highlights: [
      "1.5 acres secured",
      "Soil restoration begun",
      "Volunteer network formed across three countries",
    ],
    photo: "",
    photoAlt: "Season 1 land preparation in Paso de Guayabo",
  },
  {
    season: "Season 2",
    year: "2021-2022",
    status: "past",
    title: "Community. Proof. Momentum.",
    tagline: "The neighborhood showed up. We listened.",
    body: "The founder lived full-time in the community. Local children started arriving to plant, learn, and spend time on the site. Trust and proof of concept grew together.",
    highlights: [
      "Community relationships built",
      "15 to 20 local children engaged weekly",
      "Early plants established and language classes launched",
    ],
    photo: "",
    photoAlt: "Season 2 community work and early garden growth",
  },
  {
    season: "Season 3",
    year: "2023-2025",
    status: "current",
    title: "200 plants. AI layer. Hinge moment.",
    tagline: "The food forest is alive. Now we finish the school.",
    body: "The site crossed 200 plant varieties. Syntropic agriculture is working. Hermes is being brought online to support grants, reporting, and operations while fundraising pushes the next build phase forward.",
    highlights: [
      "200+ plant varieties growing",
      "$25K season fundraise in motion",
      "Hermes operations layer connected",
      "Grant applications in progress",
    ],
    photo: "",
    photoAlt: "Season 3 food forest growth",
  },
  {
    season: "Season 4",
    year: "2025-2026",
    status: "future",
    title: "School doors open.",
    tagline: "Five students. Real curriculum. Real change.",
    body: "The learning center opens to its first student cohort, blending local youth participation with Culture Shock students from Seattle. Hermes supports the reporting and operational layer.",
    highlights: [
      "Learning center operational",
      "First Culture Shock cohort onboarded",
      "Hermes live for reporting and follow-through",
      "Earn-while-you-learn stipends activated",
    ],
    photo: "",
    photoAlt: "Season 4 opening day plan",
  },
  {
    season: "Season 5",
    year: "2026-2027",
    status: "future",
    title: "Scale. Replicate. Train the trainers.",
    tagline: "A model that can travel.",
    body: "Graduates bring skills home. The food forest feeds more of the school. Revenue diversifies through seeds, plants, oils, tours, and creative work tied back to the mission.",
    highlights: [
      "Toward 50% food self-sufficiency on site",
      "More diversified revenue streams",
      "Replication playbook documented",
      "Quarterly art and story-based fundraising",
    ],
    photo: "",
    photoAlt: "Season 5 scale phase",
  },
  {
    season: "Season 6",
    year: "2027-2030",
    status: "future",
    title: "Own the land. Expand the network.",
    tagline: "A durable model, not a one-off.",
    body: "The long-term goal is land ownership or a next-site build, paired with deeper food self-sufficiency and a network of programs that can fund and teach themselves with more resilience.",
    highlights: [
      "Toward 85% food self-sufficiency",
      "Property acquisition decision",
      "Global replication network",
      "B-Corp social ventures supporting mission work",
    ],
    photo: "",
    photoAlt: "Season 6 full vision",
  },
] as const

export const clarityCards = [
  {
    title: "What this is",
    body: "A nonprofit school-in-public that teaches young people the four things every human needs: food, water, energy, and shelter.",
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
      "See the six-season build path",
      "Review what students actually learn",
      "Choose how to support the next milestone",
    ],
  },
] as const

export const programCards = [
  {
    title: "Culture Shock Program",
    eyebrow: "Seattle to Puerto Vallarta",
    body: "A youth pathway that blends life skills, second-language acquisition, travel, and community work so students become capable in unfamiliar environments.",
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
      "200+ plants, trees, herbs, and flowers",
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
  },
  {
    quote:
      "Supporters connected to the Puerto Vallarta site describe the work as real, visible, and worth expanding with the right backing.",
    person: "Community supporter",
  },
  {
    quote:
      "Early program feedback keeps returning to the same point: the curriculum feels practical, creative, and grounded in lived experience.",
    person: "Volunteer-era testimonial summary",
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
