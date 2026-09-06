"use client"

import { useEffect, useRef } from "react"
import { useSession } from "@clerk/nextjs"

const CALLBACK_KEY = "neoarch_callback"

/**
 * Desktop app opens the site at /sign-in?callback=http://127.0.0.1:<port>/callback.
 * This component saves that URL, and once the user is signed in, redirects the
 * desktop app's local callback with the Clerk session token attached.
 */
export function DesktopCallback() {
  const { isLoaded, isSignedIn, session } = useSession()
  const handled = useRef(false)
  const callbackRef = useRef<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cb = params.get("callback")
    if (cb) {
      callbackRef.current = cb
      sessionStorage.setItem(CALLBACK_KEY, cb)
    } else {
      callbackRef.current = sessionStorage.getItem(CALLBACK_KEY)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !session) return

    const callback = callbackRef.current
    if (!callback || handled.current) return

    handled.current = true

    const finish = async (token: string) => {
      sessionStorage.removeItem(CALLBACK_KEY)
      const sep = callback.includes("?") ? "&" : "?"
      const params = new URLSearchParams({
        token,
        user_id: session.user.id,
        email: session.user.primaryEmailAddress?.emailAddress ?? "",
        name: session.user.fullName ?? "",
        avatar_url: session.user.imageUrl ?? "",
      }).toString()
      window.location.href = `${callback}${sep}${params}`
    }

    ;(async () => {
      try {
        // Prefer a long-lived token minted server-side so the desktop app
        // stays signed in across restarts. The normal session token (60s TTL)
        // is only a fallback.
        const res = await fetch("/api/desktop-token", { method: "POST" })
        if (res.ok) {
          const data = (await res.json()) as { token?: string }
          if (data.token) {
            await finish(data.token)
            return
          }
        }
      } catch {
        // fall through to the short-lived token below
      }
      const token = await session.getToken()
      await finish(token ?? "")
    })()
  }, [isLoaded, isSignedIn, session])

  return null
}