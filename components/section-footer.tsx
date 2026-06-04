"use client"

import { useState } from "react"
import { Heart, X, Copy, Check, Mail } from "lucide-react"

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

const contacts = [
  { label: "NeoArch", email: "neoarch.app@gmail.com" },
  { label: "Developer", email: "dsanjaya712@gmail.com" },
]

export function SectionFooter() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  function copy(email: string) {
    navigator.clipboard.writeText(email)
    setCopied(email)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} NeoArch. Licensed under MIT.
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a
            href="https://github.com/Sanjaya-Danushka/Neoarch"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
          <span className="text-border">|</span>
          <a
            href="https://github.com/Sanjaya-Danushka/Neoarch/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            License
          </a>
          <span className="text-border">|</span>
          <button
            onClick={() => setOpen(true)}
            className="cursor-pointer transition-colors hover:text-foreground"
          >
            Contact
          </button>
        </div>

        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          Built for Arch Linux
          <Heart className="inline h-3 w-3 text-red-500" />
        </p>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="glass-strong relative w-full max-w-sm rounded-xl p-6 shadow-2xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="mb-2 text-lg font-semibold">Contact</h3>
            <p className="mb-5 text-sm text-muted-foreground">
              Reach out to us anytime.
            </p>

            <div className="space-y-3">
              {contacts.map((c) => (
                <div
                  key={c.email}
                  className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{c.label}</p>
                      <p className="text-sm font-medium">{c.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copy(c.email)}
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {copied === c.email ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
