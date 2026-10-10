import { type NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"

import { routing } from "@/lib/navigation"
import { getSiteMode, isOpenWhileHidden, PREVIEW_COOKIE } from "@/lib/site-mode"

const intl = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const previewKey = process.env.PREVIEW_KEY

  // Team preview door: /preview?key=...  sets a cookie; /preview?clear=1 removes it.
  if (pathname === "/preview") {
    const response = NextResponse.redirect(new URL("/", request.url))
    if (searchParams.get("clear") === "1") {
      response.cookies.delete(PREVIEW_COOKIE)
    } else if (previewKey && searchParams.get("key") === previewKey) {
      response.cookies.set(PREVIEW_COOKIE, previewKey, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 14,
        path: "/",
      })
    }
    response.headers.set("X-Robots-Tag", "noindex, nofollow")

    return response
  }

  if (getSiteMode() === "coming-soon" && !isOpenWhileHidden(pathname)) {
    const allowed =
      Boolean(previewKey) &&
      request.cookies.get(PREVIEW_COOKIE)?.value === previewKey
    if (!allowed) {
      const prefix =
        pathname === "/es" || pathname.startsWith("/es/") ? "/es" : ""
      const response = NextResponse.redirect(
        new URL(`${prefix}/coming-soon`, request.url),
        307
      )
      response.headers.set("X-Robots-Tag", "noindex, nofollow")

      return response
    }
  }

  const response = intl(request)
  if (getSiteMode() === "coming-soon")
    response.headers.set("X-Robots-Tag", "noindex, nofollow")

  return response
}

// Next's static config extractor requires a plain string literal here — a
// String.raw tagged template (what the unicorn/prefer-string-raw lint rule
// wants) makes it fail with "Invalid segment configuration export detected"
// at build time.
export const config = {
  // eslint-disable-next-line unicorn/prefer-string-raw
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
}
