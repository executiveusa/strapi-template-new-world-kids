import type { Metadata } from "next"

import { IntakeForm } from "@/components/site/IntakeForm"
import { Link } from "@/lib/navigation"
import { withCopyOverrides } from "@/lib/nwkids/copy"
import { pageAlternates } from "@/lib/seo"

import { submitReferral } from "./actions"

// Referral only: the pilot does not take direct applications. We collect the referrer's details and
// the young person's first name and age, never their history or contact details.

export const revalidate = 60

const copy = {
  en: {
    eyebrow: "First 12 · Referral",
    title: "Refer a young person.",
    intro:
      "For the pilot, young people join by referral only, and referrals come from adults such as coaches, counselors, and mentors. You tell us who might be a good fit. About 3 minutes. We contact you first, and we only reach out to the young person once you have talked with them.",
    who: "Ages 16 to 19 in King, Snohomish, Pierce, or Skagit County. Free for the 12 selected.",
    submittedTitle: "Referral received.",
    submittedBody:
      "We will review it and write to you. We do not contact the young person until you and they are ready.",
    errorTitle: "We could not save that referral.",
    errorBody:
      "Check the required fields and try again, or email info@nwkids.org.",
    youthHeading: "The young person",
    youthFirstName: "First name",
    youthAge: "Age",
    county: "County",
    pathway: "Best-fit pathway",
    interests: "What are they interested in or good at?",
    interestsHint:
      "Do not include health, legal, or family history. We do not need it.",
    youthAware:
      "The young person knows about this referral and is open to hearing from us.",
    guardianAware:
      "If they are under 18: their parent or guardian knows about this referral.",
    referrerHeading: "You",
    referrerName: "Your name",
    referrerEmail: "Your email",
    referrerPhone: "Phone · optional",
    referrerOrg: "Organization · optional",
    referrerRole: "Your role · optional",
    notes: "Anything else we should know? · optional",
    consent:
      "I understand this is a referral, not a guaranteed place, and New World Kids will review it.",
    privacyNote:
      "We use what you send only to review this referral and follow up with you. We do not sell it.",
    privacyLink: "How we handle your information",
    submit: "Send referral",
    back: "Back to New World Kids",
    select: "Select one",
    counties: [
      ["king", "King"],
      ["snohomish", "Snohomish"],
      ["pierce", "Pierce"],
      ["skagit", "Skagit"],
    ],
    pathways: [
      ["technology", "Built for Good · Technology"],
      ["sports", "Beyond the Game · Sports"],
      ["food_systems", "Ground Up · Urban Gardening + Food Systems"],
      ["art", "Make Your Mark · Art"],
      ["not_sure", "Not sure yet"],
    ],
  },
  es: {
    eyebrow: "Primeros 12 · Recomendación",
    title: "Recomiende a un joven.",
    intro:
      "En el piloto, los jóvenes entran solo por recomendación, y las recomendaciones vienen de adultos como entrenadores, consejeros y mentores. Cuéntenos a quién ve con el perfil adecuado. Toma unos 3 minutos. Nos comunicamos primero con usted, y solo contactamos al joven cuando usted ya habló con él o ella.",
    who: "De 16 a 19 años en los condados de King, Snohomish, Pierce o Skagit. Gratis para los 12 seleccionados.",
    submittedTitle: "Recomendación recibida.",
    submittedBody:
      "La revisaremos y le escribiremos. No contactamos al joven hasta que usted y él o ella estén listos.",
    errorTitle: "No pudimos guardar la recomendación.",
    errorBody:
      "Revise los campos obligatorios e inténtelo de nuevo, o escriba a info@nwkids.org.",
    youthHeading: "El joven",
    youthFirstName: "Nombre de pila",
    youthAge: "Edad",
    county: "Condado",
    pathway: "Camino más adecuado",
    interests: "¿Qué le interesa o en qué destaca?",
    interestsHint:
      "No incluya historial de salud, legal ni familiar. No lo necesitamos.",
    youthAware:
      "El joven sabe de esta recomendación y está de acuerdo en que lo contactemos.",
    guardianAware:
      "Si es menor de 18 años: su madre, padre o tutor sabe de esta recomendación.",
    referrerHeading: "Usted",
    referrerName: "Su nombre",
    referrerEmail: "Su correo electrónico",
    referrerPhone: "Teléfono · opcional",
    referrerOrg: "Organización · opcional",
    referrerRole: "Su cargo · opcional",
    notes: "¿Algo más que debamos saber? · opcional",
    consent:
      "Entiendo que esto es una recomendación, no un cupo garantizado, y que New World Kids la revisará.",
    privacyNote:
      "Usamos lo que nos envía solo para revisar esta recomendación y darle seguimiento. No lo vendemos.",
    privacyLink: "Cómo manejamos su información",
    submit: "Enviar recomendación",
    back: "Volver a New World Kids",
    select: "Elija una",
    counties: [
      ["king", "King"],
      ["snohomish", "Snohomish"],
      ["pierce", "Pierce"],
      ["skagit", "Skagit"],
    ],
    pathways: [
      ["technology", "Built for Good · Tecnología"],
      ["sports", "Beyond the Game · Deportes"],
      ["food_systems", "Ground Up · Alimentos y espacios comunitarios"],
      ["art", "Make Your Mark · Arte"],
      ["not_sure", "Todavía no lo sé"],
    ],
  },
} as const

const inputClass =
  "mt-2 min-h-12 w-full rounded-none border-0 border-b border-black/60 bg-transparent px-0 py-3 text-base text-[var(--color-ink)] outline-none transition-colors focus:border-[var(--color-brand)] focus:ring-0"
const labelClass =
  "block text-xs font-semibold tracking-[0.12em] text-black/70 uppercase"
const eyebrow =
  "text-xs font-semibold tracking-[0.18em] text-[var(--color-nwk-blue)] uppercase sm:text-xs"
const checkClass =
  "flex max-w-3xl min-h-11 items-start gap-4 py-1.5 text-sm leading-6 text-[var(--color-text-muted)]"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    title:
      locale === "es"
        ? "Recomiende a un joven · New World Kids"
        : "Refer a young person · New World Kids",
    description:
      locale === "es"
        ? "Recomiende a un joven de 16 a 19 años para Los Primeros 12 de New World Kids en Seattle. Solo por recomendación de un adulto."
        : "Refer a young person ages 16 to 19 for the New World Kids First 12 in Seattle. Referral only, from a coach, counselor, or mentor.",
    alternates: pageAlternates(locale, "/refer"),
  }
}

export default async function ReferPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ submitted?: string; error?: string }>
}) {
  const { locale: rawLocale } = await params
  const query = await searchParams
  const locale = rawLocale === "es" ? "es" : "en"
  const t = await withCopyOverrides("refer", locale, copy[locale])

  return (
    <div className="bg-[var(--color-paper)] text-[var(--color-ink)]">
      <section className="border-b border-black/15 px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className={eyebrow}>{t.eyebrow}</p>
          <h1 className="t-h1 mt-4 max-w-5xl text-balance sm:mt-5">
            {t.title}
          </h1>
          <p className="mt-7 max-w-2xl border-t border-black/15 pt-6 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
            {t.intro}
          </p>
          <p className="mt-3 max-w-2xl text-sm font-semibold">{t.who}</p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          {query.submitted === "1" ? (
            <div className="max-w-3xl border-t border-black/20 pt-7">
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
              action={submitReferral}
              storageKey="nwk-referral"
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

              <h2 className="text-xl font-bold tracking-[-0.02em]">
                {t.youthHeading}
              </h2>
              <div className="mt-6 grid gap-x-10 gap-y-9 md:grid-cols-2">
                <label className={labelClass}>
                  {t.youthFirstName}
                  <input
                    className={inputClass}
                    name="youth_first_name"
                    required
                    maxLength={60}
                    autoComplete="off"
                  />
                </label>
                <label className={labelClass}>
                  {t.youthAge}
                  <select
                    className={inputClass}
                    name="youth_age"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {t.select}
                    </option>
                    {[16, 17, 18, 19].map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={labelClass}>
                  {t.county}
                  <select
                    className={inputClass}
                    name="county"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {t.select}
                    </option>
                    {t.counties.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={labelClass}>
                  {t.pathway}
                  <select
                    className={inputClass}
                    name="pathway"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {t.select}
                    </option>
                    {t.pathways.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={`${labelClass} md:col-span-2`}>
                  {t.interests}
                  <textarea
                    className={`${inputClass} min-h-32 resize-y`}
                    name="interests"
                    required
                    minLength={10}
                    maxLength={2000}
                    aria-describedby="interests-hint"
                  />
                  <span
                    id="interests-hint"
                    className="mt-2 block text-sm font-normal tracking-normal text-[var(--color-text-muted)] normal-case"
                  >
                    {t.interestsHint}
                  </span>
                </label>
              </div>

              <h2 className="mt-14 text-xl font-bold tracking-[-0.02em]">
                {t.referrerHeading}
              </h2>
              <div className="mt-6 grid gap-x-10 gap-y-9 md:grid-cols-2">
                <label className={labelClass}>
                  {t.referrerName}
                  <input
                    className={inputClass}
                    name="referrer_name"
                    required
                    minLength={2}
                    maxLength={120}
                    autoComplete="name"
                  />
                </label>
                <label className={labelClass}>
                  {t.referrerEmail}
                  <input
                    className={inputClass}
                    name="referrer_email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                  />
                </label>
                <label className={labelClass}>
                  {t.referrerPhone}
                  <input
                    className={inputClass}
                    name="referrer_phone"
                    type="tel"
                    maxLength={80}
                    autoComplete="tel"
                  />
                </label>
                <label className={labelClass}>
                  {t.referrerOrg}
                  <input
                    className={inputClass}
                    name="referrer_org"
                    maxLength={160}
                    autoComplete="organization"
                  />
                </label>
                <label className={`${labelClass} md:col-span-2`}>
                  {t.referrerRole}
                  <input
                    className={inputClass}
                    name="referrer_role"
                    maxLength={160}
                    autoComplete="organization-title"
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
                <label className={checkClass}>
                  <input
                    className="mt-1 size-5 shrink-0 accent-[var(--color-brand)]"
                    type="checkbox"
                    name="youth_aware"
                    required
                  />
                  <span>{t.youthAware}</span>
                </label>
                <label className={checkClass}>
                  <input
                    className="mt-1 size-5 shrink-0 accent-[var(--color-brand)]"
                    type="checkbox"
                    name="guardian_aware"
                  />
                  <span>{t.guardianAware}</span>
                </label>
                <label className={checkClass}>
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
