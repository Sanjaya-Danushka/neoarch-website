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
    session.getToken().then((token) => {
      sessionStorage.removeItem(CALLBACK_KEY)
      const sep = callback.includes("?") ? "&" : "?"
      const params = new URLSearchParams({
        token: token ?? "",
        user_id: session.user.id,
        email: session.user.primaryEmailAddress?.emailAddress ?? "",
        name: session.user.fullName ?? "",
        avatar_url: session.user.imageUrl ?? "",
      }).toString()
      window.location.href = `${callback}${sep}${params}`
    })
  }, [isLoaded, isSignedIn, session])

  return null
}