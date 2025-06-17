"use client";
import React, { use, useEffect, useState } from "react";
import {
  faAngleDown,
  faCheck,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  images: string[];
  countInStock: number;
  category: string;
  color?: string[];
  size?: string[];
  tags?: string[];
  rating: number;
};

type Props = {
  products: Product[];
};
const ProductTable: React.FC<Props> = ({ products }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelected = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };
  useEffect(() => {
    setSelected([]);
  }, [products]);
  const allSelected = selected.length === products.length;
  return (
    <>
      <div className="flex gap-2 mb-4">
        <button className="px-3 py-1 w-32 border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-between text-gray-500">
          Filter <FontAwesomeIcon icon={faAngleDown} className="w-4" />
        </button>
        <div className="px-4 py-1 border border-gray-300 rounded w-72 flex items-center gap-2 text-gray-500">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4" />
          <input type="text" placeholder="Search..." className=" outline-0 " />
        </div>

        <div className="flex items-center gap-2 ms-auto">
          <button className="w-10 h-9 flex items-center justify-center  border border-gray-300 rounded hover:bg-gray-100 cursor-pointer">
            <Image
              width={16}
              height={16}
              src={"/icons/delete.svg"}
              alt="Edit"
            />
          </button>
        </div>
      </div>
      <table className="min-w-full text-sm text-left border border-gray-200 rounded-md overflow-hidden">
        <thead className=" text-gray-700">
          <tr>
            <th className="px-4 py-2">
              <span
                onClick={() =>
                  setSelected(allSelected ? [] : products.map((p) => p._id))
                }
                className={`w-7 h-7 flex items-center justify-center border rounded cursor-pointer transition-all duration-200 ${
                  allSelected
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                {allSelected && (
                  <FontAwesomeIcon icon={faCheck} className="text-lg" />
                )}
              </span>
            </th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Inventory</th>
            <th className="px-4 py-2">Color</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {products.map((product) => (
            <tr
              key={product._id}
              className="border-t border-gray-100 hover:bg-gray-50"
            >
              <td className="px-4 py-2">
                <span
                  onClick={() => toggleSelected(product._id)}
                  className={`w-7 h-7 flex items-center justify-center border rounded cursor-pointer transition-all duration-200 ${
                    selected.includes(product._id)
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {selected.includes(product._id) && (
                    <FontAwesomeIcon icon={faCheck} className="text-lg" />
                  )}
                </span>
              </td>
              <td className="px-4 py-2 flex items-center gap-3">
                {product.images.length > 0 && (
                  <Image
                    src={`${product.images[0]}`}
                    alt={product.name}
                    width={40}
                    height={40}
                  ></Image>
                )}

                <div>
                  <div className="font-medium">
                    {product.name.split("").slice(0, 20).join("")}...
                  </div>
                  <div className="text-xs text-gray-500">
                    {product.description.split("").slice(0, 10).join("")}...
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">
                {product.countInStock ? (
                  product.countInStock
                ) : (
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded">
                    Out of Stock
                  </span>
                )}
              </td>
              <td className="px-4 py-2">
                {product.color?.map((c, idx) => (
                  <span
                    key={idx}
                    className="inline-block w-4 h-4 rounded-sm  shadow-md mr-1"
                    style={{ backgroundColor: c }}
                    title={c}
                  ></span>
                ))}
              </td>
              <td className="px-4 py-2">{product.price}</td>
              <td className="px-4 py-2">{product.rating}</td>
              <td>
                <Link href={`/products/editProduct/${product._id}`}>
                  <Image
                    width={16}
                    height={16}
                    src={"/icons/edit.svg"}
                    alt="Edit"
                  />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductTable;
