"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  setName,
  setDescription,
  setImage,
  resetCategory,
} from "@/features/category/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { addCategory } from "@/api/categoryApi";
import { toast } from "react-toastify";

export default function EditCategoryPage() {
  const dispatch = useDispatch();
  const { name, description, image } = useSelector(
    (state: RootState) => state.category
  );

  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    dispatch(setImage(file));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async () => {
    const res = await addCategory({ name, description, image });
    if (res.success) {
      toast.success("Category added successfully!");
      dispatch(resetCategory()); // Reset the category state after successful submission
    }
  };
  return (
    <div className="p-6 w-full mx-auto space-y-6 bg-gray-100">
      <button className="text-gray-600 hover:underline">&larr; Back</button>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Add Category</h1>
        <div className="flex justify-end space-x-2">
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 rounded px-4 py-2">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white hover:bg-blue-700 rounded px-4 py-2"
          >
            Save
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6 bg-white p-6 rounded-lg shadow h-fit sticky top-16 w-full">
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Category Info</h2>
            <input
              type="text"
              placeholder="Category Name"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              defaultValue=""
              onChange={(e) => dispatch(setName(e.target.value))}
            />
            <textarea
              placeholder="Category Description"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              rows={4}
              onChange={(e) => dispatch(setDescription(e.target.value))}
            />

            <label className="block text-sm text-gray-600 mb-1">Image</label>
            <div
              className={`border border-dashed rounded p-4 text-center cursor-pointer transition-colors ${
                isDragging ? "bg-blue-50 border-blue-300" : "bg-white"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />

              <p className="text-xs text-gray-400 mb-4">
                Or drag and drop files
              </p>

              <label
                htmlFor="file-upload"
                className="mt-2 bg-blue-600 text-white hover:bg-blue-700 rounded px-4 py-2 inline-block"
              >
                Add File
              </label>

              {image && (
                <p className="text-xs mt-2 text-gray-700">{image.name}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
