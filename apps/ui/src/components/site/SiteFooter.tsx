import type { Locale } from "next-intl"

import { socialLinks } from "@/components/site/siteData"
import { Link } from "@/lib/navigation"

const explore = {
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
    { href: "/#partners", label: "Súmate" },
  ],
}

const hsiDisclosure =
  "New World Kids is a nonprofit program through fiscal sponsorship with Humanitarian Social Innovations, a 501(c)3 public charity. (46-4779591) Questions regarding the relationship should be directed to office@hsifiscalsponsor.org."

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"

function socialLabel(key: string, fallback: string) {
  if (key === "instagram") return "Proyecto Indigo Azul · Instagram"
  if (key === "youtube") return "Proyecto Indigo Azul · YouTube"
  if (key === "facebook") return "New World Kids · Facebook"
  return fallback
}

export function SiteFooter({ locale }: { readonly locale: Locale }) {
  const items = locale === "es" ? explore.es : explore.en
  const visibleSocialLinks = socialLinks.filter((link) => link.key !== "linkedin")

  return (
    <footer className="border-t border-black/15 bg-[var(--color-bg)]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.65fr_1.05fr] lg:gap-20">
          <div>
            <div className="max-w-xl text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.94] font-black tracking-[-0.05em] text-balance text-[var(--color-text-primary)]">
              {locale === "es" ? "Interés. Oportunidad. Siguiente paso." : "Interest. Opportunity. Next step."}
            </div>
            <p className="mt-7 max-w-lg text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
              {locale === "es"
                ? "Empezamos con los Primeros 12 en Seattle y seguimos involucrados después de la primera oportunidad."
                : "We’re starting with the First 12 in Seattle and staying involved beyond the first opportunity."}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:max-w-sm">
              <Link href="/#partners" locale={locale} className={`group flex min-h-12 items-center justify-between border-y border-black/20 py-3 text-sm font-black text-[var(--color-text-primary)] ${focusRing}`}>
                <span>{locale === "es" ? "Súmate al trabajo" : "Join the work"}</span>
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/donate" locale={locale} className={`group flex min-h-12 items-center justify-between border-b border-black/20 py-3 text-sm font-black text-[var(--color-text-primary)] ${focusRing}`}>
                <span>{locale === "es" ? "Apoyar" : "Support"}</span>
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <div>
            <div className="mb-5 text-[10px] font-semibold tracking-[0.18em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{locale === "es" ? "Explorar" : "Explore"}</div>
            <nav className="border-t border-black/15" aria-label={locale === "es" ? "Enlaces del pie" : "Footer navigation"}>
              {items.map((item) => (
                <Link key={item.href} href={item.href} locale={locale} className={`group flex min-h-12 items-center justify-between border-b border-black/10 text-sm font-semibold text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-text-primary)] ${focusRing}`}>
                  <span>{item.label}</span>
                  <span aria-hidden="true" className="text-black/30 transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <div className="mb-5 text-[10px] font-semibold tracking-[0.18em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{locale === "es" ? "Historia y contacto" : "Story & Contact"}</div>
            <div className="border-t border-black/15">
              {visibleSocialLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className={`group flex min-h-12 items-center justify-between gap-5 border-b border-black/10 text-sm font-semibold text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-text-primary)] ${focusRing}`}
                >
                  <span>{socialLabel(link.key, link.label)}</span>
                  <span aria-hidden="true" className="shrink-0 text-black/30 transition-transform duration-200 group-hover:translate-x-1">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-black/15 pt-9 sm:mt-24">
          <div className="grid gap-7 md:grid-cols-[auto_1fr] md:items-start md:gap-8">
            <img
              src="https://hsifiscalsponsor.org/wp-content/uploads/2024/05/HSI-Program-Footer-Logo-no-bg-1.png"
              alt="Humanitarian Social Innovations fiscal sponsorship"
              loading="lazy"
              className="h-auto w-28 max-w-full opacity-65 grayscale"
            />
            <div className="max-w-3xl text-[11px] leading-5 text-[var(--color-text-muted)] sm:text-xs sm:leading-6">
              <p>{hsiDisclosure}</p>
              {locale === "es" ? (
                <p className="mt-2">
                  New World Kids participa como programa bajo patrocinio fiscal de Humanitarian Social Innovations. El texto en inglés anterior es la divulgación requerida por HSI.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 px-5 py-6 text-center sm:px-8">
        <span className="text-[10px] tracking-[0.08em] text-[var(--color-text-muted)] uppercase">&copy; {new Date().getFullYear()} New World Kids</span>
      </div>
    </footer>
  )
}
