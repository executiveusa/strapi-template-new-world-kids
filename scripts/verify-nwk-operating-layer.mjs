import { existsSync, readFileSync } from "node:fs"

const requiredFiles = [
  "apps/ui/src/app/[locale]/opportunity/page.tsx",
  "apps/ui/src/app/[locale]/opportunity/actions.ts",
  "apps/ui/src/app/[locale]/mentor/page.tsx",
  "apps/ui/src/app/[locale]/mentor/actions.ts",
  "apps/ui/src/components/homepage/First12OperatingBoard.tsx",
  "apps/ui/src/components/homepage/ProofOfWorkFeed.tsx",
  "apps/ui/src/lib/nwkids/server.ts",
  "apps/ui/src/lib/nwkids/proof.ts",
  "docs/NWK_FIRST_12_OPERATING_LAYER.md",
]

const errors = []
for (const file of requiredFiles) {
  if (!existsSync(file)) errors.push(`missing required operating file: ${file}`)
}

const pathwayFile = "apps/ui/src/components/homepage/PathwaySection.tsx"
const pathway = readFileSync(pathwayFile, "utf8")
for (const route of ['href="/opportunity"', 'href="/mentor"']) {
  if (!pathway.includes(route)) errors.push(`homepage partner CTA missing ${route}`)
}
for (const legacy of ["projectMail", "mentorMail", "First 12 project opportunity"]) {
  if (pathway.includes(legacy)) errors.push(`email-only intake regression found: ${legacy}`)
}

const server = readFileSync("apps/ui/src/lib/nwkids/server.ts", "utf8")
for (const token of [
  "SUPABASE_SERVICE_ROLE_KEY",
  "nwkids_submit_opportunity",
  "nwkids_submit_mentor",
]) {
  if (!server.includes(token)) errors.push(`server intake boundary missing ${token}`)
}

const statusBoard = readFileSync(
  "apps/ui/src/components/homepage/First12OperatingBoard.tsx",
  "utf8"
)
for (const stage of [
  "seeking_project",
  "mentor_needed",
  "project_scoping",
  "opportunity_confirmed",
  "participant_matched",
  "project_active",
  "completed",
]) {
  if (!statusBoard.includes(stage)) errors.push(`First 12 public stage missing: ${stage}`)
}

const proof = readFileSync("apps/ui/src/components/homepage/ProofOfWorkFeed.tsx", "utf8")
if (!proof.includes("not presented as proof of Seattle outcomes")) {
  errors.push("Proof of Work truth qualifier is missing")
}

if (errors.length) {
  console.error("NWK operating-layer verification failed:\n- " + errors.join("\n- "))
  process.exit(1)
}

console.log(
  "NWK operating-layer verification passed: structured intakes, private write boundary, status model, and verified proof feed are locked."
)
