import type { Metadata } from "next"

import { ClearSavedForm, IntakeForm } from "@/components/site/IntakeForm"
import { Link } from "@/lib/navigation"
import { pageAlternates } from "@/lib/seo"

import { submitMentor } from "./actions"

const copy = {
  en: {
    eyebrow: "First 12 · Mentor intake",
    title: "Work beside someone building a next step.",
    intro:
      "Mentorship here is tied to real work. Tell us what you know, where you can help, and what time you can reliably give. About 5 minutes.",
    submittedTitle: "Mentor interest received.",
    submittedBody:
      "We will review fit, availability, pathway needs, and required screening before making any participant connection.",
    errorTitle: "We could not save that submission.",
    errorBody:
      "Check the required fields and try again, or email info@nwkids.org.",
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
    screening:
      "I am willing to complete New World Kids' required mentor screening before working directly with a participant.",
    consent:
      "I understand this is an expression of interest, not an automatic mentor placement, and New World Kids will review fit before making a connection.",
    submit: "Send mentor interest",
    back: "Back to New World Kids",
    privacyNote:
      "We use what you send only to review fit and follow up with you. We do not sell it.",
    privacyLink: "How we handle your information",
  },
  es: {
    eyebrow: "Primeros 12 · Registro de mentor",
    title: "Trabaje al lado de alguien que construye su siguiente paso.",
    intro:
      "Aquí la mentoría está conectada con trabajo real. Cuéntenos qué sabe hacer, dónde puede ayudar y cuánto tiempo puede ofrecer de manera constante. Toma unos 5 minutos.",
    submittedTitle: "Interés de mentor recibido.",
    submittedBody:
      "Revisaremos la compatibilidad, la disponibilidad, las necesidades del camino y la evaluación requerida antes de conectar a cualquier participante.",
    errorTitle: "No pudimos guardar el envío.",
    errorBody:
      "Revise los campos obligatorios e inténtelo de nuevo, o escriba a info@nwkids.org.",
    name: "Su nombre",
    email: "Correo electrónico",
    phone: "Teléfono · opcional",
    organization: "Organización o empresa · opcional",
    pathway: "Camino más adecuado",
    expertise: "¿Qué sabe hacer?",
    availability: "¿Qué tiempo puede ofrecer de forma constante?",
    location: "¿En qué ciudad o zona se encuentra?",
    offer: "¿En qué podría ayudar a un joven a aprender, completar o resolver?",
    notes: "¿Algo más que debamos saber? · opcional",
    screening:
      "Acepto completar la evaluación requerida por New World Kids antes de trabajar directamente con un participante.",
    consent:
      "Entiendo que esto expresa interés, no garantiza que sea asignado como mentor, y que New World Kids revisará la compatibilidad antes de hacer una conexión.",
    submit: "Enviar interés de mentor",
    back: "Volver a New World Kids",
    privacyNote:
      "Usamos lo que nos envía solo para revisar la compatibilidad y darle seguimiento. No lo vendemos.",
    privacyLink: "Cómo manejamos su información",
  },
} as const

const pathwayOptions = {
  en: [
    ["technology", "Built for Good · Technology"],
    ["sports", "Beyond the Game · Sports"],
    ["food_systems", "Ground Up · Urban Gardening + Food Systems"],
    ["art", "Make Your Mark · Art"],
    ["cross_pathway", "Cross-pathway / flexible"],
  ],
  es: [
    ["technology", "Built for Good · Tecnología"],
    ["sports", "Beyond the Game · Deportes"],
    ["food_systems", "Ground Up · Jardinería urbana + sistemas alimentarios"],
    ["art", "Make Your Mark · Arte"],
    ["cross_pathway", "Varios caminos / flexible"],
  ],
} as const

const inputClass =
  "mt-2 min-h-12 w-full rounded-none border-0 border-b border-black/60 bg-transparent px-0 py-3 text-base text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-brand)] focus:ring-0"
const labelClass =
  "block text-xs font-semibold tracking-[0.12em] text-black/70 uppercase"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    title:
      locale === "es"
        ? "Ser mentor · New World Kids"
        : "Become a mentor · New World Kids",
    description:
      locale === "es"
        ? "Exprese interés en ser mentor de Los Primeros 12 de New World Kids en Seattle: trabajo real, jóvenes de 16 a 19 años y evaluación previa."
        : "Express interest in mentoring the New World Kids First 12 in Seattle: real work, young people ages 16 to 19, and screening first.",
    alternates: pageAlternates(locale, "/mentor"),
  }
}

export default async function MentorPage({
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

  return (
    <div className="bg-[var(--color-paper)] text-[var(--color-ink)]">
      <section className="border-b border-black/15 px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">
            {t.eyebrow}
          </p>
          <h1 className="t-h1 mt-4 max-w-6xl text-balance sm:mt-5">
            {t.title}
          </h1>
          <p className="mt-7 max-w-2xl border-t border-black/15 pt-6 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
            {t.intro}
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          {query.submitted === "1" ? (
            <div className="max-w-3xl border-t border-black/20 pt-7">
              <ClearSavedForm storageKey="nwk-mentor" />
              <h2 className="t-h2">{t.submittedTitle}</h2>
              <p className="mt-5 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
                {t.submittedBody}
              </p>
              <Link
                href="/"
                locale={locale}
                className="mt-8 inline-flex min-h-12 items-center border-y border-black/20 py-3 text-sm font-bold"
              >
                {t.back} →
              </Link>
            </div>
          ) : (
            <IntakeForm
              action={submitMentor}
              storageKey="nwk-mentor"
              className="relative max-w-4xl"
            >
              <input type="hidden" name="locale" value={locale} />
              {query.error === "1" ? (
                <div
                  id="form-status"
                  tabIndex={-1}
                  className="mb-10 border-y border-black/20 py-5 outline-none"
                  role="alert"
                >
                  <p className="font-bold">{t.errorTitle}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">
                    {t.errorBody}
                  </p>
                </div>
              ) : null}

              <div className="grid gap-x-10 gap-y-9 md:grid-cols-2">
                <label className={labelClass}>
                  {t.name}
                  <input
                    className={inputClass}
                    name="name"
                    required
                    minLength={2}
                    maxLength={120}
                    autoComplete="name"
                  />
                </label>
                <label className={labelClass}>
                  {t.email}
                  <input
                    className={inputClass}
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                  />
                </label>
                <label className={labelClass}>
                  {t.phone}
                  <input
                    className={inputClass}
                    name="phone"
                    type="tel"
                    maxLength={80}
                    autoComplete="tel"
                  />
                </label>
                <label className={labelClass}>
                  {t.organization}
                  <input
                    className={inputClass}
                    name="organization"
                    maxLength={160}
                    autoComplete="organization"
                  />
                </label>
                <label className={`${labelClass} md:col-span-2`}>
                  {t.pathway}
                  <select
                    className={inputClass}
                    name="pathway"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      —
                    </option>
                    {options.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={`${labelClass} md:col-span-2`}>
                  {t.expertise}
                  <textarea
                    className={`${inputClass} min-h-32 resize-y`}
                    name="expertise"
                    required
                    minLength={20}
                    maxLength={2500}
                  />
                </label>
                <label className={labelClass}>
                  {t.availability}
                  <input
                    className={inputClass}
                    name="availability"
                    required
                    minLength={5}
                    maxLength={500}
                  />
                </label>
                <label className={labelClass}>
                  {t.location}
                  <input
                    className={inputClass}
                    name="location"
                    required
                    minLength={2}
                    maxLength={240}
                  />
                </label>
                <label className={`${labelClass} md:col-span-2`}>
                  {t.offer}
                  <textarea
                    className={`${inputClass} min-h-32 resize-y`}
                    name="support_offer"
                    required
                    minLength={20}
                    maxLength={2500}
                  />
                </label>
                <label className={`${labelClass} md:col-span-2`}>
                  {t.notes}
                  <textarea
                    className={`${inputClass} min-h-24 resize-y`}
                    name="notes"
                    maxLength={2000}
                  />
                </label>
              </div>

              <div className="mt-10 space-y-5 border-t border-black/15 pt-6">
                <label className="flex max-w-3xl items-start gap-4 text-sm leading-6 text-[var(--color-text-muted)]">
                  <input
                    className="mt-1 size-5 shrink-0 accent-[var(--color-brand)]"
                    type="checkbox"
                    name="screening_ack"
                    required
                  />
                  <span>{t.screening}</span>
                </label>
                <label className="flex max-w-3xl items-start gap-4 text-sm leading-6 text-[var(--color-text-muted)]">
                  <input
                    className="mt-1 size-5 shrink-0 accent-[var(--color-brand)]"
                    type="checkbox"
                    name="consent"
                    required
                  />
                  <span>{t.consent}</span>
                </label>
              </div>
              <p className="mt-8 max-w-3xl text-sm leading-6 text-[var(--color-text-muted)]">
                {t.privacyNote}{" "}
                <Link
                  href="/privacy"
                  locale={locale}
                  className="font-semibold underline underline-offset-4"
                >
                  {t.privacyLink}
                </Link>
              </p>
              <button
                type="submit"
                className="btn-primary mt-6 w-full sm:w-auto sm:min-w-72"
              >
                <span>{t.submit}</span>
                <span aria-hidden="true">→</span>
              </button>
            </IntakeForm>
          )}
        </div>
      </section>
    </div>
  )
}
