import type { Metadata } from "next"

import { Link } from "@/lib/navigation"

import { submitOpportunity } from "./actions"

const copy = {
  en: {
    eyebrow: "First 12 · Project intake",
    title: "Bring one real opportunity.",
    intro:
      "A useful project is the starting point. Tell us what needs to be done, what a young person could contribute, and who will supervise the work.",
    submittedTitle: "Project received.",
    submittedBody:
      "We will review the fit, safety, supervision, timing, and pathway before anything is offered to a participant.",
    errorTitle: "We could not save that submission.",
    errorBody: "Please check the required fields and try again, or email info@nwkids.org.",
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
    consent:
      "I understand this is an opportunity proposal, not a guaranteed participant placement, and New World Kids will review it before making a match.",
    submit: "Send project",
    back: "Back to New World Kids",
  },
  es: {
    eyebrow: "Primeros 12 · Registro de proyecto",
    title: "Trae una oportunidad real.",
    intro:
      "Un proyecto útil es el punto de partida. Cuéntanos qué necesita hacerse, cómo podría contribuir un joven y quién supervisará el trabajo.",
    submittedTitle: "Proyecto recibido.",
    submittedBody:
      "Revisaremos el encaje, la seguridad, la supervisión, el tiempo y el camino antes de ofrecer algo a un participante.",
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
    consent:
      "Entiendo que esta es una propuesta de oportunidad, no una colocación garantizada, y que New World Kids la revisará antes de hacer una conexión.",
    submit: "Enviar proyecto",
    back: "Volver a New World Kids",
  },
} as const

const pathwayOptions = {
  en: [
    ["technology", "Built for Good · Technology"],
    ["sports", "Beyond the Game · Sports"],
    ["food_systems", "Ground Up · Urban Gardening + Food Systems"],
    ["art", "Make Your Mark · Art"],
    ["cross_pathway", "Cross-pathway / not sure yet"],
  ],
  es: [
    ["technology", "Built for Good · Tecnología"],
    ["sports", "Beyond the Game · Deportes"],
    ["food_systems", "Ground Up · Jardinería urbana + sistemas alimentarios"],
    ["art", "Make Your Mark · Arte"],
    ["cross_pathway", "Varios caminos / aún no estoy seguro"],
  ],
} as const

const inputClass =
  "mt-2 min-h-12 w-full rounded-none border-0 border-b border-black/25 bg-transparent px-0 py-3 text-base text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-black/30 focus:border-[var(--color-nwk-blue)] focus:ring-0"
const labelClass = "block text-xs font-bold tracking-[0.12em] text-black/55 uppercase"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === "es" ? "Traer un proyecto · New World Kids" : "Bring a project · New World Kids",
    description:
      locale === "es"
        ? "Propón un proyecto real para los Primeros 12 de New World Kids en Seattle."
        : "Propose a real project for the New World Kids First 12 in Seattle.",
  }
}

export default async function OpportunityPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ submitted?: string; error?: string }>
}) {
  const { locale: rawLocale } = await params
  const query = await searchParams
  const locale = rawLocale === "es" ? "es" : "en"
  const t = copy[locale]
  const options = pathwayOptions[locale]
  const submitted = query.submitted === "1"
  const hasError = query.error === "1"

  return (
    <main className="bg-[var(--color-paper)] text-[var(--color-ink)]">
      <section className="border-b border-black/10 px-5 py-16 sm:px-8 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-bold tracking-[0.24em] text-[var(--color-action-orange)] uppercase sm:text-xs">
            {t.eyebrow}
          </p>
          <h1 className="mt-5 max-w-5xl text-[clamp(3.5rem,11vw,8rem)] leading-[0.88] font-black tracking-[-0.06em] text-balance">
            {t.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-black/65 md:text-xl md:leading-9">
            {t.intro}
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          {submitted ? (
            <div className="max-w-3xl border-t-4 border-[var(--color-nwk-blue)] pt-7">
              <h2 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">{t.submittedTitle}</h2>
              <p className="mt-5 text-lg leading-8 text-black/65">{t.submittedBody}</p>
              <Link
                href="/"
                locale={locale}
                className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[var(--color-ink)] px-7 text-sm font-black text-white"
              >
                {t.back} →
              </Link>
            </div>
          ) : (
            <form action={submitOpportunity} className="max-w-4xl">
              <input type="hidden" name="locale" value={locale} />

              {hasError && (
                <div className="mb-10 border-l-4 border-[var(--color-action-orange)] bg-white p-5" role="alert">
                  <p className="font-black">{t.errorTitle}</p>
                  <p className="mt-1 text-sm leading-6 text-black/60">{t.errorBody}</p>
                </div>
              )}

              <div className="grid gap-x-10 gap-y-9 md:grid-cols-2">
                <label className={labelClass}>
                  {t.organization}
                  <input className={inputClass} name="organization_name" required minLength={2} maxLength={160} autoComplete="organization" />
                </label>
                <label className={labelClass}>
                  {t.contact}
                  <input className={inputClass} name="contact_name" required minLength={2} maxLength={120} autoComplete="name" />
                </label>
                <label className={labelClass}>
                  {t.email}
                  <input className={inputClass} name="email" type="email" required maxLength={254} autoComplete="email" />
                </label>
                <label className={labelClass}>
                  {t.phone}
                  <input className={inputClass} name="phone" type="tel" maxLength={80} autoComplete="tel" />
                </label>
                <label className={`${labelClass} md:col-span-2`}>
                  {t.pathway}
                  <select className={inputClass} name="pathway" required defaultValue="">
                    <option value="" disabled>—</option>
                    {options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </label>
                <label className={`${labelClass} md:col-span-2`}>
                  {t.project}
                  <textarea className={`${inputClass} min-h-32 resize-y`} name="project_summary" required minLength={20} maxLength={2500} />
                </label>
                <label className={`${labelClass} md:col-span-2`}>
                  {t.work}
                  <textarea className={`${inputClass} min-h-32 resize-y`} name="participant_work" required minLength={20} maxLength={2500} />
                </label>
                <label className={labelClass}>
                  {t.location}
                  <input className={inputClass} name="location" required minLength={2} maxLength={240} />
                </label>
                <label className={labelClass}>
                  {t.timing}
                  <input className={inputClass} name="timing" maxLength={500} />
                </label>
                <label className={`${labelClass} md:col-span-2`}>
                  {t.compensation}
                  <input className={inputClass} name="compensation" maxLength={500} placeholder={locale === "es" ? "Por ejemplo: pagado, estipendio, por definir" : "For example: paid, stipend, to be determined"} />
                </label>
                <label className={`${labelClass} md:col-span-2`}>
                  {t.supervision}
                  <textarea className={`${inputClass} min-h-28 resize-y`} name="supervision" required minLength={10} maxLength={1500} />
                </label>
                <label className={`${labelClass} md:col-span-2`}>
                  {t.notes}
                  <textarea className={`${inputClass} min-h-24 resize-y`} name="notes" maxLength={2000} />
                </label>
              </div>

              <label className="mt-10 flex max-w-3xl items-start gap-3 text-sm leading-6 text-black/65">
                <input className="mt-1 size-4 accent-[var(--color-nwk-blue)]" type="checkbox" name="consent" required />
                <span>{t.consent}</span>
              </label>

              <button
                type="submit"
                className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--color-ink)] px-8 text-sm font-black text-white transition-transform hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-4 focus-visible:outline-none sm:w-auto"
              >
                {t.submit} →
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
