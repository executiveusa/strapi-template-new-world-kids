"use server"

import { redirect } from "next/navigation"

import { saveMentor } from "@/lib/nwkids/server"

export async function submitMentor(formData: FormData) {
  const locale = formData.get("locale") === "es" ? "es" : "en"

  // Honeypot: real visitors never see or fill this field. Pretend success so bots learn nothing.
  if (String(formData.get("company_website") ?? "").trim())
    redirect(`/${locale}/mentor?submitted=1`)

  try {
    await saveMentor(formData)
  } catch {
    redirect(`/${locale}/mentor?error=1`)
  }

  redirect(`/${locale}/mentor?submitted=1`)
}
