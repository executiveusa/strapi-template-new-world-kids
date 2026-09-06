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

const offsetClasses = ["", "lg:ml-8", "lg:ml-16", "lg:ml-24", "lg:ml-32"] as const

const hsiDisclosure =
  "New World Kids is a nonprofit program through fiscal sponsorship with Humanitarian Social Innovations, a 501(c)3 public charity. (46-4779591) Questions regarding the relationship should be directed to office@hsifiscalsponsor.org."

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-[#1e1a17]"

function socialLabel(key: string, fallback: string) {
  if (key === "instagram") return "Proyecto Indigo Azul · Instagram"
  if (key === "youtube") return "Proyecto Indigo Azul · YouTube"
  if (key === "facebook") return "New World Kids · Facebook"
  return fallback
}

export function SiteFooter({ locale }: { readonly locale: Locale }) {
  const items = locale === "es" ? explore.es : explore.en
  const visibleSocialLinks = socialLinks.filter((link) => link.key !== "linkedin")
  const statement = locale === "es" ? ["Interés.", "Oportunidad.", "Siguiente paso."] : ["Interest.", "Opportunity.", "Next step."]

  return (
    <footer className="bg-[#1e1a17] text-[#f2eee5]">
      <div className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32 xl:px-16">
        <div className="grid gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24">
          <div>
            <div className="text-[10px] font-semibold tracking-[0.22em] text-white/42 uppercase sm:text-xs">New World Kids</div>
            <div className="mt-8 max-w-2xl text-[clamp(2.8rem,7vw,6.4rem)] leading-[0.86] font-black tracking-[-0.06em] text-balance">
              <div>{statement[0]}</div>
              <div className="ml-[8%]">{statement[1]}</div>
              <div className="ml-[16%]">{statement[2]}</div>
            </div>
            <p className="mt-9 max-w-lg text-sm leading-7 text-white/58 sm:text-base">
              {locale === "es"
                ? "Empezamos con los Primeros 12 en Seattle y seguimos involucrados después de la primera oportunidad."
                : "We’re starting with the First 12 in Seattle and staying involved beyond the first opportunity."}
            </p>
          </div>

          <nav aria-label={locale === "es" ? "Enlaces del pie" : "Footer navigation"} className="self-end border-t border-white/16 pt-8 lg:pt-10">
            <div className="mb-5 text-[10px] font-semibold tracking-[0.2em] text-white/38 uppercase sm:text-xs">{locale === "es" ? "Explorar" : "Explore"}</div>
            <div className="max-w-2xl">
              {items.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  locale={locale}
                  className={`group flex w-fit min-h-12 items-center gap-5 py-1 text-[clamp(1.8rem,4.4vw,4rem)] leading-[1.02] font-medium tracking-[-0.045em] text-white/72 transition-colors duration-200 hover:text-white ${offsetClasses[index]} ${focusRing}`}
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true" className="text-[0.45em] text-white/24 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white/56">↗</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-20 grid gap-12 border-t border-white/14 pt-10 sm:mt-24 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 lg:pt-12">
          <div>
            <div className="text-[10px] font-semibold tracking-[0.2em] text-white/38 uppercase sm:text-xs">{locale === "es" ? "Historia y contacto" : "Story & Contact"}</div>
            <div className="mt-5 border-t border-white/12">
              {visibleSocialLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className={`group flex min-h-12 items-center justify-between gap-5 border-b border-white/10 text-sm font-semibold text-white/58 transition-colors duration-200 hover:text-white ${focusRing}`}
                >
                  <span>{socialLabel(link.key, link.label)}</span>
                  <span aria-hidden="true" className="shrink-0 text-white/22 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white/52">↗</span>
                </a>
              ))}
            </div>
            <Link href="/donate" locale={locale} className={`group mt-7 flex min-h-12 max-w-sm items-center justify-between border-y border-white/18 py-3 text-sm font-black text-white/84 ${focusRing}`}>
              <span>{locale === "es" ? "Apoyar" : "Support"}</span>
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="lg:pl-[10%]">
            <div className="text-[10px] font-semibold tracking-[0.2em] text-white/38 uppercase sm:text-xs">{locale === "es" ? "Patrocinio fiscal" : "Fiscal sponsorship"}</div>
            <div className="mt-6 grid gap-7 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-8">
              <img
                src="https://hsifiscalsponsor.org/wp-content/uploads/2024/05/HSI-Program-Footer-Logo-no-bg-1.png"
                alt="Humanitarian Social Innovations fiscal sponsorship"
                loading="lazy"
                className="h-auto w-24 max-w-full opacity-55 grayscale brightness-0 invert"
              />
              <div className="max-w-3xl text-[11px] leading-5 text-white/44 sm:text-xs sm:leading-6">
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
      </div>

      <div className="border-t border-white/10 px-5 py-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-2 text-[10px] tracking-[0.1em] text-white/32 uppercase sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} New World Kids</span>
          <span>Seattle · Proyecto Indigo Azul · Building in public</span>
        </div>
      </div>
    </footer>
  )
}
