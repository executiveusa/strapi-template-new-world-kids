import { redirect } from "next/navigation"

import { FUNDRAZR_CAMPAIGN_URL } from "@/content/donation"

export default function DonatePage() {
  redirect(FUNDRAZR_CAMPAIGN_URL)
}
