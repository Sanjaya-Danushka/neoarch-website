import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

const THIRTY_DAYS = 30 * 24 * 60 * 60

/**
 * Mint a long-lived session token for the NeoArch desktop app.
 *
 * The desktop app stores whatever token it receives and treats the JWT's
 * `exp` as the session boundary. `session.getToken()` returns Clerk's normal
 * session token, which is refreshed every 60 seconds — far too short for an
 * offline desktop client. Minting via the Clerk Backend API hands the app a
 * token that survives app restarts for up to 30 days.
 *
 * This calls the Clerk Backend API directly instead of the SDK to keep the
 * Netlify function bundle minimal.
 */
export async function POST() {
  const { userId, sessionId } = await auth()
  if (!userId || !sessionId) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 })
  }

  const secretKey = process.env.CLERK_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json(
      { error: "Server configuration missing" },
      { status: 500 },
    )
  }

  try {
    const res = await fetch(
      `https://api.clerk.com/v1/sessions/${sessionId}/tokens`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expire_in_seconds: THIRTY_DAYS }),
      },
    )
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to create desktop token" },
        { status: 500 },
      )
    }
    const data = (await res.json()) as { jwt?: string }
    return NextResponse.json({ token: data.jwt })
  } catch {
    return NextResponse.json(
      { error: "Failed to create desktop token" },
      { status: 500 },
    )
  }
}