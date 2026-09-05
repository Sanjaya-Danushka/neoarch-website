"use client"

import { createContext, useContext, useEffect } from "react"

type Theme = "dark"

interface ThemeContext {
  theme: Theme
  resolvedTheme: "dark"
}

const ThemeCtx = createContext<ThemeContext>({
  theme: "dark",
  resolvedTheme: "dark",
})

export function useTheme() {
  return useContext(ThemeCtx)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("dark")
    document.documentElement.style.colorScheme = "dark"
  }, [])

  return (
    <ThemeCtx.Provider value={{ theme: "dark", resolvedTheme: "dark" }}>
      {children}
    </ThemeCtx.Provider>
  )
}