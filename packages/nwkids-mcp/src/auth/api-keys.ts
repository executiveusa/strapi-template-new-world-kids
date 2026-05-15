import { supabaseAdmin } from "../db/client.js"

export interface OrgContext {
  org_id: string
  org_name: string
  plan: "starter" | "growth" | "pro"
}

export async function authenticate(apiKey: string): Promise<OrgContext> {
  if (!apiKey || !apiKey.startsWith("nwk_")) {
    throw new Error("Invalid API key format. Keys must start with nwk_")
  }

  if (apiKey === process.env.NWKIDS_INTERNAL_KEY) {
    return {
      org_id: "nwkids",
      org_name: "New World Kids",
      plan: "pro",
    }
  }

  const { data, error } = await supabaseAdmin
    .from("mcp_orgs")
    .select("id, name, plan")
    .eq("api_key", apiKey)
    .eq("active", true)
    .single()

  if (error || !data) {
    throw new Error("Invalid or inactive API key")
  }

  return {
    org_id: data.id,
    org_name: data.name,
    plan: data.plan,
  }
}

export function requirePlan(
  org: OrgContext,
  required: "starter" | "growth" | "pro"
) {
  const tiers = { starter: 0, growth: 1, pro: 2 }

  if (tiers[org.plan] < tiers[required]) {
    throw new Error(
      `This tool requires the ${required} plan. Your org is on ${org.plan}. Upgrade at nwkids.ai/dashboard`
    )
  }
}
