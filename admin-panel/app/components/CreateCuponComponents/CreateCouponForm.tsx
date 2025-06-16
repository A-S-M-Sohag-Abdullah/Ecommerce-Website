"use client";
import React from "react";
import TypeSelector from "./TypeSelector";
import { Category } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setCode,
  setDiscountOn,
  setDiscountValue,
  setDuration,
  setName,
  setNoDuration,
  setNoUserLimit,
  setUserLimit,
  resetCoupon,
} from "@/features/coupon/couponSlice";
import { addCoupon, updateCoupon } from "@/api/couponApi";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

type Props = {
  categories: Category[];
  isUpdating?: boolean;
};

function CreateCouponForm({ categories, isUpdating = false }: Props) {
  const {
    code,
    name,
    type,
    discountValue,
    discountOn,
    duration,
    userLimit,
    noDuration,
    noUserLimit,
  } = useSelector((state: RootState) => state.coupon);
  const dispatch = useDispatch();
  const params = useParams();
  const couponId = (params?.couponId ?? "") as string;

  const handleAddCoupon = async () => {
    try {
      const result = await addCoupon({
        code,
        name,
        type,
        discountValue,
        duration,
        userLimit,
        discountOn,
      });
      if (result.success) {
        toast.success("Coupon Added Successfully");
        dispatch(resetCoupon());
      }
    } catch (error) {}
  };

  const handleUpdateCoupon = async () => {
    try {
      const result = await updateCoupon(couponId, {
        code,
        name,
        type,
        discountValue,
        duration,
        userLimit,
        discountOn,
      });
      if (result.success) {
        toast.success("Coupon Updated Successfully");
        dispatch(resetCoupon());
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-2">Coupon Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Coupon Code"
              value={code}
              onChange={(e) => dispatch(setCode(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Coupon Name"
              value={name}
              onChange={(e) => dispatch(setName(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">Coupon Type</h2>
          <TypeSelector></TypeSelector>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Discount Value"
            value={discountValue ?? ""}
            onChange={(e) => dispatch(setDiscountValue(Number(e.target.value)))}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <select
            value={discountOn ?? ""}
            onChange={(e) => dispatch(setDiscountOn(e.target.value))}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option>All Products</option>
            {categories.map((category) => (
              <option key={category._id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            disabled={noDuration}
            value={duration ?? ""}
            onChange={(e) => dispatch(setDuration(e.target.value))}
            type="date"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <input
            disabled={noUserLimit}
            type="number"
            value={userLimit}
            onChange={(e) => dispatch(setUserLimit(Number(e.target.value)))}
            placeholder="Amount of uses"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={noDuration}
              onChange={(e) => dispatch(setNoDuration(e.target.checked))}
            />
            <span>Don't set duration</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={noUserLimit}
              onChange={(e) => dispatch(setNoUserLimit(e.target.checked))}
            />
            <span>Don't limit amount of uses</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 rounded px-4 py-2">
          Cancel
        </button>
        <button
          onClick={isUpdating ? handleUpdateCoupon : handleAddCoupon}
          className="bg-blue-600 text-white hover:bg-blue-700 rounded px-4 py-2"
        >
          Save
        </button>
      </div>
    </>
  );
}

export default CreateCouponForm;
