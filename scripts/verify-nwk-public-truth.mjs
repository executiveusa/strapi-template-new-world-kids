import fs from "node:fs"

const files = {
  hero: "apps/ui/src/components/homepage/NonprofitHero.tsx",
  pathway: "apps/ui/src/components/homepage/PathwaySection.tsx",
  support: "apps/ui/src/components/homepage/SupportSection.tsx",
  metadata: "apps/ui/src/app/[locale]/(homepage)/page.tsx",
  mission: "apps/ui/src/app/[locale]/mission/page.tsx",
  footer: "apps/ui/src/components/site/SiteFooter.tsx",
  donation: "apps/ui/src/content/donation.ts",
}

const read = (file) => fs.readFileSync(file, "utf8")
const sources = Object.fromEntries(Object.entries(files).map(([key, file]) => [key, read(file)]))

const forbiddenPublicClaims = [
  "12 paid opportunities",
  "one-on-one mentorship",
  "12 oportunidades pagadas",
  "mentoría uno a uno",
]

for (const claim of forbiddenPublicClaims) {
  for (const [name, source] of Object.entries({
    hero: sources.hero,
    pathway: sources.pathway,
    metadata: sources.metadata,
    support: sources.support,
  })) {
    if (source.includes(claim)) {
      throw new Error(`${name} contains an unverified public claim: ${claim}`)
    }
  }
}

const forbiddenLegacyStory = ["Culture Shock", "core four", "Food, Water, Energy, and Shelter"]
for (const token of forbiddenLegacyStory) {
  for (const [name, source] of Object.entries({
    hero: sources.hero,
    pathway: sources.pathway,
    metadata: sources.metadata,
    support: sources.support,
  })) {
    if (source.includes(token)) {
      throw new Error(`${name} contains legacy public-story language: ${token}`)
    }
  }
}

const requiredTruth = [
  ["hero", "Help turn interest into opportunity."],
  ["pathway", "We are securing the projects and mentors before we fill the cohort."],
  ["pathway", "projects being built now"],
  ["pathway", "Earned income where applicable"],
  ["support", "participant compensation"],
  ["metadata", "is building the First 12 in Seattle"],
  ["footer", "Humanitarian Social Innovations"],
  ["donation", "https://fundrazr.com/nwkids.org"],
]

for (const [sourceName, token] of requiredTruth) {
  if (!sources[sourceName].includes(token)) {
    throw new Error(`${sourceName} is missing required truth token: ${token}`)
  }
}

if (!sources.mission.includes("notFound()")) {
  throw new Error("Public /mission route must remain unavailable to public visitors")
}

console.log("NWK public truth verification passed: First 12 claims, fiscal sponsor, FundRazr, and public-route boundary are locked.")
