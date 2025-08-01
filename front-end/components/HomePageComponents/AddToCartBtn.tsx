"use client";
import { addToCart } from "@/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { Product } from "@/types";

interface AddToCartBtnProps {
  product: Product;
}

const AddToCartBtn = ({ product }: AddToCartBtnProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );
  };

  return (
    <button
      onClick={handleAddToCart}
      className="absolute bottom-0 left-0 bg-black text-white text-center w-full h-10 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
    >
      Add to cart
    </button>
  );
};

export default AddToCartBtn;
