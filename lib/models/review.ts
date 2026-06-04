import mongoose, { Schema, type Document } from "mongoose"

export interface IReview extends Document {
  name: string
  email: string
  rating: number
  message: string
  createdAt: Date
}

const ReviewSchema = new Schema<IReview>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

export const Review =
  (mongoose.models.Review as mongoose.Model<IReview>) ||
  mongoose.model<IReview>("Review", ReviewSchema)
