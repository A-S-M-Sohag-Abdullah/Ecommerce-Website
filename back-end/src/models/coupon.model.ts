import mongoose, { Document } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  name: string;
  type: "Fixed Discount" | "Percentage Discount" | "Free Shipping";
  discountValue: number; // e.g. 20 = 20%
  duration: Date;
  userLimit: number;
  discountOn: "All Products" | string;
  usedBy: mongoose.Types.ObjectId[]; // Users who have used it
}

const couponSchema = new mongoose.Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    discountValue: { type: Number, required: true },
    duration: { type: Date },
    userLimit: { type: Number },
    discountOn: { type: String, required: true },
    usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Coupon = mongoose.model<ICoupon>("Coupon", couponSchema);

export default Coupon;
