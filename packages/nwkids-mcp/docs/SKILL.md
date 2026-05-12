# NWKids Infrastructure MCP Server

Model-agnostic tool server for Hermes agent operations. Works with Claude Code, ChatGPT, Cursor, and any MCP-compatible client.

## What it does

Provides 4 tools for New World Kids operations:

1. **grant_hunt** - Search for grant opportunities matching NWKids programs
2. **content_post** - Draft bilingual social media content (English + Spanish)
3. **log_impact** - Log impact metrics for NWKids programs
4. **hermes_status** - Get current Hermes agent status and recent activity

All operations log to Supabase (agent_actions, impact_projects, weekly_reports tables).

## Installation

### Prerequisites

```bash
# Set environment variables
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
export SUPABASE_ANON_KEY="your-anon-key"
export NWKIDS_API_KEY="your-api-key"  # Optional, for usage tracking
```

### For Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "nwkids": {
      "command": "node",
      "args": [
        "/absolute/path/to/strapi-template-new-world-kids/packages/nwkids-mcp/dist/index.js"
      ],
      "env": {
        "SUPABASE_URL": "https://your-project.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key",
        "SUPABASE_ANON_KEY": "your-anon-key"
      }
    }
  }
}
```

### For Claude Code

Add to `.claude/settings.json` in your project:

```json
{
  "mcp": {
    "servers": {
      "nwkids": {
        "command": "node",
        "args": [
          "/absolute/path/to/strapi-template-new-world-kids/packages/nwkids-mcp/dist/index.js"
        ],
        "env": {
          "SUPABASE_URL": "https://your-project.supabase.co",
          "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key",
          "SUPABASE_ANON_KEY": "your-anon-key"
        }
      }
    }
  }
}
```

### For ChatGPT

ChatGPT supports MCP via the ChatGPT desktop app. Add the server configuration to your ChatGPT settings.

### For Cursor

Add to `.cursor/mcp_settings.json`:

```json
{
  "mcpServers": {
    "nwkids": {
      "command": "node",
      "args": [
        "/absolute/path/to/strapi-template-new-world-kids/packages/nwkids-mcp/dist/index.js"
      ],
      "env": {
        "SUPABASE_URL": "https://your-project.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key",
        "SUPABASE_ANON_KEY": "your-anon-key"
      }
    }
  }
}
```

## Build

```bash
cd packages/nwkids-mcp
pnpm install
pnpm build
```

## Usage Examples

### Grant Hunt

```
Use the grant_hunt tool to search for grant opportunities:
- Keywords: "youth education food security"
- Minimum amount: 25000
- Deadline after: "2025-06-01"
```

Response includes:
- Matching grant opportunities (when available)
- Search guidance for Candid.org, Skip Grants, SAM.gov
- Priority targets (Microsoft AI for Good, Google.org, Paul G. Allen Foundation)
- Next steps for manual search and application

### Content Post

```
Use the content_post tool to draft social media content:
- Topic: "program update"
- Platform: "instagram"
- Include Spanish: true
```

Response includes:
- Bilingual content draft (English + Spanish)
- Character count
- Next steps for scheduling via Postiz
- Brand voice checklist

### Log Impact

```
Use the log_impact tool to update program metrics:
- Project name: "Forest Leadership Camp — Seattle"
- Metric name: "youth_served"
- Metric value: 52
- Notes: "Summer 2025 cohort complete"
```

Response includes:
- Success confirmation
- Updated project ID
- Timestamp

### Hermes Status

```
Use the hermes_status tool to check recent activity:
- Days: 7
- Agent ID: "all"
```

Response includes:
- Summary statistics (total actions, by agent, by type, by status)
- Recent activity log (last 20 actions)
- Active projects with current metrics

## Database Schema

The MCP server requires these Supabase tables:

1. **agent_actions** - Log of all agent operations
2. **impact_projects** - NWKids programs with impact metrics
3. **weekly_reports** - Generated weekly summaries
4. **mcp_orgs** - API key validation for usage tracking (optional)
5. **mcp_usage** - Usage logs per organization (optional)

See `infrastructure/hermes/init.sql` for full schema.

## Security

- Service role key is only used server-side
- API key validation is optional (for usage tracking)
- All database operations use Row Level Security
- Secrets are never exposed to clients

## Troubleshooting

**"Missing SUPABASE_URL environment variable"**
→ Set environment variables in MCP server configuration

**"Project not found"**
→ Use hermes_status tool to list available projects first

**"Failed to fetch metrics"**
→ Check Supabase connection and RLS policies

**"Unknown tool"**
→ Rebuild the server: `pnpm build`

## Support

- GitHub: https://github.com/executiveusa/strapi-template-new-world-kids
- Issues: https://github.com/executiveusa/strapi-template-new-world-kids/issues

## License

MIT
