import { readFile } from "node:fs/promises"
import { createServer } from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"

import {
  fiscalSponsor,
  getSupportRails,
  impactPillars,
  socialLinks,
  trustDocuments,
} from "@repo/shared-data"

import { agentProfiles } from "./config/agent-profiles.js"
import { answerArticleQuestion } from "./lib/article-chat.js"
import { applyCors, readJsonBody, sendJson } from "./lib/http.js"
import {
  getApprovedPosts,
  markNotionStatus,
  publishToStrapi,
} from "./lib/notion-blog.js"

type ArticleChatPayload = {
  title: string
  url?: string
  question: string
  content: string
  locale?: string
  tags?: string[]
}

const currentFile = fileURLToPath(import.meta.url)
const currentDir = path.dirname(currentFile)
const serviceRoot = path.resolve(currentDir, "..")
const repoRoot = path.resolve(serviceRoot, "..", "..")
const skillManifestPath = path.resolve(
  repoRoot,
  "agent-skills",
  "source-status.json"
)

async function readSkillManifest() {
  const raw = await readFile(skillManifestPath, "utf8")

  return JSON.parse(raw) as Record<string, unknown>
}

function getIntegrations(env: NodeJS.ProcessEnv) {
  return {
    synthiaGatewayUrl: env.SYNTHIA_GATEWAY_URL || null,
    synthiaModel: env.SYNTHIA_MODEL || "gpt-4o-mini",
    gbrainCommand: env.GBRAIN_MCP_COMMAND || "gbrain serve",
    browserHarnessUrl: env.BROWSER_HARNESS_URL || null,
    skipPublicUrl: env.SKIP_PUBLIC_URL || "https://helloskip.com/grants",
    creemPublicUrl: env.CREEM_PUBLIC_URL || null,
    buyMeACoffeeUrl: env.BUY_ME_A_COFFEE_URL || null,
  }
}

const server = createServer(async (request, response) => {
  applyCors(response)

  if (!request.url || !request.method) {
    sendJson(response, 400, { error: "Missing request metadata." })

    return
  }

  if (request.method === "OPTIONS") {
    response.statusCode = 204
    response.end()

    return
  }

  const url = new URL(
    request.url,
    `http://${request.headers.host || "localhost"}`
  )

  try {
    if (request.method === "GET" && url.pathname === "/health") {
      sendJson(response, 200, {
        ok: true,
        service: "@repo/hermes",
        timestamp: new Date().toISOString(),
      })

      return
    }

    if (request.method === "GET" && url.pathname === "/api/trust/documents") {
      const publicUrl = process.env.APP_PUBLIC_URL || "http://localhost:3000"
      sendJson(response, 200, {
        fiscalSponsor,
        documents: trustDocuments.map((document) => ({
          ...document,
          absoluteHref: `${publicUrl.replace(/\/$/, "")}${document.href}`,
        })),
      })

      return
    }

    if (request.method === "GET" && url.pathname === "/api/pillars") {
      sendJson(response, 200, {
        pillars: impactPillars,
      })

      return
    }

    if (request.method === "GET" && url.pathname === "/api/social-links") {
      sendJson(response, 200, {
        socialLinks,
      })

      return
    }

    if (request.method === "GET" && url.pathname === "/api/agents") {
      sendJson(response, 200, {
        profiles: agentProfiles,
        sharedFiles: {
          playbook: "services/hermes/agents/shared/PLAYBOOK.md",
          safety: "services/hermes/agents/shared/SAFETY.md",
          tools: "services/hermes/agents/shared/TOOLS.md",
        },
        integrations: getIntegrations(process.env),
      })

      return
    }

    if (request.method === "GET" && url.pathname === "/api/skills") {
      const manifest = await readSkillManifest()
      sendJson(response, 200, manifest)

      return
    }

    if (request.method === "GET" && url.pathname === "/api/support-rails") {
      sendJson(response, 200, {
        rails: getSupportRails(process.env),
      })

      return
    }

    if (request.method === "GET" && url.pathname === "/api/blog/approved") {
      const posts = await getApprovedPosts(process.env)
      sendJson(response, 200, { posts, count: posts.length })

      return
    }

    if (request.method === "POST" && url.pathname === "/api/blog/publish") {
      const payload = await readJsonBody<{ notionId?: string }>(request)

      if (!payload.notionId) {
        sendJson(response, 400, { error: "notionId is required." })

        return
      }

      const approvedPosts = await getApprovedPosts(process.env)
      const draft = approvedPosts.find((p) => p.notionId === payload.notionId)

      if (!draft) {
        sendJson(response, 404, {
          error: "Post not found or not in Approved status.",
        })

        return
      }

      const strapiResult = await publishToStrapi(draft, process.env)

      if (!strapiResult) {
        sendJson(response, 502, { error: "Strapi publish failed." })

        return
      }

      await markNotionStatus(draft.notionId, "Scheduled", process.env)

      sendJson(response, 200, {
        ok: true,
        strapiId: strapiResult.id,
        slug: strapiResult.slug,
        notionId: draft.notionId,
        title: draft.title,
      })

      return
    }

    if (request.method === "POST" && url.pathname === "/api/blog/sync-all") {
      const posts = await getApprovedPosts(process.env)
      const results = []

      for (const draft of posts) {
        const strapiResult = await publishToStrapi(draft, process.env)

        if (strapiResult) {
          await markNotionStatus(draft.notionId, "Scheduled", process.env)
          results.push({
            ok: true,
            notionId: draft.notionId,
            title: draft.title,
            strapiId: strapiResult.id,
          })
        } else {
          results.push({
            ok: false,
            notionId: draft.notionId,
            title: draft.title,
          })
        }
      }

      sendJson(response, 200, {
        synced: results.filter((r) => r.ok).length,
        total: posts.length,
        results,
      })

      return
    }

    if (request.method === "POST" && url.pathname === "/api/chat/article") {
      const payload = await readJsonBody<ArticleChatPayload>(request)

      if (!payload.question || !payload.content || !payload.title) {
        sendJson(response, 400, {
          error: "title, question, and content are required.",
        })

        return
      }

      const result = await answerArticleQuestion(payload, process.env)
      sendJson(response, 200, result)

      return
    }

    sendJson(response, 404, { error: "Not found." })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    sendJson(response, 500, {
      error: message,
    })
  }
})

const port = Number(process.env.PORT || 4010)

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Hermes service listening on http://localhost:${port}`)
})
