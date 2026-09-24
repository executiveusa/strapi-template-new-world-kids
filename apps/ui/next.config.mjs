import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {
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
