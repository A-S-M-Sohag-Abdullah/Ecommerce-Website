"use client";
import { RootState } from "@/store/store";
import React, { useState, KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTags } from "@/features/product/productSlice";
function TagInput() {
  const dispatch = useDispatch();
  const { tags } = useSelector((state: RootState) => state.product);
  const [tagInputValue, setTagInputValue] = useState<string>("");

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInputValue.trim()) {
      e.preventDefault();
      const tag = tagInputValue.trim().toLowerCase();
      if (!tags.includes(tag)) {
        dispatch(setTags([...tags, tag]));
        setTagInputValue("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    dispatch(setTags(tags.filter((tag) => tag !== tagToRemove)));
  };
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-medium">Tags</h2>
      <input
        type="text"
        placeholder="Enter tag names"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        value={tagInputValue}
        onChange={(e) => setTagInputValue(e.target.value)}
        onKeyDown={handleAddTag}
      />
      <div className="flex flex-wrap gap-2 text-sm">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded-sm"
          >
            <span>{tag}</span>
            <button
              onClick={() => handleRemoveTag(tag)}
              className="ml-2 text-blue-500 hover:text-red-500 cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagInput;
