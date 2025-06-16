"use client";
import { CouponState } from "@/types";
import {
  faAngleDown,
  faArrowLeft,
  faArrowRight,
  faBagShopping,
  faCheck,
  faMagnifyingGlass,
  faMoneyBill,
  faTag,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Coupon extends CouponState {
  _id: string;
  usedBy: string[];
}

type Props = {
  coupons: Coupon[];
};
const CouponTable: React.FC<Props> = ({ coupons }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelected = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    setSelected([]);
  }, [coupons]);

  const allSelected = selected.length === coupons.length;

  return (
    <>
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

      {/* Table */}
      <table className="min-w-full text-md text-left border border-gray-200 rounded-md overflow-hidden">
        <thead className=" text-gray-400">
          <tr>
            <th className="px-4 py-2">
              <span
                onClick={() =>
                  setSelected(allSelected ? [] : coupons.map((p) => p._id))
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
            <th className="px-4 py-2 ">Expire Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {coupons.map((coupon) => (
            <tr
              key={coupon._id}
              className="border-t border-gray-100 hover:bg-gray-50"
            >
              <td className="px-4 py-2">
                <span
                  onClick={() => toggleSelected(coupon._id)}
                  className={`w-7 h-7 flex items-center justify-center border rounded cursor-pointer transition-all duration-200 ${
                    selected.includes(coupon._id)
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {selected.includes(coupon._id) && (
                    <FontAwesomeIcon icon={faCheck} className="text-lg" />
                  )}
                </span>
              </td>

              <td className="px-4 py-2  flex items-center">
                {coupon.type === "Fixed Discount" && (
                  <div className="w-10 h-10 mr-2 flex items-center justify-center text-white bg-blue-600 rounded-sm text-xl">
                    <FontAwesomeIcon icon={faMoneyBill} />
                  </div>
                )}
                {coupon.type === "Percentage Discount" && (
                  <div className="w-10 h-10 mr-2 flex items-center justify-center text-white bg-gray-600 rounded-sm text-xl">
                    <FontAwesomeIcon icon={faBagShopping} />
                  </div>
                )}
                {coupon.type === "Free Shipping" && (
                  <div className="w-10 h-10 mr-2 flex items-center justify-center text-white bg-green-600 rounded-sm text-xl">
                    <FontAwesomeIcon icon={faTruck} />
                  </div>
                )}

                <div className="flex flex-col">
                  <span className="font-medium">{coupon.name}</span>
                  <span className="text-xs text-gray-400">{coupon.code}</span>
                </div>
              </td>
              <td className="px-4 py-2 ">{coupon.usedBy.length}</td>
              <td className="px-4 py-2 ">
                {coupon.duration !== null &&
                Date.now() < new Date(coupon.duration).getTime() ? (
                  <span className="bg-green-200 text-green-600 px-2 py-1 rounded">
                    Active
                  </span>
                ) : (
                  <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded">
                    Expired
                  </span>
                )}
              </td>
              <td className="px-4 py-2 ">
                {coupon.duration && coupon.duration.slice(0, 10)}
              </td>
              <td>
                {" "}
                <Link href={`/coupons/editCoupons/${coupon._id}`}>
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

      {/* Pagination */}
    </>
  );
};

export default CouponTable;
