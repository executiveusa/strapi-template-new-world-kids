import { z } from "zod"

export const RunMissionInput = z.object({
  api_key: z.string().describe("Your NWKids API key"),
  mission: z
    .string()
    .min(3)
    .describe("Short mission name, e.g. Indigo Azul seedling drive"),
  objective: z
    .string()
    .min(10)
    .describe("The concrete outcome the mission is trying to produce"),
  owner: z
    .string()
    .default("hermes")
    .describe("Agent or human owner responsible for the mission"),
  public: z
    .boolean()
    .default(true)
    .describe("Whether this mission can appear on public mission pages"),
  links: z.array(z.string().url()).default([]),
})

export type RunMissionInputType = z.infer<typeof RunMissionInput>
