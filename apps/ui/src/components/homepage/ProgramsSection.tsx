import Link from "next/link"

export function ProgramsSection() {
  return (
    <section id="programs" className="bg-[#071008] py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <article className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">
            <p className="text-xs tracking-[0.24em] text-[#c9a84c] uppercase">
              Inner city youth.
            </p>
            <h3 className="mt-4 font-serif text-2xl font-semibold text-white">
              CULTURE SHOCK PROGRAM
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/64">
              After graduation most inner city youth are thrown into an economy
              that values financial gain over creativity and success over
              service. Without the proper life skills we see youth with raw
              talents and amazing potential stuck in a desperate loop of
              &ldquo;survival mode&rdquo;. These pressures often lead to poor
              decision making and the temptations of crime, drugs and
              destructive behavior. Our Culture Shock uses mentors with
              backgrounds in art, sports, and urban agriculture to inspire youth
              to discover their full potential, find sufficient employment and
              contribute their talents and gifts to the world.
            </p>
            <p className="mt-6 text-sm text-[#c9a84c]">
              <Link href="/blog">
                To learn more about our vision check out our blog here.
              </Link>
            </p>
          </article>

          <article className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">
            <p className="text-xs tracking-[0.24em] text-[#c9a84c] uppercase">
              Rural youth
            </p>
            <h3 className="mt-4 font-serif text-2xl font-semibold text-white">
              INDIGO AZUL PROJECT
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/64">
              Youth in rural areas face a different set of challenges than youth
              in the inner city. Many families live day to day and often the
              markets are far away and expensive. The ability to produce your
              own food, water and shelter can be life changing for them. Our
              Indigo Azul Project is a 1.5 acre experimental food forest in
              Puerto Vallarta Mexico. We began planting in 2020 with the goal to
              create systems for Food, Water, Energy and Shelter that can be
              duplicated anywhere. Since inception the site has grown to host
              over 200 plant species, fruit trees, medicinal herbs and flowers.
              The tropical climate has allowed us to practice sustainable
              techniques year round and document the results. We are now ready
              to share the results and open the doors to local youth.
            </p>
            <p className="mt-6 text-sm text-[#c9a84c]">
              <Link href="/gallery">
                Please check out our blog and our gallery to learn more
              </Link>
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
