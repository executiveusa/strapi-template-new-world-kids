# @nwkids/mcp-server

NWKids Infrastructure MCP Server - Grant hunting, content publishing, impact logging, and Hermes status for Claude Code, ChatGPT, Cursor, and any MCP-compatible client.

## Quick Start

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Set environment variables
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
export SUPABASE_ANON_KEY="your-anon-key"

# Test locally
node dist/index.js
```

## Documentation

See [docs/SKILL.md](./docs/SKILL.md) for full installation and usage instructions.

## Tools

1. **grant_hunt** - Search for grant opportunities
2. **content_post** - Draft bilingual social content
3. **log_impact** - Log program impact metrics
4. **hermes_status** - Get agent status and activity

## License

MIT
