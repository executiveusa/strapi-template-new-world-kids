import { Link } from "@/lib/navigation"
import { getProofArtifacts } from "@/lib/nwkids/proof"

type Props = { locale: "en" | "es" }

const copy = {
  en: {
    eyebrow: "Proof of work · Verified archive",
    title: "Show the work. Label what it proves.",
    body: "These are verified, capture-dated field images from Proyecto Indigo Azul. They document the place and the work over time; they are not presented as proof of Seattle outcomes.",
    verified: "Verified field documentation",
    archive: "Open the full field archive",
    empty: "No verified public artifacts are available yet.",
  },
  es: {
    eyebrow: "Evidencia del trabajo · Archivo verificado",
    title: "Mostrar el trabajo. Decir exactamente qué demuestra.",
    body: "Estas son imágenes de campo verificadas y fechadas de Proyecto Indigo Azul. Documentan el lugar y el trabajo con el tiempo; no se presentan como evidencia de resultados en Seattle.",
    verified: "Documentación de campo verificada",
    archive: "Abrir el archivo de campo completo",
    empty: "Todavía no hay artefactos públicos verificados.",
  },
} as const

function formatDate(value: string | null, locale: "en" | "es") {
  if (!value) return ""
  return new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`))
}

export async function ProofOfWorkFeed({ locale }: Props) {
  const t = copy[locale]
  const artifacts = await getProofArtifacts(5)

  return (
    <section className="border-t border-black/15 bg-[var(--color-paper)] px-5 py-20 text-[var(--color-ink)] sm:px-8 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.eyebrow}</p>
            <h2 className="mt-4 max-w-5xl text-[clamp(2.7rem,9vw,6rem)] leading-[0.93] font-black tracking-[-0.05em] text-balance sm:mt-5 sm:tracking-[-0.055em]">{t.title}</h2>
          </div>
          <p className="max-w-2xl border-t border-black/15 pt-6 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8 lg:pt-7">{t.body}</p>
        </div>

        {artifacts.length === 0 ? (
          <p className="mt-12 border-t border-black/15 pt-6 text-sm text-black/55">{t.empty}</p>
        ) : (
          <div className="mt-12 border-t border-black/15">
            {artifacts.map((artifact, index) => (
              <figure key={artifact.id} className="grid gap-5 border-b border-black/15 py-7 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-end sm:gap-8 md:py-9">
                <div className={index % 2 ? "sm:order-2" : ""}>
                  {artifact.asset_url ? (
                    <div className="overflow-hidden bg-black/[0.04]">
                      <img
                        src={artifact.asset_url}
                        alt={`${t.verified} · ${formatDate(artifact.captured_at, locale)}`}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover"
                      />
                    </div>
                  ) : null}
                </div>
                <figcaption className={index % 2 ? "sm:order-1" : ""}>
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-[var(--color-nwk-blue)] uppercase">{t.verified}</p>
                  <p className="mt-3 text-xl font-black tracking-[-0.025em] sm:text-2xl">{artifact.title}</p>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-text-muted)] sm:text-base sm:leading-7">{artifact.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-black/45">
                    {artifact.captured_at ? <span>{formatDate(artifact.captured_at, locale)}</span> : null}
                    {artifact.location ? <span>{artifact.location}</span> : null}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <Link href="/gallery" locale={locale} className="group mt-9 inline-flex min-h-12 items-center border-y border-black/20 py-3 text-sm font-black focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:outline-none">
          <span>{t.archive}</span><span aria-hidden="true" className="ml-7 transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  )
}
