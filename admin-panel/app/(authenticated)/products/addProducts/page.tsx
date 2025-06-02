"use client";
import CategorySelector from "@/app/components/AddProductFormComponents/CategorySelector";
import DifferentOptions from "@/app/components/AddProductFormComponents/DifferentOptions";
import { FileDropzone } from "@/app/components/AddProductFormComponents/FileDropZone";
import TagInput from "@/app/components/AddProductFormComponents/TagInput";
import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTitle,
  setDescription,
  setBasePrice,
  setDiscountPrice,
  setStock,
  setIsOnSale,
} from "@/features/product/productSlice";
import { addProduct } from "@/api/productApi";

export default function AddProductPage() {
  const dispatch = useDispatch();
  const {
    title,
    description,
    basePrice,
    discountPrice,
    stock,
    isOnSale,
    tags,
    files,
    category,
  } = useSelector((state: RootState) => state.product);

  const handleFormSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", title);
      formData.append("description", description);
      formData.append("price", basePrice.toString());
      formData.append("countInStock", stock.toString());
      formData.append("category", category);
      files.forEach((file) => {
        formData.append("images", file); // Append each file to the FormData
      });
      const response = await addProduct(formData);
      if (response.success)
        console.log("Product added successfully:", response);
    } catch (error) {}
  };

  return (
    <div className="p-6 w-full mx-auto space-y-6 bg-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Add Product</h1>
        <div className="space-x-2">
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 rounded px-4 py-2 bg-white">
            Cancel
          </button>
          <button
            onClick={handleFormSubmit}
            className="bg-blue-600 text-white hover:bg-blue-700 rounded px-4 py-2"
          >
            Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Information</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={title}
              onChange={(e) => dispatch(setTitle(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />

            <textarea
              value={description}
              onChange={(e) => dispatch(setDescription(e.target.value))}
              placeholder="Product description"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            ></textarea>
          </div>

          <FileDropzone />

          <div className="space-y-2">
            <h2 className="text-lg font-medium">Price</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Price"
                value={basePrice}
                onChange={(e) => dispatch(setBasePrice(Number(e.target.value)))}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Price on Discount"
                value={discountPrice}
                onChange={(e) =>
                  dispatch(setDiscountPrice(Number(e.target.value)))
                }
                disabled={!isOnSale}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <h2 className="text-lg font-medium">Stock</h2>
            <input
              type="number"
              placeholder="Stock Quantity"
              value={stock}
              onChange={(e) => dispatch(setStock(Number(e.target.value)))}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <div className="flex items-center space-x-3">
              <label
                htmlFor="sale-switch"
                className="relative inline-flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="sale-switch"
                  checked={isOnSale}
                  onChange={(e) => dispatch(setIsOnSale(e.target.checked))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none  rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
              <label
                htmlFor="sale-switch"
                className="text-sm font-medium text-gray-900"
              >
                Add sale for this product
              </label>
            </div>
          </div>
          <DifferentOptions />

          <div className="space-y-2">
            <h2 className="text-lg font-medium">Shipping</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Enter Weight"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                <option>Select Country</option>
                <option value="us">USA</option>
                <option value="uk">UK</option>
                <option value="de">Germany</option>
              </select>
            </div>
            <div className="flex items-center space-x-3">
              <label
                htmlFor="digital-switch"
                className="relative inline-flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="digital-switch"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors "></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
              <label
                htmlFor="digital-switch"
                className="text-sm font-medium text-gray-900"
              >
                This is a digital item
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6 bg-white p-6 rounded-lg shadow-md h-fit sticky top-16">
          <CategorySelector />

          <TagInput />

          <div className="space-y-2">
            <h2 className="text-lg font-medium">SEO Settings</h2>
            <textarea
              placeholder="Description"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
