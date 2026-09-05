import { NextResponse } from "next/server"

const REPO = "https://api.github.com/repos/Sanjaya-Danushka/Neoarch"

export const revalidate = 3600

export async function GET() {
  try {
    const headers = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "neoarch-website",
    }
    const [latestRes, listRes] = await Promise.all([
      fetch(`${REPO}/releases/latest`, { headers, next: { revalidate: 3600 } }),
      fetch(`${REPO}/releases?per_page=100`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ])

    if (!latestRes.ok || !listRes.ok) {
      throw new Error(`GitHub API ${latestRes.status} ${listRes.status}`)
    }

    const latest = (await latestRes.json()) as { tag_name?: string }
    const releases = (await listRes.json()) as unknown[]

    return NextResponse.json({
      tag_name: latest.tag_name ?? null,
      releases_count: releases.length,
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch release info" },
      { status: 500 },
    )
  }
}