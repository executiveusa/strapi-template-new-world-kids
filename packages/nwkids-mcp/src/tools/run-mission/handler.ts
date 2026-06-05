import { authenticate } from "../../auth/api-keys.js"
import { supabaseAdmin } from "../../db/client.js"
import type { RunMissionInputType } from "./schema.js"

export async function runMission(input: RunMissionInputType) {
  const org = await authenticate(input.api_key)

  const { data, error } = await supabaseAdmin
    .from("agent_actions")
    .insert({
      agent_id: input.owner,
      action_type: "mission_run",
      description: `Mission started: ${input.mission}`,
      payload: {
        org_id: org.org_id,
        org_name: org.org_name,
        mission: input.mission,
        objective: input.objective,
        public: input.public,
        links: input.links,
      },
      status: "pending",
    })
    .select("id, created_at")
    .single()

  if (error) {
    throw new Error(`Failed to start mission: ${error.message}`)
  }

  return {
    mission: input.mission,
    status: "pending",
    ledger_id: data?.id ?? null,
    created_at: data?.created_at ?? null,
    public: input.public,
    dashboard_url: "/en/ops",
  }
}
