import type { Locale } from 'next-intl'
import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { headers } from 'next/headers'

import { getSessionSSR } from '@/lib/auth'
import { DashboardContent } from './_components/DashboardContent'

export default async function DashboardPage({
  params,
}: PageProps<'/[locale]/dashboard'>) {
  const { locale } = (await params) as { locale: Locale }
  setRequestLocale(locale)

  // Get session from headers for server-side authentication
  const headersList = await headers()
  const session = await getSessionSSR(headersList)

  // Redirect unauthenticated users to sign in
  if (!session || !session.user) {
    redirect(`/${locale}/auth/signin?callbackUrl=/${locale}/dashboard`)
  }

  return (
    <div className="dashboard-page">
      <DashboardContent session={session} locale={locale} />
    </div>
  )
}
