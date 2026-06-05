-- New World Kids agent_actions + missions schema handoff.
-- This file is not applied automatically. Run it manually in Supabase SQL
-- after reviewing table names, policies, and service-role access.

CREATE TABLE IF NOT EXISTS public.agent_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id TEXT NOT NULL,
  action_type TEXT NOT NULL,
  description TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'in_progress', 'completed', 'blocked', 'failed')),
  amount_usd NUMERIC(12, 2),
  requires_approval BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS agent_actions_created_at_idx
  ON public.agent_actions (created_at DESC);

CREATE INDEX IF NOT EXISTS agent_actions_action_type_idx
  ON public.agent_actions (action_type);

CREATE INDEX IF NOT EXISTS agent_actions_payload_public_idx
  ON public.agent_actions ((payload ->> 'public'));

CREATE TABLE IF NOT EXISTS public.missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  objective TEXT NOT NULL,
  owner TEXT NOT NULL DEFAULT 'hermes',
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'in_progress', 'completed', 'blocked', 'failed')),
  public BOOLEAN NOT NULL DEFAULT true,
  links JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS missions_public_created_at_idx
  ON public.missions (public, created_at DESC);

ALTER TABLE public.agent_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read public agent actions"
  ON public.agent_actions;

CREATE POLICY "Public can read public agent actions"
  ON public.agent_actions
  FOR SELECT
  USING ((payload ->> 'public')::boolean IS TRUE);

DROP POLICY IF EXISTS "Service role can manage agent actions"
  ON public.agent_actions;

CREATE POLICY "Service role can manage agent actions"
  ON public.agent_actions
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Public can read public missions"
  ON public.missions;

CREATE POLICY "Public can read public missions"
  ON public.missions
  FOR SELECT
  USING (public IS TRUE);

DROP POLICY IF EXISTS "Service role can manage missions"
  ON public.missions;

CREATE POLICY "Service role can manage missions"
  ON public.missions
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
