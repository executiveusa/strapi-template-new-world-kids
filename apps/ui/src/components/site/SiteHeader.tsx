'use client'

import { Menu, ShieldCheck, X } from "lucide-react"
import type { Locale } from "next-intl"
import { useState } from "react"

import LocaleSwitcher from "@/components/elementary/LocaleSwitcher"
import { Button } from "@/components/ui/button"
import { fiscalSponsor } from "@/content/site"
import { Link } from "@/lib/navigation"

const navigation = {
  en: [
    { href: "/impact/food", label: "Impact" },
    { href: "/trust", label: "Trust" },
    { href: "/work-with-us", label: "Work With Us" },
    { href: "/about", label: "About" },
  ],
  es: [
    { href: "/impact/food", label: "Impacto" },
    { href: "/trust", label: "Confianza" },
    { href: "/work-with-us", label: "Trabaja con nosotros" },
    { href: "/about", label: "Nosotros" },
  ],
}

export default function SiteHeader({ locale }: { readonly locale: Locale }) {
  const items = locale === "es" ? navigation.es : navigation.en
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08100B]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            locale={locale}
            className="flex items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#C9A84C] text-sm font-black text-[#08100B]">
              NW
            </div>
            <div className="min-w-0">
              <div className="font-serif text-lg font-bold tracking-tight text-white">
                New World Kids
              </div>
              <div className="hidden text-xs text-[#E8DEC7]/55 sm:block">
                {locale === "es"
                  ? "Alimentos, agua, energia y refugio"
                  : "Food, water, energy, and shelter"}
              </div>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              locale={locale}
              className="text-sm text-[#E8DEC7]/72 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/blog"
            className="text-sm text-[#E8DEC7]/72 transition-colors hover:text-white"
          >
            {locale === "es" ? "Bitacora" : "Journal"}
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:block">
            <LocaleSwitcher locale={locale} />
          </div>
          <Link href="/donate" locale={locale}>
            <Button className="h-10 rounded-sm bg-[#C9A84C] px-4 text-sm font-semibold text-[#08100B] hover:bg-[#D7B867]">
              {locale === "es" ? "Donar" : "Donate"}
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 text-[#E8DEC7]/65 lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="border-t border-white/5 bg-[#0B1510]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-xs text-[#E8DEC7]/60 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-[#C9A84C]" />
            <span>
              {locale === "es"
                ? `Patrocinio fiscal: ${fiscalSponsor.name} | EIN ${fiscalSponsor.ein}`
                : `Fiscal sponsor: ${fiscalSponsor.name} | EIN ${fiscalSponsor.ein}`}
            </span>
          </div>
          <Link
            href="/trust"
            locale={locale}
            className="text-[#C9A84C] transition-colors hover:text-[#E3C573]"
          >
            {locale === "es" ? "Ver documentos" : "View verification docs"}
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#08100B] lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6">
            <div className="space-y-3">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  locale={locale}
                  className="block text-base text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="/blog"
                className="block text-base text-white"
                onClick={() => setMobileOpen(false)}
              >
                {locale === "es" ? "Bitacora" : "Journal"}
              </a>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
              <LocaleSwitcher locale={locale} />
              <Link href="/donate" locale={locale} onClick={() => setMobileOpen(false)}>
                <Button className="rounded-sm bg-[#C9A84C] text-[#08100B] hover:bg-[#D7B867]">
                  {locale === "es" ? "Donar ahora" : "Donate now"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
