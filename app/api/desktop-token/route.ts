import { NextResponse } from "next/server"
import { auth, clerkClient } from "@clerk/nextjs/server"

export const dynamic = "force-dynamic"

const THIRTY_DAYS = 30 * 24 * 60 * 60

/**
 * Mint a long-lived session token for the NeoArch desktop app.
 *
 * The desktop app stores whatever token it receives and treats the JWT's
 * `exp` as the session boundary. `session.getToken()` returns Clerk's normal
 * session token, which is refreshed every 60 seconds — far too short for an
 * offline desktop client. A Backend API mint lets us hand the app a token
 * that survives app restarts for up to 30 days.
 */
export async function POST() {
  const { userId, sessionId } = await auth()
  if (!userId || !sessionId) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 })
  }

  try {
    const client = await clerkClient()
    const { jwt } = await client.sessions.getToken(
      sessionId,
      undefined,
      THIRTY_DAYS,
    )
    return NextResponse.json({ token: jwt })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create desktop token" },
      { status: 500 },
    )
  }
}