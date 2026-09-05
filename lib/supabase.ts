const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!

export interface ReviewRow {
  id: string
  user_id: string
  name: string
  rating: number
  message: string
  created_at: string
}

function authHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    apikey: SUPABASE_ANON_KEY,
    "Content-Type": "application/json",
  }
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

export async function listReviews(): Promise<ReviewRow[]> {
  const url = new URL(`${SUPABASE_URL}/rest/v1/reviews`)
  url.searchParams.set("select", "*")
  url.searchParams.set("order", "created_at.desc")

  const res = await fetch(url, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Supabase GET reviews failed: ${res.status}`)
  return (await res.json()) as ReviewRow[]
}

export async function insertReview(
  token: string,
  review: { user_id: string; name: string; rating: number; message: string },
): Promise<ReviewRow> {
  const url = new URL(`${SUPABASE_URL}/rest/v1/reviews`)
  url.searchParams.set("select", "*")

  const res = await fetch(url, {
    method: "POST",
    headers: { ...authHeaders(token), Prefer: "return=representation" },
    body: JSON.stringify(review),
  })
  if (!res.ok) throw new Error(`Supabase POST reviews failed: ${res.status}`)
  const rows = (await res.json()) as ReviewRow[]
  return rows[0]
}

export async function updateReview(
  token: string,
  userId: string,
  id: string,
  review: { name: string; rating: number; message: string },
): Promise<ReviewRow> {
  const url = new URL(`${SUPABASE_URL}/rest/v1/reviews`)
  url.searchParams.set("select", "*")
  url.searchParams.set("id", `eq.${id}`)
  url.searchParams.set("user_id", `eq.${userId}`)

  const res = await fetch(url, {
    method: "PATCH",
    headers: { ...authHeaders(token), Prefer: "return=representation" },
    body: JSON.stringify(review),
  })
  if (!res.ok) throw new Error(`Supabase PATCH reviews failed: ${res.status}`)
  const rows = (await res.json()) as ReviewRow[]
  if (!rows[0]) throw new Error("Review not found or not owned by user")
  return rows[0]
}

export async function deleteReview(
  token: string,
  userId: string,
  id: string,
): Promise<void> {
  const url = new URL(`${SUPABASE_URL}/rest/v1/reviews`)
  url.searchParams.set("id", `eq.${id}`)
  url.searchParams.set("user_id", `eq.${userId}`)

  const res = await fetch(url, {
    method: "DELETE",
    headers: authHeaders(token),
  })
  if (!res.ok) throw new Error(`Supabase DELETE reviews failed: ${res.status}`)
}