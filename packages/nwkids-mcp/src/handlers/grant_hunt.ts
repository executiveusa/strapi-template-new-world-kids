import { GrantHuntInput } from "../tools/schemas.js"
import { adminClient } from "../lib/database.js"

export interface GrantOpportunity {
  title: string
  funder: string
  amount_min: number | null
  amount_max: number | null
  deadline: string | null
  match_score: number
  match_reason: string
  application_url: string | null
}

/**
 * Search for grant opportunities matching NWKids programs.
 * In a production system, this would integrate with Candid.org, Skip Grants, or SAM.gov APIs.
 * For now, it returns a structured response with guidance on next steps.
 */
export async function handleGrantHunt(
  input: GrantHuntInput,
): Promise<{ results: GrantOpportunity[]; search_summary: string }> {
  const { keywords, min_amount, max_amount, deadline_after } = input

  // Log the search request to agent_actions
  await adminClient.from("agent_actions").insert({
    agent_id: "grant-hunter",
    action_type: "grant_tracked",
    description: `Grant search: ${keywords}${min_amount ? ` (min: $${min_amount})` : ""}${max_amount ? ` (max: $${max_amount})` : ""}`,
    payload: input,
    status: "completed",
  })

  // In production, this would call external APIs
  // For now, return guidance on manual search steps
  const searchSummary = `Grant search initiated for: "${keywords}"

Search parameters:
- Keywords: ${keywords}
- Amount range: ${min_amount ? `$${min_amount.toLocaleString()}` : "Any"} - ${max_amount ? `$${max_amount.toLocaleString()}` : "Any"}
- Deadline after: ${deadline_after || "Any date"}

Recommended search sources:
1. Candid.org (Foundation Directory): https://candid.org/find-funding
2. Skip Grants: https://www.skipgrants.com/
3. SAM.gov (federal grants): https://sam.gov/
4. Microsoft AI for Good: https://www.microsoft.com/en-us/ai/ai-for-good
5. Google.org: https://www.google.org/our-work/
6. Paul G. Allen Foundation: https://www.pgafoundations.org/

Priority targets for NWKids programs:
- Food security and agriculture
- Youth education and leadership
- AI/technology for social good
- Environmental sustainability
- Bilingual education programs

Next steps:
1. Manual search on above platforms
2. Match criteria against NWKids programs (food forest, life skills, AI-native nonprofit)
3. For matches over $10,000, create approval request in agent_actions table
4. Draft LOI/application using Humanizer tone (warm, specific, evidence-based)`

  return {
    results: [],
    search_summary: searchSummary,
  }
}
