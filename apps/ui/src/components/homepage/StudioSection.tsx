import { ArrowUpRight } from "lucide-react"

import { workWithUsOffers } from "@/content/site"
import { Link } from "@/lib/navigation"

export function StudioSection() {
  return (
    <section className="border-t border-white/8 bg-[#09120D] py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#C9A84C]">
            Mission-Funded Studio
          </div>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
            We are not built to beg. We are built to produce.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#E8DEC7]/60">
            New World Kids is also a media and AI systems studio. The services
            arm exists so the mission can support itself with earned revenue,
            strong reporting, and public proof.
          </p>
          <div className="mt-8">
            <Link
              href="/work-with-us"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A84C]"
            >
              Work with the studio
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {workWithUsOffers.map((offer) => (
            <div
              key={offer.title.en}
              className="rounded-sm border border-white/10 bg-white/[0.02] p-6"
            >
              <div className="text-xl font-medium text-white">
                {offer.title.en}
              </div>
              <div className="mt-3 text-sm leading-7 text-[#E8DEC7]/58">
                {offer.body.en}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
