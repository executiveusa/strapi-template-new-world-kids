import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const event = await request.json()

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics Event]', event)
    }

    // Store in Strapi or external analytics service
    const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337'
    const strapiToken = process.env.STRAPI_TOKEN

    // You could create an analytics content type in Strapi to store these events
    // For now, just acknowledge receipt

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}
