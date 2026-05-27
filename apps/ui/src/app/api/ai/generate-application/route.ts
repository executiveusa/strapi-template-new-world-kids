import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { grantName, requirements, fundingAmount } = body

    if (!grantName || !requirements) {
      return NextResponse.json(
        { error: "Grant name and requirements are required" },
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
        type: "grant-application",
        priority: "high",
        data: {
          grantName,
          requirements,
          fundingAmount,
        },
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate application")
    }

    const data = await response.json()

    return NextResponse.json({
      taskId: data.taskId,
      message: "Application generation started",
    })
  } catch (error) {
    console.error("Application generation error:", error)

    return NextResponse.json(
      { error: "Failed to generate application" },
      { status: 500 }
    )
  }
}
