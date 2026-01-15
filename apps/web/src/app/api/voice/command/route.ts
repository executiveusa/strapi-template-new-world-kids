/**
 * API Route: Voice Command
 * Handles voice audio transcription via Cassiopeia agent
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
    console.log('[Voice Command]', {
      timestamp: new Date().toISOString(),
      hasAudio: !!audio,
    });

    // TODO: Forward to Cassiopeia agent for transcription
    // For now, return a mock response
    
    return NextResponse.json({
      success: true,
      transcript: 'Voice command received',
      metadata: {
        timestamp: new Date().toISOString(),
        audioReceived: true,
      },
    });
  } catch (error) {
    console.error('[Voice Command] Error:', error);

    return NextResponse.json(
      {
        error: 'Failed to process voice command',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
