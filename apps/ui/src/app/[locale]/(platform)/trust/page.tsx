import { ShieldCheck } from "lucide-react"
import type { Metadata } from "next"
import type { Locale } from "next-intl"

import PageHero from "@/components/site/PageHero"
import { Button } from "@/components/ui/button"
import {
  copyForLocale,
  fiscalSponsor,
  trustDocuments,
} from "@/content/site"

export const metadata: Metadata = {
  title: "Trust Center",
  description:
    "Verification documents, fiscal sponsor proof, and public accountability for New World Kids.",
}

export default async function TrustPage({
  params,
}: PageProps<"/[locale]/trust">) {
  const { locale } = (await params) as { locale: Locale }

  return (
    <main className="bg-[#08110D]">
      <PageHero
        eyebrow={locale === "es" ? "Centro de confianza" : "Trust Center"}
        title={
          locale === "es"
            ? "Verificacion publica para que donar sea simple."
            : "Public verification so giving feels simple."
        }
        description={
          locale === "es"
            ? "Publicamos la capa de confianza al frente: patrocinio fiscal, EIN, cartas de determinacion y documentos de respaldo para que donantes, grants y aliados no tengan que adivinar."
            : "We put the trust layer up front: fiscal sponsorship, EIN, determination letters, and supporting documents so donors, grantmakers, and partners do not have to guess."
        }
        aside={
          <div className="space-y-4">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#C9A84C]">
              Verification snapshot
            </div>
            <div className="text-sm leading-7 text-[#E8DEC7]/66">
              <div className="font-medium text-white">{fiscalSponsor.name}</div>
              <div>EIN {fiscalSponsor.ein}</div>
              <div className="mt-3">
                {locale === "es"
                  ? "Todos los enlaces de abajo son documentos publicos listos para due diligence."
                  : "Every link below is a public document prepared for due diligence."}
              </div>
            </div>
          </div>
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          {trustDocuments.map((doc) => (
            <a
              key={doc.slug}
              href={doc.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-[#C9A84C]/35 hover:bg-white/[0.04]"
            >
              <div className="mb-4 flex items-center gap-2 text-[#C9A84C]">
                <ShieldCheck className="h-4 w-4" />
                <span className="font-mono text-xs uppercase tracking-[0.18em]">
                  {copyForLocale(locale, doc.category)}
                </span>
              </div>
              <div className="text-2xl font-medium text-white">
                {copyForLocale(locale, doc.title)}
              </div>
              <div className="mt-3 text-sm leading-7 text-[#E8DEC7]/60">
                {copyForLocale(locale, doc.summary)}
              </div>
              <div className="mt-6">
                <Button className="rounded-sm bg-[#C9A84C] text-[#08100B] hover:bg-[#D7B867]">
                  {locale === "es" ? "Abrir documento" : "Open document"}
                </Button>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
