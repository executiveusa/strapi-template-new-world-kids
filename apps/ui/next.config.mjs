import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts")

const isDev = process.env.NODE_ENV !== "production"

// Content Security Policy. Next.js needs inline scripts and styles, so those stay allowed;
// everything else is limited to this site and the Supabase project the pages read from.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co" + (isDev ? " ws: http:" : ""),
  "frame-src https://fundrazr.com https://*.fundrazr.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://fundrazr.com https://*.fundrazr.com",
  "object-src 'none'",
].join("; ")

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }]
  },
  async redirects() {
    return [
      {
        source: "/programs",
        destination: "/#first-12",
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
