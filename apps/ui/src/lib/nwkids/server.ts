import "server-only"

import { createClient } from "@supabase/supabase-js"

const allowedPathways = new Set([
  "technology",
  "sports",
  "food_systems",
  "art",
  "cross_pathway",
])

export type NwkLocale = "en" | "es"

function required(value: FormDataEntryValue | null, name: string, min = 2) {
  const text = String(value ?? "").trim()
  if (text.length < min) throw new Error(`Invalid ${name}`)
  return text
}

function optional(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim()
  return text || null
}

function email(value: FormDataEntryValue | null) {
  const text = required(value, "email", 5).toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) throw new Error("Invalid email")
  return text
}

function pathway(value: FormDataEntryValue | null) {
  const text = String(value ?? "")
  if (!allowedPathways.has(text)) throw new Error("Invalid pathway")
  return text
}

function locale(value: FormDataEntryValue | null): NwkLocale {
  return value === "es" ? "es" : "en"
}

function consent(value: FormDataEntryValue | null, name: string) {
  if (value !== "on" && value !== "true") throw new Error(`Missing ${name}`)
  return true
}

function adminClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRole) {
    throw new Error("NWK intake storage is not configured")
  }

  return createClient(url, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export async function saveOpportunity(formData: FormData) {
  const payload = {
    organization_name: required(formData.get("organization_name"), "organization", 2),
    contact_name: required(formData.get("contact_name"), "contact name", 2),
    email: email(formData.get("email")),
    phone: optional(formData.get("phone")),
    pathway: pathway(formData.get("pathway")),
    project_summary: required(formData.get("project_summary"), "project summary", 20),
    participant_work: required(formData.get("participant_work"), "participant work", 20),
    location: required(formData.get("location"), "location", 2),
    timing: optional(formData.get("timing")),
    compensation: optional(formData.get("compensation")),
    supervision: required(formData.get("supervision"), "supervision", 10),
    notes: optional(formData.get("notes")),
    locale: locale(formData.get("locale")),
    consent: consent(formData.get("consent"), "consent"),
  }

  const { data, error } = await adminClient().rpc("nwkids_submit_opportunity", {
    p_payload: payload,
  })
  if (error || !data) throw new Error(error?.message || "Opportunity intake failed")
  return data as string
}

export async function saveMentor(formData: FormData) {
  const payload = {
    name: required(formData.get("name"), "name", 2),
    email: email(formData.get("email")),
    phone: optional(formData.get("phone")),
    organization: optional(formData.get("organization")),
    pathway: pathway(formData.get("pathway")),
    expertise: required(formData.get("expertise"), "expertise", 20),
    availability: required(formData.get("availability"), "availability", 5),
    location: required(formData.get("location"), "location", 2),
    support_offer: required(formData.get("support_offer"), "support offer", 20),
    screening_ack: consent(formData.get("screening_ack"), "screening acknowledgement"),
    notes: optional(formData.get("notes")),
    locale: locale(formData.get("locale")),
    consent: consent(formData.get("consent"), "consent"),
  }

  const { data, error } = await adminClient().rpc("nwkids_submit_mentor", {
    p_payload: payload,
  })
  if (error || !data) throw new Error(error?.message || "Mentor intake failed")
  return data as string
}

export type First12PublicStatus = {
  slot_number: number
  pathway: string | null
  status: string
  public_label: string | null
  updated_at: string
}

export async function getFirst12Status(): Promise<First12PublicStatus[]> {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) return []

  const client = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  const { data, error } = await client
    .from("nwkids_first12_public")
    .select("slot_number,pathway,status,public_label,updated_at")
    .order("slot_number")

  if (error) return []
  return (data ?? []) as First12PublicStatus[]
}
