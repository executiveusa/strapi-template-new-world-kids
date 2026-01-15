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
  }
}
