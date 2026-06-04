import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Review } from "@/lib/models/review"

export async function GET() {
  try {
    await connectDB()
    const reviews = await Review.find().sort({ createdAt: -1 }).lean()
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
    const body = await req.json()
    await connectDB()
    const review = await Review.create(body)
    return NextResponse.json(review, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 },
    )
  }
}
