"use client";
import CategorySelector from "@/app/components/AddProductFormComponents/CategorySelector";
import DifferentOptions from "@/app/components/AddProductFormComponents/DifferentOptions";
import { FileDropzone } from "@/app/components/AddProductFormComponents/FileDropZone";
import TagInput from "@/app/components/AddProductFormComponents/TagInput";
import { RootState } from "@/store/store";
import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTitle,
  setDescription,
  setBasePrice,
  setDiscountPrice,
  setStock,
  setIsOnSale,
  resetProductState,
  setTags,
  setFiles,
  setCategory,
  setVariants,
} from "@/features/product/productSlice";
import {
  addProduct,
  getProductById,
  updateProductById,
} from "@/api/productApi";
import { toast } from "react-toastify";
import { get } from "http";
import { useParams } from "next/navigation";
import { Variant, VariantType } from "@/types";

export default function AddProductPage() {
  const { productId } = useParams() || "";
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
    variants,
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
      tags.forEach((tag) => {
        formData.append("tags", tag); // Append each tag to the FormData
      });
      const SizeVariant = variants.find((user) => user.type === "Size");
      const ColorVariant = variants.find((user) => user.type === "Color");
      if (SizeVariant?.sizes && SizeVariant.sizes.length > 0) {
        SizeVariant.sizes.forEach((size) => {
          formData.append("size", size); // Append each size to the FormData
        });
      }

      if (ColorVariant?.colors && ColorVariant.colors.length > 0) {
        ColorVariant.colors.forEach((color) => {
          formData.append("color", color); // Append each color to the FormData
        });
      }

      if (typeof productId === "string") {
        const response = await updateProductById(productId, formData);
        if (response.success) {
          toast.success("Product Updated successfully!");
          dispatch(resetProductState());
        }
      } else {
        toast.error("Invalid product ID.");
      }
    } catch (error) {}
  };

  useEffect(() => {
    const previousProductState = async () => {
      if (typeof productId === "string") {
        const data = await getProductById(productId);
        console.log("Fetched product data:", data);
        if (data) {
          dispatch(setTitle(data.name));
          dispatch(setDescription(data.description));
          dispatch(setBasePrice(data.price));
          dispatch(setStock(data.countInStock));
          const updatedFiles = await Promise.all(
            data.images.map(async (image: string) => {
              let imageUrl = "";
              if (image.includes("fakestoreapi")) {
                imageUrl = image;
              } else {
                imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${image}`;
              }

              const response = await fetch(imageUrl);
              const blob = await response.blob();
              return new File([blob], image, { type: "image/jpeg" });
            })
          );
          console.log("Updated files:", updatedFiles);
          dispatch(setFiles(updatedFiles));
          dispatch(setCategory(data.category));
          if (data.hasOwnProperty("discountPrice")) {
            console.log("Setting discount price:", data.discountPrice);
            dispatch(setIsOnSale(true));
            dispatch(setDiscountPrice(data.discountPrice));
          }
          dispatch(setTags(data.tags));

          let colorVariant: Variant | undefined = undefined;
          let sizeVariant: Variant | undefined = undefined;
          if (data.hasOwnProperty("color")) {
            colorVariant = {
              id: Date.now() + Math.random(),
              type: "Color" as VariantType,
              sizes: [],
              colors: data.color,
              inputValue: "",
              selectedColor: "#000000",
            };
          }

          if (data.hasOwnProperty("size")) {
            sizeVariant = {
              id: Date.now() + Math.random(),
              type: "Size" as VariantType,
              sizes: data.size,
              colors: [],
              inputValue: "",
              selectedColor: "",
            };
            console.log("Size variant adding");
          }
          const variantsArray: Variant[] = [];
          if (sizeVariant) variantsArray.push(sizeVariant);
          if (colorVariant) variantsArray.push(colorVariant);
          dispatch(setVariants(variantsArray));
          /*

    
          ;
          dispatch(setVariants(data.variants)); */
        }
      }
    };
    previousProductState();
  }, []);
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
