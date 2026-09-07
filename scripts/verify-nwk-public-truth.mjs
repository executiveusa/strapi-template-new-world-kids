import fs from "node:fs"

const files = {
  hero: "apps/ui/src/components/homepage/NonprofitHero.tsx",
  pathway: "apps/ui/src/components/homepage/PathwaySection.tsx",
  homepage: "apps/ui/src/components/homepage/Homepage.tsx",
  metadata: "apps/ui/src/app/[locale]/(homepage)/page.tsx",
  mission: "apps/ui/src/app/[locale]/mission/page.tsx",
  footer: "apps/ui/src/components/site/SiteFooter.tsx",
  donation: "apps/ui/src/content/donation.ts",
  operating: "apps/ui/src/components/homepage/First12OperatingLayer.tsx",
  proof: "apps/ui/src/components/homepage/ProofOfWorkFeed.tsx",
}

const sources = Object.fromEntries(Object.entries(files).map(([key, file]) => [key, fs.readFileSync(file, "utf8")]))
const publicSources = ["hero", "pathway", "metadata", "operating", "proof"]

for (const claim of ["12 paid opportunities", "one-on-one mentorship", "12 oportunidades pagadas", "mentoría uno a uno", "Culture Shock", "core four", "Food, Water, Energy, and Shelter"]) {
  for (const name of publicSources) {
    if (sources[name].includes(claim)) throw new Error(`${name} contains forbidden public-story language: ${claim}`)
  }
}

const requiredTruth = [
  ["hero", "Help turn interest into opportunity."],
  ["pathway", "We are matching 12 local participants with mentors for a pilot program."],
  ["pathway", "Match interest to paid opportunity."],
  ["pathway", "What success looks like"],
  ["pathway", "Ongoing support and planning for long-term goals."],
  ["metadata", "The First 12: real work, mentors, and a clear next step in Seattle."],
  ["proof", "not presented as proof of Seattle outcomes"],
  ["footer", "Humanitarian Social Innovations"],
  ["donation", "https://fundrazr.com/nwkids.org"],
]

for (const [name, token] of requiredTruth) {
  if (!sources[name].includes(token)) throw new Error(`${name} is missing required truth token: ${token}`)
}

for (const token of ["<NonprofitHero />", "<PathwaySection />", "<First12OperatingLayer locale={locale} />"]) {
  if (!sources.homepage.includes(token)) throw new Error(`homepage is missing approved composition: ${token}`)
}
for (const token of ["<SupportSection", "<StickyDonateMobile"]) {
  if (sources.homepage.includes(token)) throw new Error(`removed homepage surface was restored: ${token}`)
}
if (!sources.mission.includes("notFound()")) throw new Error("Public /mission route must remain unavailable")

console.log("NWK public truth verification passed: current First 12 story, provenance, fiscal sponsor, donation and public-route boundaries remain intact.")
