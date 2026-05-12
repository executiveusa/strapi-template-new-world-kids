import { z } from "zod"

/**
 * Schema for grant_hunt tool - Search for grant opportunities matching NWKids programs
 */
export const GrantHuntSchema = z.object({
  keywords: z
    .string()
    .describe(
      "Keywords to search for (e.g., 'food security', 'youth education', 'AI for good')",
    ),
  min_amount: z
    .number()
    .optional()
    .describe("Minimum grant amount in USD"),
  max_amount: z
    .number()
    .optional()
    .describe("Maximum grant amount in USD"),
  deadline_after: z
    .string()
    .optional()
    .describe("Only show grants with deadlines after this date (ISO 8601)"),
})

export type GrantHuntInput = z.infer<typeof GrantHuntSchema>

/**
 * Schema for content_post tool - Draft bilingual content for NWKids social channels
 */
export const ContentPostSchema = z.object({
  topic: z
    .string()
    .describe(
      "Content topic (e.g., 'program update', 'impact stat', 'behind-the-scenes')",
    ),
  platform: z
    .enum(["instagram", "facebook", "linkedin", "twitter", "all"])
    .describe("Target platform"),
  include_spanish: z
    .boolean()
    .default(true)
    .describe("Include Spanish translation (default: true)"),
  scheduled_for: z
    .string()
    .optional()
    .describe("Schedule post for this date/time (ISO 8601)"),
})

export type ContentPostInput = z.infer<typeof ContentPostSchema>

/**
 * Schema for log_impact tool - Log impact metrics for NWKids programs
 */
export const LogImpactSchema = z.object({
  project_name: z
    .string()
    .describe("Name of the impact project (must exist in impact_projects table)"),
  metric_name: z
    .string()
    .describe("Name of the metric (e.g., 'youth_served', 'completion_rate')"),
  metric_value: z
    .union([z.string(), z.number()])
    .describe("Value of the metric"),
  notes: z.string().optional().describe("Optional notes about this update"),
})

export type LogImpactInput = z.infer<typeof LogImpactSchema>

/**
 * Schema for hermes_status tool - Get current Hermes agent status and recent activity
 */
export const HermesStatusSchema = z.object({
  days: z
    .number()
    .default(7)
    .describe("Number of days of history to fetch (default: 7)"),
  agent_id: z
    .enum(["hermes", "grant-hunter", "content-engine", "all"])
    .default("all")
    .describe("Filter by specific agent ID (default: all)"),
  action_type: z
    .string()
    .optional()
    .describe(
      "Filter by action type (e.g., 'grant_tracked', 'content_draft', 'heartbeat')",
    ),
})

export type HermesStatusInput = z.infer<typeof HermesStatusSchema>
