import createMiddleware from "next-intl/middleware"

import { routing } from "@/lib/navigation"

export default createMiddleware(routing)

// Next's static config extractor requires a plain string literal here — a
// String.raw tagged template (what the unicorn/prefer-string-raw lint rule
// wants) makes it fail with "Invalid segment configuration export detected"
// at build time.
export const config = {
  // eslint-disable-next-line unicorn/prefer-string-raw
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
}
