import type { Metadata } from "next"
import type { Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"

import { PostMaxxPage } from "@/components/post-maxx/PostMaxxPage"

export const metadata: Metadata = {
  title: "POST-MAXX Management",
  description:
    "Owner-friendly social media management for New World Kids using the POST-MAXX workflow.",
}

export default async function Page({
  params,
}: PageProps<"/[locale]/(platform)/post-maxx">) {
  const { locale } = (await params) as { locale: Locale }
  setRequestLocale(locale)

  return <PostMaxxPage />
}
