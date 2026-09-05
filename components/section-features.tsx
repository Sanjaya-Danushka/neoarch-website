import {
  Search,
  PackagePlus,
  Wrench,
  Store,
  Pin,
  RefreshCw,
  Clock,
  HardDrive,
  Camera,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Newspaper,
  KeyRound,
  Power,
  Palette,
  Container,
  GitBranch,
  Box,
  Cloud,
  Puzzle,
  Terminal,
} from "lucide-react"
import { Reveal } from "@/components/reveal"

interface Feature {
  icon: typeof Search
  title: string
  description: string
}

interface FeatureGroup {
  key: string
  label: string
  features: Feature[]
}

const groups: FeatureGroup[] = [
  {
    key: "manage",
    label: "Manage",
    features: [
      {
        icon: Search,
        title: "Search Every Source at Once",
        description:
          "Type once and search pacman, AUR, Flatpak, npm, and locally built packages in a single results table, with live autocomplete and suggestions.",
      },
      {
        icon: PackagePlus,
        title: "One-Click Install & Remove",
        description:
          "Install and remove packages from any source with one click. Drag and drop local files (.pkg.tar.zst, .AppImage, .flatpakref) or install straight from a URL.",
      },
      {
        icon: Wrench,
        title: "AUR Helper Auto-Detect",
        description:
          "NeoArch automatically detects yay, paru, trizen, and pikaur, lets you pick one, and can build AUR packages headlessly — even in an isolated chroot.",
      },
      {
        icon: Store,
        title: "500 Curated Apps",
        description:
          "A built-in store of 500 ready-to-install applications — Firefox, Steam, VS Code, timeshift, and more — each one click away.",
      },
      {
        icon: Pin,
        title: "Marks, Hold & Ignore",
        description:
          "Set packages to HoldPkg or IgnorePkg, change install reason (explicit/dependency), and pin specific versions straight from the package menu.",
      },
    ],
  },
  {
    key: "safety",
    label: "Update & Safety",
    features: [
      {
        icon: RefreshCw,
        title: "One-Click Updates",
        description:
          "Review and apply every pending update — pacman, AUR, Flatpak, and npm — from a rich multi-selectable table, then get a reboot alert when kernel or core libraries need it.",
      },
      {
        icon: Clock,
        title: "Scheduled Updates",
        description:
          "Auto-check for updates on launch or set a schedule — interval-based, or weekly on your chosen day and time. The sidebar shows a live update-count badge.",
      },
      {
        icon: HardDrive,
        title: "Backups & Snapshots",
        description:
          "Export your package list and configuration any time, with automatic BTRFS read-only snapshots on Btrfs systems. Keeps the last five so storage stays lean.",
      },
      {
        icon: Camera,
        title: "Timeshift Before Updates",
        description:
          "Take a Timeshift snapshot before risky operations and revert the system to a known-good state if anything goes wrong. Old snapshots are pruned automatically.",
      },
      {
        icon: RotateCcw,
        title: "Downgrade & Pin",
        description:
          "Revert a package to a previously installed cached version when an update breaks it, and pin it to keep it there.",
      },
    ],
  },
  {
    key: "care",
    label: "System Care",
    features: [
      {
        icon: Sparkles,
        title: "System Hygiene",
        description:
          "Remove orphaned packages, diff, accept or merge .pacnew files, purge the package cache, scan for corrupted archives, and clean up unused Flatpak runtimes — all in one place.",
      },
      {
        icon: ShieldCheck,
        title: "PKGBUILD Security Scan",
        description:
          "Before installing from the AUR, NeoArch scans the PKGBUILD for risky commands, elevation tricks, and homograph spoofing.",
      },
      {
        icon: Newspaper,
        title: "Arch News",
        description:
          "Read the official Arch Linux feed from inside the app with an unread badge, so you know about important announcements before you update.",
      },
      {
        icon: KeyRound,
        title: "pacman-key & Diagnostics",
        description:
          "Initialize, populate, refresh, and locally sign pacman keys from the GUI, plus a diagnostics panel that finds and installs any missing dependencies.",
      },
      {
        icon: Power,
        title: "Restart Detection",
        description:
          "NeoArch tracks kernel, glibc, systemd, openssl, and nss updates and tells you exactly when a reboot is required.",
      },
    ],
  },
  {
    key: "extras",
    label: "Extras",
    features: [
      {
        icon: Palette,
        title: "Live Themes",
        description:
          "Switch instantly between Dark, Light, Dracula, and Nord — with live previews and accent color control.",
      },
      {
        icon: Container,
        title: "Docker Manager",
        description:
          "Pull, run, stop, and remove containers with port mappings, volumes, environment variables, GPU passthrough, restart policies, and image/network/volume management.",
      },
      {
        icon: GitBranch,
        title: "Git Projects",
        description:
          "Clone, build, update, and clean Git projects with automatic build-system detection — PKGBUILD, Cargo, CMake, Meson, Go, Make, and npm.",
      },
      {
        icon: Box,
        title: "AppImage Manager",
        description:
          "Browse a repository-backed AppImage store and install, update, or remove desktop apps — with auto-generated desktop entries.",
      },
      {
        icon: Cloud,
        title: "Cloud Sync",
        description:
          "Sign in once with your browser via Clerk and sync your favourites across devices with Supabase-backed secure sessions.",
      },
      {
        icon: Puzzle,
        title: "Python Plugin System",
        description:
          "Extend NeoArch with lifecycle hooks (on startup, on tick, on view change) and install community plugins from an in-app store.",
      },
      {
        icon: Terminal,
        title: "Power & Automation",
        description:
          "A full CLI mirrors the GUI with 27 commands, configurable notifications (tray, toasts, sound), and a themed password dialog that caches credentials for the session.",
      },
    ],
  },
]

function GroupHeading({ label }: { label: string }) {
  return (
    <h3 className="mb-4 mt-14 text-xs font-medium tracking-widest text-muted-foreground uppercase">
      {label}
    </h3>
  )
}

export function SectionFeatures() {
  return (
    <section id="features" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Everything you need to manage your system
            </h2>
            <p className="mt-4 text-muted-foreground">
              NeoArch brings together all the tools Arch users need in one
              cohesive, modern interface.
            </p>
          </div>
        </Reveal>

        {groups.map((group) => (
          <div key={group.key}>
            <GroupHeading label={group.label} />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.features.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <Reveal key={feature.title} delay={i % 3}>
                    <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-border/60 hover:bg-card/60">
                      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-[15px] font-medium text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}