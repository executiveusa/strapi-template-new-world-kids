import "server-only"

import { headers } from "next/headers"

// Per-instance, in-memory throttle for public forms. It stops a single visitor or script from
// flooding a form; it is not shared across server instances, so the database checks stay the last line.
const hits = new Map<string, number[]>()

export async function rateLimited(
  bucket: string,
  limit = 5,
  windowMs = 10 * 60_000
) {
  const h = await headers()
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  const key = `${bucket}:${ip}`
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000)
    for (const [k, times] of hits)
      if (times.every((t) => now - t >= windowMs)) hits.delete(k)

  return recent.length > limit
}
