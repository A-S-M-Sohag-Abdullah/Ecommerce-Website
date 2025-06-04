"use client";
import formatDate from "@/lib/dateFormatter";
import { Order } from "@/types";
import {
  faAngleDown,
  faCheck,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  orders: Order[];
};

const Ordertable: React.FC<Props> = ({ orders }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelected = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    setSelected([]);
  }, [orders]);

  const allSelected = selected.length === orders.length;
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
          <button className="w-10 h-9 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 cursor-pointer">
            <Image width={16} height={16} src={"/icons/edit.svg"} alt="Edit" />
          </button>
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

      {/* Table */}
      <table className="min-w-full text-md text-left border border-gray-200 rounded-md overflow-hidden">
        <thead className=" text-gray-400">
          <tr>
            <th className="px-4 py-2">
              <span
                onClick={() =>
                  setSelected(allSelected ? [] : orders.map((p) => p._id))
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
        <tbody className="text-gray-800 text-xs">
          {orders.map((order) => (
            <tr
              key={order._id}
              className="border-t border-gray-100 hover:bg-gray-50"
            >
              <td className="px-4 py-2">
                <span
                  onClick={() => toggleSelected(order._id)}
                  className={`w-7 h-7 flex items-center justify-center border rounded cursor-pointer transition-all duration-200 ${
                    selected.includes(order._id)
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {selected.includes(order._id) && (
                    <FontAwesomeIcon icon={faCheck} className="text-lg" />
                  )}
                </span>
              </td>
              <td className="px-4 py-2 flex items-center gap-3">
                <div>
                  <div className="font-medium">
                    {order._id.slice(-8).toUpperCase()}
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">{formatDate(order.createdAt)}</td>
              <td className="px-4 py-2">{order.user.name}</td>
              <td className="px-4 py-2">
                {order.paidStatus === true ? (
                  <span className="bg-green-200 text-green-700 py-1 px-2 rounded-sm">
                    Paid
                  </span>
                ) : (
                  <span className="bg-gray-300 text-gray-600 py-1 px-2 rounded-sm">
                    COD
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
              <td className="px-4 py-2">{order.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Ordertable;
