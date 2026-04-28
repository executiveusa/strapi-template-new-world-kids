import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { DefaultLayout } from '@/layouts/default-layout'
import { getBuildTime } from '@/lib/get-build-time'
import { getMetadata } from '@/lib/seo'
import { getPostsMeta } from '@/lib/get-posts-data'
import { PostList } from '@/components/post-list'
import { resolveLocale } from '@/i18n/utils'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params
  const resolvedLocale = resolveLocale(locale)
  const t = await getTranslations({ locale: resolvedLocale, namespace: 'metadata.home' })

  return getMetadata({
    title: t('title'),
    description: t('description'),
    locale: resolvedLocale,
  })
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const resolvedLocale = resolveLocale(locale)
  setRequestLocale(resolvedLocale)
  const t = await getTranslations({ locale: resolvedLocale, namespace: 'site' })
  const buildTime = getBuildTime()
  const metadata = await getPostsMeta(resolvedLocale)
  const featuredPosts = metadata.posts.slice(0, 4)

  return (
    <DefaultLayout metadata={metadata} buildTime={buildTime}>
      <section className="border-b px-6 py-16 lg:px-0">
        <div className="container mx-auto">
          <div className="mb-4 text-xs uppercase tracking-[0.22em] text-[#9e8251]">
            {resolvedLocale === 'es' ? 'Bitacora de campo' : 'Field journal'}
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            {t('description')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link href="/posts" className="rounded-sm border px-4 py-2 hover:bg-accent">
              {resolvedLocale === 'es' ? 'Ver todas las historias' : 'Browse all stories'}
            </Link>
            <a
              href="https://newworldkids.org/trust"
              className="rounded-sm border px-4 py-2 hover:bg-accent"
            >
              {resolvedLocale === 'es' ? 'Ver confianza y documentos' : 'See trust and documents'}
            </a>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-6 lg:px-0">
          <div className="mb-6 text-sm text-muted-foreground">
            {resolvedLocale === 'es'
              ? 'Cuatro pilares: alimentos, agua, energia y refugio.'
              : 'Four pillars: food, water, energy, and shelter.'}
          </div>
        </div>
        <PostList postsMeta={featuredPosts} selectedTag="All" />
      </section>
    </DefaultLayout>
  )
}
