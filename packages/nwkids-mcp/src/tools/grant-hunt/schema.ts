import { z } from "zod"

export const GrantHuntInput = z.object({
  api_key: z
    .string()
    .describe("Your NWKids API key from nwkids.ai/dashboard"),
  byok_key: z
    .string()
    .optional()
    .describe(
      "Your own OpenAI or Anthropic API key. If provided, AI costs bill to your account instead of ours."
    ),
  mission: z.string().describe("One sentence describing your org mission"),
  programs: z
    .array(z.string())
    .describe("List of program types you run"),
  location: z
    .string()
    .describe("City and state/country where you operate"),
  budget_range: z
    .string()
    .optional()
    .describe('Typical grant size you seek, e.g. "$10K-$100K"'),
  max_results: z.number().min(1).max(20).default(10),
})

export type GrantHuntInputType = z.infer<typeof GrantHuntInput>
