import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  image: string;
  countInStock: number;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String, required: true },
  countInStock: { type: Number, default: 0 },
  category: { type: String },
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
});

export default mongoose.model<IProduct>("Product", productSchema);
