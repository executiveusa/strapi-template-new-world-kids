-- NWKids MCP Server - Database Schema
-- Optional tables for API key validation and usage tracking
-- Run: psql "$DATABASE_URL" -f packages/nwkids-mcp/docs/schema.sql

-- ─────────────────────────────────────────────────────────────────────────────
-- mcp_orgs — Organizations with API keys for MCP server access
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mcp_orgs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  api_key_hash TEXT NOT NULL UNIQUE,
  active       BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mcp_orgs_api_key_hash ON mcp_orgs (api_key_hash);
CREATE INDEX IF NOT EXISTS idx_mcp_orgs_active ON mcp_orgs (active);

-- auto-update updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_mcp_orgs_updated_at ON mcp_orgs;
CREATE TRIGGER trg_mcp_orgs_updated_at
  BEFORE UPDATE ON mcp_orgs
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- mcp_usage — Log of MCP tool usage per organization
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mcp_usage (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id       UUID NOT NULL REFERENCES mcp_orgs(id) ON DELETE CASCADE,
  tool_name    TEXT NOT NULL CHECK (tool_name IN ('grant_hunt', 'content_post', 'log_impact', 'hermes_status')),
  input_params JSONB NOT NULL DEFAULT '{}',
  timestamp    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mcp_usage_org_id ON mcp_usage (org_id);
CREATE INDEX IF NOT EXISTS idx_mcp_usage_tool_name ON mcp_usage (tool_name);
CREATE INDEX IF NOT EXISTS idx_mcp_usage_timestamp ON mcp_usage (timestamp DESC);

-- ─────────────────────────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE mcp_orgs ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcp_usage ENABLE ROW LEVEL SECURITY;

-- Service role can read/write everything
CREATE POLICY "service_role_all" ON mcp_orgs
  USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all" ON mcp_usage
  USING (true) WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- Seed Data — Example organization (replace with real API key hash)
-- ─────────────────────────────────────────────────────────────────────────────
-- Generate API key hash:
-- In Node.js REPL:
-- const crypto = require('crypto');
-- const apiKey = 'your-api-key-here';
-- const hash = crypto.createHash('sha256').update(apiKey).digest('hex');
-- console.log(hash);

-- Example (do not use this in production):
-- INSERT INTO mcp_orgs (name, api_key_hash, active) VALUES (
--   'New World Kids - Internal',
--   'replace-with-actual-hash',
--   true
-- ) ON CONFLICT DO NOTHING;

-- Verify
SELECT 'mcp_orgs' as table_name, count(*) FROM mcp_orgs
UNION ALL
SELECT 'mcp_usage', count(*) FROM mcp_usage;
