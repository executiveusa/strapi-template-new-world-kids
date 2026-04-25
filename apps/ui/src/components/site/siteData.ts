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

export const homepageStats = [
  { value: "200+", label: "plant varieties growing today" },
  { value: "1.5", label: "acres in Paso de Guayabo" },
  { value: "5+", label: "years of boots-on-the-ground work" },
  { value: "$0", label: "tuition for accepted students" },
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
