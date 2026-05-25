import { type NextRequest, NextResponse } from "next/server"

import { nimChat } from "@/lib/nvidia-nim"

export async function POST(req: NextRequest) {
  const { message, systemPrompt } = await req.json()

  if (!message) {
    return NextResponse.json({ error: "message is required" }, { status: 400 })
  }

  const reply = await nimChat([{ role: "user", content: message }], {
    systemPrompt,
  })

  return NextResponse.json({ reply })
}
