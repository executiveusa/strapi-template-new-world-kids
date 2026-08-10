import { ArrowUpRight } from "lucide-react"
import type { Locale } from "next-intl"

import { socialLinks } from "@/components/site/siteData"
import { fiscalSponsor } from "@/content/site"
import { Link } from "@/lib/navigation"

const explore = {
  en: [
    { href: "/#programs", label: "Programs" },
    { href: "/#timeline", label: "Timeline" },
    { href: "/#proof", label: "Trust" },
    { href: "/mission", label: "Mission" },
    { href: "/work-with-us", label: "Work With Us" },
  ],
  es: [
    { href: "/#programs", label: "Programas" },
    { href: "/#timeline", label: "Cronología" },
    { href: "/#proof", label: "Confianza" },
    { href: "/mission", label: "Misión" },
    { href: "/work-with-us", label: "Trabaja con nosotros" },
  ],
}

export function SiteFooter({ locale }: { readonly locale: Locale }) {
  const items = locale === "es" ? explore.es : explore.en

  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.9fr]">
        <div className="space-y-5">
          <div className="font-serif text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
            {locale === "es"
              ? "Construimos confianza antes de pedir dinero."
              : "We earn trust before we ask for money."}
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--color-text-muted)]">
            {locale === "es"
              ? "New World Kids opera con patrocinio fiscal y construye en público. La meta es simple: que cualquier persona entienda la misión, vea la prueba y pueda apoyar sin fricción."
              : "New World Kids operates under fiscal sponsorship and builds in public. The goal is simple: anyone should understand the mission, see the proof, and support it without friction."}
          </p>

          <Link href="/donate" locale={locale}>
            <span className="inline-flex h-10 items-center rounded-full bg-[var(--color-accent-coral)] px-5 text-sm font-semibold text-white shadow-[var(--shadow-sm)] transition-colors duration-150 hover:bg-[var(--color-accent-coral-hover)]">
              {locale === "es" ? "Donar ahora" : "Donate now"}
            </span>
          </Link>

          <div className="rounded-xl border border-[var(--color-accent-gold)]/20 bg-[var(--color-surface)] p-4 text-xs leading-6 text-[var(--color-text-muted)]">
            {locale === "es"
              ? `Patrocinio fiscal: ${fiscalSponsor.name}. EIN ${fiscalSponsor.ein}.`
              : `Fiscal sponsor: ${fiscalSponsor.name}. EIN ${fiscalSponsor.ein}.`}
          </div>
        </div>

        <div>
          <div className="mb-3 font-mono text-xs tracking-[0.18em] text-[var(--color-accent-gold)] uppercase">
            {locale === "es" ? "Explorar" : "Explore"}
          </div>
          <div className="space-y-3 text-sm text-[var(--color-text-muted)]">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                locale={locale}
                className="block transition-colors hover:text-[var(--color-text-primary)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 font-mono text-xs tracking-[0.18em] text-[var(--color-accent-gold)] uppercase">
            {locale === "es" ? "Redes y contacto" : "Social & Contact"}
          </div>
          <div className="space-y-3 text-sm text-[var(--color-text-muted)]">
            {socialLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="flex items-center gap-2 transition-colors hover:text-[var(--color-text-primary)]"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--color-border-subtle)] px-5 py-4 text-center sm:px-8">
        <span className="text-[11px] text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} New World Kids &middot; Site built
          by{" "}
          <a
            href="https://thepaulieffect.com"
            className="transition-colors hover:text-[var(--color-accent-gold)]"
            target="_blank"
            rel="noreferrer"
          >
            The Pauli Effect
          </a>
        </span>
      </div>
    </footer>
  )
}
