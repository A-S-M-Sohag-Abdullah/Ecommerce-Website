import mongoose, { Document } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  discount: number; // e.g. 20 = 20%
  expiresAt: Date;
  usageLimit: number;
  usedBy: mongoose.Types.ObjectId[]; // Users who have used it
}

const couponSchema = new mongoose.Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
    usageLimit: { type: Number, default: 1 },
    usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Coupon = mongoose.model<ICoupon>("Coupon", couponSchema);
