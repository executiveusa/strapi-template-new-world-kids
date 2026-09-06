import { ArrowUpRight } from "lucide-react"
import type { Locale } from "next-intl"

import { socialLinks } from "@/components/site/siteData"
import { Link } from "@/lib/navigation"

const explore = {
  en: [
    { href: "/#first-12", label: "First 12" },
    { href: "/#how", label: "How it works" },
    { href: "/gallery", label: "Story" },
    { href: "/#partners", label: "Join" },
  ],
  es: [
    { href: "/#first-12", label: "Primeros 12" },
    { href: "/#how", label: "Cómo funciona" },
    { href: "/gallery", label: "Historia" },
    { href: "/#partners", label: "Súmate" },
  ],
}

const hsiDisclosure =
  "New World Kids is a nonprofit program through fiscal sponsorship with Humanitarian Social Innovations, a 501(c)3 public charity. (46-4779591) Questions regarding the relationship should be directed to office@hsifiscalsponsor.org."

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"

function socialLabel(key: string, fallback: string, locale: Locale) {
  if (key === "instagram") return locale === "es" ? "Proyecto Indigo Azul · Instagram" : "Proyecto Indigo Azul · Instagram"
  if (key === "youtube") return locale === "es" ? "Proyecto Indigo Azul · YouTube" : "Proyecto Indigo Azul · YouTube"
  if (key === "facebook") return locale === "es" ? "New World Kids · Facebook" : "New World Kids · Facebook"
  return fallback
}

export function SiteFooter({ locale }: { readonly locale: Locale }) {
  const items = locale === "es" ? explore.es : explore.en
  const visibleSocialLinks = socialLinks.filter((link) => link.key !== "linkedin")

  return (
    <footer className="border-t border-black/15 bg-[var(--color-bg)]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.7fr_1fr] lg:gap-16">
          <div>
            <div className="max-w-xl text-[clamp(2rem,7vw,4rem)] leading-[0.96] font-black tracking-[-0.045em] text-balance text-[var(--color-text-primary)]">
              {locale === "es" ? "Interés. Oportunidad. Siguiente paso." : "Interest. Opportunity. Next step."}
            </div>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
              {locale === "es"
                ? "Empezamos con los Primeros 12 en Seattle y seguimos involucrados después de la primera oportunidad."
                : "We’re starting with the First 12 in Seattle and staying involved beyond the first opportunity."}
            </p>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link href="/#partners" locale={locale} className={`inline-flex min-h-11 items-center border-y border-black/25 py-3 text-sm font-black text-[var(--color-text-primary)] ${focusRing}`}>
                {locale === "es" ? "Súmate al trabajo →" : "Join the work →"}
              </Link>
              <Link href="/donate" locale={locale} className={`inline-flex min-h-11 items-center border-y border-[var(--color-action-orange)] py-3 text-sm font-black text-[var(--color-action-orange)] ${focusRing}`}>
                {locale === "es" ? "Apoyar →" : "Support →"}
              </Link>
            </div>
          </div>

          <div>
            <div className="mb-4 text-[10px] font-bold tracking-[0.18em] text-[var(--color-action-orange)] uppercase sm:text-xs">{locale === "es" ? "Explorar" : "Explore"}</div>
            <nav className="border-t border-black/15" aria-label={locale === "es" ? "Enlaces del pie" : "Footer navigation"}>
              {items.map((item) => (
                <Link key={item.href} href={item.href} locale={locale} className={`flex min-h-11 items-center border-b border-black/10 text-sm font-semibold text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-text-primary)] ${focusRing}`}>{item.label}</Link>
              ))}
            </nav>
          </div>

          <div>
            <div className="mb-4 text-[10px] font-bold tracking-[0.18em] text-[var(--color-action-orange)] uppercase sm:text-xs">{locale === "es" ? "Historia y contacto" : "Story & Contact"}</div>
            <div className="border-t border-black/15">
              {visibleSocialLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className={`flex min-h-11 items-center justify-between border-b border-black/10 text-sm font-semibold text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-text-primary)] ${focusRing}`}
                >
                  <span>{socialLabel(link.key, link.label, locale)}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-black/35" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-black/15 pt-7 sm:mt-16">
          <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-start md:gap-6">
            <img
              src="https://hsifiscalsponsor.org/wp-content/uploads/2024/05/HSI-Program-Footer-Logo-no-bg-1.png"
              alt="Humanitarian Social Innovations fiscal sponsorship"
              loading="lazy"
              className="h-auto w-32 max-w-full opacity-80"
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

      <div className="border-t border-black/10 px-5 py-5 text-center sm:px-8">
        <span className="text-[10px] tracking-[0.08em] text-[var(--color-text-muted)] uppercase">&copy; {new Date().getFullYear()} New World Kids</span>
      </div>
    </footer>
  )
}
