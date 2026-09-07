import fs from "node:fs"

const projects = fs.readFileSync("apps/ui/src/app/[locale]/projects/page.tsx", "utf8")
const required = [
  ["Built for Good", "Technology", "Tecnología"],
  ["Beyond the Game", "Sports", "Deportes"],
  ["Ground Up", "Food + Place", "Alimentos + Lugar"],
  ["Make Your Mark", "Art", "Arte"],
]

for (const [name, englishCategory, spanishCategory] of required) {
  for (const token of [name, englishCategory, spanishCategory]) {
    if (!projects.includes(token)) {
      throw new Error(`projects page is missing required pathway token: ${token}`)
    }
  }
}

const pathway = fs.readFileSync("apps/ui/src/components/homepage/PathwaySection.tsx", "utf8")
for (const token of ["first-12", "how", "proof", "partners", "href=\"/opportunity\"", "href=\"/mentor\""]) {
  if (!pathway.includes(token)) throw new Error(`homepage is missing required pathway or intake token: ${token}`)
}

for (const file of ["apps/ui/src/components/site/SiteHeader.tsx", "apps/ui/src/components/site/SiteFooter.tsx"]) {
  const source = fs.readFileSync(file, "utf8")
  for (const token of ["First 12", "How it works"]) {
    if (!source.includes(token)) throw new Error(`${file} is missing current navigation label: ${token}`)
  }
}

console.log("NWK pathway verification passed: four bilingual pathways remain on Projects, and reduced navigation and structured intake routes remain intact.")
