CREATE TABLE IF NOT EXISTS mcp_orgs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  ein TEXT,
  plan TEXT NOT NULL DEFAULT 'starter'
    CHECK (plan IN ('starter', 'growth', 'pro')),
  api_key TEXT UNIQUE NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mcp_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES mcp_orgs(id),
  tool TEXT NOT NULL,
  tokens_used INT,
  cost_usd NUMERIC(8, 4),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE mcp_orgs ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcp_usage ENABLE ROW LEVEL SECURITY;

INSERT INTO mcp_orgs (name, slug, plan, api_key)
VALUES ('New World Kids', 'nwkids', 'pro', 'nwk_internal_replace_with_real_key')
ON CONFLICT DO NOTHING;
