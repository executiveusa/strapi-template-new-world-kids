-- New World Kids — Hermes Agent Stack
-- Supabase / PostgreSQL initialization
-- Run: psql "$DATABASE_URL" -f infrastructure/hermes/init.sql

-- ─────────────────────────────────────────────────────────────────────────────
-- agent_actions — log of every autonomous agent action
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS agent_actions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id     TEXT NOT NULL CHECK (agent_id IN ('hermes', 'grant-hunter', 'content-engine')),
  action_type  TEXT NOT NULL CHECK (action_type IN (
    'heartbeat', 'grant_tracked', 'grant_draft', 'content_draft', 'report', 'deploy', 'test'
  )),
  description  TEXT NOT NULL,
  payload      JSONB NOT NULL DEFAULT '{}',
  status       TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'archived')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_agent_actions_agent_id   ON agent_actions (agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_actions_action_type ON agent_actions (action_type);
CREATE INDEX IF NOT EXISTS idx_agent_actions_status      ON agent_actions (status);
CREATE INDEX IF NOT EXISTS idx_agent_actions_created_at  ON agent_actions (created_at DESC);

-- auto-update updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_agent_actions_updated_at ON agent_actions;
CREATE TRIGGER trg_agent_actions_updated_at
  BEFORE UPDATE ON agent_actions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- weekly_reports — generated weekly summaries from Hermes heartbeat
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS weekly_reports (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_label      TEXT NOT NULL UNIQUE, -- e.g. "2024-W03"
  active_programs INT NOT NULL DEFAULT 0,
  grants_tracked  INT NOT NULL DEFAULT 0,
  content_drafted INT NOT NULL DEFAULT 0,
  summary_en      TEXT,
  summary_es      TEXT,
  payload         JSONB NOT NULL DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_weekly_reports_week ON weekly_reports (week_label DESC);

-- ─────────────────────────────────────────────────────────────────────────────
-- impact_projects — NWKids programs and initiatives
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS impact_projects (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  name_es         TEXT,
  description     TEXT,
  description_es  TEXT,
  location        TEXT NOT NULL CHECK (location IN ('seattle', 'puerto-vallarta', 'both', 'remote')),
  status          TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'planned', 'completed', 'paused')),
  start_date      DATE,
  end_date        DATE,
  impact_metrics  JSONB NOT NULL DEFAULT '{}',
  budget_usd      NUMERIC(10,2),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_impact_projects_updated_at ON impact_projects;
CREATE TRIGGER trg_impact_projects_updated_at
  BEFORE UPDATE ON impact_projects
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE agent_actions    ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_reports   ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_projects  ENABLE ROW LEVEL SECURITY;

-- Service role can read/write everything (used by Hermes agents)
CREATE POLICY "service_role_all" ON agent_actions
  USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all" ON weekly_reports
  USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all" ON impact_projects
  USING (true) WITH CHECK (true);

-- Anon can read published impact data (for public dashboard)
CREATE POLICY "anon_read_impact" ON impact_projects
  FOR SELECT USING (status = 'active');

-- ─────────────────────────────────────────────────────────────────────────────
-- Seed Data — NWKids programs
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO impact_projects (
  name, name_es, description, description_es,
  location, status, impact_metrics, budget_usd
) VALUES (
  'Forest Leadership Camp — Seattle',
  'Campamento de Liderazgo en el Bosque — Seattle',
  '6-week summer program combining nature-based education with youth leadership training for underserved youth ages 10-16 in South Seattle.',
  'Programa de verano de 6 semanas que combina educación basada en la naturaleza con formación de liderazgo juvenil para jóvenes de 10-16 años en el sur de Seattle.',
  'seattle',
  'active',
  '{"youth_served": 47, "completion_rate": 0.94, "bilingual_hours": 120}',
  45000.00
),
(
  'Digital Storytelling — Puerto Vallarta',
  'Narrativa Digital — Puerto Vallarta',
  'Year-round digital media program teaching youth in Puerto Vallarta to document and share their community stories through video, photography, and social media.',
  'Programa de medios digitales durante todo el año que enseña a jóvenes en Puerto Vallarta a documentar y compartir las historias de su comunidad a través de video, fotografía y redes sociales.',
  'puerto-vallarta',
  'active',
  '{"youth_served": 32, "stories_published": 18, "community_reach": 4200}',
  28000.00
)
ON CONFLICT DO NOTHING;

-- Verify
SELECT 'agent_actions' as table_name, count(*) FROM agent_actions
UNION ALL
SELECT 'weekly_reports', count(*) FROM weekly_reports
UNION ALL
SELECT 'impact_projects', count(*) FROM impact_projects;
