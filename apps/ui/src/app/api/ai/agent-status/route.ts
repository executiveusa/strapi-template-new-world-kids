import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const orchestratorUrl =
      process.env.AI_ORCHESTRATOR_URL || "http://localhost:3002"

    const response = await fetch(`${orchestratorUrl}/api/agents/status`, {
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch agent status")
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Agent status fetch error:", error)

    return NextResponse.json({ agents: [] }, { status: 200 })
  }
}
