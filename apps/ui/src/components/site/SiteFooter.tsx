import { ArrowUpRight } from "lucide-react"
import type { Locale } from "next-intl"

import { socialLinks } from "@/components/site/siteData"
import { Link } from "@/lib/navigation"

const explore = {
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

const hsiDisclosure =
  "New World Kids is a nonprofit program through fiscal sponsorship with Humanitarian Social Innovations, a 501(c)3 public charity. (46-4779591) Questions regarding the relationship should be directed to office@hsifiscalsponsor.org."

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"

export function SiteFooter({ locale }: { readonly locale: Locale }) {
  const items = locale === "es" ? explore.es : explore.en

  return (
    <footer className="border-t border-black/15 bg-[var(--color-bg)]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr_0.75fr] lg:gap-16">
          <div>
            <div className="max-w-2xl text-[clamp(2rem,7vw,4rem)] leading-[0.96] font-black tracking-[-0.045em] text-balance text-[var(--color-text-primary)]">
              {locale === "es" ? "Convertimos intereses en oportunidades." : "Help turn interest into opportunity"}
            </div>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
              {locale === "es"
                ? "Empezamos en Seattle con los Primeros 12: 12 participantes conectados con proyectos reales, mentores con experiencia y un siguiente paso claro."
                : "We're starting in Seattle with the First 12: 12 participants connected to real projects, experienced mentors, and a clear next step."}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/donate" locale={locale} className={`inline-flex rounded-full ${focusRing}`}>
                <span className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--color-accent-coral)] px-6 text-sm font-bold text-white transition-colors duration-200 hover:bg-[var(--color-accent-coral-hover)] sm:w-auto">
                  {locale === "es" ? "Apoyar a los Primeros 12" : "Support the First 12"}
                </span>
              </Link>
              <Link
                href="/#partners"
                locale={locale}
                className={`inline-flex min-h-11 items-center justify-center rounded-full border border-black/20 px-6 text-sm font-bold text-[var(--color-text-primary)] transition-colors duration-200 hover:border-black/40 hover:bg-black/[0.03] ${focusRing}`}
              >
                {locale === "es" ? "Traer una oportunidad" : "Bring an opportunity"}
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
            <div className="mb-4 text-[10px] font-bold tracking-[0.18em] text-[var(--color-action-orange)] uppercase sm:text-xs">{locale === "es" ? "Redes y contacto" : "Social & Contact"}</div>
            <div className="border-t border-black/15">
              {socialLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className={`flex min-h-11 items-center justify-between border-b border-black/10 text-sm font-semibold text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-text-primary)] ${focusRing}`}
                >
                  <span>{link.label}</span>
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