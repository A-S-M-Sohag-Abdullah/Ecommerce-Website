"use client";
import React from "react";
import { setCategory } from "@/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

function CategorySelector() {
  const dispatch = useDispatch();
  const { category } = useSelector((state: RootState) => state.product);

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-medium">Categories</h2>
      <div className="space-y-2">
        {["Women", "Men", "T-shirt", "Hoodie", "Dress"].map((c) => (
          <label key={c} className="block">
            <input
              type="radio"
              name="category"
              value={c}
              checked={category === c}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="mr-2"
            />
            {c}
          </label>
        ))}
      </div>
      <button className="mt-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded px-4 py-2 text-sm">
        Create new
      </button>
    </div>
  );
}

export default CategorySelector;
