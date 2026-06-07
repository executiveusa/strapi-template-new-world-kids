type NotionRichText = { plain_text: string }[]

type NotionPage = {
  id: string
  properties: {
    Title?: { title: NotionRichText }
    Status?: { select?: { name: string } }
    Angle?: { rich_text: NotionRichText }
    Hook?: { rich_text: NotionRichText }
    Pillar?: { multi_select: { name: string }[] }
    "Target Audience"?: { select?: { name: string } }
    Locale?: { select?: { name: string } }
    "Publish Date"?: { date?: { start: string } }
    "Strapi Slug"?: { rich_text: NotionRichText }
    "Research Source"?: { rich_text: NotionRichText }
  }
}

export type BlogDraft = {
  notionId: string
  title: string
  hook: string
  angle: string
  pillar: string[]
  targetAudience: string
  locale: string
  publishDate: string | null
  strapiSlug: string
  researchSource: string
}

function extractText(richText: NotionRichText | undefined): string {
  return (richText ?? []).map((b) => b.plain_text).join("")
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replaceAll(/[^a-z0-9\s-]/g, "")
    .replaceAll(/\s+/g, "-")
    .slice(0, 80)
}

function parseNotionPage(page: NotionPage): BlogDraft {
  const p = page.properties
  const title = extractText(p.Title?.title)

  return {
    notionId: page.id,
    title,
    hook: extractText(p.Hook?.rich_text),
    angle: extractText(p.Angle?.rich_text),
    pillar: (p.Pillar?.multi_select ?? []).map((s) => s.name),
    targetAudience: p["Target Audience"]?.select?.name ?? "General",
    locale: p.Locale?.select?.name ?? "EN",
    publishDate: p["Publish Date"]?.date?.start ?? null,
    strapiSlug: extractText(p["Strapi Slug"]?.rich_text) || slugify(title),
    researchSource: extractText(p["Research Source"]?.rich_text),
  }
}

async function notionRequest(
  path: string,
  options: RequestInit,
  apiKey: string
): Promise<Response> {
  return fetch(`https://api.notion.com/v1${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
      ...options.headers,
    },
  })
}

export async function getApprovedPosts(
  env: NodeJS.ProcessEnv
): Promise<BlogDraft[]> {
  const apiKey = env.NOTION_API_KEY
  const dbId = env.NOTION_BLOG_DB_ID
  if (!apiKey || !dbId) return []

  const response = await notionRequest(
    `/databases/${dbId}/query`,
    {
      method: "POST",
      body: JSON.stringify({
        filter: { property: "Status", select: { equals: "Approved" } },
        sorts: [{ property: "Created", direction: "ascending" }],
      }),
    },
    apiKey
  )

  if (!response.ok) return []
  const data = (await response.json()) as { results: NotionPage[] }

  return data.results.map(parseNotionPage)
}

export async function markNotionStatus(
  notionId: string,
  status: "Scheduled" | "Published" | "Archived",
  env: NodeJS.ProcessEnv
): Promise<boolean> {
  const apiKey = env.NOTION_API_KEY
  if (!apiKey) return false

  const response = await notionRequest(
    `/pages/${notionId}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        properties: { Status: { select: { name: status } } },
      }),
    },
    apiKey
  )

  return response.ok
}

export async function publishToStrapi(
  draft: BlogDraft,
  env: NodeJS.ProcessEnv
): Promise<{ id: number; slug: string } | null> {
  const strapiUrl = env.STRAPI_URL || "http://localhost:1337"
  const token = env.STRAPI_TOKEN || env.STRAPI_API_TOKEN

  const body = {
    data: {
      title: draft.title,
      slug: draft.strapiSlug,
      hook: draft.hook,
      angle: draft.angle,
      locale: draft.locale.toLowerCase(),
      targetAudience: draft.targetAudience,
      notionId: draft.notionId,
      publishedAt: null,
    },
  }

  const response = await fetch(`${strapiUrl}/api/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) return null
  const result = (await response.json()) as {
    data: { id: number; attributes: { slug: string } }
  }

  return {
    id: result.data.id,
    slug: result.data.attributes?.slug ?? draft.strapiSlug,
  }
}
