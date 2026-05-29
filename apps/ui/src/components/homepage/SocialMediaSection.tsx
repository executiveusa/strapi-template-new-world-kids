"use client"

import { motion, useInView } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { useRef } from "react"

import { Link } from "@/lib/navigation"
import { socialOpsHighlights, socialOpsMetrics, siteLinks } from "../site/siteData"

function SocialMetricCard({
  label,
  value,
  note,
  delay,
}: {
  label: string
  value: string
  note: string
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
    >
      <p className="text-xs tracking-[0.22em] text-[#c9a84c] uppercase">{label}</p>
      <div className="mt-4 font-serif text-4xl font-semibold text-white">{value}</div>
      <p className="mt-3 text-sm leading-7 text-white/58">{note}</p>
    </motion.article>
  )
}

export function SocialMediaSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: "-100px" })

  return (
    <section id="post-maxx" className="bg-[#08110a] py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div ref={headerRef} className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55 }}
              className="text-xs tracking-[0.26em] text-[#c9a84c] uppercase"
            >
              POST-MAXX social operations
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-4 font-serif text-3xl font-semibold tracking-tight text-white md:text-5xl"
            >
              The agent handles social so the team can stay focused on growth.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.16 }}
              className="mt-6 text-base leading-8 text-white/64"
            >
              POST-MAXX gives MAXX a social command center: schedule posts, keep the
              voice consistent, queue approvals, and turn attention into leads.
              The goal is simple. More reach, less manual work, and a cleaner path
              from content to business outcomes.
            </motion.p>

            <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs tracking-[0.24em] text-[#c9a84c] uppercase">
                What the business gets
              </p>
              <ul className="mt-5 space-y-3">
                {socialOpsHighlights.map((item) => (
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
              <Link
                href={siteLinks.postMaxx}
                className="inline-flex items-center gap-2 rounded-full bg-[#c9a84c] px-5 py-3 text-sm font-semibold text-[#091109]"
              >
                Open POST-MAXX management
                <ExternalLink className="h-4 w-4" />
              </Link>
              <Link
                href="/ops"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/82"
              >
                View agent dashboard
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {socialOpsMetrics.map((metric, index) => (
              <SocialMetricCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                note={metric.note}
                delay={0.1 + index * 0.06}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
