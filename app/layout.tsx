import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { shadcn } from "@clerk/ui/themes"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DesktopCallback } from "@/components/desktop-callback"
import { cn } from "@/lib/utils"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Modern Package Manager for Arch Linux`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Modern Package Manager for Arch Linux`,
    description:
      "Manage pacman, AUR, Flatpak, and npm packages — all in one beautiful dark-themed interface.",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Modern Package Manager for Arch Linux`,
    description:
      "Manage pacman, AUR, Flatpak, and npm packages — all in one beautiful dark-themed interface.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/logo.png",
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
        <ClerkProvider appearance={{ theme: shadcn }}>
          <DesktopCallback />
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
