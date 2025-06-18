"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export interface CategoryType {
  _id: string;
  name: string;
  description?: string;
  image: string;
  items?: number;
}

type Props = {
  categories: CategoryType[];
};

const CategorySelector: React.FC<Props> = ({ categories }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";
  const query = searchParams.get("query") || "";

  const [selectedCategoryName, setSelectedCategoryName] = useState(currentCategory);
  const [open, setOpen] = useState(false);

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategoryName(categoryName);
    setOpen(false);

    const params = new URLSearchParams();

    // Preserve query if it exists
    if (query) params.set("query", query);

    // Set category name if selected
    if (categoryName) {
      params.set("category", categoryName);
    }

    router.push(`/products?${params.toString()}`);
  };

  const displayName =
    categories.find((cat) => cat.name === selectedCategoryName)?.name ||
    "Select Category";

  return (
    <div className="relative inline-block w-64 my-5">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-left"
      >
        {displayName}
        <span className="float-right">&#9662;</span>
      </button>

      {open && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <li
            onClick={() => handleCategoryChange("")}
            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
              selectedCategoryName === "" ? "bg-gray-100 font-semibold" : ""
            }`}
          >
            All Categories
          </li>

          {categories.map((category) => (
            <li
              key={category._id}
              onClick={() => handleCategoryChange(category.name)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedCategoryName === category.name
                  ? "bg-gray-100 font-semibold"
                  : ""
              }`}
            >
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategorySelector;
