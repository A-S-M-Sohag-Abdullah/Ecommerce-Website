"use client";

import { addToWishList } from "@/api/productApi";
import { setUser } from "@/features/auth/authSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface AddToCartBtnProps {
  productId: string;
}

function AddtoWishListBtn({ productId }: AddToCartBtnProps) {
  const dispatch = useDispatch();
  const handleAddtoWishlist = async () => {
    try {
      const response = await addToWishList({ productId: productId });

      if (response.success) {
        toast.success("Added To Wish List");
        dispatch(setUser(response.user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleAddtoWishlist}
      className="rounded-full size-7 flex items-center justify-center bg-white absolute top-3 right-3 cursor-pointer"
    >
      <Image
        src="/add-to-fav.png"
        alt="add to favourite"
        width={15}
        height={15}
        className="object-contain"
      />
    </button>
  );
}

export default AddtoWishListBtn;
