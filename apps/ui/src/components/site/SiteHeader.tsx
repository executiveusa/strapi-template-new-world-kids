"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import type { Locale } from "next-intl"
import { useState } from "react"

import LocaleSwitcher from "@/components/elementary/LocaleSwitcher"
import { ThemeToggle } from "@/components/elementary/ThemeToggle"
import { Link } from "@/lib/navigation"

const navigation = {
  en: [
    { href: "/#programs", label: "Programs" },
    { href: "/gallery", label: "Gallery" },
    { href: "/#timeline", label: "Timeline" },
    { href: "/#proof", label: "Trust" },
    { href: "/mission", label: "Mission" },
    { href: "/work-with-us", label: "Work With Us" },
  ],
  es: [
    { href: "/#programs", label: "Programas" },
    { href: "/gallery", label: "Galería" },
    { href: "/#timeline", label: "Cronología" },
    { href: "/#proof", label: "Confianza" },
    { href: "/mission", label: "Misión" },
    { href: "/work-with-us", label: "Trabaja con nosotros" },
  ],
}

export function SiteHeader({ locale }: { readonly locale: Locale }) {
  const items = locale === "es" ? navigation.es : navigation.en
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      data-site-header
      className="sticky top-0 z-50 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg)]/85 backdrop-blur-md transition-colors duration-300"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Link
          href="/"
          locale={locale}
          className="flex min-w-0 items-center gap-2.5"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/images/nwkids-logo.png"
            alt="New World Kids"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-md object-cover"
            priority
          />
          <div className="min-w-0 leading-tight">
            <div className="font-serif text-base font-bold tracking-tight text-[var(--color-text-primary)]">
              New World Kids
            </div>
            <div className="hidden text-[11px] text-[var(--color-text-muted)] sm:block">
              {locale === "es"
                ? "Alimento, agua, energía y refugio"
                : "Food, water, energy, and shelter"}
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              locale={locale}
              className="text-sm text-[var(--color-text-muted)] transition-colors duration-150 hover:text-[var(--color-text-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:block">
            <LocaleSwitcher locale={locale} />
          </div>
          <ThemeToggle />
          <Link
            href="/donate"
            locale={locale}
            className="hidden sm:inline-flex"
          >
            <motion.span
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex h-9 items-center rounded-full bg-[var(--color-accent-coral)] px-4 text-sm font-semibold text-white shadow-[var(--shadow-sm)] transition-colors duration-150 hover:bg-[var(--color-accent-coral-hover)]"
            >
              {locale === "es" ? "Donar" : "Donate"}
            </motion.span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] transition-transform duration-150 active:scale-90 lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
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
            className="overflow-hidden border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)] lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 sm:px-8">
              <div className="space-y-4">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    locale={locale}
                    className="block text-base text-[var(--color-text-primary)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-[var(--color-border-subtle)] pt-4">
                <LocaleSwitcher locale={locale} />
                <Link
                  href="/donate"
                  locale={locale}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="inline-flex h-10 items-center rounded-full bg-[var(--color-accent-coral)] px-5 text-sm font-semibold text-white">
                    {locale === "es" ? "Donar ahora" : "Donate now"}
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
