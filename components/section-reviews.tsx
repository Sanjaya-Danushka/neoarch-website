"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import {
  Star,
  Send,
  MessageSquare,
  User,
  Pencil,
  Trash2,
  X,
  Check,
  LogIn,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"

interface Review {
  id: string
  user_id: string
  name: string
  rating: number
  message: string
  created_at: string
}

function StarRating({
  value,
  onChange,
  readonly = false,
  size = "sm",
}: {
  value: number
  onChange?: (v: number) => void
  readonly?: boolean
  size?: "sm" | "md"
}) {
  const s = size === "md" ? "h-5 w-5" : "h-4 w-4"
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={`transition-colors ${
            readonly ? "cursor-default" : "cursor-pointer hover:text-yellow-500"
          }`}
        >
          <Star
            className={`${s} ${
              star <= value
                ? "fill-yellow-500 text-yellow-500"
                : "text-muted-foreground/30"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function selectAllOnCtrlA(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
    e.preventDefault()
    e.currentTarget.select()
  }
}

export function SectionReviews() {
  const { isSignedIn, user } = useUser()
  const [reviews, setReviews] = useState<Review[]>([])
  const [form, setForm] = useState({ name: "", rating: 0, message: "" })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ name: "", rating: 0, message: "" })

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => setReviews([]))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const name = form.name || user?.firstName || user?.username || ""
    if (!name || !form.rating || !form.message) {
      setError("Please fill in all fields")
      return
    }
    setSubmitting(true)
    setError("")
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, name }),
      })
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Please sign in to review")
        }
        throw new Error("Failed to submit")
      }
      const review = await res.json()
      setReviews((prev) => [review, ...prev])
      setForm({ name: form.name, rating: 0, message: "" })
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  function startEdit(review: Review) {
    setEditForm({
      name: review.name,
      rating: review.rating,
      message: review.message,
    })
    setEditingId(review.id)
  }

  async function handleUpdate() {
    if (!editingId) return
    try {
      const res = await fetch(`/api/reviews/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      })
      if (!res.ok) throw new Error("Failed to update")
      const updated = await res.json()
      setReviews((prev) => prev.map((r) => (r.id === editingId ? updated : r)))
      setEditingId(null)
    } catch {
      setError("Failed to update review")
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) throw new Error("Failed to delete")
      setReviews((prev) => prev.filter((r) => r.id !== id))
    } catch {
      setError("Failed to delete review")
    }
  }

  return (
    <section id="reviews" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              What Users Say
            </h2>
            <p className="mt-4 text-muted-foreground">
              Hear from the NeoArch community.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          <Card className="h-fit border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MessageSquare className="h-4 w-4 text-primary" />
                Leave a Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isSignedIn ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
                  <LogIn className="mb-3 h-8 w-8 text-muted-foreground/40" />
                  <p className="mb-4 text-sm text-muted-foreground">
                    Sign in to leave a review.
                  </p>
                  <Button asChild>
                    <Link href="/sign-in">Sign in</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <User className="h-3 w-3" />
                      Name
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Star className="h-3 w-3" />
                      Rating
                    </label>
                    <StarRating
                      value={form.rating}
                      onChange={(v) => setForm({ ...form, rating: v })}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <MessageSquare className="h-3 w-3" />
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onKeyDown={selectAllOnCtrlA}
                      placeholder="Share your experience..."
                      rows={4}
                      className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                    />
                  </div>

                  {error && <p className="text-xs text-red-500">{error}</p>}

                  {submitted && (
                    <p className="text-xs text-green-500">
                      Review submitted successfully!
                    </p>
                  )}

                  <Button type="submit" disabled={submitting} className="w-full">
                    {submitting ? "Submitting..." : (
                      <>
                        Send Review
                        <Send className="ml-2 h-3 w-3" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            {reviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
                <MessageSquare className="mb-3 h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">
                  No reviews yet. Be the first!
                </p>
              </div>
            ) : (
              reviews.map((review) => (
                <Card key={review.id} className="border-border bg-card">
                  <CardContent className="pt-4">
                    {editingId === review.id ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Edit Review</h4>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <input
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          placeholder="Name"
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        />
                        <StarRating
                          value={editForm.rating}
                          onChange={(v) => setEditForm({ ...editForm, rating: v })}
                          size="md"
                        />
                        <textarea
                          value={editForm.message}
                          onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                          onKeyDown={selectAllOnCtrlA}
                          placeholder="Message"
                          rows={3}
                          className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleUpdate}>
                            <Check className="mr-1 h-3 w-3" />
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                              {review.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{review.name}</p>
                              <p className="text-[10px] text-muted-foreground">
                                {new Date(review.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <StarRating value={review.rating} readonly />
                            {isSignedIn && user?.id === review.user_id && (
                              <>
                                <button
                                  onClick={() => startEdit(review)}
                                  className="ml-1 rounded p-1 text-muted-foreground/40 transition-colors hover:bg-accent hover:text-foreground"
                                  title="Edit"
                                >
                                  <Pencil className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => handleDelete(review.id)}
                                  className="rounded p-1 text-muted-foreground/40 transition-colors hover:bg-accent hover:text-red-500"
                                  title="Delete"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {review.message}
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}