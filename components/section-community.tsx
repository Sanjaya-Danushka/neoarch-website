import { Bug, BookOpen, MessageSquare, Package, Rocket, ExternalLink } from "lucide-react"
import { Reveal } from "@/components/reveal"

const communityLinks = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Install guide, quick start, and user manual",
    href: "https://github.com/Sanjaya-Danushka/Neoarch/wiki",
  },
  {
    icon: Bug,
    title: "Report Issues",
    description: "Report bugs and request features",
    href: "https://github.com/Sanjaya-Danushka/Neoarch/issues",
  },
  {
    icon: MessageSquare,
    title: "Discussions",
    description: "Ask questions and share ideas",
    href: "https://github.com/Sanjaya-Danushka/Neoarch/discussions",
  },
  {
    icon: Package,
    title: "Releases",
    description: "Download the latest versions",
    href: "https://github.com/Sanjaya-Danushka/Neoarch/releases",
  },
  {
    icon: Rocket,
    title: "Contributing",
    description: "Join the development",
    href: "https://github.com/Sanjaya-Danushka/Neoarch/blob/main/CONTRIBUTING.md",
  },
]

export function SectionCommunity() {
  return (
    <section id="community" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Join the Community
            </h2>
            <p className="mt-4 text-muted-foreground">
              NeoArch is open source and community-driven. Get involved however
              you like.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {communityLinks.map((link, i) => {
            const Icon = link.icon
            return (
              <Reveal key={link.title} delay={i * 40}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-lg border border-border bg-card p-6 transition-colors hover:bg-card/60"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-secondary text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[15px] font-medium">{link.title}</h3>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}