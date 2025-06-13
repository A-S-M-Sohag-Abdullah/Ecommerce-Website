"use client";
import React, { useEffect, useState } from "react";
import { setCategory } from "@/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Category } from "@/types";
import { getCategories } from "@/api/categoryApi";

function CategorySelector() {
  const [categories, setCategories] = useState<Category[]>([]);

  const dispatch = useDispatch();
  const { category } = useSelector((state: RootState) => state.product);

  const fetchCategories = async () => {
    const categories = await getCategories();
    setCategories(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-medium">Categories</h2>
      <div className="space-y-2">
        {categories.map((c) => (
          <label key={c._id} className="block">
            <input
              type="radio"
              name="category"
              value={c.name}
              checked={category === c.name}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="mr-2"
            />
            {c.name}
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
