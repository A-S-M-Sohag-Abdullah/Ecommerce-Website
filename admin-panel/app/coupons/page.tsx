"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faArrowLeft,
  faArrowRight,
  faBagShopping,
  faCheck,
  faMagnifyingGlass,
  faMoneyBill,
  faPlus,
  faTag,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { stat } from "fs";
import { useState } from "react";

function Copupns() {
  // Sample categories data
  const Coupons = [
    {
      id: 1,
      name: "Summer discount 10% off",
      code: "Summer2020",
      type: 1,
      usage: 12,
      status: "Active",
      date: "May 5, 2020 - May 5, 2021",
    },
    {
      id: 2,
      name: "Free shipping on all items",
      code: "Shipfreetomee15",
      type: 2,
      usage: 12,
      status: "Active",
      date: "May 5, 2020 - May 5, 2021",
    },
    {
      id: 3,
      name: "Discount for women clothes",
      code: "Womenclothing5",
      type: 3,
      usage: 12,
      status: "Expired",
      date: "May 5, 2020 - May 5, 2021",
    },
    {
      id: 4,
      name: "Discount for women clothes 10Tk",
      code: "Womenclothing10",
      type: 4,
      usage: 12,
      status: "Active",
      date: "May 5, 2020 - May 5, 2021",
    },
  ];

  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelected = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const allSelected = selected.length === Coupons.length;

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
      {" "}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-semibold">Categories</h2>
        <div className="flex gap-2">
          <button className="px-6 py-2 bg-[#1E5EFF] text-white rounded hover:bg-blue-700 text-lg flex items-center gap-2">
            <FontAwesomeIcon icon={faPlus} className="text-sm w-5" /> Add
            Category
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
            Active Coupons
          </button>
          <button className="text-gray-400 hover:text-blue-600">
            Expired Coupons
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
                    setSelected(allSelected ? [] : Coupons.map((p) => p.id))
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
              <th className="px-4 py-2 ">Name</th>
              <th className="px-4 py-2 ">Usage</th>
              <th className="px-4 py-2 ">Status</th>
              <th className="px-4 py-2 ">Data</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {Coupons.map((coupon) => (
              <tr
                key={coupon.id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-2">
                  <span
                    onClick={() => toggleSelected(coupon.id)}
                    className={`w-7 h-7 flex items-center justify-center border rounded cursor-pointer transition-all duration-200 ${
                      selected.includes(coupon.id)
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {selected.includes(coupon.id) && (
                      <FontAwesomeIcon icon={faCheck} className="text-lg" />
                    )}
                  </span>
                </td>

                <td className="px-4 py-2  flex items-center">
                  {coupon.type === 1 && (
                    <div className="w-10 h-10 mr-2 flex items-center justify-center text-white bg-blue-600 rounded-sm text-xl">
                      <FontAwesomeIcon icon={faMoneyBill} />
                    </div>
                  )}
                  {coupon.type === 2 && (
                    <div className="w-10 h-10 mr-2 flex items-center justify-center text-white bg-gray-600 rounded-sm text-xl">
                      <FontAwesomeIcon icon={faBagShopping} />
                    </div>
                  )}
                  {coupon.type === 3 && (
                    <div className="w-10 h-10 mr-2 flex items-center justify-center text-white bg-green-600 rounded-sm text-xl">
                      <FontAwesomeIcon icon={faTruck} />
                    </div>
                  )}
                  {coupon.type === 4 && (
                    <div className="w-10 h-10 mr-2 flex items-center justify-center text-white bg-yellow-600 rounded-sm text-xl">
                      <FontAwesomeIcon icon={faTag} />
                    </div>
                  )}

                  <div className="flex flex-col">
                    <span className="font-medium">{coupon.name}</span>
                    <span className="text-xs text-gray-400">{coupon.code}</span>
                  </div>
                </td>
                <td className="px-4 py-2 ">{coupon.usage}</td>
                <td className="px-4 py-2 ">
                  {coupon.status === "Active" ? (
                    <span className="bg-green-200 text-green-600 px-2 py-1 rounded">
                      {coupon.status}
                    </span>
                  ) : (
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded">
                      {coupon.status}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 ">{coupon.date}</td>
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

export default Copupns;
