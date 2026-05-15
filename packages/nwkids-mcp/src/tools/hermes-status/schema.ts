import { z } from "zod"

export const HermesStatusInput = z.object({
  api_key: z.string(),
})
