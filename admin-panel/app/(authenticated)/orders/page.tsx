import { getOrders } from "@/api/orderApi";
import Ordertable from "@/app/components/Tables/Ordertable";
import getPageNumbers from "@/lib/getPageNumbers";
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
import Link from "next/link";
import { useState } from "react";

type Props = {
  searchParams: { [key: string]: string };
};

export default async function OrderPage({ searchParams }: Props) {
  const params = await searchParams;
  const page =  params.page || 1;
  const { orders, total, totalPages } = await getOrders(Number(page));

  const visiblePages = getPageNumbers(Number(page), totalPages);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-semibold">Orders</h2>
        <div className="flex gap-2">
          <button className="px-6 py-1 border border-gray-300 rounded hover:bg-gray-100 text-blue-600 bg-white text-lg">
            Export
          </button>
          <button className="px-6 py-1 bg-[#1E5EFF] text-white rounded hover:bg-blue-700 text-lg flex items-center gap-2">
            <FontAwesomeIcon icon={faPlus} className="w-4"/> Add Orders
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Filter/Search */}
        {/* <div className="flex gap-2 mb-4">
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
        </div> */}

        {/* Table */}
        {/* <table className="min-w-full text-md text-left border border-gray-200 rounded-md overflow-hidden">
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
        </table> */}

        <Ordertable orders={orders} />

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-5">
            <button className="px-2 py-1  rounded" disabled>
              {Number(page) > 1 && (
                <Link href={`/orders?page=${Number(page) - 1}`}>
                  <FontAwesomeIcon icon={faArrowLeft} className="w-4" />
                </Link>
              )}
            </button>
            {visiblePages.map((n) => (
              <Link
                key={n}
                href={`/orders?page=${n}`}
                className={`size-9 flex items-center justify-center text-lg  rounded ${
                  n === Number(page)
                    ? "bg-[#ECF2FF] text-[#1E5EFF]"
                    : "hover:bg-gray-100"
                }`}
              >
                {n}
              </Link>
            ))}
         
            {page < totalPages && (
              <button className="px-2 py-1  rounded">
                <Link href={`/orders?page=${Number(page) + 1}`}>
                  <FontAwesomeIcon icon={faArrowRight} className="w-4" />
                </Link>
              </button>
            )}
          </div>
          <div>{total} Results</div>
        </div>
      </div>
    </div>
  );
}
