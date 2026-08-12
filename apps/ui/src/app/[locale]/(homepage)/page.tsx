import type { Metadata } from "next"

import { Homepage } from "@/components/homepage/Homepage"

export const metadata: Metadata = {
  title: "New World Kids — Practical Life Skills Through Real Projects",
  description:
    "New World Kids teaches practical food, water, energy, and shelter skills through hands-on projects and documents the work publicly.",
  openGraph: {
    title: "New World Kids — Practical Life Skills Through Real Projects",
    description:
      "See the programs, field archive, gallery, public records, and services offered by New World Kids.",
    type: "website",
  },
}

export default function Page() {
  return <Homepage />
}
