import type { z } from "zod"

import { authenticate } from "../../auth/api-keys.js"
import { supabaseAdmin } from "../../db/client.js"
import { LogImpactInput } from "./schema.js"

export async function logImpact(input: z.infer<typeof LogImpactInput>) {
  const org = await authenticate(input.api_key)

  const { data, error } = await supabaseAdmin
    .from("agent_actions")
    .insert({
      agent_id: "hermes",
      action_type: "report",
      description: `Impact log: ${input.metric} = ${input.value} for ${input.program} (${input.period})`,
      payload: {
        org_id: org.org_id,
        program: input.program,
        metric:
          input.metric === "custom" ? input.custom_metric_name : input.metric,
        value: input.value,
        period: input.period,
        notes: input.notes,
      },
      status: "completed",
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to log impact: ${error.message}`)
  }

  const metricName =
    input.metric === "custom" ? input.custom_metric_name : input.metric
  const { data: cumulative } = await supabaseAdmin
    .from("agent_actions")
    .select("payload")
    .eq("action_type", "report")
    .contains("payload", { org_id: org.org_id, metric: metricName })

  const total =
    cumulative?.reduce((sum, row) => {
      const payload =
        row.payload && typeof row.payload === "object"
          ? (row.payload as Record<string, unknown>)
          : {}

      return sum + (Number(payload.value) || 0)
    }, 0) ?? input.value

  return {
    logged: true,
    ledger_id: data?.id,
    metric: metricName,
    value: input.value,
    cumulative_total: total,
    period: input.period,
  }
}
