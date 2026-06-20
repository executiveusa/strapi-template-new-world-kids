import Link from "next/link"

export function StudioSection() {
  return (
    <section className="border-t border-white/8 bg-[#09120D] py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <div className="mb-4 font-mono text-xs tracking-[0.2em] text-[#C9A84C] uppercase">
            Mission-Funded Studio
          </div>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
            We are not built to beg. We are built to produce.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#E8DEC7]/60">
            Starting and running a non profit can be extremely difficult and
            overwhelming. Especially if you&apos;re a solo founder or a small
            team. Compliance, research, grant writing, fundraising, web site
            design and trying to get your mission seen by the right people on
            social is often a painful and uphill battle that crushes many great
            ideas and potentially helpful projects. We know the feeling and have
            been through it all.
          </p>
          <p className="mt-5 text-lg leading-8 text-[#E8DEC7]/60">
            Over the last two years New World Kids has slowly built a in house
            development team and collaborated with local tech companies from
            right here in Washington State. Support and technology from
            Microsoft, The Allen Institute, Gates Foundation and local software
            engineers has allowed us to build AI powered systems that drive our
            mission and help solve real world problems.
          </p>
          <p className="mt-5 text-lg leading-8 text-[#E8DEC7]/60">
            We see the change it has brought us and we are able to offer these
            systems to other non profits and social purpose companies at a
            discounted rate.
          </p>
          <div className="mt-6">
            <Link
              href="/work-with-us"
              className="text-sm font-semibold text-[#C9A84C]"
            >
              Work with the studio
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-sm border border-white/10 bg-white/[0.02] p-6">
            <ul className="space-y-3 text-sm leading-7 text-[#E8DEC7]/58">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C9A84C]" />
                <span>AI agents that understand your mission</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C9A84C]" />
                <span>Automated social media posting and content creation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C9A84C]" />
                <span>Full stack website design</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C9A84C]" />
                <span>
                  AI operating system designed just for nonprofits and trained
                  on your specific data
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C9A84C]" />
                <span>Grants support automation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C9A84C]" />
                <span>
                  Compliance reporting, and public accountability systems
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C9A84C]" />
                <span>Campaign storytelling</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C9A84C]" />
                <span>Bilingual publishing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C9A84C]" />
                <span>Transparency infrastructure</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C9A84C]" />
                <span>Lightweight mission dashboards</span>
              </li>
            </ul>
            <p className="mt-6 text-sm leading-7 text-[#E8DEC7]/58">
              We understand your challenges because we live them. We understand
              what&apos;s important to you because the same things are important
              to us. These solutions can help recover your time to work on the
              things that matter most to you again. We meet you where you are
              and work together until you don&apos;t need us any more. Our end
              goal is to bring the fun back into being of service and empower
              more non profits to thrive and fulfil their missions.
            </p>
          </div>
          <div className="rounded-sm border border-white/10 bg-white/[0.02] p-6">
            <p className="text-sm leading-7 text-[#E8DEC7]/60">
              If you would like to explore solutions and are looking for a
              technology partner that understands, we are here for you.
            </p>
            <div className="mt-4">
              <Link
                href="/work-with-us"
                className="inline-block rounded-full bg-[#C9A84C] px-6 py-3 text-sm font-semibold text-[#080f0a]"
              >
                Start a conversation →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
