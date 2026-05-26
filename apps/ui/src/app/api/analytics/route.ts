import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const event = await request.json()

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics Event]", event)
    }

    // For now, just acknowledge receipt

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics tracking error:", error)

    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    )
  }
}
