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

export default function LocaleSwitcher({
  locale,
}: {
  readonly locale: Locale
}) {
  const basePath = stripLocale(usePathname())

  return (
    <div className="inline-flex items-center rounded-sm border border-[var(--color-ink)]/15 bg-[var(--color-ink)]/[0.03] p-1 text-xs">
      <Link
        href={basePath}
        locale="en"
        aria-current={locale === "en" ? "true" : undefined}
        style={{
          color:
            locale === "en"
              ? "#fff"
              : "color-mix(in srgb, var(--color-ink) 65%, transparent)",
          backgroundColor: locale === "en" ? "var(--color-ink)" : "transparent",
        }}
        className="rounded px-2.5 py-1.5 font-bold transition-colors hover:!text-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
      >
        EN
      </Link>
      <Link
        href={basePath}
        locale="es"
        aria-current={locale === "es" ? "true" : undefined}
        style={{
          color:
            locale === "es"
              ? "#fff"
              : "color-mix(in srgb, var(--color-ink) 65%, transparent)",
          backgroundColor: locale === "es" ? "var(--color-ink)" : "transparent",
        }}
        className="rounded px-2.5 py-1.5 font-bold transition-colors hover:!text-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
      >
        ES
      </Link>
    </div>
  )
}
