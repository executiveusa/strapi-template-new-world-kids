"use server"

import { redirect } from "next/navigation"

import { saveMentor } from "@/lib/nwkids/server"

export async function submitMentor(formData: FormData) {
  const locale = formData.get("locale") === "es" ? "es" : "en"

  try {
    await saveMentor(formData)
  } catch {
    redirect(`/${locale}/mentor?error=1`)
  }

  redirect(`/${locale}/mentor?submitted=1`)
}
