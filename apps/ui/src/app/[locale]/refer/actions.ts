"use server"

import { redirect } from "next/navigation"

import { saveReferral } from "@/lib/nwkids/server"

export async function submitReferral(formData: FormData) {
  const locale = formData.get("locale") === "es" ? "es" : "en"

  // Honeypot: real visitors never see or fill this field. Pretend success so bots learn nothing.
  if (String(formData.get("company_website") ?? "").trim())
    redirect(`/${locale}/refer?submitted=1`)

  try {
    await saveReferral(formData)
  } catch {
    redirect(`/${locale}/refer?error=1`)
  }

  redirect(`/${locale}/refer?submitted=1`)
}
