"use client";

import {
  faArrowLeft,
  faArrowRight,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Men Grey Hoodie",
    sub: "Hoodies",
    image: "/images/hoodie.png",
    inventory: "96 in stock",
    color: "Black",
    price: "$49.90",
    rating: "5.0 (32 Votes)",
    stock: true,
  },
  {
    id: 2,
    name: "Women Striped T-Shirt",
    sub: "T-Shirt",
    image: "/images/tshirt-striped.png",
    inventory: "56 in stock",
    color: "White",
    price: "$34.90",
    rating: "4.8 (24 Votes)",
    stock: true,
  },
  {
    id: 3,
    name: "Women White T-Shirt",
    sub: "T-Shirt",
    image: "/images/tshirt-white.png",
    inventory: "78 in stock",
    color: "White",
    price: "$40.90",
    rating: "5.0 (54 Votes)",
    stock: true,
  },
  {
    id: 4,
    name: "Men White T-Shirt",
    sub: "T-Shirt",
    image: "/images/tshirt-men.png",
    inventory: "32 in stock",
    color: "White",
    price: "$49.90",
    rating: "4.5 (21 Votes)",
    stock: true,
  },
  {
    id: 5,
    name: "Women Red T-Shirt",
    sub: "T-Shirt",
    image: "/images/tshirt-red.png",
    inventory: "32 in stock",
    color: "White",
    price: "$34.90",
    rating: "4.9 (22 Votes)",
    stock: false,
  },
];

export default function ProductTable() {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelected = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const allSelected = selected.length === products.length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-semibold">Products</h2>
        <div className="flex gap-2">
          <button className="px-6 py-3 border border-gray-300 rounded hover:bg-gray-100">
            Export
          </button>
          <button className="px-6 py-3 bg-[#1E5EFF] text-white rounded hover:bg-blue-700">
            + Add Product
          </button>
        </div>
      </div>

      {/* Filter/Search */}
      <div className="flex gap-2 mb-4">
        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">
          Filter
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-3 border border-gray-300 rounded w-72 outline-0 "
        />

        <div className="flex items-center gap-2 ms-auto">
          <button className="size-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 cursor-pointer">
            <Image width={16} height={16} src={"/icons/edit.svg"} alt="Edit" />
          </button>
          <button className="size-10 flex items-center justify-center  border border-gray-300 rounded hover:bg-gray-100 cursor-pointer">
            <Image
              width={16}
              height={16}
              src={"/icons/delete.svg"}
              alt="Edit"
            />
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full text-sm text-left border border-gray-200 rounded-md overflow-hidden">
        <thead className=" text-gray-700">
          <tr>
            <th className="px-4 py-2">
              <span
                onClick={() =>
                  setSelected(allSelected ? [] : products.map((p) => p.id))
                }
                className={`w-7 h-7 flex items-center justify-center border rounded cursor-pointer transition-all duration-200 ${
                  allSelected
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                {allSelected && <FontAwesomeIcon icon={faCheck} className="text-lg"/>}
              </span>
            </th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Inventory</th>
            <th className="px-4 py-2">Color</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Rating</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t border-gray-100 hover:bg-gray-50"
            >
              <td className="px-4 py-2">
                <span
                  onClick={() => toggleSelected(product.id)}
                  className={`w-7 h-7 flex items-center justify-center border rounded cursor-pointer transition-all duration-200 ${
                    selected.includes(product.id)
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {selected.includes(product.id) && (
                    <FontAwesomeIcon icon={faCheck} className="text-lg"/>
                  )}
                </span>
              </td>
              <td className="px-4 py-2 flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 rounded object-cover "
                />
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-xs text-gray-500">{product.sub}</div>
                </div>
              </td>
              <td className="px-4 py-2">
                {product.stock ? (
                  product.inventory
                ) : (
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded">
                    Out of Stock
                  </span>
                )}
              </td>
              <td className="px-4 py-2">{product.color}</td>
              <td className="px-4 py-2">{product.price}</td>
              <td className="px-4 py-2">{product.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-5">
          <button className="px-2 py-1  rounded" disabled>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`size-9 flex items-center justify-center text-lg  rounded ${
                n === 1 ? "bg-[#ECF2FF] text-[#1E5EFF]" : "hover:bg-gray-100"
              }`}
            >
              {n}
            </button>
          ))}
          <button className="px-2 py-1  rounded">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <div>146 Results</div>
      </div>
    </div>
  );
}
