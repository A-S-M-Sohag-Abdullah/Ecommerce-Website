"use client";

import { addCoupon } from "@/api/couponApi";
import { applyCoupon } from "@/features/coupon/couponSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function ApplyCoupon() {
  const [couponCode, setCouponCode] = useState<string>("");
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddCoupon = async () => {
    try {
      const shippingFee = 100;
      const Subtotal = Number(
        cart
          .reduce((sum, item) => sum + item.quantity * item.price, shippingFee)
          .toFixed(2)
      );

      const res = await addCoupon(couponCode, cart, Subtotal);

      if (res.valid) {
        toast.success("Coupon Validated");
        dispatch(
          applyCoupon({ code: couponCode, discountValue: res.discountAmount })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center mt-6">
      <input
        type="text"
        placeholder="Coupon Code"
        className="border p-2 w-1/2"
        value={couponCode}
        onChange={(e) => {
          setCouponCode(e.target.value);
        }}
      />
      <button
        onClick={handleAddCoupon}
        className="px-4 py-2 bg-red-400 text-white rounded cursor-pointer"
      >
        Apply Coupon
      </button>
    </div>
  );
}

export default ApplyCoupon;
