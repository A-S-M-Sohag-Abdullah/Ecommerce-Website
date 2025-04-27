import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  orderItems: any[];
  shippingAddress: object;
  totalPrice: number;
}

const orderSchema = new Schema<IOrder>({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  orderItems: [{ type: Object, required: true }],
  shippingAddress: { type: Object, required: true },
  totalPrice: { type: Number, required: true },
}, {
  timestamps: true,
});

export default mongoose.model<IOrder>('Order', orderSchema);
