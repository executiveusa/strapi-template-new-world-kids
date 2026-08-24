"use client"

import { useLocale } from "next-intl"
import { useEffect, useState } from "react"

import { Link } from "@/lib/navigation"

export function StickyDonateMobile() {
  const locale = useLocale()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("section[data-hero]")
    const support = document.querySelector<HTMLElement>("section#support")
    if (!hero) return

    let heroVisible = true
    let supportVisible = false
    const sync = () => setVisible(!heroVisible && !supportVisible)

    const heroObserver = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting
      sync()
    }, { threshold: 0 })

    const supportObserver = support
      ? new IntersectionObserver(([entry]) => {
          supportVisible = entry.isIntersecting
          sync()
        }, { threshold: 0.05 })
      : null

    heroObserver.observe(hero)
    if (support && supportObserver) supportObserver.observe(support)

    return () => {
      heroObserver.disconnect()
      supportObserver?.disconnect()
    }
  }, [])

  return (
    <div
      className={[
        "fixed right-0 bottom-0 left-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden",
        "transition-[transform,opacity] duration-200 motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      ].join(" ")}
      aria-hidden={!visible}
    >
      <div className="mx-auto max-w-md rounded-full border border-black/10 bg-[var(--color-paper)]/92 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.14)] backdrop-blur-xl">
        <Link
          href="/donate"
          locale={locale}
          tabIndex={visible ? 0 : -1}
          className="flex min-h-12 items-center justify-center rounded-full bg-[var(--color-accent-coral)] px-6 text-center text-sm font-bold text-white transition-colors duration-200 hover:bg-[var(--color-accent-coral-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-2"
        >
          {locale === "es" ? "Apoya a los Primeros 12 →" : "Support the First 12 →"}
        </Link>
      </div>
    </div>
  )
}
