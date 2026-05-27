import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { nimChat } from '@/lib/nvidia-nim'

interface ChatRequestBody {
  message: string
  systemPrompt?: string
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ChatRequestBody
  const { message, systemPrompt } = body

  if (typeof message !== 'string' || message.length === 0) {
    return NextResponse.json({ error: 'message is required' }, { status: 400 })
  }

  const reply = await nimChat([{ role: 'user', content: message }], {
    systemPrompt,
  })

  return NextResponse.json({ reply })
}
