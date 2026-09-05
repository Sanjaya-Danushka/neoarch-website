"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Terminal, FileCheck2, Rocket, ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const installCommands = [
  {
    label: "AUR — Stable",
    cmd: "yay -S neoarch",
    recommended: true,
    description: "Latest stable release (v3.1.1) from the Arch User Repository",
  },
  {
    label: "AUR — Stable (paru)",
    cmd: "paru -S neoarch",
    recommended: false,
    description: "Same stable release, installed with paru",
  },
  {
    label: "AUR — Git (beta)",
    cmd: "yay -S neoarch-git",
    recommended: false,
    description: "Rolling development builds with the latest features",
  },
  {
    label: "From Source",
    cmd: "git clone https://github.com/Sanjaya-Danushka/Neoarch.git\ncd Neoarch && pip install -r requirements_pyqt.txt\npython Neoarch.py",
    recommended: false,
    description: "Clone and run from source",
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
  ...Array.from({ length: 12 }, (_, i) => ({
    src: `/screenshots/${i + 1}.png`,
    label: `Screenshot ${i + 1}`,
    width: 1200,
    height: 800,
  })),
]

const AUTOPLAY_MS = 5000

export function SectionDownload() {
  const [release, setRelease] = useState({ tag_name: "v3.1.1-2", releases_count: 6 })
  const [current, setCurrent] = useState(0)
  const [view, setView] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)

  const goTo = (i: number) => setCurrent((i + screenshots.length) % screenshots.length)
  const prev = () => goTo(current - 1)
  const next = () => goTo(current + 1)
  const closeView = () => setView(null)
  const prevView = () => setView((v) => (v === null ? v : (v + screenshots.length - 1) % screenshots.length))
  const nextView = () => setView((v) => (v === null ? v : (v + 1) % screenshots.length))

  useEffect(() => {
    if (paused || view !== null) return
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % screenshots.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [paused, view, current])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setView(null)
        return
      }
      const delta = e.key === "ArrowLeft" ? -1 : e.key === "ArrowRight" ? 1 : 0
      if (delta === 0) return
      setView((v) =>
        v === null
          ? null
          : (v + delta + screenshots.length) % screenshots.length,
      )
      if (view === null) {
        setCurrent((c) => (c + delta + screenshots.length) % screenshots.length)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [view])

  useEffect(() => {
    document.body.style.overflow = view === null ? "" : "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [view])

  useEffect(() => {
    fetch("/api/release")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.tag_name || data?.releases_count != null) {
          setRelease({
            tag_name: data.tag_name || "v3.1.1-2",
            releases_count: data.releases_count ?? 6,
          })
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="download" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Get Started
            </h2>
            <p className="mt-4 text-muted-foreground">
              Choose your preferred installation method.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          {installCommands.map((item, i) => (
            <Reveal key={item.label} delay={i * 60}>
              <div
                className={cn(
                  "relative min-w-0 rounded-lg border bg-card p-6",
                  item.recommended ? "border-primary/50" : "border-border",
                )}
              >
                {item.recommended && (
                  <Badge className="absolute -top-2.5 right-5 bg-primary px-2.5">
                    Recommended
                  </Badge>
                )}
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  <h3 className="text-[15px] font-medium">{item.label}</h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <pre className="mt-4 overflow-x-auto rounded-md border border-border bg-secondary p-3 font-mono text-xs leading-relaxed text-foreground">
                  <code>{item.cmd}</code>
                </pre>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={90}>
          <div className="mx-auto mt-6 flex max-w-4xl flex-col items-center justify-between gap-4 rounded-lg border border-border bg-card p-6 sm:flex-row">
            <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-secondary text-primary">
                <Rocket className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-[15px] font-medium">
                  Latest release:{" "}
                  <span className="text-primary">{release.tag_name}</span>
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {release.releases_count} releases on GitHub — pick a release
                  or grab the bleeding edge from AUR.
                </p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <a
                href="https://github.com/Sanjaya-Danushka/Neoarch/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Releases
                <ArrowUpRight />
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto mt-12 max-w-md">
            <h3 className="mb-4 flex items-center gap-2 text-center text-base font-medium">
              <FileCheck2 className="h-4 w-4 text-primary" />
              Requirements
            </h3>
            <div className="rounded-lg border border-border bg-card">
              {requirements.map((req, i) => (
                <div
                  key={req}
                  className={cn(
                    "flex items-center gap-3 px-5 py-3 text-sm text-muted-foreground",
                    i < requirements.length - 1 && "border-b border-border",
                  )}
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {req}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="mx-auto mt-20 max-w-4xl">
            <div className="mb-10 text-center">
              <h3 className="text-2xl font-semibold tracking-tight">
                Screenshots
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                See NeoArch in action
              </p>
            </div>

            <div
              className="group relative overflow-x-clip"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div
                key={current}
                className="pointer-events-none absolute -inset-16 -z-10 bg-secondary blur-3xl"
                aria-hidden
              >
                <Image
                  src={screenshots[current].src}
                  alt=""
                  width={screenshots[current].width}
                  height={screenshots[current].height}
                  className="h-full w-full object-cover opacity-35 saturate-150"
                />
              </div>

              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl border border-border bg-secondary/40 shadow-xl shadow-black/40 [perspective:1400px]">
                {screenshots.map((s, i) => {
                  const diff = i - current
                  const active = diff === 0
                  return (
                    <button
                      key={s.src}
                      type="button"
                      onClick={() => setView(i)}
                      className={cn(
                        "absolute inset-0 w-full cursor-zoom-in transition-all duration-700 ease-out will-change-transform",
                        active && "z-10",
                      )}
                      style={{
                        transform: active
                          ? "translateX(0) rotateY(0deg) scale(1)"
                          : diff < 0
                            ? "translateX(-14%) rotateY(18deg) scale(0.93)"
                            : "translateX(14%) rotateY(-18deg) scale(0.93)",
                        opacity: active ? 1 : 0,
                      }}
                      aria-label={`View ${s.label} full screen`}
                    >
                      <Image
                        src={s.src}
                        alt={s.label}
                        width={s.width}
                        height={s.height}
                        loading={i === 0 ? undefined : "lazy"}
                        sizes="(max-width: 1024px) 100vw, 900px"
                        className={cn(
                          "h-full w-full object-cover",
                          active &&
                            "animate-[carousel-kenburns_5s_linear_forwards] group-hover:[animation-play-state:paused]",
                        )}
                      />
                    </button>
                  )
                })}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-0.5 bg-border/60">
                  <div
                    className="h-full origin-left bg-primary"
                    style={{
                      animation: `carousel-progress ${AUTOPLAY_MS}ms linear forwards`,
                      animationPlayState:
                        paused || view !== null ? "paused" : "running",
                    }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={prev}
                className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground shadow-lg backdrop-blur-md transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground shadow-lg backdrop-blur-md transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Next screenshot"
              >
                <ChevronRight className="size-5" />
              </button>

              <div className="mt-6 flex items-center justify-center gap-2.5">
                {screenshots.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    onClick={() => goTo(i)}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      i === current
                        ? "h-2.5 w-7 bg-primary shadow-[0_0_14px_-2px_hsl(var(--primary)/0.7)]"
                        : "h-2.5 w-2.5 bg-border hover:bg-muted-foreground/60",
                    )}
                    aria-label={`Go to ${s.label}`}
                    aria-current={i === current}
                  />
                ))}
              </div>
            </div>

            <p className="mt-5 text-center text-sm text-muted-foreground">
              {screenshots[current].label}
              <span className="mx-2 text-border">·</span>
              Click screenshot to view full screen
            </p>
          </div>
        </Reveal>
      </div>

      {view !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={closeView}
        >
          <button
            type="button"
            onClick={closeView}
            className="absolute right-5 top-5 z-10 rounded-full border border-white/10 bg-black/50 p-2 text-white transition-colors hover:bg-black/80"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prevView()
            }}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2.5 text-white transition-colors hover:bg-black/80"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              nextView()
            }}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2.5 text-white transition-colors hover:bg-black/80"
            aria-label="Next screenshot"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden rounded-lg border border-white/10 shadow-2xl">
              <Image
                src={screenshots[view].src}
                alt={screenshots[view].label}
                width={screenshots[view].width}
                height={screenshots[view].height}
                className="max-h-[80vh] w-auto"
                sizes="(max-width: 1024px) 100vw, 80vw"
                priority
              />
            </div>
            <p className="mt-4 text-sm text-white/70">
              {screenshots[view].label}{" "}
              <span className="text-white/40">
                · {view + 1} / {screenshots.length}
              </span>
            </p>
          </div>
        </div>
      )}
    </section>
  )
}