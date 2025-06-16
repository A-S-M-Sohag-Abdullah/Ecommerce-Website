"use client";
import React from "react";
import { setType } from "@/features/coupon/couponSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { CouponType } from "@/types";

function TypeSelector() {
  const dispatch = useDispatch();
  const { type } = useSelector((state: RootState) => state.coupon);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {["Fixed Discount", "Percentage Discount", "Free Shipping"].map(
        (t, idx) => (
          <label key={idx} className="cursor-pointer">
            <input
              type="radio"
              name="discountType"
              value={t}
              onChange={() => dispatch(setType(t as CouponType))}
              className="peer hidden"
              checked={type === t}
            />
            <div className="border border-blue-500 text-blue-500 rounded px-4 py-2 text-sm text-center peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600  transition">
              {t}
            </div>
          </label>
        )
      )}
    </div>
  );
}

export default TypeSelector;
