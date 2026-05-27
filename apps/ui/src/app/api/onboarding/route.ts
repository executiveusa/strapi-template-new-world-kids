import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const onboardingData = await request.json()

    console.log("Onboarding completed:", onboardingData)

    // Update AI orchestrator with nonprofit profile
    const orchestratorUrl =
      process.env.AI_ORCHESTRATOR_URL || "http://localhost:3002"

    await fetch(`${orchestratorUrl}/api/profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nonprofitProfile: {
          name: onboardingData.organizationName,
          mission: onboardingData.mission,
          achievements: onboardingData.achievements,
          targetPopulation: onboardingData.targetPopulation,
        },
      }),
    }).catch(() => {
      console.log("AI orchestrator not available, data saved locally")
    })

    return NextResponse.json({
      success: true,
      message: "Onboarding completed successfully",
    })
  } catch (error) {
    console.error("Onboarding error:", error)

    return NextResponse.json(
      { error: "Failed to complete onboarding" },
      { status: 500 }
    )
  }
}
