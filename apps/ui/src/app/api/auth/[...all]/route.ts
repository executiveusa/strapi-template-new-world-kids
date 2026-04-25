function authIsConfigured() {
  return Boolean(process.env.APP_PUBLIC_URL && process.env.BETTER_AUTH_SECRET)
}

function authDisabledResponse() {
  return Response.json(
    {
      error:
        "Auth is not configured for this deployment yet. The public frontend remains available without auth secrets.",
    },
    {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    }
  )
}

async function runAuthHandler(request: Request) {
  if (!authIsConfigured()) {
    return authDisabledResponse()
  }

  const [{ toNextJsHandler }, { auth }] = await Promise.all([
    import("better-auth/next-js"),
    import("@/lib/auth"),
  ])

  const handler = toNextJsHandler(auth)

  return request.method === "POST"
    ? handler.POST(request)
    : handler.GET(request)
}

export async function GET(request: Request) {
  return runAuthHandler(request)
}

export async function POST(request: Request) {
  return runAuthHandler(request)
}
