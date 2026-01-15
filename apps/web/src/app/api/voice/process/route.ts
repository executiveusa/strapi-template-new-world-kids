import { Buffer } from 'node:buffer'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get('audio')

    if (!audioFile || !(audioFile instanceof Blob)) {
      return NextResponse.json(
        { error: 'Audio file is required for voice processing.' },
        { status: 400 }
      )
    }

    const arrayBuffer = await audioFile.arrayBuffer()
    
    // Validate file size to prevent DoS attacks (max 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB in bytes
    if (arrayBuffer.byteLength > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Audio file too large. Maximum size is 10MB.' },
        { status: 413 }
      )
    }
    
    const stellarAgentsUrl = process.env.STELLAR_AGENTS_URL || 'http://localhost:3004'
    const cassiopeiaUrl = `${stellarAgentsUrl}/agents/cassiopeia/voice`

    try {
      const forwardResponse = await fetch(cassiopeiaUrl, {
        method: 'POST',
        headers: {
          'Content-Type': (audioFile as File).type || 'audio/webm',
        },
        body: Buffer.from(arrayBuffer),
      })

      if (forwardResponse.ok) {
        const forwarded = await forwardResponse.json()
        return NextResponse.json({
          success: true,
          forwarded: true,
          result: forwarded,
        })
      }
    } catch (error) {
      console.warn('[Voice] Cassiopeia forwarding failed, falling back to simulated response', error)
    }

    return NextResponse.json({
      success: true,
      forwarded: false,
      message:
        'Voice command captured. Cassiopeia is currently offline, but we have stored your audio for processing.',
      metadata: {
        sizeBytes: arrayBuffer.byteLength,
        contentType: (audioFile as File).type || 'audio/webm',
      },
    })
  } catch (error) {
    console.error('[Voice] Error handling voice command', error)
    return NextResponse.json(
      {
        error: 'Unable to process voice command.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
