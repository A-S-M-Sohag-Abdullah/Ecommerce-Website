"use client";
import CategoryEditForm from "@/app/components/CategoryForm/CategoryEditForm";
import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { getProductsByCategory, updateCategory } from "@/api/categoryApi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Product } from "@/types";
export default function EditCategoryPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const { name, description, image } = useSelector(
    (state: RootState) => state.category
  );
  // If no category provided, show 404 page
  if (!category) {
    notFound();
  }

  const handleUpdate = async () => {
    try {
      if (image) {
        const response = await updateCategory(
          { name, description, image },
          category
        );
        if (response.success) toast.success("Category Updated Successfully");
      }
    } catch (error) {}
  };

  const fetchCategoryProducts = async () => {
    try {
      const response = await getProductsByCategory(category);
      console.log(response);
      setCategoryProducts(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [category]);

  return (
    <div className="p-6 w-full mx-auto space-y-6 bg-gray-100">
      <Link href="/categories" className="text-gray-600 hover:underline">
        &larr; Back
      </Link>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">{category}</h1>
        <div className="flex justify-end space-x-2">
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 rounded px-4 py-2">
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white hover:bg-blue-700 rounded px-4 py-2"
          >
            Save
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium">
            Products <span className="text-sm text-gray-500">12</span>
          </h2>
          {categoryProducts &&
            categoryProducts.map((product, idx) => (
              <div
                key={product._id}
                className="flex items-center justify-between border border-gray-200 rounded p-2"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    width={48}
                    height={48}
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${product.images[0]}`}
                    alt="Edit"
                    className="w-12 h-12 bg-gray-200 rounded"
                  />

                  <span>{product.name}</span>
                </div>
                <div className="flex items-center space-x-5 pe-4">
                  <Link
                    href={`/products/editProduct/${product._id}`}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Image
                      width={16}
                      height={16}
                      src={"/icons/edit.svg"}
                      alt="Edit"
                    />
                  </Link>
                  <button className="text-red-500 hover:text-red-700">
                    {" "}
                    <Image
                      width={16}
                      height={16}
                      src={"/icons/delete.svg"}
                      alt="Edit"
                    />
                  </button>
                </div>
              </div>
            ))}
          <button className="text-blue-600 text-sm hover:underline">
            + Add Product
          </button>
        </div>

        <div className="space-y-6 bg-white p-6 rounded-lg shadow h-fit sticky top-16">
          <CategoryEditForm categoryname={category} />
        </div>
      </div>
    </div>
  );
}
