import type { Metadata } from "next"

import { Link } from "@/lib/navigation"

import { submitOpportunity } from "./actions"

const copy = {
  en: {
    eyebrow: "First 12 · Project intake",
    title: "Bring one real opportunity.",
    intro: "Tell us what needs to be done, what a young person could contribute, and who will supervise the work.",
    submittedTitle: "Project received.",
    submittedBody: "We will review fit, safety, supervision, timing, and pathway before anything is offered to a participant.",
    errorTitle: "We could not save that submission.",
    errorBody: "Check the required fields and try again, or email info@nwkids.org.",
    organization: "Organization or business",
    contact: "Contact name",
    email: "Email",
    phone: "Phone · optional",
    pathway: "Best-fit pathway",
    project: "What is the real project?",
    work: "What could a participant actually do?",
    location: "Where would the work happen?",
    timing: "Timing · optional",
    compensation: "Compensation · optional",
    supervision: "Who will supervise and support the work?",
    notes: "Anything else we should know? · optional",
    consent: "I understand this is an opportunity proposal, not a guaranteed participant placement, and New World Kids will review it before making a match.",
    submit: "Send project",
    back: "Back to New World Kids",
  },
  es: {
    eyebrow: "Primeros 12 · Registro de proyecto",
    title: "Trae una oportunidad real.",
    intro: "Cuéntanos qué necesita hacerse, cómo podría contribuir un joven y quién supervisará el trabajo.",
    submittedTitle: "Proyecto recibido.",
    submittedBody: "Revisaremos el encaje, la seguridad, la supervisión, el tiempo y el camino antes de ofrecer algo a un participante.",
    errorTitle: "No pudimos guardar el envío.",
    errorBody: "Revisa los campos obligatorios e inténtalo de nuevo, o escribe a info@nwkids.org.",
    organization: "Organización o negocio",
    contact: "Nombre de contacto",
    email: "Correo electrónico",
    phone: "Teléfono · opcional",
    pathway: "Camino que mejor encaja",
    project: "¿Cuál es el proyecto real?",
    work: "¿Qué podría hacer realmente un participante?",
    location: "¿Dónde se realizaría el trabajo?",
    timing: "Fechas o tiempo · opcional",
    compensation: "Compensación · opcional",
    supervision: "¿Quién supervisará y apoyará el trabajo?",
    notes: "¿Algo más que debamos saber? · opcional",
    consent: "Entiendo que esta es una propuesta de oportunidad, no una colocación garantizada, y que New World Kids la revisará antes de hacer una conexión.",
    submit: "Enviar proyecto",
    back: "Volver a New World Kids",
  },
} as const

const pathwayOptions = {
  en: [["technology", "Built for Good · Technology"], ["sports", "Beyond the Game · Sports"], ["food_systems", "Ground Up · Urban Gardening + Food Systems"], ["art", "Make Your Mark · Art"], ["cross_pathway", "Cross-pathway / not sure yet"]],
  es: [["technology", "Built for Good · Tecnología"], ["sports", "Beyond the Game · Deportes"], ["food_systems", "Ground Up · Jardinería urbana + sistemas alimentarios"], ["art", "Make Your Mark · Arte"], ["cross_pathway", "Varios caminos / aún no estoy seguro"]],
} as const

const inputClass = "mt-2 min-h-12 w-full rounded-none border-0 border-b border-black/25 bg-transparent px-0 py-3 text-base text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-nwk-blue)] focus:ring-0"
const labelClass = "block text-[10px] font-semibold tracking-[0.14em] text-black/52 uppercase sm:text-xs"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === "es" ? "Traer un proyecto · New World Kids" : "Bring a project · New World Kids",
    description: locale === "es" ? "Propón un proyecto real para los Primeros 12 de New World Kids en Seattle." : "Propose a real project for the New World Kids First 12 in Seattle.",
  }
}

export default async function OpportunityPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ submitted?: string; error?: string }> }) {
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
          <h1 className="mt-4 max-w-5xl text-[clamp(2.9rem,10vw,7rem)] leading-[0.92] font-black tracking-[-0.05em] text-balance sm:mt-5 sm:tracking-[-0.055em]">{t.title}</h1>
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
            <form action={submitOpportunity} className="max-w-4xl">
              <input type="hidden" name="locale" value={locale} />
              {query.error === "1" ? <div className="mb-10 border-y border-black/20 py-5" role="alert"><p className="font-black">{t.errorTitle}</p><p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">{t.errorBody}</p></div> : null}

              <div className="grid gap-x-10 gap-y-9 md:grid-cols-2">
                <label className={labelClass}>{t.organization}<input className={inputClass} name="organization_name" required minLength={2} maxLength={160} autoComplete="organization" /></label>
                <label className={labelClass}>{t.contact}<input className={inputClass} name="contact_name" required minLength={2} maxLength={120} autoComplete="name" /></label>
                <label className={labelClass}>{t.email}<input className={inputClass} name="email" type="email" required maxLength={254} autoComplete="email" /></label>
                <label className={labelClass}>{t.phone}<input className={inputClass} name="phone" type="tel" maxLength={80} autoComplete="tel" /></label>
                <label className={`${labelClass} md:col-span-2`}>{t.pathway}<select className={inputClass} name="pathway" required defaultValue=""><option value="" disabled>—</option>{options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
                <label className={`${labelClass} md:col-span-2`}>{t.project}<textarea className={`${inputClass} min-h-32 resize-y`} name="project_summary" required minLength={20} maxLength={2500} /></label>
                <label className={`${labelClass} md:col-span-2`}>{t.work}<textarea className={`${inputClass} min-h-32 resize-y`} name="participant_work" required minLength={20} maxLength={2500} /></label>
                <label className={labelClass}>{t.location}<input className={inputClass} name="location" required minLength={2} maxLength={240} /></label>
                <label className={labelClass}>{t.timing}<input className={inputClass} name="timing" maxLength={500} /></label>
                <label className={`${labelClass} md:col-span-2`}>{t.compensation}<input className={inputClass} name="compensation" maxLength={500} /></label>
                <label className={`${labelClass} md:col-span-2`}>{t.supervision}<textarea className={`${inputClass} min-h-28 resize-y`} name="supervision" required minLength={10} maxLength={1500} /></label>
                <label className={`${labelClass} md:col-span-2`}>{t.notes}<textarea className={`${inputClass} min-h-24 resize-y`} name="notes" maxLength={2000} /></label>
              </div>

              <label className="mt-10 flex max-w-3xl items-start gap-4 border-t border-black/15 pt-6 text-sm leading-6 text-[var(--color-text-muted)]"><input className="mt-1 size-5 shrink-0 accent-[var(--color-nwk-blue)]" type="checkbox" name="consent" required /><span>{t.consent}</span></label>
              <button type="submit" className="mt-8 inline-flex min-h-12 w-full items-center justify-between border-y border-black/25 py-3 text-sm font-black focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-4 focus-visible:outline-none sm:w-72"><span>{t.submit}</span><span aria-hidden="true">→</span></button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
