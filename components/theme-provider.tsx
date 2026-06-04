"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContext {
  theme: Theme
  setTheme: (t: Theme) => void
  resolvedTheme: "light" | "dark"
}

const ThemeCtx = createContext<ThemeContext>({
  theme: "system",
  setTheme: () => {},
  resolvedTheme: "light",
})

export function useTheme() {
  return useContext(ThemeCtx)
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system"
  return (localStorage.getItem("theme") as Theme) || "system"
}

function applyTheme(theme: Theme) {
  const resolved = theme === "system" ? getSystemTheme() : theme
  document.documentElement.classList.toggle("dark", resolved === "dark")
  document.documentElement.style.colorScheme = resolved
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = getStoredTheme()
    const resolved = stored === "system" ? getSystemTheme() : stored
    setThemeState(stored)
    setResolvedTheme(resolved)
    applyTheme(stored)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => {
      if (theme === "system") {
        const r = getSystemTheme()
        setResolvedTheme(r)
        applyTheme("system")
      }
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [mounted, theme])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    const resolved = t === "system" ? getSystemTheme() : t
    setResolvedTheme(resolved)
    applyTheme(t)
    try {
      localStorage.setItem("theme", t)
    } catch {}
  }, [])

  useEffect(() => {
    if (!mounted) return
    const handler = (e: StorageEvent) => {
      if (e.key === "theme") {
        const t = (e.newValue as Theme) || "system"
        setTheme(t)
      }
    }
    window.addEventListener("storage", handler)
    return () => window.removeEventListener("storage", handler)
  }, [mounted, setTheme])

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeCtx.Provider>
  )
}
