import { Link } from "@/lib/navigation"
import { getProofArtifacts } from "@/lib/nwkids/proof"

type Props = { locale: "en" | "es" }

const copy = {
  en: {
    eyebrow: "Proof of Work · Verified archive",
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
    <section className="bg-[var(--color-paper)] px-5 py-20 text-[var(--color-ink)] sm:px-8 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[10px] font-bold tracking-[0.24em] text-[var(--color-action-orange)] uppercase sm:text-xs">
              {t.eyebrow}
            </p>
            <h2 className="mt-4 max-w-5xl text-[clamp(3rem,9vw,6rem)] leading-[0.92] font-black tracking-[-0.055em] text-balance">
              {t.title}
            </h2>
          </div>
          <p className="max-w-2xl border-t border-black/15 pt-6 text-base leading-7 text-black/65 md:text-lg md:leading-8 lg:border-t-0 lg:border-l-2 lg:border-[var(--color-action-orange)] lg:pt-0 lg:pl-7">
            {t.body}
          </p>
        </div>

        {artifacts.length === 0 ? (
          <p className="mt-12 border-t border-black/15 pt-6 text-sm text-black/55">
            {t.empty}
          </p>
        ) : (
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {artifacts.map((artifact, index) => (
              <figure
                key={artifact.id}
                className={index === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
              >
                {artifact.asset_url && (
                  <div className="overflow-hidden bg-black/5">
                    <img
                      src={artifact.asset_url}
                      alt={`${t.verified} · ${formatDate(artifact.captured_at, locale)}`}
                      loading="lazy"
                      className={`w-full object-cover ${index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}
                    />
                  </div>
                )}
                <figcaption className="mt-4 border-t border-black/15 pt-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <p className="text-sm font-black">
                      {formatDate(artifact.captured_at, locale)}
                    </p>
                    <p className="text-[10px] font-bold tracking-[0.14em] text-[var(--color-nwk-blue)] uppercase">
                      {t.verified}
                    </p>
                  </div>
                  {artifact.location && (
                    <p className="mt-2 text-sm text-black/50">
                      {artifact.location}
                    </p>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <Link
          href="/gallery"
          locale={locale}
          className="mt-10 inline-flex min-h-11 items-center text-sm font-black underline decoration-black/25 underline-offset-8 hover:decoration-black focus-visible:ring-2 focus-visible:ring-[var(--color-nwk-blue)] focus-visible:outline-none"
        >
          {t.archive} →
        </Link>
      </div>
    </section>
  )
}
