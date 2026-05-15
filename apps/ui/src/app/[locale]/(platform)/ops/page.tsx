import type { Metadata } from "next"

import { OpsPage } from "@/components/ops/OpsPage"

export const metadata: Metadata = {
  title: "Live Operations",
  description:
    "Hermes runs New World Kids operations in public. Every grant tracked, every post published, every decision logged.",
}

export default function Page() {
  return <OpsPage />
}
