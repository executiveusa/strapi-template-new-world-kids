import fs from "node:fs"

const required = [
  ["Built for Good", "Technology", "Tecnología"],
  ["Beyond the Game", "Sports", "Deportes"],
  ["Ground Up", "Urban Gardening + Food Systems", "Jardinería urbana + sistemas alimentarios"],
  ["Make Your Mark", "Art", "Arte"],
]

const surfaces = [
  "apps/ui/src/components/homepage/PathwaySection.tsx",
  "apps/ui/src/app/[locale]/projects/page.tsx",
]

for (const file of surfaces) {
  const source = fs.readFileSync(file, "utf8")
  for (const [name, englishCategory, spanishCategory] of required) {
    for (const token of [name, englishCategory, spanishCategory]) {
      if (!source.includes(token)) {
        throw new Error(`${file} is missing required pathway token: ${token}`)
      }
    }
  }
}

for (const file of [
  "apps/ui/src/components/site/SiteHeader.tsx",
  "apps/ui/src/components/site/SiteFooter.tsx",
]) {
  const source = fs.readFileSync(file, "utf8")
  if (!source.includes('label: "Pathways"')) {
    throw new Error(`${file} must expose the English navigation label: Pathways`)
  }
}

console.log("NWK pathway verification passed: all four pathways are present on homepage, projects, and navigation.")
