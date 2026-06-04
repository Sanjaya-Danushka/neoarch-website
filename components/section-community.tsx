import { Bug, MessageSquare, Package, Rocket, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const communityLinks = [
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
    <section id="community" className="border-t border-border/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Join the Community
          </h2>
          <p className="mt-4 text-muted-foreground">
            NeoArch is open source and community-driven. Get involved however
            you like.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {communityLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl border border-border/50 bg-card/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-primary/5 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{link.title}</h3>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {link.description}
                </p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
