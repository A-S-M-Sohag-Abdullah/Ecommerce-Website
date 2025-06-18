"use client";
import WishlistProductCard from "@/components/Others/WishlistProductCard";
import { RootState } from "@/store/store";
import { UserType } from "@/types";
import React from "react";
import { useSelector } from "react-redux";

function Page() {
  const user = useSelector(
    (state: RootState) => state.auth.user
  ) as UserType | null;

  return (
    <div>
      {user?.wishlist.map((item: string) => (
        <WishlistProductCard key={item} productId={item} />
      ))}
    </div>
  );
}

export default Page;
