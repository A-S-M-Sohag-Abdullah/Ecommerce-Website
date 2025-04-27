import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  countInStock: number;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  countInStock: { type: Number, default: 0 },
});

export default mongoose.model<IProduct>('Product', productSchema);
