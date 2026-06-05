"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#docker", label: "Docker" },
  { href: "#download", label: "Download" },
  { href: "#community", label: "Community" },
  { href: "#reviews", label: "Reviews" },
]

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

export function SectionNavbar() {
  const [open, setOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("")
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: "-40% 0px -55% 0px" },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <>
      <div
        className="fixed top-0 left-0 z-[60] h-0.5 bg-primary transition-all duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="#" className="flex items-center gap-2">
            <img src="/logo.png" alt="NeoArch" className="h-8 w-auto" />
            <span className="text-xl font-bold tracking-tight text-primary">
              NeoArch
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-all duration-200",
                  activeSection === link.href.slice(1)
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/Sanjaya-Danushka/Neoarch"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <span className={cn(
                "inline-block transition-transform duration-500",
                resolvedTheme === "dark" ? "rotate-0" : "rotate-90",
              )}>
                {resolvedTheme === "dark" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                )}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-background/95 backdrop-blur-2xl transition-all duration-500 md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="text-2xl font-medium transition-colors hover:text-primary"
            style={{
              transitionDelay: open ? `${i * 80}ms` : "0ms",
              transition: `opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 400ms cubic-bezier(0.16, 1, 0.3, 1)`,
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {link.label}
          </a>
        ))}
        <Button
          variant="default"
          size="lg"
          className="mt-4"
          style={{
            transitionDelay: open ? `${navLinks.length * 80}ms` : "0ms",
            transition: `opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 400ms cubic-bezier(0.16, 1, 0.3, 1)`,
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(20px)",
          }}
          asChild
        >
          <a
            href="https://github.com/Sanjaya-Danushka/Neoarch"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="mr-2 h-4 w-4" />
            View on GitHub
          </a>
        </Button>
      </div>
    </>
  )
}
