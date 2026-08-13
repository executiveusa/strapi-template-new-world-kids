"use client"

import { useLocale } from "next-intl"

const copy = {
  en: {
    eyebrow: "Public records",
    title: "What the paperwork actually proves.",
    intro: "Two records matter here: our Washington nonprofit incorporation and our fiscal sponsorship agreement. We show them separately so you can see exactly what each one proves.",
    washington: "Washington record",
    washingtonBody: "Washington nonprofit corporation. Effective May 16, 2022. UBI 604 917 764.",
    washingtonSource: "Source: Washington Secretary of State Articles of Incorporation certificate.",
    sponsor: "Fiscal sponsorship",
    sponsorBody: "A fiscal sponsorship grant agreement dated April 13, 2023 identifies Humanitarian Social Innovations as Grantor and NW Kids as Grantee for the sponsored program.",
    sponsorApproval: "The agreement also states that funding sources approached and fundraising text are subject to the Grantor's prior written approval.",
    sponsorSource: "Source: signed NW Kids Fiscal Sponsorship Grant Agreement.",
  },
  es: {
    eyebrow: "Documentos públicos",
    title: "Lo que realmente demuestran los documentos.",
    intro: "Aquí importan dos registros: la incorporación sin fines de lucro en Washington y el acuerdo de patrocinio fiscal. Los mostramos por separado para que quede claro qué demuestra cada uno.",
    washington: "Registro de Washington",
    washingtonBody: "Corporación sin fines de lucro de Washington. Vigente desde el 16 de mayo de 2022. UBI 604 917 764.",
    washingtonSource: "Fuente: certificado de Articles of Incorporation del Secretario de Estado de Washington.",
    sponsor: "Patrocinio fiscal",
    sponsorBody: "Un acuerdo de patrocinio fiscal fechado el 13 de abril de 2023 identifica a Humanitarian Social Innovations como Grantor y a NW Kids como Grantee para el programa patrocinado.",
    sponsorApproval: "El acuerdo también indica que las fuentes de financiamiento contactadas y el texto de recaudación requieren aprobación previa por escrito del Grantor.",
    sponsorSource: "Fuente: acuerdo de patrocinio fiscal de NW Kids firmado.",
  },
} as const

export function TrustSection() {
  const locale = useLocale()
  const t = locale === "es" ? copy.es : copy.en

  return (
    <section id="proof" className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">{t.eyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-6xl">{t.title}</h2>
          <p className="mt-5 text-base leading-8 text-[var(--color-text-muted)] md:text-lg">{t.intro}</p>
        </div>
        <div className="mt-14 border-y border-[var(--color-border-subtle)]">
          <div className="grid gap-6 border-b border-[var(--color-border-subtle)] py-8 md:grid-cols-[220px_1fr] md:py-10">
            <p className="text-xs tracking-[0.2em] text-[var(--color-eyebrow)] uppercase">{t.washington}</p>
            <div><h3 className="font-serif text-2xl font-semibold text-[var(--color-text-primary)] md:text-3xl">THE NORTH WEST KIDS</h3><p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)] md:text-base">{t.washingtonBody}</p><p className="mt-3 text-xs text-[var(--color-text-muted)]">{t.washingtonSource}</p></div>
          </div>
          <div className="grid gap-6 py-8 md:grid-cols-[220px_1fr] md:py-10">
            <p className="text-xs tracking-[0.2em] text-[var(--color-eyebrow)] uppercase">{t.sponsor}</p>
            <div><h3 className="font-serif text-2xl font-semibold text-[var(--color-text-primary)] md:text-3xl">Humanitarian Social Innovations</h3><p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)] md:text-base">{t.sponsorBody}</p><p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)] md:text-base">{t.sponsorApproval}</p><p className="mt-3 text-xs text-[var(--color-text-muted)]">{t.sponsorSource}</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}
