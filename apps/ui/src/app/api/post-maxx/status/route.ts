import { NextResponse } from "next/server"

const DEFAULT_POST_MAXX_URL =
  process.env.POST_MAXX_SERVER_URL ||
  process.env.POSTIZ_FRONTEND_URL ||
  "http://localhost:3200"

export async function GET() {
  const startedAt = Date.now()
  const serverUrl = DEFAULT_POST_MAXX_URL

  try {
    const response = await fetch(serverUrl, {
      method: "GET",
      redirect: "manual",
      cache: "no-store",
    })

    const elapsedMs = Date.now() - startedAt

    return NextResponse.json({
      ok: response.ok || (response.status >= 300 && response.status < 400),
      serverUrl,
      status: response.status,
      reachable: true,
      elapsedMs,
      source: "post-maxx",
    })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        serverUrl,
        reachable: false,
        source: "post-maxx",
        error:
          error instanceof Error
            ? error.message
            : "POST-MAXX server unreachable",
      },
      { status: 503 }
    )
  }
}
