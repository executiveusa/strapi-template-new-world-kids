import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/voice/command
 *
 * Handles voice command audio uploads.
 * Currently, Cassiopeia (the voice assistant) is offline, so we return
 * a message indicating the service is unavailable.
 *
 * @param request - The incoming request containing audio file
 * @returns JSON response indicating the command was captured but service is offline
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the form data containing the audio file
    const formData = await request.formData();
    const audioFile = formData.get('audio');

    if (!audioFile || !(audioFile instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: 'No audio file provided',
        },
        { status: 400 }
      );
    }

    // Cassiopeia is currently offline - return appropriate message
    return NextResponse.json({
      success: true,
      forwarded: false,
      message:
        'Voice command captured. Cassiopeia is currently offline. Please try again later.',
      metadata: {
        sizeBytes: audioFile.size,
        contentType: audioFile.type || 'audio/webm',
      },
    });
  } catch (error) {
    console.error('[Voice Command API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/voice/command
 *
 * Returns API documentation and current status.
 */
export async function GET() {
  return NextResponse.json(
    {
      endpoint: '/api/voice/command',
      methods: ['POST'],
      status: 'offline',
      description: 'Voice command processing endpoint. Cassiopeia is currently offline.',
      usage: {
        method: 'POST',
        contentType: 'multipart/form-data',
        body: {
          audio: 'Audio file (webm, mp3, wav, etc.)',
        },
      },
    },
    { status: 200 }
  );
}
