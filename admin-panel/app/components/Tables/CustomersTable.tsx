"use client";
import {
  faAngleDown,
  faCheck,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Customer = {
  userId: string;
  totalSpent: string;
  name: string;
  totalOrders: number;
  avatar?: string;
};

type Props = {
  customers: Customer[];
};

const CustomersTable: React.FC<Props> = ({ customers }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelected = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    setSelected([]);
  }, [customers]);

  const allSelected = selected.length === customers.length;

  return (
    <>
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

      <table className="min-w-full text-md text-left border border-gray-200 rounded-md overflow-hidden">
        <thead className=" text-gray-400">
          <tr>
            <th className="px-4 py-2">
              <span
                onClick={() =>
                  setSelected(allSelected ? [] : customers.map((p) => p.userId))
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
          {customers.map((customer) => (
            <tr
              key={customer.userId}
              className="border-t border-gray-100 hover:bg-gray-50"
            >
              <td className="px-4 py-2">
                <span
                  onClick={() => toggleSelected(customer.userId)}
                  className={`w-7 h-7 flex items-center justify-center border rounded cursor-pointer transition-all duration-200 ${
                    selected.includes(customer.userId)
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {selected.includes(customer.userId) && (
                    <FontAwesomeIcon icon={faCheck} className="text-lg" />
                  )}
                </span>
              </td>

              <td className="px-4 py-2 w-2/4 flex items-center">
                {customer.avatar ? (
                  <Image
                    width={48}
                    height={48}
                    src={customer.avatar}
                    alt="Customer Image"
                    className="inline-block mr-2 rounded-full shadow-md border border-blue-600"
                  />
                ) : (
                  <span className="mr-2 flex items-center justify-center w-12 h-12 bg-gray-400 rounded-full font-bold text-white text-xl">
                    {customer.name[0].toUpperCase()}
                  </span>
                )}
                {customer.name}
              </td>
              <td className="px-4 py-2 w-1/4">{customer.totalOrders}</td>
              <td className="px-4 py-2 w-1/4">{customer.totalSpent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CustomersTable;
