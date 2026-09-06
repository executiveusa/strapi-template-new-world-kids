import type { Metadata } from "next"

import { Link } from "@/lib/navigation"

import { submitMentor } from "./actions"

const copy = {
  en: {
    eyebrow: "First 12 · Mentor intake",
    title: "Work beside someone building a next step.",
    intro: "Mentorship here is tied to real work. Tell us what you know, where you can help, and what time you can reliably give.",
    submittedTitle: "Mentor interest received.",
    submittedBody: "We will review fit, availability, pathway needs, and required screening before making any participant connection.",
    errorTitle: "We could not save that submission.",
    errorBody: "Check the required fields and try again, or email info@nwkids.org.",
    name: "Your name",
    email: "Email",
    phone: "Phone · optional",
    organization: "Organization or company · optional",
    pathway: "Best-fit pathway",
    expertise: "What do you know how to do?",
    availability: "What time can you reliably give?",
    location: "Where are you based?",
    offer: "What could you help a young person learn, complete, or navigate?",
    notes: "Anything else we should know? · optional",
    screening: "I am willing to complete New World Kids' required mentor screening before working directly with a participant.",
    consent: "I understand this is an expression of interest, not an automatic mentor placement, and New World Kids will review fit before making a connection.",
    submit: "Send mentor interest",
    back: "Back to New World Kids",
  },
  es: {
    eyebrow: "Primeros 12 · Registro de mentor",
    title: "Trabaja al lado de alguien que construye su siguiente paso.",
    intro: "Aquí la mentoría está conectada con trabajo real. Cuéntanos qué sabes, dónde puedes ayudar y cuánto tiempo puedes ofrecer de manera constante.",
    submittedTitle: "Interés de mentor recibido.",
    submittedBody: "Revisaremos el encaje, la disponibilidad, las necesidades del camino y la evaluación requerida antes de conectar a cualquier participante.",
    errorTitle: "No pudimos guardar el envío.",
    errorBody: "Revisa los campos obligatorios e inténtalo de nuevo, o escribe a info@nwkids.org.",
    name: "Tu nombre",
    email: "Correo electrónico",
    phone: "Teléfono · opcional",
    organization: "Organización o empresa · opcional",
    pathway: "Camino que mejor encaja",
    expertise: "¿Qué sabes hacer?",
    availability: "¿Qué tiempo puedes ofrecer de forma constante?",
    location: "¿Dónde estás ubicado?",
    offer: "¿Qué podrías ayudar a un joven a aprender, completar o navegar?",
    notes: "¿Algo más que debamos saber? · opcional",
    screening: "Estoy dispuesto a completar la evaluación requerida por New World Kids antes de trabajar directamente con un participante.",
    consent: "Entiendo que esto expresa interés, no garantiza una colocación como mentor, y que New World Kids revisará el encaje antes de hacer una conexión.",
    submit: "Enviar interés de mentor",
    back: "Volver a New World Kids",
  },
} as const

const pathwayOptions = {
  en: [["technology", "Built for Good · Technology"], ["sports", "Beyond the Game · Sports"], ["food_systems", "Ground Up · Urban Gardening + Food Systems"], ["art", "Make Your Mark · Art"], ["cross_pathway", "Cross-pathway / flexible"]],
  es: [["technology", "Built for Good · Tecnología"], ["sports", "Beyond the Game · Deportes"], ["food_systems", "Ground Up · Jardinería urbana + sistemas alimentarios"], ["art", "Make Your Mark · Arte"], ["cross_pathway", "Varios caminos / flexible"]],
} as const

const inputClass = "mt-2 min-h-12 w-full rounded-none border-0 border-b border-black/25 bg-transparent px-0 py-3 text-base text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-nwk-blue)] focus:ring-0"
const labelClass = "block text-[10px] font-semibold tracking-[0.14em] text-black/52 uppercase sm:text-xs"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === "es" ? "Ser mentor · New World Kids" : "Become a mentor · New World Kids",
    description: locale === "es" ? "Expresa interés en ser mentor de los Primeros 12 de New World Kids en Seattle." : "Express interest in mentoring the New World Kids First 12 in Seattle.",
  }
}

export default async function MentorPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ submitted?: string; error?: string }> }) {
  const { locale: rawLocale } = await params
  const query = await searchParams
  const locale = rawLocale === "es" ? "es" : "en"
  const t = copy[locale]
  const options = pathwayOptions[locale]

  return (
    <main className="bg-[var(--color-paper)] text-[var(--color-ink)]">
      <section className="border-b border-black/15 px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.eyebrow}</p>
          <h1 className="mt-4 max-w-6xl text-[clamp(2.9rem,10vw,7rem)] leading-[0.92] font-black tracking-[-0.05em] text-balance sm:mt-5 sm:tracking-[-0.055em]">{t.title}</h1>
          <p className="mt-7 max-w-2xl border-t border-black/15 pt-6 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">{t.intro}</p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          {query.submitted === "1" ? (
            <div className="max-w-3xl border-t border-black/20 pt-7">
              <h2 className="text-[clamp(2.4rem,8vw,4.5rem)] leading-[0.95] font-black tracking-[-0.045em]">{t.submittedTitle}</h2>
              <p className="mt-5 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">{t.submittedBody}</p>
              <Link href="/" locale={locale} className="mt-8 inline-flex min-h-12 items-center border-y border-black/20 py-3 text-sm font-black">{t.back} →</Link>
            </div>
          ) : (
            <form action={submitMentor} className="max-w-4xl">
              <input type="hidden" name="locale" value={locale} />
              {query.error === "1" ? <div className="mb-10 border-y border-black/20 py-5" role="alert"><p className="font-black">{t.errorTitle}</p><p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">{t.errorBody}</p></div> : null}

              <div className="grid gap-x-10 gap-y-9 md:grid-cols-2">
                <label className={labelClass}>{t.name}<input className={inputClass} name="name" required minLength={2} maxLength={120} autoComplete="name" /></label>
                <label className={labelClass}>{t.email}<input className={inputClass} name="email" type="email" required maxLength={254} autoComplete="email" /></label>
                <label className={labelClass}>{t.phone}<input className={inputClass} name="phone" type="tel" maxLength={80} autoComplete="tel" /></label>
                <label className={labelClass}>{t.organization}<input className={inputClass} name="organization" maxLength={160} autoComplete="organization" /></label>
                <label className={`${labelClass} md:col-span-2`}>{t.pathway}<select className={inputClass} name="pathway" required defaultValue=""><option value="" disabled>—</option>{options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
                <label className={`${labelClass} md:col-span-2`}>{t.expertise}<textarea className={`${inputClass} min-h-32 resize-y`} name="expertise" required minLength={20} maxLength={2500} /></label>
                <label className={labelClass}>{t.availability}<input className={inputClass} name="availability" required minLength={5} maxLength={500} /></label>
                <label className={labelClass}>{t.location}<input className={inputClass} name="location" required minLength={2} maxLength={240} /></label>
                <label className={`${labelClass} md:col-span-2`}>{t.offer}<textarea className={`${inputClass} min-h-32 resize-y`} name="support_offer" required minLength={20} maxLength={2500} /></label>
                <label className={`${labelClass} md:col-span-2`}>{t.notes}<textarea className={`${inputClass} min-h-24 resize-y`} name="notes" maxLength={2000} /></label>
              </div>

              <div className="mt-10 space-y-5 border-t border-black/15 pt-6">
                <label className="flex max-w-3xl items-start gap-4 text-sm leading-6 text-[var(--color-text-muted)]"><input className="mt-1 size-5 shrink-0 accent-[var(--color-nwk-blue)]" type="checkbox" name="screening_ack" required /><span>{t.screening}</span></label>
                <label className="flex max-w-3xl items-start gap-4 text-sm leading-6 text-[var(--color-text-muted)]"><input className="mt-1 size-5 shrink-0 accent-[var(--color-nwk-blue)]" type="checkbox" name="consent" required /><span>{t.consent}</span></label>
              </div>
              <button type="submit" className="mt-8 inline-flex min-h-12 w-full items-center justify-between border-y border-black/25 py-3 text-sm font-black focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-4 focus-visible:outline-none sm:w-72"><span>{t.submit}</span><span aria-hidden="true">→</span></button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
