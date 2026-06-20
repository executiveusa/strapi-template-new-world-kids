import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const services = [
  "AI agents that understand your mission",
  "Automated social media posting and content creation",
  "Full-stack website design",
  "AI operating system designed for nonprofits, trained on your specific data",
  "Grant support automation",
  "Compliance reporting and public accountability systems",
  "Campaign storytelling and bilingual publishing",
  "Transparency infrastructure and lightweight mission dashboards",
]

export function StudioSection() {
  return (
    <section className="border-t border-white/8 bg-[#09120d] py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* Header row */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">

          {/* Left: mission context */}
          <div>
            <div className="mb-4 font-mono text-xs tracking-[0.2em] text-[#c9a84c] uppercase">
              Mission-Funded Studio
            </div>
            <h2 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
              We are not built to beg. We are built to produce.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/65">
              Starting and running a nonprofit can be overwhelming — especially
              as a solo founder or small team. Compliance, research, grant
              writing, fundraising, website design, social media. It&apos;s an
              uphill battle that crushes many great ideas before they get a
              chance to do any good. We know the feeling. We&apos;ve been
              through all of it.
            </p>
            <p className="mt-4 text-base leading-8 text-white/65">
              Over the last two years New World Kids has built an in-house
              development team and collaborated with local tech companies right
              here in Washington State. Support and technology from Microsoft,
              the Allen Institute, the Gates Foundation, and local software
              engineers has allowed us to build AI-powered systems that drive
              our mission and help solve real-world problems.
            </p>
            <p className="mt-4 text-base leading-8 text-white/65">
              We see the change these tools have made for us — and we are ready
              to offer them to other nonprofits and social purpose companies at
              a discounted rate. We understand your challenges because we live
              them. We understand what matters to you because the same things
              matter to us.
            </p>
            <div className="mt-8">
              <Link
                href="/work-with-us"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-[#c9a84c] uppercase transition hover:text-[#e0bc6a]"
              >
                Work with the studio
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right: services list */}
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
            <h3 className="font-serif text-2xl font-semibold text-white">
              What we offer
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Available to nonprofits and social purpose companies at a
              discounted rate to support our mission.
            </p>
            <ul className="mt-6 space-y-4">
              {services.map((service) => (
                <li
                  key={service}
                  className="flex items-start gap-3 text-sm leading-6 text-white/70"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a84c]" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-white/10 pt-6 text-sm leading-7 text-white/50">
              Our end goal is to bring the fun back into being of service and
              empower more nonprofits to thrive and fulfill their missions. We
              meet you where you are and work together until you don&apos;t need
              us anymore.
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-14 rounded-[28px] border border-[#c9a84c]/20 bg-[#0d1a10] p-8 text-center">
          <p className="font-serif text-2xl text-white">
            Looking for a technology partner that understands?
          </p>
          <p className="mt-3 text-sm text-white/60">
            We are here for you. Let&apos;s explore what&apos;s possible together.
          </p>
          <Link
            href="/work-with-us"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c9a84c] px-8 py-4 text-sm font-semibold text-[#060e08] transition hover:bg-[#e0bc6a]"
          >
            Start a conversation →
          </Link>
        </div>

      </div>
    </section>
  )
}
