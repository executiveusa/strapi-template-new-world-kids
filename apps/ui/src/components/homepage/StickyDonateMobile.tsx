"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

// Appears on mobile (≤768px) once the hero section is scrolled out of view.
// Uses IntersectionObserver on the hero section sentinel; fixed positioning
// is the only reliable way to achieve viewport-bottom attachment after scroll.
export function StickyDonateMobile() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("section[data-hero]")
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(hero)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={[
        "fixed right-0 bottom-0 left-0 z-50 px-4 pt-2 pb-4 md:hidden",
        "transition-all duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0",
      ].join(" ")}
      aria-hidden={!visible}
    >
      <div className="pb-safe rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg)]/80 backdrop-blur">
        <Link
          href="/donate"
          tabIndex={visible ? 0 : -1}
          className="block rounded-2xl bg-[var(--color-accent-coral)] py-4 text-center text-sm font-semibold text-[var(--color-text-primary)] shadow-[var(--color-accent-coral)]/30 shadow-xl transition hover:bg-[var(--color-accent-coral-hover)]"
        >
          Plant a seed — give $25 →
        </Link>
      </div>
    </div>
  )
}
