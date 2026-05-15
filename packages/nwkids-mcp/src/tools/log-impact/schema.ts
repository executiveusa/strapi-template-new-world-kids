import { z } from "zod"

export const LogImpactInput = z.object({
  api_key: z.string(),
  program: z.string().describe("Which program this metric belongs to"),
  metric: z.enum([
    "youth_served",
    "meals_distributed",
    "grants_won",
    "volunteers",
    "plants_grown",
    "posts_published",
    "custom",
  ]),
  value: z.number(),
  period: z.string().describe('Quarter or month, e.g. "2026-Q1" or "2026-04"'),
  notes: z.string().optional(),
  custom_metric_name: z.string().optional(),
})
