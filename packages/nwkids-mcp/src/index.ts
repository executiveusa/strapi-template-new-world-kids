#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"
import { config } from "dotenv"

// Load environment variables
config()

// Import schemas and handlers
import {
  GrantHuntSchema,
  ContentPostSchema,
  LogImpactSchema,
  HermesStatusSchema,
} from "./tools/schemas.js"
import { handleGrantHunt } from "./handlers/grant_hunt.js"
import { handleContentPost } from "./handlers/content_post.js"
import { handleLogImpact } from "./handlers/log_impact.js"
import { handleHermesStatus } from "./handlers/hermes_status.js"
import { validateApiKey, logUsage } from "./lib/auth.js"

/**
 * NWKids Infrastructure MCP Server
 *
 * Provides 4 tools for Hermes agent operations:
 * 1. grant_hunt - Search for grant opportunities
 * 2. content_post - Draft bilingual social media content
 * 3. log_impact - Log impact metrics for programs
 * 4. hermes_status - Get current agent status and activity
 *
 * Works with Claude Code, ChatGPT, Cursor, and any MCP-compatible client.
 */

const server = new Server(
  {
    name: "nwkids-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
)

// Register tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "grant_hunt",
        description:
          "Search for grant opportunities matching NWKids programs. Returns matching grants with amounts, deadlines, and application URLs. Logs search to agent_actions table.",
        inputSchema: {
          type: "object",
          properties: {
            keywords: {
              type: "string",
              description:
                "Keywords to search for (e.g., 'food security', 'youth education', 'AI for good')",
            },
            min_amount: {
              type: "number",
              description: "Minimum grant amount in USD",
            },
            max_amount: {
              type: "number",
              description: "Maximum grant amount in USD",
            },
            deadline_after: {
              type: "string",
              description:
                "Only show grants with deadlines after this date (ISO 8601)",
            },
          },
          required: ["keywords"],
        },
      },
      {
        name: "content_post",
        description:
          "Draft bilingual content for NWKids social channels. Uses NWKids brand voice (warm, direct, specific, evidence-based). Always includes Spanish translation by default. Logs draft to agent_actions table.",
        inputSchema: {
          type: "object",
          properties: {
            topic: {
              type: "string",
              description:
                "Content topic (e.g., 'program update', 'impact stat', 'behind-the-scenes')",
            },
            platform: {
              type: "string",
              enum: ["instagram", "facebook", "linkedin", "twitter", "all"],
              description: "Target platform",
            },
            include_spanish: {
              type: "boolean",
              description: "Include Spanish translation (default: true)",
              default: true,
            },
            scheduled_for: {
              type: "string",
              description: "Schedule post for this date/time (ISO 8601)",
            },
          },
          required: ["topic", "platform"],
        },
      },
      {
        name: "log_impact",
        description:
          "Log impact metrics for NWKids programs. Updates the impact_metrics JSONB field in impact_projects table. Use hermes_status to see available projects first.",
        inputSchema: {
          type: "object",
          properties: {
            project_name: {
              type: "string",
              description:
                "Name of the impact project (must exist in impact_projects table)",
            },
            metric_name: {
              type: "string",
              description:
                "Name of the metric (e.g., 'youth_served', 'completion_rate')",
            },
            metric_value: {
              type: ["string", "number"],
              description: "Value of the metric",
            },
            notes: {
              type: "string",
              description: "Optional notes about this update",
            },
          },
          required: ["project_name", "metric_name", "metric_value"],
        },
      },
      {
        name: "hermes_status",
        description:
          "Get current Hermes agent status and recent activity. Queries agent_actions table and returns summary statistics, recent activity log, and active projects.",
        inputSchema: {
          type: "object",
          properties: {
            days: {
              type: "number",
              description: "Number of days of history to fetch (default: 7)",
              default: 7,
            },
            agent_id: {
              type: "string",
              enum: ["hermes", "grant-hunter", "content-engine", "all"],
              description: "Filter by specific agent ID (default: all)",
              default: "all",
            },
            action_type: {
              type: "string",
              description:
                "Filter by action type (e.g., 'grant_tracked', 'content_draft', 'heartbeat')",
            },
          },
        },
      },
    ],
  }
})

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  try {
    // Validate API key if provided in headers
    // In stdio mode, API key validation is optional
    // For HTTP mode, this would be required
    const apiKey = process.env.NWKIDS_API_KEY
    if (apiKey) {
      const org = await validateApiKey(apiKey)
      if (org) {
        await logUsage(org.id, name, args || {})
      }
    }

    // Route to appropriate handler
    switch (name) {
      case "grant_hunt": {
        const input = GrantHuntSchema.parse(args)
        const result = await handleGrantHunt(input)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        }
      }

      case "content_post": {
        const input = ContentPostSchema.parse(args)
        const result = await handleContentPost(input)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        }
      }

      case "log_impact": {
        const input = LogImpactSchema.parse(args)
        const result = await handleLogImpact(input)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        }
      }

      case "hermes_status": {
        const input = HermesStatusSchema.parse(args)
        const result = await handleHermesStatus(input)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        }
      }

      default:
        throw new Error(`Unknown tool: ${name}`)
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              error: errorMessage,
              tool: name,
            },
            null,
            2,
          ),
        },
      ],
      isError: true,
    }
  }
})

// Start server
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error("NWKids MCP Server running on stdio")
}

main().catch((error) => {
  console.error("Fatal error:", error)
  process.exit(1)
})
