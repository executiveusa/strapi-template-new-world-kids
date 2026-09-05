import "server-only"

import { createClient } from "@supabase/supabase-js"

export type ProofArtifact = {
  id: string
  project_key: string
  title: string
  pathway: string | null
  artifact_type: string
  summary: string
  asset_url: string | null
  captured_at: string | null
  location: string | null
  sort_order: number
}

export async function getProofArtifacts(limit = 6): Promise<ProofArtifact[]> {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon =
    process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) return []

  const client = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { data, error } = await client
    .from("nwkids_proof_public")
    .select(
      "id,project_key,title,pathway,artifact_type,summary,asset_url,captured_at,location,sort_order"
    )
    .order("sort_order")
    .limit(limit)

  if (error) return []
  return (data ?? []) as ProofArtifact[]
}
