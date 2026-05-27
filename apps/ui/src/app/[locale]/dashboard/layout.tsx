import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Internal dashboard for New World Kids",
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div className="dashboard-layout">{children}</div>
}
