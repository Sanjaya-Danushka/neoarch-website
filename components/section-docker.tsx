import { Container, GitBranch, Package } from "lucide-react"
import { Reveal } from "@/components/reveal"

const tools = [
  {
    icon: Container,
    title: "Docker Manager",
    description:
      "Pull, run, stop, and remove containers with port mappings, volumes, env vars, GPU passthrough, and restart policies — plus bulk cleanup of dangling images and unused volumes.",
  },
  {
    icon: GitBranch,
    title: "Git Projects",
    description:
      "Clone, build, update, and clean projects in one click. Supports Cargo, autotools, Makefile, and custom build commands.",
  },
  {
    icon: Package,
    title: "AppImage & Offline Files",
    description:
      "Browse the AppImage store, install local AppImages, and install .pkg.tar.zst, .deb, and .rpm files — auto-detecting package type and resolving dependencies.",
  },
]

export function SectionDocker() {
  return (
    <section id="docker" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-sm text-primary">
              <Container className="h-4 w-4" />
              Power Tools
            </div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Beyond packages
            </h2>
            <p className="mt-4 text-muted-foreground">
              Helpful extras for developers and power users — right in the same
              app.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-3">
          {tools.map((tool, i) => {
            const Icon = tool.icon
            return (
              <Reveal key={tool.title} delay={i * 60}>
                <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-border/60 hover:bg-card/60">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-[15px] font-medium">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}