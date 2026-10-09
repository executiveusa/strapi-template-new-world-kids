"use server"

import { redirect } from "next/navigation"

import { saveOpportunity } from "@/lib/nwkids/server"

export async function submitOpportunity(formData: FormData) {
  const locale = formData.get("locale") === "es" ? "es" : "en"

  // Honeypot: real visitors never see or fill this field. Pretend success so bots learn nothing.
  if (String(formData.get("company_website") ?? "").trim())
    redirect(`/${locale}/opportunity?submitted=1`)

  try {
    await saveOpportunity(formData)
  } catch {
    redirect(`/${locale}/opportunity?error=1`)
  }

  redirect(`/${locale}/opportunity?submitted=1`)
}
