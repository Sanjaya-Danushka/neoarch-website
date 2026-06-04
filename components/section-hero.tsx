"use client"

import { ArrowRight } from "lucide-react"

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
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function SectionHero() {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.15),transparent_50%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,hsl(190 80% 60% / 0.08),transparent_50%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.05),transparent_70%)]" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 top-40 h-72 w-72 animate-float rounded-full border border-primary/10 bg-primary/10 blur-3xl" style={{ animationDelay: "0s" }} />
        <div className="absolute -right-10 top-20 h-96 w-96 animate-float-slow rounded-full border border-primary/10 bg-primary/10 blur-3xl" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/3 h-48 w-48 animate-float rounded-full border border-primary/10 bg-primary/10 blur-3xl" style={{ animationDelay: "2s" }} />
        <div className="absolute -bottom-10 right-1/4 h-64 w-64 animate-float-slow rounded-full border border-primary/10 bg-primary/10 blur-3xl" style={{ animationDelay: "0.5s" }} />
        <div className="absolute left-1/2 top-1/3 h-32 w-32 animate-float rounded-full border-primary/10 bg-primary/10 blur-3xl" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pb-16 pt-12 text-center md:pb-24 md:pt-16">
        <Badge variant="outline" className="glass mb-6 rounded-full px-4 py-1.5 text-xs shadow-sm">
          v2.0.0-beta — Open Source
        </Badge>

        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
          <span className="animate-shimmer bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-300 dark:to-blue-500">
            Modern Package Manager
          </span>
          <br />
          <span className="text-primary">for Arch Linux</span>
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
          Manage packages from pacman, AUR, Flatpak, and npm — all in one
          beautiful dark-themed interface. With built-in Git manager, Docker
          manager, snapshot integration, and a powerful plugin system.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="shadow-lg shadow-primary/20" asChild>
            <a href="#download">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="glass" asChild>
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

        <div className="group relative mt-16 w-full max-w-5xl">
          <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/5 to-cyan-500/10 blur-3xl transition-all duration-700 group-hover:from-primary/30 group-hover:via-primary/10 group-hover:to-cyan-500/20" />
          <div className="glass-strong glow relative rounded-xl p-1 shadow-2xl transition-all duration-500 group-hover:shadow-primary/10">
            <div className="overflow-hidden rounded-lg">
              <img
                src="/home.png"
                alt="NeoArch Dashboard Screenshot"
                className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
