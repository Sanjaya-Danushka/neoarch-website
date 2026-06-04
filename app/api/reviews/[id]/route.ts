import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Review } from "@/lib/models/review"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = await req.json()
    await connectDB()

    const review = await Review.findById(id)
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }

    if (review.email !== body.email) {
      return NextResponse.json({ error: "Email mismatch" }, { status: 403 })
    }

    const updated = await Review.findByIdAndUpdate(id, body, { new: true })
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 },
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const { email } = await req.json()
    await connectDB()

    const review = await Review.findById(id)
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }

    if (review.email !== email) {
      return NextResponse.json({ error: "Email mismatch" }, { status: 403 })
    }

    await Review.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 },
    )
  }
}
