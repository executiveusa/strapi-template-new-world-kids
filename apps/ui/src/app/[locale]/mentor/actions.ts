"use server"

import { redirect } from "next/navigation"

import { saveMentor } from "@/lib/nwkids/server"
import { rateLimited } from "@/lib/rate-limit"

export async function submitMentor(formData: FormData) {
  const locale = formData.get("locale") === "es" ? "es" : "en"
  const prefix = locale === "es" ? "/es" : ""

  // Honeypot: real visitors never see or fill this field. Pretend success so bots learn nothing.
  if (String(formData.get("company_website") ?? "").trim())
    redirect(`${prefix}/mentor?submitted=1`)

  if (await rateLimited("mentor")) redirect(`${prefix}/mentor?error=1`)

  try {
    await saveMentor(formData)
  } catch {
    redirect(`${prefix}/mentor?error=1`)
  }

  redirect(`${prefix}/mentor?submitted=1`)
}
