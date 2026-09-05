import Image from "next/image"
import { MapPin, BookOpen, Users, Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/reveal"

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function SectionDeveloper() {
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Built by a Developer, for Developers
            </h2>
            <p className="mt-4 text-muted-foreground">
              NeoArch is crafted with passion by Sanjaya Danushka, a
              Full-Cycle DevOps &amp; Software Engineer from Sri Lanka.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
              <div className="flex flex-col items-center gap-4 md:items-start">
                <Image
                  src="/screenshots/developer.png"
                  alt="Sanjaya Danushka"
                  width={1254}
                  height={1254}
                  className="h-20 w-20 rounded-full border border-border object-cover"
                />
                <div className="flex gap-2">
                  <a
                    href="https://www.linkedin.com/in/sanjaya-danushka-4484292a0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md bg-[#0A66C2] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                  >
                    <LinkedInIcon className="h-3.5 w-3.5" />
                    LinkedIn
                  </a>
                  <a
                    href="https://www.buymeacoffee.com/sanjayadanushka"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=sanjayadanushka&button_colour=FF5F5F&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00"
                      alt="Buy me a coffee"
                      className="h-8"
                    />
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-semibold">Sanjaya Danushka</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Full-Cycle DevOps &amp; Software Engineer | Open-Source
                    Contributor | Author of &ldquo;The Art of Software
                    Engineering&rdquo; | ACE Multicloud Network Associate
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Badulla District, Sri Lanka
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    Open to work
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    20K+ followers
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <Badge variant="secondary">
                    Open Source Developers Community
                  </Badge>
                  <Badge variant="secondary">Asia e University</Badge>
                  <Badge variant="outline">#OpenToWork</Badge>
                </div>

                <p className="pt-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    Author of &ldquo;The Art of Software Engineering&rdquo;
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}