import Image from "next/image"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SectionHero() {
  return (
    <section className="relative overflow-hidden pt-16">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-6 text-center md:pt-16">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          The all-in-one package manager for Arch Linux
        </div>
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-6xl">
          Every package.
          <br />
          <span className="text-muted-foreground">One app.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Search, install, update, and remove packages from pacman, AUR,
          Flatpak, and npm — with bundles, scheduled updates, backups, and
          system maintenance, all in one fast, beautiful dark GUI.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <a href="#download">
              Download for Arch
              <ArrowDown />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://github.com/Sanjaya-Danushka/Neoarch"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
              <ArrowUpRight />
            </a>
          </Button>
        </div>
      </div>
      <Image
        src="/banner1.png"
        alt="NeoArch Dashboard"
        width={1806}
        height={871}
        priority
        quality={90}
        sizes="100vw"
        className="h-auto w-full"
      />
    </section>
  )
}