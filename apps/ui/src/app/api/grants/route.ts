import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const strapiUrl = process.env.STRAPI_URL || "http://localhost:1337"
    const strapiToken = process.env.STRAPI_TOKEN

    const response = await fetch(
      `${strapiUrl}/api/grant-applications?populate=*&sort=deadline:asc`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(strapiToken && { Authorization: `Bearer ${strapiToken}` }),
        },
      }
    )

    if (!response.ok) {
      throw new Error("Failed to fetch grants from Strapi")
    }

    const data = await response.json()

    const grants = data.data.map((item: any) => ({
      id: item.id,
      grantName: item.attributes.grantName,
      funderOrganization: item.attributes.funderOrganization,
      fundingAmount: item.attributes.fundingAmount,
      deadline: item.attributes.deadline,
      status: item.attributes.status,
      priority: item.attributes.priority,
      fitScore: item.attributes.aiGeneratedContent?.fitScore,
      aiGeneratedContent: item.attributes.aiGeneratedContent,
    }))

    return NextResponse.json({ grants })
  } catch (error) {
    console.error("Grants fetch error:", error)

    return NextResponse.json(
      { error: "Failed to fetch grants", grants: [] },
      { status: 500 }
    )
  }
}
