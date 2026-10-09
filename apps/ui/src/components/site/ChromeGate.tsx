"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

// The coming-soon page is a clean, full-screen page: no site header or footer around it.
export function ChromeGate({
  header,
  footer,
  children,
}: {
  readonly header: ReactNode
  readonly footer: ReactNode
  readonly children: ReactNode
}) {
  const bare = /\/coming-soon\/?$/.test(usePathname() ?? "")

  if (bare) return <>{children}</>

  return (
    <>
      {header}
      <main className="flex-1">{children}</main>
      {footer}
    </>
  )
}
