import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { grantDescription, grantUrl, deadline } = body

    if (!grantDescription) {
      return NextResponse.json(
        { error: "Grant description is required" },
        { status: 400 }
      )
    }

    // Call AI orchestrator service
    const orchestratorUrl =
      process.env.AI_ORCHESTRATOR_URL || "http://localhost:3002"

    const response = await fetch(`${orchestratorUrl}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "grant-analysis",
        priority: "high",
        data: {
          grantDescription,
          grantUrl,
          deadline,
        },
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to submit analysis task")
    }

    const data = await response.json()

    return NextResponse.json({
      taskId: data.taskId,
      message: "Grant analysis started",
    })
  } catch (error) {
    console.error("Grant analysis error:", error)

    return NextResponse.json(
      { error: "Failed to analyze grant" },
      { status: 500 }
    )
  }
}
