import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  images: string[];
  countInStock: number;
  category: string;
  color?: string[];
  size?: string[];
  rating: {
    rate: number;
    count: number;
  };
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  images: { type: [String], default: [] },
  countInStock: { type: Number, default: 0 },
  category: { type: String },
  color: { type: [String], default: [] },
  size: { type: [String], default: [] },
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
});

export default mongoose.model<IProduct>("Product", productSchema);
