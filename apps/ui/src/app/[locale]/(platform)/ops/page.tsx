import { Metadata } from "next"
import { OpsPage } from "@/components/ops/OpsPage"

export const metadata: Metadata = {
  title: "Live Operations | New World Kids",
  description:
    "Real-time Hermes operations dashboard showing agent activity, grant tracking, content publishing, and impact metrics.",
}

export default function OperationsPage() {
  return <OpsPage />
}
