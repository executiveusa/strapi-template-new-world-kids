import OpenAI from "openai"

export function getGatewayClient(byokKey?: string): OpenAI {
  return new OpenAI({
    baseURL: process.env.SYNTHIA_GATEWAY_URL ?? "https://gateway.nwkids.ai/v1",
    apiKey: byokKey ?? process.env.SYNTHIA_GATEWAY_KEY ?? "",
    defaultHeaders: byokKey ? { "X-BYOK": "true" } : {},
  })
}
