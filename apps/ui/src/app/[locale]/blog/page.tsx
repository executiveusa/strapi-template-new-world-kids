import type { Metadata } from "next"
import type { Locale } from "next-intl"

import { siteLinks } from "@/components/site/siteData"
import { getJournalCopy, journalPosts } from "@/content/journal"
import { Link } from "@/lib/navigation"

const copy = {
  en: {
    eyebrow: "Field journal",
    title: "A place to show what’s possible.",
    body: "We document what we’re learning—and the people, projects, and institutions proving similar ideas in the real world.",
    whyEyebrow: "Why this exists",
    whyTitle: "Share the work. Trade ideas. Give good work a wider voice.",
    whyBody: "This journal is not only about us. We use it to study and credit people doing useful work, connect ideas across communities, and help more people see what is already possible.",
    invite: "Working on something similar? Tell us →",
    read: "Read →",
    metaTitle: "Field Journal | New World Kids",
    metaDescription: "New World Kids documents lessons, field work, and people proving practical community ideas in the real world.",
  },
  es: {
    eyebrow: "Bitácora de campo",
    title: "Un lugar para mostrar lo que es posible.",
    body: "Documentamos lo que aprendemos y a las personas, proyectos e instituciones que demuestran ideas similares en el mundo real.",
    whyEyebrow: "Por qué existe",
    whyTitle: "Compartir el trabajo. Intercambiar ideas. Dar más voz al buen trabajo.",
    whyBody: "Esta bitácora no trata solo de nosotros. La usamos para estudiar y reconocer a personas que hacen trabajo útil, conectar ideas entre comunidades y ayudar a que más gente vea lo que ya es posible.",
    invite: "¿Trabajas en algo parecido? Cuéntanos →",
    read: "Leer →",
    metaTitle: "Bitácora de campo | New World Kids",
    metaDescription: "New World Kids documenta aprendizajes, trabajo de campo y personas que demuestran ideas comunitarias prácticas en el mundo real.",
  },
} as const

export async function generateMetadata({ params }: { readonly params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = locale === "es" ? copy.es : copy.en
  return { title: t.metaTitle, description: t.metaDescription }
}

export default async function BlogPage({
  params,
}: {
  readonly params: Promise<{ locale: string }>
}) {
  const { locale } = (await params) as { locale: Locale }
  const t = locale === "es" ? copy.es : copy.en

  return (
    <main className="bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <section className="px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-[clamp(3.2rem,10vw,7rem)] leading-[0.92] font-black tracking-[-0.055em] text-balance">{t.title}</h1>
          <p className="mt-9 max-w-3xl border-t border-black/15 pt-7 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8 md:text-xl">{t.body}</p>
        </div>
      </section>

      <section className="border-y border-black/15 px-5 py-16 sm:px-8 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-nwk-blue)] uppercase sm:text-xs">{t.whyEyebrow}</p>
            <h2 className="mt-4 max-w-xl text-[clamp(2.3rem,6vw,4.8rem)] leading-[0.94] font-black tracking-[-0.05em] text-balance">{t.whyTitle}</h2>
          </div>
          <div className="border-t border-black/15 pt-6 lg:border-t-0 lg:pt-0">
            <p className="max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">{t.whyBody}</p>
            <a href={`${siteLinks.email}?subject=${encodeURIComponent(locale === "es" ? "Idea para la bitácora de New World Kids" : "New World Kids journal idea")}`} className="mt-7 inline-flex min-h-11 items-center border-y border-black/20 py-3 text-sm font-black hover:border-black/55">{t.invite}</a>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 md:px-10 md:pb-32">
        <div className="mx-auto max-w-7xl">
          {journalPosts.map((post, index) => {
            const article = getJournalCopy(post, locale)
            return (
              <article key={post.slug} className="grid gap-6 border-b border-black/15 py-10 md:grid-cols-[92px_1fr_auto] md:items-start md:gap-8 md:py-12">
                <div className="text-[10px] font-semibold tracking-[0.14em] text-black/38">0{index + 1}</div>
                <div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-semibold tracking-[0.14em] text-[var(--color-nwk-blue)] uppercase">
                    <span>{post.category}</span>
                    <span className="text-black/28">·</span>
                    <span className="text-black/42">{post.date}</span>
                  </div>
                  <h2 className="mt-3 max-w-4xl text-[clamp(2rem,5vw,4rem)] leading-[0.96] font-black tracking-[-0.045em] text-balance">{article.title}</h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">{article.dek}</p>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  locale={locale}
                  className="group inline-flex min-h-11 items-center justify-between border-y border-black/20 py-3 text-sm font-black md:min-w-28"
                >
                  <span>{t.read}</span>
                  <span aria-hidden="true" className="ml-6 transition-transform duration-200 group-hover:translate-x-1">↗</span>
                </Link>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
