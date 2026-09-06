import type { Metadata } from "next"
import type { Locale } from "next-intl"
import { notFound } from "next/navigation"

import { getJournalCopy, getJournalPost, journalPosts } from "@/content/journal"
import { Link } from "@/lib/navigation"

export function generateStaticParams() {
  return journalPosts.flatMap((post) => [
    { locale: "en", slug: post.slug },
    { locale: "es", slug: post.slug },
  ])
}

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getJournalPost(slug)
  if (!post) return {}
  const article = getJournalCopy(post, locale)
  return {
    title: `${article.title} | New World Kids`,
    description: article.dek,
  }
}

export default async function JournalPostPage({
  params,
}: {
  readonly params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string }
  const post = getJournalPost(slug)
  if (!post) notFound()
  const article = getJournalCopy(post, locale)
  const back = locale === "es" ? "Volver a la bitácora" : "Back to journal"
  const source = locale === "es" ? "Base de esta nota" : "Source trail"

  return (
    <main className="bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <article>
        <header className="px-5 py-16 sm:px-8 sm:py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold tracking-[0.16em] uppercase">
              <span className="text-[var(--color-nwk-blue)]">{post.category}</span>
              <span className="text-black/28">·</span>
              <span className="text-black/42">{post.date}</span>
            </div>
            <h1 className="mt-4 max-w-6xl text-[clamp(2.8rem,11vw,7rem)] leading-[0.93] font-black tracking-[-0.05em] text-balance sm:mt-5 sm:tracking-[-0.06em]">{article.title}</h1>
            <p className="mt-7 max-w-3xl border-t border-black/15 pt-6 text-base leading-7 text-[var(--color-text-muted)] sm:mt-9 sm:pt-7 sm:text-lg sm:leading-8 md:text-2xl md:leading-9">{article.dek}</p>
          </div>
        </header>

        <div className="border-t border-black/15 px-5 pb-20 sm:px-8 sm:pb-24 md:px-10 md:pb-32">
          <div className="mx-auto grid max-w-7xl gap-8 py-10 sm:gap-10 sm:py-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:py-16">
            <aside className="border-b border-black/15 pb-7 lg:sticky lg:top-28 lg:self-start lg:border-b-0 lg:pb-0">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-black/40 uppercase">{source}</p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--color-text-muted)]">{post.sourceLabel}</p>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 sm:mt-6">
                {post.tags.map((tag) => (
                  <span key={tag} className="border-y border-black/15 py-2 text-[10px] font-semibold tracking-[0.08em] text-black/50 uppercase">{tag}</span>
                ))}
              </div>
            </aside>

            <div className="max-w-3xl">
              {article.sections.map((section, index) => (
                <section key={`${post.slug}-${index}`} className={index > 0 ? "mt-10 border-t border-black/15 pt-8 sm:mt-12 sm:pt-10" : ""}>
                  {section.heading ? (
                    <h2 className="mb-5 text-[clamp(1.9rem,8vw,3.5rem)] leading-[0.98] font-black tracking-[-0.04em] sm:tracking-[-0.045em]">{section.heading}</h2>
                  ) : null}
                  <div className="space-y-5 sm:space-y-6">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-7 text-[var(--color-ink-soft)] sm:text-xl sm:leading-9">{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}

              <div className="mt-12 border-t border-black/18 pt-6 sm:mt-14 sm:pt-7">
                <Link href="/blog" locale={locale} className="group inline-flex min-h-12 w-full items-center border-y border-black/20 py-3 text-sm font-black sm:w-auto">
                  <span>← {back}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
