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

const pathway = readFileSync("apps/ui/src/components/homepage/PathwaySection.tsx", "utf8")
for (const route of ['href="/opportunity"', 'href="/mentor"']) {
  if (!pathway.includes(route)) errors.push(`homepage partner CTA missing ${route}`)
}
for (const legacy of ["projectMail", "mentorMail", "First 12 project opportunity"]) {
  if (pathway.includes(legacy)) errors.push(`email-only intake regression found: ${legacy}`)
}

const homepage = readFileSync("apps/ui/src/components/homepage/Homepage.tsx", "utf8")
for (const removed of ["SupportSection", "StickyDonateMobile"]) {
  if (homepage.includes(removed)) errors.push(`removed homepage section restored: ${removed}`)
}

const combinedDesignFiles = [
  "apps/ui/src/app/[locale]/opportunity/page.tsx",
  "apps/ui/src/app/[locale]/mentor/page.tsx",
  "apps/ui/src/components/homepage/ProofOfWorkFeed.tsx",
].map((file) => readFileSync(file, "utf8")).join("\n")
for (const stale of ["color-action-orange", "rounded-full"]) {
  if (combinedDesignFiles.includes(stale)) errors.push(`stale pre-polish design token/pattern found: ${stale}`)
}

const server = readFileSync("apps/ui/src/lib/nwkids/server.ts", "utf8")
for (const token of ["SUPABASE_SERVICE_ROLE_KEY", "nwkids_submit_opportunity", "nwkids_submit_mentor"]) {
  if (!server.includes(token)) errors.push(`server intake boundary missing ${token}`)
}

const statusBoard = readFileSync("apps/ui/src/components/homepage/First12OperatingBoard.tsx", "utf8")
for (const stage of ["seeking_project", "mentor_needed", "project_scoping", "opportunity_confirmed", "participant_matched", "project_active", "completed"]) {
  if (!statusBoard.includes(stage)) errors.push(`First 12 public stage missing: ${stage}`)
}

const proof = readFileSync("apps/ui/src/components/homepage/ProofOfWorkFeed.tsx", "utf8")
if (!proof.includes("not presented as proof of Seattle outcomes")) {
  errors.push("Proof of Work truth qualifier is missing")
}

const ci = readFileSync(".github/workflows/ci.yml", "utf8")
if (!ci.includes("contents: read")) errors.push("CI must retain read-only contents permission")
if (ci.includes("git push origin")) errors.push("CI must not mutate or push source during verification")

if (errors.length) {
  console.error("NWK operating-layer verification failed:\n- " + errors.join("\n- "))
  process.exit(1)
}

console.log("NWK operating-layer verification passed: current design preserved, intakes wired, private write boundary retained, status model present, and proof provenance protected.")
