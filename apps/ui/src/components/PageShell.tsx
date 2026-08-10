import Link from "next/link"

export function PageShell({
  children,
  eyebrow,
  title,
  summary,
}: Readonly<{
  children: React.ReactNode
  eyebrow: string
  title: string
  summary: string
}>) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col px-5 py-6 sm:px-8">
      <header className="border-border/80 flex flex-wrap items-center justify-between gap-3 border-b pb-5">
        <Link href="/en" className="text-accent font-mono text-sm">
          ← Back to nwkids.org
        </Link>
        <nav className="text-muted flex items-center gap-2 text-sm">
          <Link
            className="border-border rounded border px-3 py-2"
            href="/en/mission"
          >
            Mission
          </Link>
          <Link
            className="border-border rounded border px-3 py-2"
            href="/en/hermes-usb"
          >
            Hermes USB
          </Link>
          <Link
            className="border-border rounded border px-3 py-2"
            href="/en/ops"
          >
            Ops
          </Link>
        </nav>
      </header>
      <section className="grid gap-6 py-10 lg:grid-cols-[1fr_22rem] lg:items-end">
        <div>
          <p className="text-accent font-mono text-sm tracking-[0.18em] uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl leading-tight font-semibold sm:text-6xl">
            {title}
          </h1>
        </div>
        <p className="text-muted text-base leading-7">{summary}</p>
      </section>
      {children}
    </div>
  )
}
