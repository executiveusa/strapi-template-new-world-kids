import { z } from "zod"

export const ContentPostInput = z.object({
  api_key: z.string(),
  byok_key: z
    .string()
    .optional()
    .describe(
      "Your own OpenAI or Anthropic API key. If provided, AI costs bill to your account instead of ours. Enables the $200/month Starter plan pricing."
    ),
  platform: z.enum(["instagram", "facebook", "tiktok", "linkedin"]),
  content_type: z.enum([
    "program_update",
    "impact_stat",
    "behind_scenes",
    "appeal",
  ]),
  facts: z
    .array(z.string())
    .describe("2-5 specific facts to build the post around"),
  org_voice: z
    .string()
    .optional()
    .describe('Tone of voice, e.g. "warm, direct, youth-centered"'),
  include_cta: z.boolean().default(true),
  cta_link: z.string().url().optional(),
})

export type ContentPostInputType = z.infer<typeof ContentPostInput>
