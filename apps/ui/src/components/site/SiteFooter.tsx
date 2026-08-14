import { ArrowUpRight } from "lucide-react"
import type { Locale } from "next-intl"

import { socialLinks } from "@/components/site/siteData"
import { Link } from "@/lib/navigation"

const explore = {
  en: [
    { href: "/#programs", label: "Programs" },
    { href: "/#timeline", label: "Timeline" },
    { href: "/#proof", label: "Trust" },
    { href: "/mission", label: "Mission" },
    { href: "/work-with-us", label: "Services" },
  ],
  es: [
    { href: "/#programs", label: "Programas" },
    { href: "/#timeline", label: "Cronología" },
    { href: "/#proof", label: "Confianza" },
    { href: "/mission", label: "Misión" },
    { href: "/work-with-us", label: "Servicios" },
  ],
}

const hsiDisclosure =
  "New World Kids is a nonprofit program through fiscal sponsorship with Humanitarian Social Innovations, a 501(c)3 public charity. (46-4779591) Questions regarding the relationship should be directed to office@hsifiscalsponsor.org."

export function SiteFooter({ locale }: { readonly locale: Locale }) {
  const items = locale === "es" ? explore.es : explore.en

  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.9fr]">
        <div className="space-y-5">
          <div className="font-serif text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
            {locale === "es"
              ? "Mira el trabajo. Luego decide si vale la pena apoyarlo."
              : "See the work. Then decide if it is worth backing."}
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--color-text-muted)]">
            {locale === "es"
              ? "New World Kids muestra el trabajo en público y también ofrece servicios a otros equipos con misión. Las dos cosas siguen la misma regla: menos promesas, más evidencia."
              : "New World Kids shows the work in public and also provides services to other mission-driven teams. Both sides follow the same rule: fewer promises, more proof."}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/donate" locale={locale}>
              <span className="inline-flex h-10 items-center rounded-full bg-[var(--color-accent-coral)] px-5 text-sm font-semibold text-white shadow-[var(--shadow-sm)] transition-colors duration-150 hover:bg-[var(--color-accent-coral-hover)]">
                {locale === "es" ? "Donar ahora" : "Donate now"}
              </span>
            </Link>
            <Link
              href="/work-with-us"
              locale={locale}
              className="inline-flex h-10 items-center rounded-full border border-[var(--color-border-subtle)] px-5 text-sm font-semibold text-[var(--color-text-primary)] transition hover:bg-[var(--color-surface)]"
            >
              {locale === "es" ? "Ver servicios" : "See services"}
            </Link>
          </div>

          <div className="rounded-xl border border-[var(--color-accent-gold)]/20 bg-[var(--color-surface)] p-4 text-xs leading-6 text-[var(--color-text-muted)]">
            <img
              src="https://hsifiscalsponsor.org/wp-content/uploads/2024/05/HSI-Program-Footer-Logo-no-bg-1.png"
              alt="Humanitarian Social Innovations fiscal sponsorship"
              loading="lazy"
              className="mb-3 h-auto w-40 max-w-full"
            />
            <p>{hsiDisclosure}</p>
            {locale === "es" ? (
              <p className="mt-2 text-[11px] leading-5">
                New World Kids participa como programa bajo patrocinio fiscal de
                Humanitarian Social Innovations. El texto en inglés anterior es
                la divulgación requerida por HSI.
              </p>
            ) : null}
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
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
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
