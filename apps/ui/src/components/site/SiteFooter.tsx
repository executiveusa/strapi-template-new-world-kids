import { ArrowUpRight, Heart, ShieldCheck } from "lucide-react"
import type { Locale } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  copyForLocale,
  fiscalSponsor,
  socialLinks,
  supportRails,
  trustDocuments,
  workWithUsOffers,
} from "@/content/site"
import { Link } from "@/lib/navigation"

export default function SiteFooter({ locale }: { readonly locale: Locale }) {
  return (
    <footer className="border-t border-white/10 bg-[#07100B]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.9fr] lg:px-8">
        <div className="space-y-5">
          <div className="font-serif text-3xl font-bold tracking-tight text-white">
            {locale === "es"
              ? "Construimos confianza antes de pedir dinero."
              : "We earn trust before we ask for money."}
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#E8DEC7]/62">
            {locale === "es"
              ? "New World Kids opera con patrocinio fiscal, publica documentos de verificacion y construye en publico. Nuestra meta es simple: que cualquier persona entienda la mision, vea la prueba y pueda apoyar sin friccion."
              : "New World Kids operates under fiscal sponsorship, publishes verification documents, and builds in public. The goal is simple: anyone should understand the mission, see the proof, and support it without friction."}
          </p>

          <div className="flex flex-wrap gap-3">
            <a href={supportRails.buyMeACoffee} target="_blank" rel="noreferrer">
              <Button className="rounded-sm bg-[#C9A84C] text-[#08100B] hover:bg-[#D7B867]">
                <Heart className="mr-2 h-4 w-4" />
                Buy Me a Coffee
              </Button>
            </a>
            <Link href="/donate" locale={locale}>
              <Button
                variant="outline"
                className="rounded-sm border-white/15 bg-transparent text-white hover:bg-white/5"
              >
                {locale === "es" ? "Donar ahora" : "Donate now"}
              </Button>
            </Link>
          </div>

          <div className="rounded-sm border border-[#C9A84C]/20 bg-[#0C1811] p-4 text-xs leading-6 text-[#E8DEC7]/70">
            <div className="mb-2 flex items-center gap-2 text-[#C9A84C]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="font-semibold uppercase tracking-[0.18em]">
                {locale === "es" ? "Verificacion" : "Verification"}
              </span>
            </div>
            <div>
              {locale === "es"
                ? `Patrocinio fiscal: ${fiscalSponsor.name}. EIN ${fiscalSponsor.ein}.`
                : `Fiscal sponsor: ${fiscalSponsor.name}. EIN ${fiscalSponsor.ein}.`}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-[#C9A84C]">
              {locale === "es" ? "Enlaces" : "Explore"}
            </div>
            <div className="space-y-3 text-sm text-[#E8DEC7]/68">
              <Link href="/impact/food" locale={locale} className="block hover:text-white">
                {locale === "es" ? "Impacto" : "Impact"}
              </Link>
              <Link href="/trust" locale={locale} className="block hover:text-white">
                {locale === "es" ? "Centro de confianza" : "Trust Center"}
              </Link>
              <Link href="/work-with-us" locale={locale} className="block hover:text-white">
                {locale === "es" ? "Trabaja con nosotros" : "Work With Us"}
              </Link>
              <Link href="/about" locale={locale} className="block hover:text-white">
                {locale === "es" ? "Nosotros" : "About"}
              </Link>
              <a href={supportRails.blog} className="block hover:text-white">
                {locale === "es" ? "Bitacora" : "Journal"}
              </a>
            </div>
          </div>

          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-[#C9A84C]">
              {locale === "es" ? "Redes" : "Social"}
            </div>
            <div className="space-y-3 text-sm text-[#E8DEC7]/68">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-[#C9A84C]">
              {locale === "es" ? "Documentos publicos" : "Public Documents"}
            </div>
            <div className="space-y-3">
              {trustDocuments.slice(0, 3).map((doc) => (
                <a
                  key={doc.slug}
                  href={doc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-sm border border-white/10 bg-white/[0.02] p-3 transition-colors hover:border-[#C9A84C]/30 hover:bg-white/[0.04]"
                >
                  <div className="text-sm font-medium text-white">
                    {copyForLocale(locale, doc.title)}
                  </div>
                  <div className="mt-1 text-xs leading-5 text-[#E8DEC7]/58">
                    {copyForLocale(locale, doc.summary)}
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-[#C9A84C]">
              {locale === "es" ? "Servicios que financian la mision" : "Services Funding the Mission"}
            </div>
            <div className="space-y-3 text-sm text-[#E8DEC7]/62">
              {workWithUsOffers.slice(0, 2).map((offer) => (
                <div key={offer.title.en}>
                  <div className="font-medium text-white">
                    {copyForLocale(locale, offer.title)}
                  </div>
                  <div className="mt-1 leading-6">
                    {copyForLocale(locale, offer.body)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
