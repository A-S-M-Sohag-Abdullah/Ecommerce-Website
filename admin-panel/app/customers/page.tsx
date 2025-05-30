"use client";

import {
  faAngleDown,
  faArrowLeft,
  faArrowRight,
  faCheck,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

type Customer = {
  id: number;
  name: string;
  orders: number;
  spent: string;
  image?: string;
};

const Customers: Customer[] = [
  {
    id: 1,
    name: "Rakesh Mishra",
    orders: 5,
    spent: "$99.90",
    image: undefined,
  },
  {
    id: 2,
    name: "Lakshman singh",
    spent: "$49.90",
    orders: 5,
    image: undefined,
  },
  {
    id: 3,
    name: "Dinanath sah",
    spent: "$59.90",
    orders: 5,
    image: undefined,
  },
];

export default function ProductTable() {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelected = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const allSelected = selected.length === Customers.length;

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-semibold">Customers</h2>
        <div className="flex gap-2">
          <button className="px-6 py-1 border border-gray-300 rounded hover:bg-gray-100 text-blue-600 bg-white text-lg">
            Export
          </button>
          <button className="px-6 py-1 bg-[#1E5EFF] text-white rounded hover:bg-blue-700 text-lg flex items-center gap-2">
            <FontAwesomeIcon icon={faPlus} /> Add Customer
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* table nav */}
        <div className="flex items-center space-x-3 font-semibold mb-4">
          <button className="text-gray-400  hover:text-blue-600">
            All Customers
          </button>
          <button className="text-gray-400 hover:text-blue-600">
            New Customers
          </button>
          <button className="text-gray-400 hover:text-blue-600">
            Returning Customers
          </button>
          <button className="text-gray-400 hover:text-blue-600">
            Inactive Customers
          </button>
        </div>
        {/* Filter/Search */}
        <div className="flex gap-2 mb-4">
          <button className="px-3 py-1 w-32 border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-between text-gray-500">
            Filter <FontAwesomeIcon icon={faAngleDown} />
          </button>
          <div className="px-4 py-1 border border-gray-300 rounded w-72 flex items-center gap-2 text-gray-500">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              type="text"
              placeholder="Search..."
              className=" outline-0 "
            />
          </div>

          <div className="flex items-center gap-2 ms-auto">
            <button className="w-10 h-9 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 cursor-pointer">
              <Image
                width={16}
                height={16}
                src={"/icons/edit.svg"}
                alt="Edit"
              />
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
                    setSelected(allSelected ? [] : Customers.map((p) => p.id))
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
              <th className="px-4 py-2 w-2/4">Name</th>
              <th className="px-4 py-2 w-1/4">Orders</th>
              <th className="px-4 py-2 w-1/4">Spent</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {Customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-2">
                  <span
                    onClick={() => toggleSelected(customer.id)}
                    className={`w-7 h-7 flex items-center justify-center border rounded cursor-pointer transition-all duration-200 ${
                      selected.includes(customer.id)
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {selected.includes(customer.id) && (
                      <FontAwesomeIcon icon={faCheck} className="text-lg" />
                    )}
                  </span>
                </td>

                <td className="px-4 py-2 w-2/4 flex items-center">
                  {customer.image ? (
                    <Image
                      width={20}
                      height={20}
                      src={customer.image}
                      alt="Customer Image"
                      className="inline-block mr-2 rounded-full"
                    />
                  ) : (
                    <span className="mr-2 flex items-center justify-center w-12 h-12 bg-gray-400 rounded-full font-bold text-white text-xl">
                      {customer.name[0].toUpperCase()}
                    </span>
                  )}
                  {customer.name}
                </td>
                <td className="px-4 py-2 w-1/4">{customer.orders}</td>
                <td className="px-4 py-2 w-1/4">{customer.spent}</td>
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
    </div>
  );
}
