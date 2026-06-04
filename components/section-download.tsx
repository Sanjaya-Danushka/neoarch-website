"use client"

import { useState } from "react"
import { Terminal, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const installCommands = [
  {
    label: "AUR (yay)",
    cmd: "yay -S neoarch-git",
    recommended: true,
  },
  {
    label: "AUR (paru)",
    cmd: "paru -S neoarch-git",
    recommended: false,
  },
  {
    label: "From Source",
    cmd: "git clone https://github.com/Sanjaya-Danushka/Neoarch.git\ncd Neoarch && pip install -r requirements_pyqt.txt\npython Neoarch.py",
    recommended: false,
  },
]

const requirements = [
  "Arch Linux (or Arch-based distro)",
  "Python 3.8+",
  "PyQt6",
  "Administrative privileges",
  "Git (for source install)",
]

const screenshots = [
  { src: "/installed.png", label: "Installed Packages" },
  { src: "/searchpackages.png", label: "Search & Discover" },
  { src: "/bundles.png", label: "Bundle Management" },
  { src: "/plugins.png", label: "Plugin System" },
  { src: "/settings.png", label: "Settings" },
]

export function SectionDownload() {
  const [current, setCurrent] = useState(0)

  return (
    <section id="download" className="border-t border-border/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Get Started
          </h2>
          <p className="mt-4 text-muted-foreground">
            Choose your preferred installation method.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {installCommands.map((item) => (
            <Card
              key={item.label}
              className={
                item.recommended
                  ? "relative overflow-visible border-primary/40 bg-card/60 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                  : "border-border/50 bg-card/60 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
              }
            >
              {item.recommended && (
                <Badge className="absolute -top-2.5 right-4 px-3">
                  Recommended
                </Badge>
              )}
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base">{item.label}</CardTitle>
                </div>
                <CardDescription>
                  {item.recommended
                    ? "Install from the Arch User Repository"
                    : "Clone and run from source"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="overflow-x-auto rounded-lg border border-border/50 bg-muted p-3 text-xs leading-relaxed">
                    <code>{item.cmd}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="mx-auto my-14 max-w-md" />

        <div className="mx-auto max-w-lg">
          <h3 className="mb-6 text-center text-lg font-semibold">
            Requirements
          </h3>
          <div className="rounded-lg border border-border/50 bg-card/60 backdrop-blur-sm shadow-sm">
            {requirements.map((req, i) => (
              <div
                key={req}
                className={`flex items-center gap-3 px-5 py-3 text-sm ${
                  i < requirements.length - 1
                    ? "border-b border-border/30"
                    : ""
                }`}
              >
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                {req}
              </div>
            ))}
          </div>
        </div>

        <Separator className="mx-auto my-14 max-w-md" />

        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h3 className="inline-flex items-center gap-2 text-lg font-semibold">
              <ImageIcon className="h-5 w-5 text-primary" />
              Screenshots
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              See NeoArch in action
            </p>
          </div>

          <div className="group relative">
            <div className="absolute -inset-2 -z-10 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/5 to-cyan-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="glass-strong glow relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-primary/10">
              <img
                src={screenshots[current].src}
                alt={screenshots[current].label}
                className="w-full transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => setCurrent((current - 1 + screenshots.length) % screenshots.length)}
                  className="rounded-full bg-background/80 p-2 text-foreground shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-background"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrent((current + 1) % screenshots.length)}
                  className="rounded-full bg-background/80 p-2 text-foreground shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-background"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/60 to-transparent p-4 pt-8 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-center text-sm font-medium text-foreground">
                  {screenshots[current].label}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            {screenshots.map((s, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                  i === current
                    ? "border-primary ring-1 ring-primary/30 shadow-sm shadow-primary/10"
                    : "border-transparent opacity-60 ring-0 hover:opacity-90 hover:shadow-sm"
                }`}
              >
                <img
                  src={s.src}
                  alt={s.label}
                  className="h-14 w-24 object-cover md:h-16 md:w-28"
                />
                <div className={`absolute inset-0 transition-colors ${
                  i === current ? "bg-primary/10" : "bg-black/40 group-hover:bg-black/20"
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
