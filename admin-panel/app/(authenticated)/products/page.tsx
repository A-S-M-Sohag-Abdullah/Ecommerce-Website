import { getProducts } from "@/api/productApi";
import ProductTableBody from "@/app/components/ProductTable";
import {
  faAngleDown,
  faArrowLeft,
  faArrowRight,
  faCheck,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { get } from "http";
import Image from "next/image";
import Link from "next/link";

type Props = {
  searchParams: {
    page?: string;
  };
};
export default async function ProductTable({ searchParams }: Props) {
  const page = searchParams.page || "1";

  const { products, total, totalPages } = await getProducts(Number(page));
  console.log(products);

  function getPageNumbers(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (currentPage >= totalPages - 2) {
      return Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
    }

    return Array.from({ length: 5 }, (_, i) => currentPage - 2 + i);
  }

  const visiblePages = getPageNumbers(Number(page), totalPages);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-semibold">Products</h2>
        <div className="flex gap-2">
          <button className="px-6 py-1 border border-gray-300 rounded hover:bg-gray-100 text-blue-600 bg-white text-lg">
            Export
          </button>
          <Link
            href={"/products/addProducts"}
            className="px-6 py-1 bg-[#1E5EFF] text-white rounded hover:bg-blue-700 text-lg flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4" /> Add Product
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Table */}
        <ProductTableBody products={products} />

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-5">
            <button className="px-2 py-1  rounded" disabled>
              {page > "1" && (
                <Link href={`/products?page=${Number(page) - 1}`}>
                  <FontAwesomeIcon icon={faArrowLeft} className="w-4" />
                </Link>
              )}
            </button>
            {visiblePages.map((n) => (
              <Link
                key={n}
                href={`/products?page=${n}`}
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
                <Link href={`/products?page=${Number(page) + 1}`}>
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
