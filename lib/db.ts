import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

declare global {
  var mongooseCache:
    | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
    | undefined
}

globalThis.mongooseCache = globalThis.mongooseCache ?? {
  conn: null,
  promise: null,
}

export async function connectDB() {
  const cached = globalThis.mongooseCache!
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m)
  }

  cached.conn = await cached.promise
  return cached.conn
}
