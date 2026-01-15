import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get('audio')

    if (!audioFile || !(audioFile instanceof Blob)) {
      return NextResponse.json({ error: 'Audio file is required.' }, { status: 400 })
    }

    return NextResponse.json({
      text: 'Simulated transcript. Wire Deepgram or Whisper here.',
      confidence: 0.42,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to transcribe audio.' }, { status: 500 })
  }
}
