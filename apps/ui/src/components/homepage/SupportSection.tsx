import { ArrowUpRight, Coffee, HandHeart, Sparkles } from "lucide-react"
import Link from "next/link"

import { supportRails } from "@/content/site"

const supportCards = [
  {
    title: "Donate through our fiscal sponsor",
    body: "Best for tax-deductible gifts that fund food, water, energy, and shelter work directly.",
    icon: HandHeart,
    href: supportRails.donorbox,
    label: "Donate now",
  },
  {
    title: "Work with our studio",
    body: "Hire our AI, transparency, or storytelling systems and let the revenue flow back into the mission.",
    icon: Sparkles,
    href: supportRails.creem,
    label: "See service offers",
  },
  {
    title: "Buy Me a Coffee",
    body: "A lightweight way to back the media layer, field reporting, and open publishing that support the mission.",
    icon: Coffee,
    href: supportRails.buyMeACoffee,
    label: "Support the crew",
  },
]

export function SupportSection() {
  return (
    <section className="border-t border-white/8 bg-[#08110D] py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#C9A84C]">
            Support the Work
          </div>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
            One mission. Three clear ways to help.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#E8DEC7]/60">
            We separate charitable support from earned-revenue services so donors
            understand exactly what they are funding and why it matters.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {supportCards.map((card) => {
            const Icon = card.icon

            return (
              <Link
                key={card.title}
                href={card.href}
                className="rounded-sm border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-[#C9A84C]/35 hover:bg-white/[0.04]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <Icon className="h-5 w-5 text-[#C9A84C]" />
                  <ArrowUpRight className="h-4 w-4 text-[#E8DEC7]/45" />
                </div>
                <div className="text-xl font-medium text-white">{card.title}</div>
                <div className="mt-3 text-sm leading-6 text-[#E8DEC7]/58">
                  {card.body}
                </div>
                <div className="mt-6 text-sm font-medium text-[#C9A84C]">
                  {card.label}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
