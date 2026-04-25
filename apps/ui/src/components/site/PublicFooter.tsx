import { ArrowUpRight, HeartHandshake, Mail } from "lucide-react"

import { Link } from "@/lib/navigation"

import {
  actionCards,
  primaryNavigation,
  siteLinks,
  socialLinks,
} from "./siteData"

export default function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050905]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-10 rounded-[32px] border border-white/10 bg-white/[0.03] p-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-[#f7e7a7]">
              <HeartHandshake className="h-5 w-5" />
              <span className="text-xs tracking-[0.24em] uppercase">
                A promise worth keeping
              </span>
            </div>
            <h2 className="max-w-3xl font-serif text-3xl font-semibold tracking-tight text-white md:text-4xl">
              New World Kids exists to make young people harder to exploit and
              easier to trust with real responsibility.
            </h2>
            <p className="max-w-3xl text-base leading-8 text-white/68">
              We teach the basics most systems leave out: how to grow food,
              protect water, generate power, and create shelter in community.
              The public site stays simple on purpose so donors, parents,
              students, and partners can tell what matters in one pass.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={siteLinks.donate}
                className="inline-flex items-center gap-2 rounded-full bg-[#c9a84c] px-5 py-3 text-sm font-semibold text-[#091109]"
              >
                Support the next season
              </Link>
              <a
                href={siteLinks.email}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/82"
              >
                <Mail className="h-4 w-4" />
                {siteLinks.infoEmail}
              </a>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xs tracking-[0.24em] text-[#c9a84c] uppercase">
                Navigate
              </h3>
              <div className="space-y-3">
                {primaryNavigation.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/72 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
                <div>
                  <a
                    href={siteLinks.dashboard}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/72 transition-colors hover:text-white"
                  >
                    Hermes dashboard
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xs tracking-[0.24em] text-[#c9a84c] uppercase">
                Stay connected
              </h3>
              <div className="space-y-3">
                {socialLinks.map((item) => (
                  <div key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-white/72 transition-colors hover:text-white"
                    >
                      {item.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {actionCards.map((card) => {
            const content = (
              <div className="h-full rounded-[28px] border border-white/10 bg-white/[0.03] p-6 transition-transform hover:-translate-y-1">
                <h3 className="font-serif text-xl font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/64">
                  {card.body}
                </p>
              </div>
            )

            if (card.variant === "internal") {
              return (
                <Link key={card.title} href={card.href}>
                  {content}
                </Link>
              )
            }

            return (
              <a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noreferrer"
              >
                {content}
              </a>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/46 md:flex-row md:items-center md:justify-between">
          <p>
            New World Kids operates with fiscal sponsorship and builds in
            public. Frontend deploys without private client secrets.
          </p>
          <p>EIN 46-4779591</p>
        </div>
      </div>
    </footer>
  )
}
