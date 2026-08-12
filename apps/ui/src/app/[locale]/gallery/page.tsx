import { timelineEntries } from "../../../components/site/siteData"

function formatCaptureDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T12:00:00`))
}

export default function GalleryPage() {
  const documentedPhotos = timelineEntries.filter(
    (entry) =>
      entry.sourceStatus === "confirmed" &&
      entry.imageStatus === "confirmed" &&
      entry.status !== "future"
  )

  return (
    <main className="bg-[var(--color-bg)] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">
            Field gallery
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-6xl">
            Documented work from the field.
          </h1>
          <p className="mt-5 text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
            This gallery only displays field images that are currently marked confirmed in the project record. Empty program placeholders and future-program imagery are intentionally excluded.
          </p>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {documentedPhotos.map((entry) => (
            <figure key={`${entry.season}-${entry.capturedAt}`}>
              <div className="overflow-hidden bg-[var(--color-surface)]">
                <img
                  src={entry.photo}
                  alt={entry.photoAlt ?? entry.title}
                  loading="lazy"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-4 border-t border-[var(--color-border-subtle)] pt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="font-serif text-xl font-semibold text-[var(--color-text-primary)] md:text-2xl">
                    {entry.title}
                  </h2>
                  <span className="text-xs tracking-[0.16em] text-[var(--color-eyebrow)] uppercase">
                    {formatCaptureDate(entry.capturedAt)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                  {entry.sourceNote}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {documentedPhotos.length === 0 && (
          <div className="mt-14 border-y border-[var(--color-border-subtle)] py-12">
            <p className="text-sm text-[var(--color-text-muted)]">
              No confirmed field images are available yet.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
