import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "NeoArch — Modern Package Manager for Arch Linux",
  description:
    "NeoArch is a modern, multi-source package manager GUI for Arch Linux. Manage pacman, AUR, Flatpak, and npm packages with a beautiful dark-themed interface. Features bundle management, Git/Docker managers, snapshot integration, and a plugin system.",
  keywords: [
    "arch linux",
    "package manager",
    "aur",
    "pacman",
    "flatpak",
    "npm",
    "linux gui",
    "pyqt6",
  ],
  openGraph: {
    title: "NeoArch — Modern Package Manager for Arch Linux",
    description:
      "Manage pacman, AUR, Flatpak, and npm packages — all in one beautiful dark-themed interface.",
    url: "https://sanjaya-danushka.github.io/Neoarch",
    siteName: "NeoArch",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
