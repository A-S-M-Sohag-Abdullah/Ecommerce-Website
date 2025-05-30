"use client";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";

export default function AddProductPage() {
  const [type, setType] = useState<"Size" | "Color">("Size");
  const [sizes, setSizes] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [colors, setColors] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("#000000");

  const handleSizeAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      if (!sizes.includes(trimmedValue)) {
        setSizes([...sizes, trimmedValue]);
        setInputValue("");
      }
    }
  };

  const handleRemoveSize = (size: string) => {
    setSizes(sizes.filter((s) => s !== size));
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  const handleAddColor = () => {
    if (!colors.includes(selectedColor)) {
      setColors([...colors, selectedColor]);
    }
  };

  const handleRemoveColor = (color: string) => {
    setColors(colors.filter((c) => c !== color));
  };

  return (
    <div className="p-6 w-full mx-auto space-y-6 bg-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Add Product</h1>
        <div className="space-x-2">
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 rounded px-4 py-2">
            Cancel
          </button>
          <button className="bg-blue-600 text-white hover:bg-blue-700 rounded px-4 py-2">
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
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Product Subtitle"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <textarea
              placeholder="Product description"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            ></textarea>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium">Images</h2>
            <div className="border border-dashed rounded-md p-6 text-center cursor-pointer text-sm text-gray-500">
              <p>Drag and drop files or click to add</p>
              <button className="mt-2 bg-blue-600 text-white hover:bg-blue-700 rounded px-4 py-2">
                Add File
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium">Price</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Price"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Price on Discount"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div className="flex items-center space-x-3">
              <label
                htmlFor="sale-switch"
                className="relative inline-flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="sale-switch"
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

          <div className="space-y-2">
            <h2 className="text-lg font-medium">Different Options</h2>
            <div className="flex items-center space-x-3">
              <label
                htmlFor="Product-options-switch"
                className="relative inline-flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="Product-options-switch"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none  rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
              <label
                htmlFor="Product-options-switch"
                className="text-sm font-medium text-gray-900"
              >
                This product has multiple options
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Select */}
              <select
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                value={type}
                onChange={(e) => {
                  setType(e.target.value as "Size" | "Color");
                  setInputValue("");
                }}
              >
                <option value="Size">Size</option>
                <option value="Color">Color</option>
              </select>

              {/* Dynamic Field */}
              {type === "Size" ? (
                <div className="w-full border border-gray-300 rounded px-3 py-2 text-sm min-h-[40px]">
                  <input
                    type="text"
                    className="w-full outline-none"
                    placeholder="Enter size and press Enter"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleSizeAdd}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {sizes.map((size) => (
                      <div
                        key={size}
                        className="flex items-center bg-gray-200 text-sm px-2 py-1 rounded-full"
                      >
                        {size}
                        <button
                          className="ml-2 text-gray-600 hover:text-red-500"
                          onClick={() => handleRemoveSize(size)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <input
                    type="color"
                    onChange={handleColorChange}
                    className="w-full h-10 rounded border border-gray-300 p-0"
                  />
                  <button
                    onClick={handleAddColor}
                    className="px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Select
                  </button>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <div
                        key={color}
                        className="flex items-center space-x-2 border border-gray-300 rounded px-2 py-1"
                      >
                        <div
                          className="w-5 h-5 rounded"
                          style={{ backgroundColor: color }}
                        />
                        <button
                          className="text-gray-600 hover:text-red-500"
                          onClick={() => handleRemoveColor(color)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button className="mt-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded px-4 py-2 text-sm">
              Add More
            </button>
          </div>

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

        <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Categories</h2>
            <div className="space-y-2">
              <label className="block">
                <input type="checkbox" className="mr-2" /> Women
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" /> Men
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" /> T-shirt
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" /> Hoodie
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" /> Dress
              </label>
            </div>
            <button className="mt-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded px-4 py-2 text-sm">
              Create new
            </button>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium">Tags</h2>
            <input
              type="text"
              placeholder="Enter tag names"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <div className="flex flex-wrap gap-2 text-sm text-blue-600">
              <span>#new</span>
              <span>#sale</span>
              <span>#limited</span>
            </div>
          </div>

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
