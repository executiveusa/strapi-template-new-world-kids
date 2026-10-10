import type { Metadata } from "next"
import Image from "next/image"

import { IntakeForm } from "@/components/site/IntakeForm"

import { joinWaitlist } from "./actions"

// Public placeholder while the site is being finished. Toggle with SITE_MODE (see lib/site-mode.ts).
// Facts used here match the First 12 page: 12 young people, ages 16 to 19, Seattle, 2027, free for
// those selected. No claims beyond what is already published.

const hsiDisclosure =
  "New World Kids is a nonprofit program through fiscal sponsorship with Humanitarian Social Innovations, a 501(c)3 public charity. (46-4779591) Questions regarding the relationship should be directed to office@hsifiscalsponsor.org."

const copy = {
  en: {
    metaTitle: "Coming soon | New World Kids",
    metaDescription:
      "A new New World Kids website opens soon. The First 12: real work, mentors, and a clear next step in Seattle.",
    eyebrow: "New website · opening soon",
    title: "Help turn interest into opportunity.",
    lead: "Our new website opens soon. It will show how the First 12 works in Seattle: real work, a mentor, and a clear next step for young people ages 16 to 19.",
    formLabel: "Get one email when it opens",
    email: "Your email",
    consent:
      "Email me once when the new site opens. I can ask to be removed at any time.",
    submit: "Tell me when it opens",
    or: "Or write to",
    joinedTitle: "You are on the list.",
    joinedBody: "We will send one email when the site opens.",
    errorTitle: "We could not save your email.",
    errorBody: "Please try again, or write to info@nwkids.org.",
    facts: [
      ["Seattle", "2027"],
      ["12 young people", "Ages 16 to 19"],
      ["Free", "For those selected"],
    ],
    photoCaption:
      "Proyecto Indigo Azul · Puerto Vallarta, Mexico. Where it started.",
    photoAlt:
      "Aerial view of a food forest with banana plants and young trees at Proyecto Indigo Azul in Puerto Vallarta, Mexico",
    privacy: "Privacy",
    other: "Español",
    otherHref: "/es/coming-soon",
    locale: "en",
    home: "New World Kids home",
  },
  es: {
    metaTitle: "Próximamente | New World Kids",
    metaDescription:
      "Pronto abre un nuevo sitio de New World Kids. Los Primeros 12: trabajo real, mentores y un siguiente paso claro en Seattle.",
    eyebrow: "Nuevo sitio · abre pronto",
    title: "Ayude a convertir el interés en oportunidad.",
    lead: "Pronto abre nuestro nuevo sitio. Mostrará cómo funcionan los Primeros 12 en Seattle: trabajo real, un mentor y un siguiente paso claro para jóvenes de 16 a 19 años.",
    formLabel: "Reciba un solo correo cuando abra",
    email: "Su correo electrónico",
    consent:
      "Quiero recibir un solo correo cuando abra el nuevo sitio. Puedo pedir que me den de baja en cualquier momento.",
    submit: "Avíseme cuando abra",
    or: "O escriba a",
    joinedTitle: "Ya está en la lista.",
    joinedBody: "Le enviaremos un solo correo cuando abra el sitio.",
    errorTitle: "No pudimos guardar su correo.",
    errorBody: "Inténtelo de nuevo, o escriba a info@nwkids.org.",
    facts: [
      ["Seattle", "2027"],
      ["12 jóvenes", "De 16 a 19 años"],
      ["Gratis", "Para quienes sean seleccionados"],
    ],
    photoCaption:
      "Proyecto Indigo Azul · Puerto Vallarta, México. Donde empezó.",
    photoAlt:
      "Vista aérea de un bosque comestible con plantas de plátano y árboles jóvenes en Proyecto Indigo Azul, Puerto Vallarta, México",
    privacy: "Privacidad",
    other: "English",
    otherHref: "/coming-soon",
    locale: "es",
    home: "Inicio de New World Kids",
  },
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = locale === "es" ? copy.es : copy.en

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    robots: { index: false, follow: false },
  }
}

export default async function ComingSoonPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ joined?: string; error?: string }>
}) {
  const { locale: rawLocale } = await params
  const query = await searchParams
  const t = rawLocale === "es" ? copy.es : copy.en
  const prefix = t.locale === "es" ? "/es" : ""

  return (
    <div className="cs-root relative flex min-h-svh flex-col bg-[var(--color-paper)] text-[var(--color-ink)]">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8 sm:pt-7 lg:px-12">
        <a
          href={prefix || "/"}
          aria-label={t.home}
          className="press inline-flex min-h-11 items-center"
        >
          <Image
            src="/images/nwkids-logo.png"
            alt="New World Kids"
            width={1130}
            height={694}
            priority
            className="h-11 w-auto sm:h-12"
          />
        </a>
        <a
          href={t.otherHref}
          lang={t.locale === "es" ? "en" : "es"}
          className="press inline-flex min-h-11 items-center px-2 text-sm font-bold underline decoration-black/25 underline-offset-[6px] hover:decoration-[var(--color-brand)]"
        >
          {t.other}
        </a>
      </header>

      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-12 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-16 lg:px-12 lg:py-16">
        <div className="cs-in lg:col-span-7">
          <p className="text-xs font-semibold tracking-[0.18em] text-[var(--color-nwk-blue)] uppercase">
            {t.eyebrow}
          </p>
          <h1 className="t-h1 mt-5 max-w-3xl text-balance">{t.title}</h1>
          <p className="t-lead mt-6 max-w-xl text-[var(--color-ink-muted)]">
            {t.lead}
          </p>

          <div className="mt-9 max-w-xl border-t border-black/15 pt-7">
            {query.joined === "1" ? (
              <div role="status">
                <h2 className="t-h3">{t.joinedTitle}</h2>
                <p className="mt-2 text-base leading-7 text-[var(--color-ink-muted)]">
                  {t.joinedBody}
                </p>
              </div>
            ) : (
              <IntakeForm
                action={joinWaitlist}
                storageKey="nwk-waitlist"
                className="relative"
              >
                <input type="hidden" name="locale" value={t.locale} />
                {query.error === "1" ? (
                  <div
                    id="form-status"
                    tabIndex={-1}
                    role="alert"
                    className="mb-6 border-y border-black/20 py-4 outline-none"
                  >
                    <p className="font-bold">{t.errorTitle}</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--color-ink-muted)]">
                      {t.errorBody}
                    </p>
                  </div>
                ) : null}
                <label
                  className="block text-xs font-semibold tracking-[0.12em] text-black/70 uppercase"
                  htmlFor="cs-email"
                >
                  {t.formLabel}
                </label>
                <input
                  id="cs-email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  inputMode="email"
                  placeholder={t.email}
                  aria-label={t.email}
                  className="mt-2 min-h-12 w-full rounded-none border-0 border-b border-black/60 bg-transparent px-0 py-3 text-base outline-none focus:border-[var(--color-brand)]"
                />
                <label className="mt-5 flex min-h-11 items-start gap-4 py-1.5 text-sm leading-6 text-[var(--color-ink-muted)]">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 size-5 shrink-0 accent-[var(--color-brand)]"
                  />
                  <span>{t.consent}</span>
                </label>
                <button
                  type="submit"
                  className="btn-primary mt-6 w-full sm:w-auto sm:min-w-72"
                >
                  <span>{t.submit}</span>
                  <span aria-hidden="true">→</span>
                </button>
                <p className="mt-4 text-sm text-[var(--color-ink-muted)]">
                  {t.or}{" "}
                  <a
                    className="font-semibold underline underline-offset-4"
                    href="mailto:info@nwkids.org"
                  >
                    info@nwkids.org
                  </a>
                </p>
              </IntakeForm>
            )}
          </div>
        </div>

        <figure className="cs-in cs-in-2 lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-paper-deep)] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/videos/hero-garden-poster.jpg"
              alt={t.photoAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <figcaption className="mt-3 text-sm leading-6 text-[var(--color-ink-muted)]">
            {t.photoCaption}
          </figcaption>
        </figure>
      </main>

      <footer className="mx-auto w-full max-w-7xl px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8 lg:px-12">
        <dl className="grid grid-cols-1 border-t border-black/15 sm:grid-cols-3">
          {t.facts.map(([a, b]) => (
            <div
              key={a}
              className="flex items-baseline justify-between gap-4 border-b border-black/15 py-4 sm:block sm:border-r sm:px-5 sm:py-5 sm:first:pl-0 sm:last:border-r-0"
            >
              <dt className="text-base font-bold">{a}</dt>
              <dd className="text-sm text-[var(--color-ink-muted)]">{b}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 max-w-3xl text-xs leading-6 text-[var(--color-ink-muted)]">
          {hsiDisclosure}
        </p>
        <p className="mt-3 flex flex-wrap items-center gap-x-5 text-xs text-[var(--color-ink-muted)]">
          <span>&copy; {new Date().getFullYear()} New World Kids</span>
          <a
            href={`${prefix}/privacy`}
            className="inline-flex min-h-11 min-w-11 items-center justify-center underline underline-offset-4"
          >
            {t.privacy}
          </a>
        </p>
      </footer>
    </div>
  )
}
