import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHeader } from '@/components/page-header'
import { DefaultLayout } from '@/layouts/default-layout'
import { getBuildTime } from '@/lib/get-build-time'
import { getPostsMeta } from '@/lib/get-posts-data'
import { getMetadata } from '@/lib/seo'
import { resolveLocale } from '@/i18n/utils'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params
  const resolvedLocale = resolveLocale(locale)
  const t = await getTranslations({ locale: resolvedLocale, namespace: 'metadata.about' })

  return getMetadata({
    title: t('title'),
    description: t('description'),
    locale: resolvedLocale,
    pathname: '/about',
  })
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const resolvedLocale = resolveLocale(locale)
  setRequestLocale(resolvedLocale)
  const t = await getTranslations({ locale: resolvedLocale, namespace: 'routes.about' })
  const buildTime = getBuildTime()
  const metadata = await getPostsMeta(resolvedLocale)

  return (
    <DefaultLayout metadata={metadata} buildTime={buildTime}>
      <PageHeader title={t('title')} description={t('description')} />
      <div className="container mx-auto space-y-8 px-6 pb-16 lg:px-0">
        <p className="max-w-3xl text-base leading-8 text-muted-foreground">
          {resolvedLocale === 'es'
            ? 'Este journal publica historias, pruebas y aprendizajes desde el trabajo de New World Kids en alimentos, agua, energia y refugio. No existe para vender una fantasia. Existe para documentar el trabajo real y hacerlo util para comunidades, donantes y aliados.'
            : 'This journal publishes stories, proof, and lessons from New World Kids field work across food, water, energy, and shelter. It is not here to sell a fantasy. It is here to document real work and make it useful for communities, donors, and partners.'}
        </p>
        <p className="max-w-3xl text-base leading-8 text-muted-foreground">
          {resolvedLocale === 'es'
            ? 'Cada articulo conecta la narrativa con la mision principal: educacion regenerativa, transparencia publica y sistemas que ayudan a financiar el trabajo en el terreno.'
            : 'Each article connects storytelling back to the core mission: regenerative education, public trust, and systems that help fund work on the ground.'}
        </p>
      </div>
    </DefaultLayout>
  )
}
