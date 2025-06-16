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

import Link from "next/link";
import CouponTable from "@/app/components/Tables/CouponTable";
import { getAllCoupons } from "@/api/couponApi";
import getPageNumbers from "@/lib/getPageNumbers";

type Props = {
  searchParams: { [key: string]: string };
};
async function Copupns({ searchParams }: Props) {
  const params = await searchParams;
  const page = params.page || 1;
  // Sample categories data
  const { Coupons, total, totalPages } = await getAllCoupons(Number(page));

  const visiblePages = getPageNumbers(Number(page), totalPages);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
      {" "}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-semibold">Categories</h2>
        <div className="flex gap-2">
          <Link
            href={"/coupons/createCoupons"}
            className="px-6 py-2 bg-[#1E5EFF] text-white rounded hover:bg-blue-700 text-lg flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} className="text-sm w-5" /> Add
            Coupons
          </Link>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Table */}
        {Coupons && <CouponTable coupons={Coupons}></CouponTable>}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-5">
            <button className="px-2 py-1  rounded">
              {Number(page) > 1 && (
                <Link href={`/coupons?page=${Number(page) - 1}`}>
                  <FontAwesomeIcon icon={faArrowLeft} className="w-4" />
                </Link>
              )}
            </button>
            {visiblePages.map((n) => (
              <Link
                key={n}
                href={`/coupons?page=${n}`}
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
                <Link href={`/coupons?page=${Number(page) + 1}`}>
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

export default Copupns;
