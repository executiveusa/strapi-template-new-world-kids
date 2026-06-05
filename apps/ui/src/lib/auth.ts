import { cookies } from "next/headers"

export type OpsAuthState =
  | {
      authorized: true
      reason: "session-cookie-present"
    }
  | {
      authorized: false
      reason: "missing-secret" | "missing-session"
    }

export async function getOpsAuthState(): Promise<OpsAuthState> {
  if (!process.env.BETTER_AUTH_SECRET) {
    return {
      authorized: false,
      reason: "missing-secret",
    }
  }

  const cookieStore = await cookies()
  const hasSession = [
    "better-auth.session_token",
    "__Secure-better-auth.session_token",
    "better-auth.session_token.sig",
  ].some((name) => Boolean(cookieStore.get(name)))

  if (!hasSession) {
    return {
      authorized: false,
      reason: "missing-session",
    }
  }

  return {
    authorized: true,
    reason: "session-cookie-present",
  }
}
