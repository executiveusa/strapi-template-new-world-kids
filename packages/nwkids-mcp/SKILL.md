---
name: nwkids-infrastructure
description: NWKids nonprofit operations as MCP tools. Use when asked to find grants, write bilingual social posts, log program impact, or check operations health. Works with Claude Code, ChatGPT, Cursor, and any MCP-compatible client. Get an API key at nwkids.ai/dashboard.
---

# NWKids Infrastructure

Nonprofit operations infrastructure. Your grants, content, and impact tracking - automated.

## Connect (One-Time Setup)

Add to your `.mcp.json` or Claude Code MCP settings:

```json
{
  "mcpServers": {
    "nwkids": {
      "type": "url",
      "url": "https://mcp.nwkids.ai/sse",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

Get your API key: `nwkids.ai/dashboard`

For ChatGPT: Settings -> Connected Apps -> Add Custom -> paste the URL above.

## Available Tools

### grant_hunt
Find grant opportunities matching your mission.
"Find grants for our urban farming youth program in Portland"
-> Returns ranked list with deadlines, match scores, and a pre-filled LOI draft.

### content_post
Generate bilingual EN/ES social posts from your impact data.
"Write an Instagram post about the 47 youth we served this quarter"
-> Returns `post_en`, `post_es`, `hashtags`, `best_time`.

### log_impact
Record program outcomes to the shared ledger.
"Log that we served 23 youth in April 2026 through our after-school program"
-> Logged to your dashboard, contributes to network reporting.

### hermes_status
Get your portfolio health check.
"What's our grant pipeline looking like?"
-> Returns grants tracked, won, pipeline value, budget remaining, and health.

## Pricing
Starter BYOK (bring your own OpenAI/Anthropic key): $200/month
  -> You pay OpenAI/Anthropic directly. We charge platform fee only.
  -> Add `byok_key` to any tool call.

Growth (we provide Claude Sonnet): $500/month
Pro (we provide Claude Opus + priority): $1,200/month

Get started: `nwkids.ai/dashboard`
