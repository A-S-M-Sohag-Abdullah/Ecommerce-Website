"use client";
import React, { useState, ChangeEvent, KeyboardEvent, useRef } from "react";

type VariantType = "Size" | "Color";

interface Variant {
  id: number;
  type: VariantType;
  sizes: string[];
  colors: string[];
  inputValue: string;
  selectedColor: string;
}

export default function AddProductPage() {
  const [hasVariants, setHasVariants] = useState(false);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInputValue, setTagInputValue] = useState<string>("");
  const [dragging, setDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const usedTypes = variants.map((v) => v.type);
  const toggleVariants = () => {
    setHasVariants(!hasVariants);
    if (!hasVariants && variants.length === 0) {
      setVariants([createVariant("Size")]);
    }
  };

  const createVariant = (type: VariantType): Variant => ({
    id: Date.now() + Math.random(),
    type,
    sizes: [],
    colors: [],
    inputValue: "",
    selectedColor: "#000000",
  });

  const handleAddVariant = () => {
    const nextType = usedTypes.includes("Size") ? "Color" : "Size";
    if (variants.length < 2) {
      setVariants([...variants, createVariant(nextType)]);
    }
  };

  const handleRemoveVariant = (id: number) => {
    setVariants(variants.filter((v) => v.id !== id));
  };

  const handleTypeChange = (id: number, type: VariantType) => {
    if (usedTypes.includes(type)) return;
    setVariants((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              type,
              sizes: [],
              colors: [],
              inputValue: "",
              selectedColor: "#000000",
            }
          : v
      )
    );
  };

  const handleInputChange = (id: number, value: string) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, inputValue: value } : v))
    );
  };

  const handleSizeAdd = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.currentTarget.value.trim().toUpperCase();
      setVariants((prev) =>
        prev.map((v) =>
          v.id === id && value && !v.sizes.includes(value)
            ? { ...v, sizes: [...v.sizes, value], inputValue: "" }
            : v
        )
      );
    }
  };

  const handleRemoveSize = (id: number, size: string) => {
    setVariants((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, sizes: v.sizes.filter((s) => s !== size) } : v
      )
    );
  };

  const handleColorChange = (id: number, color: string) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, selectedColor: color } : v))
    );
  };

  const handleAddColor = (id: number) => {
    setVariants((prev) =>
      prev.map((v) =>
        v.id === id && !v.colors.includes(v.selectedColor)
          ? { ...v, colors: [...v.colors, v.selectedColor] }
          : v
      )
    );
  };

  const handleRemoveColor = (id: number, color: string) => {
    setVariants((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, colors: v.colors.filter((c) => c !== color) } : v
      )
    );
  };

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInputValue.trim()) {
      e.preventDefault();
      const tag = tagInputValue.trim().toLowerCase();
      if (!tags.includes(tag)) {
        setTags([...tags, tag]);
        setTagInputValue("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6 w-full mx-auto space-y-6 bg-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Add Product</h1>
        <div className="space-x-2">
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 rounded px-4 py-2 bg-white">
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

            <textarea
              placeholder="Product description"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            ></textarea>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium">Images</h2>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={() => setDragging(false)}
              onClick={openFilePicker}
              className={
                "border rounded-md p-6 text-center cursor-pointer text-sm text-gray-500 hover:bg-gray-50 transition" +
                " " +
                (dragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 border-dashed")
              }
            >
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                type="button"
                className="mt-2 bg-blue-600 text-white hover:bg-blue-700 rounded px-4 py-2"
              >
                Add File
              </button>
              <p className="mt-2">Drag and drop files or click to add</p>

              {files.length > 0 && (
                <div className="mt-4 text-left">
                  <h4 className="font-medium mb-2">Selected Files:</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm">
                    {files.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
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

          <div className="space-y-4">
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
                  checked={hasVariants}
                  onChange={toggleVariants}
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
              <label
                htmlFor="Product-options-switch"
                className="text-sm font-medium text-gray-900"
              >
                This product has multiple options
              </label>
            </div>

            {hasVariants && (
              <div className="space-y-6">
                {variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 relative    rounded-md"
                  >
                    {/* Remove Button */}
                    {variants.length > 1 && (
                      <button
                        onClick={() => handleRemoveVariant(variant.id)}
                        className="col-span-2 text-end right-2 text-red-600 text-sm hover:cursor-pointer"
                      >
                        <span className="px-2 py-1 rounded-sm bg-red-100 ">✕ Remove</span>
                      </button>
                    )}

                    {/* Selector */}
                    <select
                      className="w-full border h-fit border-gray-300 outline-0 rounded px-3 py-2 text-sm"
                      value={variant.type}
                      onChange={(e) =>
                        handleTypeChange(
                          variant.id,
                          e.target.value as VariantType
                        )
                      }
                    >
                      <option
                        value="Size"
                        disabled={
                          usedTypes.includes("Size") && variant.type !== "Size"
                        }
                      >
                        Size
                      </option>
                      <option
                        value="Color"
                        disabled={
                          usedTypes.includes("Color") &&
                          variant.type !== "Color"
                        }
                      >
                        Color
                      </option>
                    </select>

                    {/* Input Area */}
                    {variant.type === "Size" ? (
                      <div>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-0"
                          placeholder="Enter size and press Enter"
                          value={variant.inputValue}
                          onChange={(e) =>
                            handleInputChange(variant.id, e.target.value)
                          }
                          onKeyDown={(e) => handleSizeAdd(e, variant.id)}
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                          {variant.sizes.map((size) => (
                            <div
                              key={size}
                              className="flex items-center bg-gray-200 text-sm px-2 py-1 rounded-sm"
                            >
                              {size}
                              <button
                                className="ml-2 text-gray-600 hover:text-red-500"
                                onClick={() =>
                                  handleRemoveSize(variant.id, size)
                                }
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={variant.selectedColor}
                            onChange={(e) =>
                              handleColorChange(variant.id, e.target.value)
                            }
                            className="w-12 h-10 rounded border border-gray-300"
                          />
                          <button
                            onClick={() => handleAddColor(variant.id)}
                            className="px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                          >
                            Select
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {variant.colors.map((color) => (
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
                                onClick={() =>
                                  handleRemoveColor(variant.id, color)
                                }
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {variants.length < 2 && (
                  <button
                    onClick={handleAddVariant}
                    className="mt-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded px-4 py-2 text-sm"
                  >
                    + Add More
                  </button>
                )}
              </div>
            )}
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

        <div className="space-y-6 bg-white p-6 rounded-lg shadow-md h-fit sticky top-16">
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
