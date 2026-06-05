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
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-5">
        <Link href="/en/mission" className="font-mono text-sm text-accent">
          NWKIDS
        </Link>
        <nav className="flex items-center gap-2 text-sm text-muted">
          <Link className="rounded border border-border px-3 py-2" href="/en/mission">
            Mission
          </Link>
          <Link className="rounded border border-border px-3 py-2" href="/en/hermes-usb">
            Hermes USB
          </Link>
          <Link className="rounded border border-border px-3 py-2" href="/en/ops">
            Ops
          </Link>
        </nav>
      </header>
      <section className="grid gap-6 py-10 lg:grid-cols-[1fr_22rem] lg:items-end">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
            {title}
          </h1>
        </div>
        <p className="text-base leading-7 text-muted">{summary}</p>
      </section>
      {children}
    </div>
  )
}
