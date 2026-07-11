"use client"

import { usePathname } from "next/navigation"

import { siteLinks } from "@/components/site/siteData"
import { Link } from "@/lib/navigation"

const copy = {
  en: {
    eyebrow: "404",
    title: "This page hasn't been planted yet.",
    body: "The link that brought you here points at something that doesn't exist — either it moved, or it isn't built yet. Here's how to get back on track.",
    home: "Back to homepage",
    donate: "Donate",
    contact: "Email us",
  },
  es: {
    eyebrow: "404",
    title: "Esta página aún no ha sido sembrada.",
    body: "El enlace que te trajo aquí apunta a algo que no existe — se movió, o todavía no está construido. Así puedes retomar el camino.",
    home: "Volver al inicio",
    donate: "Donar",
    contact: "Escríbenos",
  },
}

export default function NotFound() {
  const pathname = usePathname()
  const locale = pathname.startsWith("/es") ? "es" : "en"
  const t = copy[locale]

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-28 text-center sm:px-8">
      <p className="font-serif text-6xl font-bold text-[var(--color-accent-gold)]">
        {t.eyebrow}
      </p>
      <h1 className="mt-4 font-serif text-2xl font-semibold text-[var(--color-text-primary)]">
        {t.title}
      </h1>
      <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">
        {t.body}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" locale={locale}>
          <span className="inline-flex h-10 items-center rounded-full bg-[var(--color-accent-coral)] px-5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--color-accent-coral-hover)]">
            {t.home}
          </span>
        </Link>
        <Link href="/donate" locale={locale}>
          <span className="inline-flex h-10 items-center rounded-full border border-[var(--color-border-subtle)] px-5 text-sm font-semibold text-[var(--color-text-primary)] transition-colors duration-150 hover:border-[var(--color-accent-gold)]/40">
            {t.donate}
          </span>
        </Link>
        <a
          href={siteLinks.email}
          className="inline-flex h-10 items-center rounded-full border border-[var(--color-border-subtle)] px-5 text-sm font-semibold text-[var(--color-text-primary)] transition-colors duration-150 hover:border-[var(--color-accent-gold)]/40"
        >
          {t.contact}
        </a>
      </div>
    </div>
  )
}
