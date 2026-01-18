import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { text?: string; voiceId?: string }

    if (!body.text) {
      return NextResponse.json({ error: 'Text is required for TTS.' }, { status: 400 })
    }

    return NextResponse.json({
      ok: true,
      message: 'Simulated TTS response. Wire ElevenLabs or Play.ht here.',
      voiceId: body.voiceId,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to synthesize speech.' }, { status: 500 })
  }
}
