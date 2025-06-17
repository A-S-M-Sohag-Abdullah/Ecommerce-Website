import mongoose, { Document, Schema } from "mongoose";

export interface IReview {
  user: mongoose.Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
  createdAt?: Date;
}

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  images: string[];
  countInStock: number;
  category: string;
  color?: string[];
  size?: string[];
  tags?: string[];
  discountPrice?: number;
  reviews: IReview[];
  rating: number;
  numReviews: number;
}

const reviewSchema = new Schema<IReview>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    images: { type: [String], default: [] },
    countInStock: { type: Number, default: 0 },
    category: { type: String },
    color: { type: [String], default: [] },
    size: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    discountPrice: { type: Number, default: 0 },
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
