"use server"

import { redirect } from "next/navigation"

import { saveReferral } from "@/lib/nwkids/server"
import { rateLimited } from "@/lib/rate-limit"

export async function submitReferral(formData: FormData) {
  const locale = formData.get("locale") === "es" ? "es" : "en"
  const prefix = locale === "es" ? "/es" : ""

  // Honeypot: real visitors never see or fill this field. Pretend success so bots learn nothing.
  if (String(formData.get("company_website") ?? "").trim())
    redirect(`${prefix}/refer?submitted=1`)

  if (await rateLimited("refer")) redirect(`${prefix}/refer?error=1`)

  try {
    await saveReferral(formData)
  } catch {
    redirect(`${prefix}/refer?error=1`)
  }

  redirect(`${prefix}/refer?submitted=1`)
}
