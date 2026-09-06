import type { Metadata } from "next"
import type { Locale } from "next-intl"

const INDIGO_YOUTUBE = "https://www.youtube.com/@proyectoindigoazul"
const INDIGO_INSTAGRAM = "https://www.instagram.com/proyectoindigoazul/"
const NWK_FACEBOOK = "https://www.facebook.com/nwkidsorg"

const copy = {
  en: {
    eyebrow: "Living archive",
    title: "Two places. One story still being written.",
    body: "Proyecto Indigo Azul and Seattle are different communities with different challenges. We keep their footage separate and connect the lessons over time.",
    indigoEyebrow: "01 · Proyecto Indigo Azul",
    indigoTitle: "Where it started.",
    indigoBody: "People, land, and years of footage from before the Seattle chapter.",
    instagramAction: "Instagram →",
    youtubeAction: "YouTube →",
    facebookAction: "Facebook →",
    seattleEyebrow: "02 · Seattle",
    seattleTitle: "Next steps.",
    seattleBody: "City, boxing, basketball, mentors, projects, and the First 12—as it happens.",
    publicEyebrow: "03 · Build in public",
    publicTitle: "Keep the story open.",
    publicBody: "Shorts, interviews, progress, setbacks, and next steps—as the work develops.",
    placeholder: "Footage placeholder",
    indigoSlots: ["Youth + community", "Nature + place", "Work in progress", "Long-form archive"],
    seattleSlots: ["Seattle + neighborhood", "Boxing", "Basketball", "Mentors + projects"],
    publicSlots: ["Shorts", "Interviews", "Progress", "What comes next"],
    metaTitle: "Story Archive | New World Kids",
    metaDescription: "A living visual archive connecting Proyecto Indigo Azul and the next New World Kids chapter in Seattle.",
  },
  es: {
    eyebrow: "Archivo vivo",
    title: "Dos lugares. Una historia que sigue escribiéndose.",
    body: "Proyecto Indigo Azul y Seattle son comunidades distintas con retos diferentes. Mantenemos el material separado y conectamos los aprendizajes con el tiempo.",
    indigoEyebrow: "01 · Proyecto Indigo Azul",
    indigoTitle: "Donde empezó.",
    indigoBody: "Personas, tierra y años de material anteriores al capítulo de Seattle.",
    instagramAction: "Instagram →",
    youtubeAction: "YouTube →",
    facebookAction: "Facebook →",
    seattleEyebrow: "02 · Seattle",
    seattleTitle: "Próximos pasos.",
    seattleBody: "Ciudad, boxeo, básquetbol, mentores, proyectos y los Primeros 12—mientras sucede.",
    publicEyebrow: "03 · Construir en público",
    publicTitle: "Mantener la historia abierta.",
    publicBody: "Shorts, entrevistas, avances, tropiezos y próximos pasos—mientras el trabajo evoluciona.",
    placeholder: "Espacio para material",
    indigoSlots: ["Jóvenes + comunidad", "Naturaleza + lugar", "Trabajo en proceso", "Archivo de formato largo"],
    seattleSlots: ["Seattle + vecindario", "Boxeo", "Básquetbol", "Mentores + proyectos"],
    publicSlots: ["Shorts", "Entrevistas", "Avances", "Lo que sigue"],
    metaTitle: "Archivo de historias | New World Kids",
    metaDescription: "Un archivo visual vivo que conecta Proyecto Indigo Azul con el próximo capítulo de New World Kids en Seattle.",
  },
} as const

const aspectClasses = [
  "aspect-[16/10] md:col-span-7",
  "aspect-[4/5] md:col-span-5",
  "aspect-[4/3] md:col-span-5",
  "aspect-[16/9] md:col-span-7",
] as const

function MediaLane({
  items,
  placeholder,
  tone = "light",
}: {
  items: readonly string[]
  placeholder: string
  tone?: "light" | "dark"
}) {
  const dark = tone === "dark"

  return (
    <div className="mt-10 grid gap-x-5 gap-y-8 border-t border-current/20 pt-8 md:grid-cols-12 md:gap-x-7 md:gap-y-10">
      {items.map((item, index) => (
        <figure key={item} className={aspectClasses[index % aspectClasses.length]}>
          <div
            className={`flex h-full w-full items-end border border-current/20 p-4 ${
              dark ? "bg-white/[0.04]" : "bg-black/[0.035]"
            }`}
          >
            <span className="text-[10px] font-bold tracking-[0.16em] opacity-55 uppercase">
              {placeholder}
            </span>
          </div>
          <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-current/20 pt-3">
            <span className="text-sm font-black">{item}</span>
            <span className="text-[10px] font-bold tracking-[0.14em] opacity-45">0{index + 1}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en
  return { title: t.metaTitle, description: t.metaDescription }
}

export default async function GalleryPage({
  params,
}: {
  readonly params: Promise<{ locale: string }>
}) {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en

  return (
    <main className="bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-bold tracking-[0.24em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.eyebrow}</p>
          <h1 className="mt-4 max-w-6xl text-[clamp(3.25rem,10vw,7rem)] leading-[0.92] font-black tracking-[-0.055em] text-balance">{t.title}</h1>
          <p className="mt-7 max-w-3xl border-t border-black/15 pt-6 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8 md:text-xl">{t.body}</p>
        </div>
      </section>

      <section id="indigo" className="scroll-mt-20 border-t border-black/15 px-5 py-16 sm:px-8 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 md:grid-cols-[0.72fr_1.28fr] md:items-end md:gap-12">
            <div>
              <p className="text-[10px] font-bold tracking-[0.22em] text-[var(--color-action)] uppercase sm:text-xs">{t.indigoEyebrow}</p>
              <h2 className="mt-4 text-[clamp(3rem,8vw,6rem)] leading-[0.92] font-black tracking-[-0.05em]">{t.indigoTitle}</h2>
            </div>
            <div className="border-t border-black/15 pt-5">
              <p className="max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">{t.indigoBody}</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                <a href={INDIGO_INSTAGRAM} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center border-y border-black/20 py-3 text-sm font-black transition-colors hover:border-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-3">{t.instagramAction}</a>
                <a href={INDIGO_YOUTUBE} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center border-y border-black/20 py-3 text-sm font-black transition-colors hover:border-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-3">{t.youtubeAction}</a>
                <a href={NWK_FACEBOOK} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center border-y border-black/20 py-3 text-sm font-black transition-colors hover:border-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:ring-offset-3">{t.facebookAction}</a>
              </div>
            </div>
          </div>
          <MediaLane items={t.indigoSlots} placeholder={t.placeholder} />
        </div>
      </section>

      <section id="seattle" className="scroll-mt-20 bg-[var(--color-nwk-blue)] px-5 py-16 text-white sm:px-8 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 md:grid-cols-[0.72fr_1.28fr] md:items-end md:gap-12">
            <div>
              <p className="text-[10px] font-bold tracking-[0.22em] text-white/60 uppercase sm:text-xs">{t.seattleEyebrow}</p>
              <h2 className="mt-4 text-[clamp(3rem,8vw,6rem)] leading-[0.92] font-black tracking-[-0.05em]">{t.seattleTitle}</h2>
            </div>
            <p className="max-w-2xl border-t border-white/25 pt-5 text-base leading-7 text-white/78 sm:text-lg sm:leading-8">{t.seattleBody}</p>
          </div>
          <MediaLane items={t.seattleSlots} placeholder={t.placeholder} tone="dark" />
        </div>
      </section>

      <section id="build-in-public" className="scroll-mt-20 border-t border-black/15 px-5 py-16 sm:px-8 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 md:grid-cols-[0.72fr_1.28fr] md:items-end md:gap-12">
            <div>
              <p className="text-[10px] font-bold tracking-[0.22em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.publicEyebrow}</p>
              <h2 className="mt-4 text-[clamp(3rem,8vw,6rem)] leading-[0.92] font-black tracking-[-0.05em]">{t.publicTitle}</h2>
            </div>
            <p className="max-w-2xl border-t border-black/15 pt-5 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">{t.publicBody}</p>
          </div>
          <MediaLane items={t.publicSlots} placeholder={t.placeholder} />
        </div>
      </section>
    </main>
  )
}
