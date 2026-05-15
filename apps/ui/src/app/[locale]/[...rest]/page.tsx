import { notFound } from "next/navigation"

export const dynamic = "force-static"
export const revalidate = 300
export const dynamicParams = true

export async function generateMetadata() {
  return {
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default function LegacyContentRoute() {
  notFound()
}
