"use client";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function CartTotal() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const coupon = useSelector((state: RootState) => state.coupon.appliedCoupon);
  const shippingFee: number = 100;
  return (
    <div className="mt-6 p-4 border rounded-md w-1/2 ms-auto">
      <h2 className="text-lg font-bold">Cart Total</h2>
      <p className="flex justify-between">
        <span>Subtotal:</span>{" "}
        <span>
          {cart
            .reduce((sum, item) => sum + item.quantity * item.price, 0)
            .toFixed(2)}
        </span>
      </p>
      <p className="flex justify-between">
        <span>Shipping:</span>{" "}
        <span>+{shippingFee === 0 ? "Free" : shippingFee}</span>
      </p>

      {coupon && (
        <p className="flex justify-between">
          <span>Coupon Discount:</span> <span> - {coupon?.discountValue}</span>
        </p>
      )}

      <p className="flex justify-between font-bold text-lg">
        <span>Total:</span>{" "}
        <span>
          {(
            cart.reduce(
              (sum, item) => sum + item.quantity * item.price,
              shippingFee
            ) - (coupon ? coupon.discountValue ?? 0 : 0)
          ).toFixed(2)}
        </span>
      </p>
      <button className="w-full mt-4 bg-red-400 text-white py-2 rounded cursor-pointer">
        Proceed to Checkout
      </button>
    </div>
  );
}
