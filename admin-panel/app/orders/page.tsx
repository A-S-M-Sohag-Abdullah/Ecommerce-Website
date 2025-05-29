"use client";

import {
  faArrowLeft,
  faArrowRight,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

const Orders = [
  {
    id: 1,
    orderId: "#12512B",
    name: "Men Grey Hoodie",
    date: "May 5, 4:20 PM",
    customer: "Tom Anderson",
    paymentStatus: "Paid",
    orderStatus: "Ready",
    total: "$49.90",
  },
  {
    id: 2,
    orderId: "#12523C",
    name: "Men Grey Hoodie",
    date: "May 5, 4:20 PM",
    customer: "Tom Anderson",
    paymentStatus: "Paid",
    orderStatus: "Received",
    total: "$4.90",
  },
  {
    id: 3,
    orderId: "#12512B",
    name: "Men Grey Hoodie",
    date: "May 5, 4:20 PM",
    customer: "Jayden Walker",
    paymentStatus: "Pending",
    orderStatus: "Shipped",
    total: "$9.90",
  },
];

export default function ProductTable() {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelected = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const allSelected = selected.length === Orders.length;

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
      <table className="min-w-full text-md text-left border border-gray-200 rounded-md overflow-hidden">
        <thead className=" text-gray-400">
          <tr>
            <th className="px-4 py-2">
              <span
                onClick={() =>
                  setSelected(allSelected ? [] : Orders.map((p) => p.id))
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
            <th className="px-4 py-2">Order</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Payment status</th>
            <th className="px-4 py-2">Order Status</th>
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {Orders.map((order) => (
            <tr
              key={order.id}
              className="border-t border-gray-100 hover:bg-gray-50"
            >
              <td className="px-4 py-2">
                <span
                  onClick={() => toggleSelected(order.id)}
                  className={`w-7 h-7 flex items-center justify-center border rounded cursor-pointer transition-all duration-200 ${
                    selected.includes(order.id)
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {selected.includes(order.id) && (
                    <FontAwesomeIcon icon={faCheck} className="text-lg" />
                  )}
                </span>
              </td>
              <td className="px-4 py-2 flex items-center gap-3">
                <div>
                  <div className="font-medium">{order.orderId}</div>
                </div>
              </td>
              <td className="px-4 py-2">{order.date}</td>
              <td className="px-4 py-2">{order.customer}</td>
              <td className="px-4 py-2">
                {order.paymentStatus === "Paid" ? (
                  <span className="bg-green-200 text-green-700 py-1 px-2 rounded-sm">
                    {order.paymentStatus}
                  </span>
                ) : (
                  <span className="bg-gray-300 text-gray-600 py-1 px-2 rounded-sm">
                    {order.paymentStatus}
                  </span>
                )}
              </td>
              <td className="px-4 py-2">
                {order.orderStatus === "Ready" ? (
                  <span className="bg-orange-400 text-white py-1 px-2 rounded-sm">
                    {order.orderStatus}
                  </span>
                ) : order.orderStatus === "Shipped" ? (
                  <span className="bg-gray-700 text-white py-1 px-2 rounded-sm">
                    {order.orderStatus}
                  </span>
                ) : (
                  <span className="bg-blue-700 text-white py-1 px-2 rounded-sm">
                    {order.orderStatus}
                  </span>
                )}
              </td>
              <td className="px-4 py-2">{order.total}</td>
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
