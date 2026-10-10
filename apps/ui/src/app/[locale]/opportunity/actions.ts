"use server"

import { redirect } from "next/navigation"

import { saveOpportunity } from "@/lib/nwkids/server"
import { rateLimited } from "@/lib/rate-limit"

export async function submitOpportunity(formData: FormData) {
  const locale = formData.get("locale") === "es" ? "es" : "en"
  const prefix = locale === "es" ? "/es" : ""

  // Honeypot: real visitors never see or fill this field. Pretend success so bots learn nothing.
  if (String(formData.get("company_website") ?? "").trim())
    redirect(`${prefix}/opportunity?submitted=1`)

  if (await rateLimited("opportunity"))
    redirect(`${prefix}/opportunity?error=1`)

  try {
    await saveOpportunity(formData)
  } catch {
    redirect(`${prefix}/opportunity?error=1`)
  }

  redirect(`${prefix}/opportunity?submitted=1`)
}
