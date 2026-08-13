"use client"

import { usePathname } from "next/navigation"
import type { Locale } from "next-intl"

import { Link } from "@/lib/navigation"

function stripLocale(pathname: string) {
  const segments = pathname.split("/")
  if (segments[1] === "en" || segments[1] === "es") {
    const remainder = segments.slice(2).join("/")
    return remainder ? `/${remainder}`.replace(/\/$/, "") : "/"
  }
  return pathname || "/"
}

export default function LocaleSwitcher({ locale }: { readonly locale: Locale }) {
  const basePath = stripLocale(usePathname())

  return (
    <div className="inline-flex items-center rounded-sm border border-white/10 bg-white/[0.03] p-1 text-xs">
      <Link href={basePath} locale="en" className={`rounded px-2.5 py-1.5 transition-colors ${locale === "en" ? "bg-white/10 text-white" : "text-white/65"}`}>EN</Link>
      <Link href={basePath} locale="es" className={`rounded px-2.5 py-1.5 transition-colors ${locale === "es" ? "bg-white/10 text-white" : "text-white/65"}`}>ES</Link>
    </div>
  )
}
