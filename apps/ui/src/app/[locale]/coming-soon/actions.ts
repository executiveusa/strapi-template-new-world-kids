"use server"

import { redirect } from "next/navigation"

import { saveWaitlist } from "@/lib/nwkids/server"

export async function joinWaitlist(formData: FormData) {
  const locale = formData.get("locale") === "es" ? "es" : "en"
  const base = locale === "es" ? "/es/coming-soon" : "/coming-soon"

  // Honeypot: real visitors never see or fill this field. Pretend success so bots learn nothing.
  if (String(formData.get("company_website") ?? "").trim())
    redirect(`${base}?joined=1`)

  try {
    await saveWaitlist(formData)
  } catch {
    redirect(`${base}?error=1`)
  }

  redirect(`${base}?joined=1`)
}
