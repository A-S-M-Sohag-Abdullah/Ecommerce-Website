import { getCategories } from "@/api/categoryApi";
import CreateCouponForm from "@/app/components/CreateCuponComponents/CreateCouponForm";
import TypeSelector from "@/app/components/CreateCuponComponents/TypeSelector";
import { Category } from "@/types";
import Link from "next/link";
import { useEffect } from "react";

export default async function CreateCouponPage() {
  const categories: Category[] = await getCategories();
  return (
    <div className="p-6 w-full bg-gray-100 mx-auto space-y-6">
      <Link href={"/coupons"} className="text-gray-600 hover:underline">
        &larr; Back
      </Link>
      <h1 className="text-2xl font-semibold">Create Coupon</h1>

      <CreateCouponForm categories={categories}></CreateCouponForm>
    </div>
  );
}
