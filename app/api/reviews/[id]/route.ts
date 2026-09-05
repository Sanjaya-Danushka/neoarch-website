import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { updateReview, deleteReview } from "@/lib/supabase"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId, getToken } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Sign in required" }, { status: 401 })
    }
    const token = await getToken()
    if (!token) {
      return NextResponse.json({ error: "Sign in required" }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const name = typeof body.name === "string" ? body.name.trim() : ""
    const rating = Number(body.rating)
    const message = typeof body.message === "string" ? body.message.trim() : ""

    if (!name || !Number.isInteger(rating) || rating < 1 || rating > 5 || !message) {
      return NextResponse.json({ error: "Invalid review" }, { status: 400 })
    }

    try {
      const updated = await updateReview(token, userId, id, {
        name,
        rating,
        message,
      })
      return NextResponse.json(updated)
    } catch {
      return NextResponse.json(
        { error: "Review not found or not owned by you" },
        { status: 403 },
      )
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 },
    )
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId, getToken } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Sign in required" }, { status: 401 })
    }
    const token = await getToken()
    if (!token) {
      return NextResponse.json({ error: "Sign in required" }, { status: 401 })
    }

    const { id } = await params
    try {
      await deleteReview(token, userId, id)
      return NextResponse.json({ success: true })
    } catch {
      return NextResponse.json(
        { error: "Review not found or not owned by you" },
        { status: 403 },
      )
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 },
    )
  }
}