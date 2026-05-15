import { authenticate } from "../../auth/api-keys.js"
import { getGatewayClient } from "../../auth/gateway.js"
import { supabaseAdmin } from "../../db/client.js"
import type { ContentPostInputType } from "./schema.js"

const PLATFORM_LIMITS = {
  instagram: 2200,
  facebook: 500,
  tiktok: 300,
  linkedin: 700,
} as const

function readTextContent(content: unknown): string {
  if (typeof content === "string") {
    return content
  }

  if (Array.isArray(content)) {
    return content
      .map((item) =>
        item && typeof item === "object" && "text" in item
          ? String(item.text ?? "")
          : ""
      )
      .join("\n")
  }

  return ""
}

export async function contentPost(input: ContentPostInputType) {
  const org = await authenticate(input.api_key)
  const limit = PLATFORM_LIMITS[input.platform]

  const prompt = `Write a ${input.platform} post for a nonprofit.
Voice: ${input.org_voice ?? "warm, direct, specific - no corporate filler"}
Type: ${input.content_type}
Facts to include: ${input.facts.join(", ")}
${input.include_cta && input.cta_link ? `CTA: Include link to ${input.cta_link}` : ""}
Character limit: ${limit}

Rules:
- Never use: innovative, seamless, transformative, leveraging, impactful, cutting-edge
- Use specific numbers, not vague claims
- Sound human, not corporate
- End with a clear call to action if include_cta is true

Return ONLY a JSON object with keys: post_en, post_es, hashtags (array), best_time (string)`

  const ai = getGatewayClient(input.byok_key)
  const response = await ai.chat.completions.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }],
  })

  let result = {
    post_en: "",
    post_es: "",
    hashtags: [] as string[],
    best_time: "Tuesday 10am",
  }

  try {
    const text = readTextContent(response.choices[0]?.message?.content).replace(
      /```json|```/g,
      ""
    )
    result = JSON.parse(text.trim())
  } catch {
    result.post_en = readTextContent(response.choices[0]?.message?.content)
    result.post_es =
      "[Translation pending - contact info@nwkids.org for bilingual support]"
  }

  await supabaseAdmin.from("agent_actions").insert({
    agent_id: "content-engine",
    action_type: "content_draft",
    description: `${input.platform} ${input.content_type} post for ${org.org_name}`,
    payload: {
      org_id: org.org_id,
      platform: input.platform,
      type: input.content_type,
    },
    status: "completed",
  })

  return result
}
