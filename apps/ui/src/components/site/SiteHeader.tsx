"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import type { Locale } from "next-intl"
import { useEffect, useRef, useState } from "react"

import LocaleSwitcher from "@/components/elementary/LocaleSwitcher"
import { Link } from "@/lib/navigation"

const navigation = {
  en: [
    { href: "/#first-12", label: "First 12" },
    { href: "/#how", label: "How it works" },
    { href: "/gallery", label: "Story" },
    { href: "/blog", label: "Journal" },
    { href: "/#partners", label: "Join" },
  ],
  es: [
    { href: "/#first-12", label: "Primeros 12" },
    { href: "/#how", label: "Cómo funciona" },
    { href: "/gallery", label: "Historia" },
    { href: "/blog", label: "Bitácora" },
    { href: "/#partners", label: "Súmese" },
  ],
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-paper)]"

// Keep Tab inside the open menu (the menu button stays reachable as the first stop).
function trapTab(
  event: KeyboardEvent,
  toggle: HTMLButtonElement | null,
  focusables: () => HTMLElement[]
) {
  const stops = [toggle, ...focusables()].filter(Boolean)
  const first = stops[0]
  const last = stops.at(-1)
  const atStart = event.shiftKey && document.activeElement === first
  const atEnd = !event.shiftKey && document.activeElement === last
  if (!atStart && !atEnd) return
  event.preventDefault()
  ;(atStart ? last : first)?.focus()
}

function useMenuFocus(
  open: boolean,
  setOpen: (value: boolean) => void,
  toggleRef: React.RefObject<HTMLButtonElement | null>,
  panelRef: React.RefObject<HTMLDivElement | null>
) {
  const wasOpen = useRef(false)
  useEffect(() => {
    if (!open) {
      // Return focus to the menu button after closing, but not on first render.
      if (wasOpen.current) toggleRef.current?.focus()
      wasOpen.current = false

      return
    }
    wasOpen.current = true
    const previous = document.body.style.overflow
    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []
      )
    focusables()[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
      else if (event.key === "Tab")
        trapTab(event, toggleRef.current, focusables)
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open, setOpen, toggleRef, panelRef])
}

export function SiteHeader({ locale }: { readonly locale: Locale }) {
  const items = locale === "es" ? navigation.es : navigation.en
  const [mobileOpen, setMobileOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  useMenuFocus(mobileOpen, setMobileOpen, toggleRef, panelRef)

  return (
    <header
      data-site-header
      className="sticky top-0 z-50 border-b border-black/15 bg-[color:color-mix(in_srgb,var(--color-paper)_94%,transparent)] text-[var(--color-ink)] backdrop-blur-xl supports-[backdrop-filter]:bg-[color:color-mix(in_srgb,var(--color-paper)_88%,transparent)]"
    >
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-8 md:min-h-[68px]">
        <Link
          href="/"
          locale={locale}
          className={`flex min-h-11 min-w-0 items-center gap-3 rounded-sm ${focusRing}`}
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/images/nwkids-logo.png"
            alt="New World Kids"
            width={1130}
            height={694}
            className="h-9 w-auto shrink-0 sm:h-10"
            priority
          />
          <div className="min-w-0 leading-tight">
            <div className="truncate text-[15px] font-bold tracking-[-0.025em] text-[var(--color-ink)] sm:text-base">
              New World Kids
            </div>
            <div className="hidden text-xs font-bold tracking-[0.08em] text-black/62 uppercase sm:block">
              {locale === "es"
                ? "Interés → oportunidad"
                : "Interest → opportunity"}
            </div>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label={
            locale === "es" ? "Navegación principal" : "Primary navigation"
          }
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              locale={locale}
              className={`rounded-sm py-3 text-xs font-bold tracking-[0.08em] text-black/68 uppercase transition-colors duration-200 hover:text-[var(--color-ink)] ${focusRing}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden min-[340px]:block">
            <LocaleSwitcher locale={locale} />
          </div>
          <Link
            href="/donate"
            locale={locale}
            className={`press hidden min-h-11 items-center px-2 text-xs font-bold tracking-[0.08em] text-black/75 uppercase underline decoration-black/25 underline-offset-[6px] transition-colors hover:text-[var(--color-brand)] hover:decoration-[var(--color-brand)] sm:inline-flex ${focusRing}`}
          >
            {locale === "es" ? "Donar" : "Support"}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className={`press flex h-11 w-11 items-center justify-center border border-black/25 text-[var(--color-ink)] hover:bg-black/5 lg:hidden ${focusRing}`}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
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
              <X className="h-[18px] w-[18px]" />
            ) : (
              <Menu className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            ref={panelRef}
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{
              duration: reduceMotion ? 0 : 0.2,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-black/10 bg-[var(--color-paper)] md:top-[68px] md:h-[calc(100dvh-68px)] lg:hidden"
          >
            <div className="mx-auto flex min-h-full max-w-7xl flex-col px-5 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8 sm:pt-8">
              <nav
                className="border-t border-black/15"
                aria-label={
                  locale === "es" ? "Menú de navegación" : "Mobile navigation"
                }
              >
                {items.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    locale={locale}
                    className={`press grid min-h-[64px] grid-cols-[42px_minmax(0,1fr)_auto] items-center border-b border-black/15 py-3 text-[clamp(1.3rem,5.5vw,2rem)] leading-none font-bold tracking-[-0.035em] text-[var(--color-ink)] ${focusRing}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="text-xs font-bold tracking-[0.12em] text-[var(--color-nwk-blue)]">
                      0{index + 1}
                    </span>
                    <span className="min-w-0">{item.label}</span>
                    <span
                      aria-hidden="true"
                      className="text-base font-medium text-black/30"
                    >
                      ↗
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="mt-auto grid gap-4 pt-8">
                <Link
                  href="/donate"
                  locale={locale}
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full"
                >
                  <span>
                    {locale === "es"
                      ? "Apoye a Los Primeros 12"
                      : "Support the First 12"}
                  </span>
                  <span aria-hidden="true">→</span>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.12em] text-black/70 uppercase">
                    {locale === "es" ? "Idioma" : "Language"}
                  </span>
                  <LocaleSwitcher locale={locale} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
