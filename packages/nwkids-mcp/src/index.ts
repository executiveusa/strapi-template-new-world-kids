import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

import { ContentPostInput } from "./tools/content-post/schema.js"
import { contentPost } from "./tools/content-post/handler.js"
import { GrantHuntInput } from "./tools/grant-hunt/schema.js"
import { grantHunt } from "./tools/grant-hunt/handler.js"
import { HermesStatusInput } from "./tools/hermes-status/schema.js"
import { hermesStatus } from "./tools/hermes-status/handler.js"
import { logImpact } from "./tools/log-impact/handler.js"
import { LogImpactInput } from "./tools/log-impact/schema.js"

const server = new McpServer({
  name: "nwkids-infrastructure",
  version: "1.0.0",
  description:
    "NWKids nonprofit operations infrastructure. Grant hunting, bilingual content, impact tracking, and Hermes portfolio management as MCP tools.",
})

server.tool(
  "grant_hunt",
  "Search for grant opportunities matching your nonprofit mission. Returns ranked results with match scores, deadlines, and a pre-filled LOI starter.",
  GrantHuntInput.shape,
  async (input) => {
    try {
      const result = await grantHunt(input as never)

      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      }
    }
  }
)

server.tool(
  "content_post",
  "Generate bilingual EN/ES social media posts from program impact data.",
  ContentPostInput.shape,
  async (input) => {
    try {
      const result = await contentPost(input as never)

      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      }
    }
  }
)

server.tool(
  "log_impact",
  "Log program outcome metrics to the NWKids shared impact ledger.",
  LogImpactInput.shape,
  async (input) => {
    try {
      const result = await logImpact(input as never)

      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      }
    }
  }
)

server.tool(
  "hermes_status",
  "Get current portfolio health: active programs, grant pipeline, content schedule, budget remaining, and last agent heartbeat.",
  HermesStatusInput.shape,
  async (input) => {
    try {
      const result = await hermesStatus(input as never)

      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      }
    }
  }
)

const transport = new StdioServerTransport()
await server.connect(transport)
console.error(
  "[NWKids MCP] Server running. Tools: grant_hunt, content_post, log_impact, hermes_status"
)
