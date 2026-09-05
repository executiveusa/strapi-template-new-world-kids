"use server"

import { redirect } from "next/navigation"

import { saveOpportunity } from "@/lib/nwkids/server"

export async function submitOpportunity(formData: FormData) {
  const locale = formData.get("locale") === "es" ? "es" : "en"

  try {
    await saveOpportunity(formData)
  } catch {
    redirect(`/${locale}/opportunity?error=1`)
  }

  redirect(`/${locale}/opportunity?submitted=1`)
}
