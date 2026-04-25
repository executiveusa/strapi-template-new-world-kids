export const dynamic = "force-dynamic"

const FALLBACK_STATUS_URL =
  process.env.HERMES_STATUS_URL ??
  "https://pauli-hermes-agent-web.vercel.app/api/status"

const FALLBACK_DASHBOARD_URL =
  process.env.HERMES_DASHBOARD_URL ??
  "https://pauli-hermes-agent-web.vercel.app"

export async function GET() {
  try {
    const response = await fetch(FALLBACK_STATUS_URL, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Hermes upstream returned ${response.status}`)
    }

    const data = (await response.json()) as Record<string, unknown>

    return Response.json(
      {
        ok: true,
        dashboardUrl: FALLBACK_DASHBOARD_URL,
        data,
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    )
  } catch (error) {
    return Response.json(
      {
        ok: false,
        dashboardUrl: FALLBACK_DASHBOARD_URL,
        error:
          error instanceof Error
            ? error.message
            : "Hermes backend is not reachable right now.",
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    )
  }
}
