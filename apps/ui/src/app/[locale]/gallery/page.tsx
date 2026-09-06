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
    indigoEyebrow: "01 · Origin",
    indigoTitle: "NEW WORLD KIDS X INDIGO AZUL PROJECT",
    indigoBody: "Follow the Indigo Azul Project",
    instagramAction: "Instagram",
    youtubeAction: "YouTube",
    facebookAction: "Facebook",
    seattleEyebrow: "02 · Seattle",
    seattleTitle: "NEW WORLD KIDS X FIRST 12",
    seattleBody: "First 12 Building in public",
    publicEyebrow: "03 · Build in public",
    publicTitle: "Keep the story open.",
    publicBody: "Shorts, interviews, progress, setbacks, and next steps—as the work develops.",
    reserved: "Reserved for",
    indigoSlots: ["Youth + community footage", "Nature + place footage", "Work in progress footage", "Long-form archive footage"],
    seattleSlots: ["Seattle + neighborhood footage", "Boxing footage", "Basketball footage", "Mentors + projects footage"],
    publicSlots: ["Short clips", "Interviews", "Progress updates", "Next-step updates"],
    metaTitle: "Story Archive | New World Kids",
    metaDescription: "A living visual archive connecting Proyecto Indigo Azul and the next New World Kids chapter in Seattle.",
  },
  es: {
    eyebrow: "Archivo vivo",
    title: "Dos lugares. Una historia que sigue escribiéndose.",
    body: "Proyecto Indigo Azul y Seattle son comunidades distintas con retos diferentes. Mantenemos el material separado y conectamos los aprendizajes con el tiempo.",
    indigoEyebrow: "01 · Origen",
    indigoTitle: "NEW WORLD KIDS X PROYECTO INDIGO AZUL",
    indigoBody: "Sigue el Proyecto Indigo Azul",
    instagramAction: "Instagram",
    youtubeAction: "YouTube",
    facebookAction: "Facebook",
    seattleEyebrow: "02 · Seattle",
    seattleTitle: "NEW WORLD KIDS X PRIMEROS 12",
    seattleBody: "Primeros 12 Construyendo en público",
    publicEyebrow: "03 · Construir en público",
    publicTitle: "Mantener la historia abierta.",
    publicBody: "Shorts, entrevistas, avances, tropiezos y próximos pasos—mientras el trabajo evoluciona.",
    reserved: "Reservado para",
    indigoSlots: ["material de jóvenes + comunidad", "material de naturaleza + lugar", "material de trabajo en proceso", "archivo de formato largo"],
    seattleSlots: ["material de Seattle + vecindario", "material de boxeo", "material de básquetbol", "material de mentores + proyectos"],
    publicSlots: ["clips cortos", "entrevistas", "actualizaciones de progreso", "actualizaciones de próximos pasos"],
    metaTitle: "Archivo de historias | New World Kids",
    metaDescription: "Un archivo visual vivo que conecta Proyecto Indigo Azul con el próximo capítulo de New World Kids en Seattle.",
  },
} as const

const frameClasses = [
  "aspect-[16/10] md:col-span-7",
  "aspect-[4/5] md:col-span-4 md:col-start-9 md:mt-20",
  "aspect-[4/5] md:col-span-4 md:col-start-2 md:mt-8",
  "aspect-[16/10] md:col-span-7 md:col-start-6",
] as const

function MediaLane({
  items,
  reserved,
  tone = "light",
}: {
  items: readonly string[]
  reserved: string
  tone?: "light" | "dark"
}) {
  const dark = tone === "dark"

  return (
    <div className="mt-10 grid gap-x-6 gap-y-8 border-t border-current/14 pt-8 sm:mt-14 sm:gap-y-12 sm:pt-10 md:grid-cols-12 md:gap-x-8 md:gap-y-16 md:pt-12">
      {items.map((item, index) => (
        <figure key={item} className={frameClasses[index % frameClasses.length]}>
          <div
            className={`relative flex h-full w-full items-end overflow-hidden p-5 sm:p-6 ${
              dark ? "bg-white/[0.045]" : "bg-[#e2ded5]"
            }`}
          >
            <span className="absolute top-5 right-5 text-[9px] font-semibold tracking-[0.16em] opacity-34 sm:top-6 sm:right-6">
              0{index + 1}
            </span>
            <div>
              <div className="text-[9px] font-semibold tracking-[0.2em] opacity-42 uppercase">{reserved}</div>
              <div className="mt-2 max-w-[18rem] text-sm font-black tracking-[-0.015em] sm:text-base">{item}</div>
            </div>
          </div>
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
      <section className="px-5 py-16 sm:px-8 sm:py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.eyebrow}</p>
          <h1 className="mt-4 max-w-6xl text-[clamp(2.9rem,11vw,7rem)] leading-[0.93] font-black tracking-[-0.05em] text-balance sm:mt-5 sm:tracking-[-0.055em]">{t.title}</h1>
          <p className="mt-7 max-w-3xl border-t border-black/14 pt-6 text-[15px] leading-7 text-[var(--color-text-muted)] sm:mt-9 sm:pt-7 sm:text-lg sm:leading-8 md:text-xl">{t.body}</p>
        </div>
      </section>

      <section id="indigo" className="scroll-mt-20 border-t border-black/14 px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.indigoEyebrow}</p>
              <h2 className="mt-4 max-w-4xl text-[clamp(2.35rem,9.5vw,6rem)] leading-[0.92] font-black tracking-[-0.045em] text-balance sm:mt-5 sm:tracking-[-0.055em]">{t.indigoTitle}</h2>
            </div>
            <div className="border-t border-black/14 pt-5 sm:pt-6 lg:mb-1">
              <p className="max-w-xl text-[15px] leading-7 font-semibold text-[var(--color-text-muted)] sm:text-lg sm:leading-8">{t.indigoBody}</p>
              <div className="mt-6 grid border-t border-black/14 sm:mt-7 sm:grid-cols-3">
                <a href={INDIGO_INSTAGRAM} target="_blank" rel="noreferrer" className="group flex min-h-12 items-center justify-between border-b border-black/14 py-3 text-sm font-black sm:border-r sm:px-5"><span>{t.instagramAction}</span><span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">↗</span></a>
                <a href={INDIGO_YOUTUBE} target="_blank" rel="noreferrer" className="group flex min-h-12 items-center justify-between border-b border-black/14 py-3 text-sm font-black sm:border-r sm:px-5"><span>{t.youtubeAction}</span><span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">↗</span></a>
                <a href={NWK_FACEBOOK} target="_blank" rel="noreferrer" className="group flex min-h-12 items-center justify-between border-b border-black/14 py-3 text-sm font-black sm:px-5"><span>{t.facebookAction}</span><span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">↗</span></a>
              </div>
            </div>
          </div>
          <MediaLane items={t.indigoSlots} reserved={t.reserved} />
        </div>
      </section>

      <section id="seattle" className="scroll-mt-20 bg-[#1e1a17] px-5 py-16 text-white sm:px-8 sm:py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-white/46 uppercase sm:text-xs">{t.seattleEyebrow}</p>
              <h2 className="mt-4 max-w-4xl text-[clamp(2.35rem,9.5vw,6rem)] leading-[0.92] font-black tracking-[-0.045em] text-balance sm:mt-5 sm:tracking-[-0.055em]">{t.seattleTitle}</h2>
            </div>
            <p className="max-w-xl border-t border-white/16 pt-5 text-[15px] leading-7 font-semibold text-white/72 sm:pt-6 sm:text-lg sm:leading-8">{t.seattleBody}</p>
          </div>
          <MediaLane items={t.seattleSlots} reserved={t.reserved} tone="dark" />
        </div>
      </section>

      <section id="build-in-public" className="scroll-mt-20 border-t border-black/14 px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.publicEyebrow}</p>
              <h2 className="mt-4 max-w-4xl text-[clamp(2.5rem,10vw,6rem)] leading-[0.94] font-black tracking-[-0.045em] text-balance sm:mt-5 sm:tracking-[-0.05em]">{t.publicTitle}</h2>
            </div>
            <p className="max-w-xl border-t border-black/14 pt-5 text-[15px] leading-7 text-[var(--color-text-muted)] sm:pt-6 sm:text-lg sm:leading-8">{t.publicBody}</p>
          </div>
          <MediaLane items={t.publicSlots} reserved={t.reserved} />
        </div>
      </section>
    </main>
  )
}
