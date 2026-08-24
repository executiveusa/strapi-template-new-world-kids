"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import type { Locale } from "next-intl"
import { useEffect, useState } from "react"

import LocaleSwitcher from "@/components/elementary/LocaleSwitcher"
import { Link } from "@/lib/navigation"

const navigation = {
  en: [
    { href: "/#how", label: "How it works" },
    { href: "/#first-12", label: "First 12" },
    { href: "/projects", label: "Pathways" },
    { href: "/#partners", label: "Partner" },
    { href: "/#support", label: "Support" },
  ],
  es: [
    { href: "/#how", label: "Cómo funciona" },
    { href: "/#first-12", label: "Primeros 12" },
    { href: "/projects", label: "Caminos" },
    { href: "/#partners", label: "Colaborar" },
    { href: "/#support", label: "Apoyar" },
  ],
}

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-paper)]"

export function SiteHeader({ locale }: { readonly locale: Locale }) {
  const items = locale === "es" ? navigation.es : navigation.en
  const [mobileOpen, setMobileOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!mobileOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [mobileOpen])

  return (
    <header
      data-site-header
      className="sticky top-0 z-50 border-b border-black/15 bg-[color:color-mix(in_srgb,var(--color-paper)_94%,transparent)] text-[var(--color-ink)] backdrop-blur-xl supports-[backdrop-filter]:bg-[color:color-mix(in_srgb,var(--color-paper)_88%,transparent)]"
    >
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-8 md:min-h-[68px]">
        <Link
          href="/"
          locale={locale}
          className={`flex min-w-0 items-center gap-3 rounded-sm ${focusRing}`}
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/images/nwkids-logo.png"
            alt="New World Kids"
            width={40}
            height={40}
            className="h-9 w-9 shrink-0 object-cover sm:h-10 sm:w-10"
            priority
          />
          <div className="min-w-0 leading-tight">
            <div className="text-[15px] font-black tracking-[-0.025em] text-[var(--color-ink)] sm:text-base">New World Kids</div>
            <div className="hidden text-[10px] font-bold tracking-[0.08em] text-black/45 uppercase sm:block">
              {locale === "es" ? "Intereses en oportunidades" : "Interests into opportunities"}
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label={locale === "es" ? "Navegación principal" : "Primary navigation"}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              locale={locale}
              className={`rounded-sm py-3 text-[11px] font-bold tracking-[0.08em] text-black/60 uppercase transition-colors duration-200 hover:text-[var(--color-ink)] ${focusRing}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:block"><LocaleSwitcher locale={locale} /></div>
          <Link href="/donate" locale={locale} className={`inline-flex rounded-full ${focusRing}`}>
            <motion.span
              whileHover={reduceMotion ? undefined : { y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex min-h-11 items-center rounded-full bg-[var(--color-action-orange)] px-5 text-[11px] font-black tracking-[0.07em] text-white uppercase transition-colors duration-200 hover:bg-[var(--color-action-orange-hover)]"
            >
              {locale === "es" ? "Apoyar" : "Support"}
            </motion.span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-black/25 text-[var(--color-ink)] transition-colors duration-200 hover:bg-black/5 active:bg-black/10 lg:hidden ${focusRing}`}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? (locale === "es" ? "Cerrar navegación" : "Close navigation") : (locale === "es" ? "Abrir navegación" : "Open navigation")}
          >
            {mobileOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-black/10 bg-[var(--color-paper)] md:top-[68px] md:h-[calc(100dvh-68px)] lg:hidden"
          >
            <div className="mx-auto flex min-h-full max-w-7xl flex-col px-5 py-6 sm:px-8 sm:py-8">
              <nav className="border-t border-black/15" aria-label={locale === "es" ? "Navegación móvil" : "Mobile navigation"}>
                {items.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    locale={locale}
                    className={`grid min-h-[64px] grid-cols-[42px_1fr_auto] items-center border-b border-black/15 py-3 text-[clamp(1.35rem,5.5vw,2rem)] font-black leading-none tracking-[-0.035em] text-[var(--color-ink)] ${focusRing}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="text-[10px] font-bold tracking-[0.12em] text-[var(--color-nwk-blue)]">0{index + 1}</span>
                    <span>{item.label}</span>
                    <span aria-hidden="true" className="text-base font-medium text-black/30">↗</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                <LocaleSwitcher locale={locale} />
                <Link href="/donate" locale={locale} onClick={() => setMobileOpen(false)} className={`rounded-full ${focusRing}`}>
                  <span className="inline-flex min-h-11 items-center rounded-full bg-[var(--color-action-orange)] px-6 text-[11px] font-black tracking-[0.07em] text-white uppercase">
                    {locale === "es" ? "Apoyar" : "Support"}
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}