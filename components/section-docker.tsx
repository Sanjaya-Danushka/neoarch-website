import { Container, Play, Square, RefreshCw, Trash2, GanttChartSquare } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { LazyIframe } from "@/components/lazy-iframe"

const dockerFeatures = [
  {
    icon: Play,
    title: "Pull & Run",
    description: "Pull images from any registry and spin up containers with a single click.",
  },
  {
    icon: Square,
    title: "Stop & Remove",
    description: "Stop running containers and clean up unused resources instantly.",
  },
  {
    icon: GanttChartSquare,
    title: "Port Mappings",
    description: "Configure host-to-container port mappings through an intuitive UI.",
  },
  {
    icon: RefreshCw,
    title: "Restart Policies",
    description: "Set auto-restart, GPU passthrough, environment variables, and volume mounts.",
  },
  {
    icon: Trash2,
    title: "Cleanup",
    description: "Remove dangling images, stopped containers, and unused volumes in bulk.",
  },
]

export function SectionDocker() {
  return (
    <section id="docker" className="border-t border-border/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-primary/5 px-4 py-1.5 text-sm text-primary shadow-sm">
              <Container className="h-4 w-4" />
              Docker Integration
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Container Management, Built In
            </h2>
            <p className="mt-4 text-muted-foreground">
              Manage Docker containers directly from NeoArch. No more switching
              between terminal windows.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-center">
          <Reveal delay={150} className="space-y-4">
            {dockerFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="group flex items-start gap-4 rounded-lg border border-border/30 bg-card/40 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-card/60 hover:shadow-sm">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-primary/5 text-primary shadow-sm transition-shadow group-hover:shadow-primary/10">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{feature.title}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </Reveal>

          <Reveal delay={300}>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-l from-primary/15 via-primary/5 to-transparent blur-3xl" />
              <div className="glass overflow-hidden rounded-xl shadow-lg">
                <LazyIframe src="https://drive.google.com/file/d/1NJWnD4rwm4vAFlshyFPxZZ6am3w2h-GU/preview" title="Docker Manager Demo" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
