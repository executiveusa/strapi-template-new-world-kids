import { ArrowUpRight, ShieldCheck } from "lucide-react"

import { trustDocuments } from "@/content/site"

export function TrustSection() {
  return (
    <section className="border-t border-white/8 bg-[#0A1410] py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#C9A84C]">
            Trust Layer
          </div>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Real documents. Real proof. No donor guessing.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#E8DEC7]/60">
            New World Kids should feel instantly credible. We surface the fiscal
            sponsor, EIN, and verification documents where people actually look,
            not in a hidden footer afterthought.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {trustDocuments.map((doc) => (
            <a
              key={doc.slug}
              href={doc.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-[#C9A84C]/35 hover:bg-white/[0.04]"
            >
              <div className="mb-4 flex items-center justify-between">
                <ShieldCheck className="h-4 w-4 text-[#C9A84C]" />
                <ArrowUpRight className="h-4 w-4 text-[#E8DEC7]/45" />
              </div>
              <div className="text-xs uppercase tracking-[0.15em] text-[#C9A84C]/80">
                {doc.category.en}
              </div>
              <div className="mt-3 text-lg font-medium text-white">
                {doc.title.en}
              </div>
              <div className="mt-3 text-sm leading-6 text-[#E8DEC7]/58">
                {doc.summary.en}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
