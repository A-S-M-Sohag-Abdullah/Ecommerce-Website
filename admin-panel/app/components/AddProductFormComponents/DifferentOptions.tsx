import React, { useState } from "react";

import { setVariants } from "@/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

type VariantType = "Size" | "Color";
interface Variant {
  id: number;
  type: VariantType;
  sizes: string[];
  colors: string[];
  inputValue: string;
  selectedColor: string;
}
function DifferentOptions() {
  const dispatch = useDispatch();
  const [hasVariants, setHasVariants] = useState(false);
  const { variants } = useSelector((state: RootState) => state.product);
  const usedTypes = variants.map((v) => v.type);
  const toggleVariants = () => {
    setHasVariants(!hasVariants);
    if (!hasVariants && variants.length === 0) {
      dispatch(setVariants([createVariant("Size")]));
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
      dispatch(setVariants([...variants, createVariant(nextType)]));
    }
  };

  const handleRemoveVariant = (id: number) => {
    dispatch(setVariants(variants.filter((v) => v.id !== id)));
  };

  const updatedVariants = (id: number, type: VariantType) => {
    return variants.map((v) =>
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
    );
  };

  const handleTypeChange = (id: number, type: VariantType) => {
    if (usedTypes.includes(type)) return;
    dispatch(setVariants(updatedVariants(id, type)));
  };

  const handleInputChange = (id: number, value: string) => {
    dispatch(
      setVariants(
        variants.map((v) => (v.id === id ? { ...v, inputValue: value } : v))
      )
    );
  };

  const handleSizeAdd = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.currentTarget.value.trim().toUpperCase();
      dispatch(
        setVariants(
          variants.map((v) =>
            v.id === id && value && !v.sizes.includes(value)
              ? { ...v, sizes: [...v.sizes, value], inputValue: "" }
              : v
          )
        )
      );
    }
  };

  const handleRemoveSize = (id: number, size: string) => {
    dispatch(
      setVariants(
        variants.map((v) =>
          v.id === id ? { ...v, sizes: v.sizes.filter((s) => s !== size) } : v
        )
      )
    );
  };

  const handleColorChange = (id: number, color: string) => {
    dispatch(
      setVariants(
        variants.map((v) => (v.id === id ? { ...v, selectedColor: color } : v))
      )
    );
  };

  const handleAddColor = (id: number) => {
    dispatch(
      setVariants(
        variants.map((v) =>
          v.id === id && !v.colors.includes(v.selectedColor)
            ? { ...v, colors: [...v.colors, v.selectedColor] }
            : v
        )
      )
    );
  };

  const handleRemoveColor = (id: number, color: string) => {
    dispatch(
      setVariants(
        variants.map((v) =>
          v.id === id
            ? { ...v, colors: v.colors.filter((c) => c !== color) }
            : v
        )
      )
    );
  };
  return (
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
                  <span className="px-2 py-1 rounded-sm bg-red-100 ">
                    ✕ Remove
                  </span>
                </button>
              )}

              {/* Selector */}
              <select
                className="w-full border h-fit border-gray-300 outline-0 rounded px-3 py-2 text-sm"
                value={variant.type}
                onChange={(e) =>
                  handleTypeChange(variant.id, e.target.value as VariantType)
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
                    usedTypes.includes("Color") && variant.type !== "Color"
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
                          onClick={() => handleRemoveSize(variant.id, size)}
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
                          onClick={() => handleRemoveColor(variant.id, color)}
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
  );
}

export default DifferentOptions;
