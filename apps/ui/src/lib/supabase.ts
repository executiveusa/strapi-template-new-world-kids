import { createClient } from "@supabase/supabase-js"

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error("[NWKids] NEXT_PUBLIC_SUPABASE_URL is not set")
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error("[NWKids] NEXT_PUBLIC_SUPABASE_ANON_KEY is not set")
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
)

export function createSupabaseServerClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    ""

  return createClient(url, key)
}
