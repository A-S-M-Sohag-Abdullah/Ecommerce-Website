import mongoose, { Document, Schema } from "mongoose";

export interface orderItems {
  product: mongoose.Schema.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}
export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  orderItems: orderItems[];
  shippingAddress: object;
  phoneNumber: string;
  paymentMethod: string; // Note: This seems to be a typo, should it be 'paymentMethod'?
  paidStatus?: boolean;
  orderStatus?: string; // Optional field for order status
  trasactionId?: string; // Optional field for transaction ID
  totalPrice: number;
  coupon?: mongoose.Types.ObjectId;
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    orderItems: [{ type: Object, required: true }],
    paymentMethod: { type: String, required: true }, // Corrected typo from 'paymetmethod' to 'paymentMethod'
    trasactionId: { type: String, required: false }, // Optional field for transaction ID
    paidStatus: { type: Boolean, default: false },
    orderStatus: { type: String, default: "Ready" }, // Optional field for order status
    phoneNumber: { type: String, required: true },
    shippingAddress: { type: Object, required: true },
    totalPrice: { type: Number, required: true },
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>("Order", orderSchema);
