import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { HermesStatusPanel } from "./HermesStatusPanel"
import { hermesPrinciples, siteLinks } from "../site/siteData"

export function HermesSection() {
  return (
    <section id="hermes" className="bg-[#071008] py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.26em] text-[#c9a84c] uppercase">
              Hermes backend
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Hermes handles the operational follow-through behind the public
              story.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/64">
              The backend is positioned as an operations agent, not a gimmick.
              It supports grant work, content systems, repo reviews, and
              dashboard visibility while the frontend stays deployable without
              secrets in the client.
            </p>
            <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs tracking-[0.24em] text-[#c9a84c] uppercase">
                Seth-informed operating rules
              </p>
              <ul className="mt-5 space-y-3">
                {hermesPrinciples.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-7 text-white/60"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#c9a84c]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteLinks.dashboard}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#c9a84c] px-5 py-3 text-sm font-semibold text-[#091109]"
              >
                Open Hermes dashboard
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                href="/api/hermes/status"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/82"
              >
                View raw status JSON
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <HermesStatusPanel />
        </div>
      </div>
    </section>
  )
}
