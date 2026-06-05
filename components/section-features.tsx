import {
  Package,
  Layers,
  GitBranch,
  Container,
  Camera,
  Puzzle,
  Cloud,
  Clock,
  FileArchive,
} from "lucide-react"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Reveal } from "@/components/reveal"
import { LazyIframe } from "@/components/lazy-iframe"

const features = [
  {
    icon: Package,
    title: "Multi-Source Management",
    description:
      "Unify pacman, AUR, Flatpak, and npm under one interface. Search, install, update, and remove packages from any source seamlessly.",
  },
  {
    icon: Layers,
    title: "Bundle System",
    description:
      "Create portable package bundles for easy deployment. Export, import, and share bundles with the community.",
    video: "https://drive.google.com/file/d/1ZFUQxou18QZiT6JTdxKjkwl5XE_IeSUt/preview",
  },
  {
    icon: GitBranch,
    title: "Git Manager",
    description:
      "Clone, build, update, and clean Git projects with a click. Supports Cargo, autotools, Makefile, and custom build commands.",
  },
  {
    icon: Container,
    title: "Docker Manager",
    description:
      "Pull, run, list, stop, and clean containers with port mappings, volumes, env vars, GPU passthrough, and restart policies.",
  },
  {
    icon: Camera,
    title: "Snapshot Integration",
    description:
      "Automatic Timeshift snapshots before updates. Restore your system to a known good state if anything goes wrong.",
  },
  {
    icon: Puzzle,
    title: "Plugin System",
    description:
      "50+ built-in plugins with an extensible Python hook system. Browse and install community plugins from the store.",
  },
  {
    icon: FileArchive,
    title: "Install Local Packages",
    description:
      "Install .pkg.tar.zst, .deb, .rpm, .AppImage, and Flatpak local files with a single click. Auto-detects package type and resolves dependencies.",
    video: "https://drive.google.com/file/d/196f6jP21weYETI6OZQ9qf7AqiVFDrC77/preview",
  },
  {
    icon: Cloud,
    title: "Cloud Sync",
    description:
      "Sign in with Supabase to sync bundles, share plugins, and access community features across devices.",
    video: "https://drive.google.com/file/d/1_NUTMO4Ry4CUMxbVnRKm-X5dDjXQInc0/preview",
  },
  {
    icon: Clock,
    title: "Scheduled Updates",
    description:
      "Set and forget with configurable auto-update intervals, auto-refresh, and optional snapshot-before-update.",
  },
]

export function SectionFeatures() {
  return (
    <section id="features" className="border-t border-border/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to manage your system
            </h2>
            <p className="mt-4 text-muted-foreground">
              NeoArch brings together all the tools Arch Linux users need in one
              cohesive, modern interface.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon
            const hasVideo = "video" in feature
            const col = i % 4
            const from = col === 0 ? "left" : col === 3 ? "right" : "up"
            return (
              <Reveal
                key={feature.title}
                delay={i * 80}
                from={from}
                className={hasVideo ? "md:col-span-2 xl:col-span-2" : ""}
              >
                <Card
                  className="group relative overflow-visible border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 ring-1 ring-primary/20 transition-opacity duration-300 group-hover:opacity-100" />
                <CardHeader>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-primary/5 text-primary shadow-sm transition-shadow duration-300 group-hover:shadow-primary/10">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                {hasVideo && (
                  <div className="px-4 pb-4">
                    <div className="glass overflow-hidden rounded-lg shadow-sm">
                      <LazyIframe src={(feature as any).video} title={feature.title} />
                    </div>
                  </div>
                )}
              </Card>
                </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
