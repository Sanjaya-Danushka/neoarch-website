export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://neoarchstudio.netlify.app"

export const SITE_NAME = "NeoArch"
export const SITE_DESCRIPTION =
  "NeoArch is a modern, multi-source package manager GUI for Arch Linux. Manage pacman, AUR, Flatpak, and npm packages with a beautiful dark-themed interface. Features bundle management, Git/Docker managers, snapshot integration, and a plugin system."
