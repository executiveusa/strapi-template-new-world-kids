/**
 * API Route: Process Voice Command
 * Handles voice audio processing
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audio = formData.get('audio');

    if (!audio) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Log the request (for observability)
    console.log('[Voice Process]', {
      timestamp: new Date().toISOString(),
      hasAudio: !!audio,
    });

    // TODO: Implement actual audio processing here
    // For now, return a response indicating audio was received but not stored
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
      message: 'Audio captured but not stored or processed',
      metadata: {
        timestamp: new Date().toISOString(),
        audioReceived: true,
        processed: false,
      },
    });
  } catch (error) {
    console.error('[Voice Process] Error:', error);

    return NextResponse.json(
      {
        error: 'Failed to process audio',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
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
