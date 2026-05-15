import { authenticate } from "../../auth/api-keys.js"
import { supabaseAdmin } from "../../db/client.js"
import type { GrantHuntInputType } from "./schema.js"

const GRANT_DATABASE = [
  {
    name: "Microsoft AI for Good",
    funder: "Microsoft",
    amount_range: "$50,000 - $500,000",
    deadline: "2026-06-30",
    tags: ["ai", "technology", "youth", "education", "nonprofit"],
    match_keywords: ["ai", "technology", "digital", "youth", "education"],
    apply_url:
      "https://www.microsoft.com/en-us/corporate-responsibility/philanthropies/ai-for-good",
  },
  {
    name: "Paul G. Allen Family Foundation",
    funder: "Paul G. Allen Foundation",
    amount_range: "$100,000 - $1,000,000",
    deadline: "2026-09-15",
    tags: ["pacific northwest", "environment", "youth", "innovation", "seattle"],
    match_keywords: ["seattle", "pacific northwest", "environment", "regenerative", "food"],
    apply_url: "https://www.pgafamilyfoundation.org",
  },
  {
    name: "Google.org Impact Challenge",
    funder: "Google.org",
    amount_range: "$250,000 - $2,000,000",
    deadline: "2026-07-31",
    tags: ["technology", "social impact", "ai", "scale", "nonprofit"],
    match_keywords: ["ai", "technology", "scale", "impact", "innovation"],
    apply_url: "https://impactchallenge.withgoogle.com",
  },
  {
    name: "USDA Community Food Projects",
    funder: "U.S. Department of Agriculture",
    amount_range: "$10,000 - $400,000",
    deadline: "2026-05-31",
    tags: ["food security", "agriculture", "community", "youth", "nutrition"],
    match_keywords: ["food", "agriculture", "farming", "nutrition", "community"],
    apply_url:
      "https://www.nifa.usda.gov/grants/funding-opportunities/community-food-projects",
  },
  {
    name: "W.K. Kellogg Foundation",
    funder: "W.K. Kellogg Foundation",
    amount_range: "$200,000 - $1,500,000",
    deadline: "2026-08-01",
    tags: ["children", "youth", "food", "education", "equity"],
    match_keywords: ["youth", "children", "food", "education", "equity", "underserved"],
    apply_url: "https://www.wkkf.org/grants",
  },
  {
    name: "Robert Wood Johnson Foundation",
    funder: "RWJF",
    amount_range: "$100,000 - $500,000",
    deadline: "2026-10-15",
    tags: ["health", "food", "community", "equity", "youth"],
    match_keywords: ["health", "food access", "nutrition", "community", "equity"],
    apply_url: "https://www.rwjf.org/en/grants.html",
  },
  {
    name: "Surdna Foundation",
    funder: "Surdna Foundation",
    amount_range: "$75,000 - $300,000",
    deadline: "2026-06-01",
    tags: ["youth", "environment", "sustainable", "community", "arts"],
    match_keywords: ["youth", "environment", "sustainable", "community", "arts", "culture"],
    apply_url: "https://surdna.org/grants",
  },
] as const

function scoreMatch(
  grant: (typeof GRANT_DATABASE)[number],
  input: GrantHuntInputType
) {
  const searchText = [input.mission, ...input.programs, input.location]
    .join(" ")
    .toLowerCase()
  const matches = grant.match_keywords.filter((keyword) =>
    searchText.includes(keyword)
  )

  return Math.round((matches.length / grant.match_keywords.length) * 100)
}

export async function grantHunt(input: GrantHuntInputType) {
  const org = await authenticate(input.api_key)

  const scored = GRANT_DATABASE.map((grant) => ({
    ...grant,
    match_score: scoreMatch(grant, input),
  }))
    .filter((grant) => grant.match_score > 10)
    .sort((left, right) => right.match_score - left.match_score)
    .slice(0, input.max_results)

  const topMatch = scored[0]
  const loiStarter = topMatch
    ? `Dear ${topMatch.funder} Team,\n\n${org.org_name} is seeking funding to ${input.mission}. Our programs include ${input.programs.join(", ")}, serving communities in ${input.location}.\n\n[Complete LOI body based on your org's specific outcomes and data]\n\nWe welcome the opportunity to discuss alignment with your ${topMatch.name} program.\n\nSincerely,\n[Your Name]\n${org.org_name}`
    : ""

  await supabaseAdmin.from("agent_actions").insert({
    agent_id: "grant-hunter",
    action_type: "grant_tracked",
    description: `Grant hunt for ${org.org_name}: found ${scored.length} opportunities`,
    payload: {
      org_id: org.org_id,
      query: {
        mission: input.mission,
        programs: input.programs,
        location: input.location,
      },
      results_count: scored.length,
      top_match: topMatch?.name ?? null,
    },
    status: "completed",
  })

  return {
    opportunities: scored.map((grant) => ({
      name: grant.name,
      funder: grant.funder,
      amount_range: grant.amount_range,
      deadline: grant.deadline,
      match_score: grant.match_score,
      apply_url: grant.apply_url,
    })),
    loi_starter: topMatch ? loiStarter : null,
    total_pipeline_usd: scored.length * 100000,
    recommended_priority: scored.slice(0, 3).map((grant) => grant.name),
  }
}
