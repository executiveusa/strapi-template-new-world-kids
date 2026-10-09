import type { Metadata } from "next"

import { Link } from "@/lib/navigation"
import { withCopyOverrides } from "@/lib/nwkids/copy"

// Plain-language notice limited to what the code does today (forms store to our
// database; donations are handled by HSI/FundRazr). Needs counsel and HSI review
// before launch; do not add retention periods or legal claims without that review.

export const revalidate = 60

const copy = {
  en: {
    metaTitle: "Privacy | New World Kids",
    eyebrow: "Privacy",
    title: "How we handle what you send us.",
    intro:
      "This is a plain-language notice for the mentor, project, and referral forms on this site. Ask us anything at info@nwkids.org.",
    sections: [
      {
        h: "What we collect",
        p: "Only what you type into the form: name or organization, email, optional phone, location, and your answers about the work or help you can offer. On the referral form we also ask for a young person’s first name, age, county, and interests, and who is referring them. We never ask about a young person’s health, legal, or family history.",
      },
      {
        h: "Why",
        p: "To review fit, safety, and timing, and to follow up with you. A mentor or project is never connected to a participant until we have reviewed it and, for mentors, completed screening.",
      },
      {
        h: "Where it goes",
        p: "Submissions are saved in our database, hosted by Supabase, and read by New World Kids staff. We do not sell your information.",
      },
      {
        h: "Donations",
        p: "Donations are not collected on this site. They are processed by our fiscal sponsor, Humanitarian Social Innovations, through its FundRazr platform, under their terms and privacy practices.",
      },
      {
        h: "Your choices",
        p: "To see, correct, or delete what you sent, email info@nwkids.org from the address you used.",
      },
    ],
    back: "Back to New World Kids",
  },
  es: {
    metaTitle: "Privacidad | New World Kids",
    eyebrow: "Privacidad",
    title: "Cómo manejamos lo que nos envías.",
    intro:
      "Este es un aviso en lenguaje sencillo para los formularios de mentor, proyecto y referencia de este sitio. Pregúntanos lo que quieras en info@nwkids.org.",
    sections: [
      {
        h: "Qué recopilamos",
        p: "Solo lo que escribes en el formulario: nombre u organización, correo, teléfono opcional, ubicación y tus respuestas sobre el trabajo o la ayuda que puedes ofrecer. En el formulario de referencia también pedimos el nombre de pila, la edad, el condado y los intereses de un joven, y quién lo refiere. Nunca pedimos su historial de salud, legal ni familiar.",
      },
      {
        h: "Para qué",
        p: "Para revisar el encaje, la seguridad y el momento, y para darte seguimiento. Nunca se conecta a un mentor o proyecto con un participante sin haberlo revisado y, en el caso de los mentores, sin completar la evaluación.",
      },
      {
        h: "Dónde se guarda",
        p: "Los envíos se guardan en nuestra base de datos, alojada en Supabase, y los lee el personal de New World Kids. No vendemos tu información.",
      },
      {
        h: "Donaciones",
        p: "En este sitio no se recopilan donaciones. Las procesa nuestro patrocinador fiscal, Humanitarian Social Innovations, mediante su plataforma FundRazr, bajo sus términos y prácticas de privacidad.",
      },
      {
        h: "Tus opciones",
        p: "Para ver, corregir o borrar lo que enviaste, escribe a info@nwkids.org desde el correo que usaste.",
      },
    ],
    back: "Volver a New World Kids",
  },
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  return { title: (locale === "es" ? copy.es : copy.en).metaTitle }
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale === "es" ? "es" : "en"
  const t = await withCopyOverrides("privacy", locale, copy[locale])

  return (
    <div className="bg-[var(--color-paper)] px-5 py-16 text-[var(--color-ink)] sm:px-8 sm:py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.18em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">
          {t.eyebrow}
        </p>
        <h1 className="t-h1 mt-4 text-balance">{t.title}</h1>
        <p className="mt-7 border-t border-black/15 pt-6 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
          {t.intro}
        </p>
        <div className="mt-10 divide-y divide-black/15 border-y border-black/15">
          {t.sections.map((section) => (
            <section key={section.h} className="py-7">
              <h2 className="text-xl font-bold tracking-[-0.02em]">
                {section.h}
              </h2>
              <p className="mt-2 text-base leading-7 text-[var(--color-text-muted)]">
                {section.p}
              </p>
            </section>
          ))}
        </div>
        <Link
          href="/"
          locale={locale}
          className="mt-10 inline-flex min-h-12 items-center gap-3 border-y border-black/25 py-3 text-sm font-bold focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-4 focus-visible:outline-none"
        >
          <span>{t.back}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
}
