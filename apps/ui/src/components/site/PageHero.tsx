import type { ReactNode } from "react"

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
  aside?: ReactNode
}

export default function PageHero({
  eyebrow,
  title,
  description,
  aside,
}: PageHeroProps) {
  return (
    <section className="border-b border-white/8 bg-[#09130D]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <div>
          <div className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-[#C9A84C]">
            {eyebrow}
          </div>
          <h1 className="max-w-4xl font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#E8DEC7]/64">
            {description}
          </p>
        </div>

        {aside ? (
          <div className="rounded-sm border border-white/10 bg-white/[0.02] p-6">
            {aside}
          </div>
        ) : null}
      </div>
    </section>
  )
}
