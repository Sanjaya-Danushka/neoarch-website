import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { listReviews, insertReview } from "@/lib/supabase"

export async function GET() {
  try {
    const reviews = await listReviews()
    return NextResponse.json(reviews)
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 },
    )
  }
}

export async function POST(req: Request) {
  try {
    const { userId, getToken } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Sign in required" }, { status: 401 })
    }

    const body = await req.json()
    const name = typeof body.name === "string" ? body.name.trim() : ""
    const rating = Number(body.rating)
    const message = typeof body.message === "string" ? body.message.trim() : ""

    if (!name || !Number.isInteger(rating) || rating < 1 || rating > 5 || !message) {
      return NextResponse.json({ error: "Invalid review" }, { status: 400 })
    }

    const token = await getToken()
    if (!token) {
      return NextResponse.json({ error: "Sign in required" }, { status: 401 })
    }

    const review = await insertReview(token, {
      user_id: userId,
      name,
      rating,
      message,
    })
    return NextResponse.json(review, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 },
    )
  }
}