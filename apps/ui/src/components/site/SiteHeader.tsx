"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import type { Locale } from "next-intl"
import { useState } from "react"

import LocaleSwitcher from "@/components/elementary/LocaleSwitcher"
import { Link } from "@/lib/navigation"

const navigation = {
  en: [
    { href: "/#how", label: "How it works" },
    { href: "/#first-12", label: "First 12" },
    { href: "/projects", label: "Projects" },
    { href: "/#partners", label: "Partner" },
    { href: "/gallery", label: "Indigo Azul" },
  ],
  es: [
    { href: "/#how", label: "Cómo funciona" },
    { href: "/#first-12", label: "Primeros 12" },
    { href: "/projects", label: "Proyectos" },
    { href: "/#partners", label: "Colaborar" },
    { href: "/gallery", label: "Indigo Azul" },
  ],
}

export function SiteHeader({ locale }: { readonly locale: Locale }) {
  const items = locale === "es" ? navigation.es : navigation.en
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      data-site-header
      className="sticky top-0 z-50 border-b-2 border-[var(--color-ink)] bg-[var(--color-paper)] text-[var(--color-ink)]"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 md:py-3.5">
        <Link
          href="/"
          locale={locale}
          className="flex min-w-0 items-center gap-3"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/images/nwkids-logo.png"
            alt="New World Kids"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 object-cover"
            priority
          />
          <div className="min-w-0 leading-tight">
            <div className="text-sm font-black tracking-[-0.025em] text-[var(--color-ink)] sm:text-base">
              New World Kids
            </div>
            <div className="hidden text-[10px] font-bold tracking-[0.08em] text-black/50 uppercase sm:block">
              {locale === "es"
                ? "Pon tu interés a trabajar"
                : "Put your interest to work"}
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              locale={locale}
              className="text-xs font-bold tracking-[0.05em] text-black/65 uppercase transition-colors duration-150 hover:text-[var(--color-nwk-blue)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:block">
            <LocaleSwitcher locale={locale} />
          </div>
          <Link href="/donate" locale={locale} className="inline-flex">
            <motion.span
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex h-10 items-center rounded-full bg-[var(--color-action-orange)] px-5 text-xs font-black tracking-[0.06em] text-white uppercase transition-colors duration-150 hover:bg-[var(--color-action-orange-hover)]"
            >
              {locale === "es" ? "Apoyar" : "Support"}
            </motion.span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--color-ink)] text-[var(--color-ink)] transition-transform duration-150 active:scale-90 lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={
              mobileOpen
                ? locale === "es"
                  ? "Cerrar navegación"
                  : "Close navigation"
                : locale === "es"
                  ? "Abrir navegación"
                  : "Open navigation"
            }
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t-2 border-[var(--color-ink)] bg-[var(--color-paper)] lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:px-8">
              <div className="space-y-1">
                {items.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    locale={locale}
                    className="grid grid-cols-[40px_1fr] items-center border-b border-black/15 py-3 text-base font-black tracking-[-0.02em] text-[var(--color-ink)] last:border-b-0"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="text-xs font-bold text-[var(--color-nwk-blue)]">
                      0{index + 1}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
              <div className="flex items-center justify-between gap-4 border-t-2 border-[var(--color-ink)] pt-4">
                <LocaleSwitcher locale={locale} />
                <Link
                  href="/donate"
                  locale={locale}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="inline-flex h-10 items-center rounded-full bg-[var(--color-action-orange)] px-5 text-xs font-black tracking-[0.06em] text-white uppercase">
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
