import "server-only"

import { createClient } from "@supabase/supabase-js"

// Staff-editable wording. Rows live in the `nwk_copy` table (page, locale, key, value). Any string key
// that already exists on the page's built-in text is replaced by the row's value; everything else is
// ignored. If the database is slow, empty, or not configured, the built-in text is used. Pages that call
// this should export `revalidate` so edits show up within about a minute.

type Locale = "en" | "es"

export async function withCopyOverrides<T extends Record<string, unknown>>(
  page: string,
  locale: Locale,
  base: T
): Promise<T> {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon =
    process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) return base

  try {
    const client = createClient(url, anon, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
    const { data, error } = await client
      .from("nwk_copy")
      .select("key,value")
      .eq("page", page)
      .eq("locale", locale)
      .abortSignal(AbortSignal.timeout(3000))
    if (error || !data?.length) return base

    const merged: Record<string, unknown> = { ...base }
    for (const row of data) {
      if (typeof base[row.key] === "string") merged[row.key] = row.value
    }

    return merged as T
  } catch {
    return base
  }
}
