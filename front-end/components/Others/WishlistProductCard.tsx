"use client";
import { getProductById, removeFromWishList } from "@/api/productApi";
import { setUser } from "@/features/auth/authSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { Product } from "@/types";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function WishlistProductCard({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product>();
  const dispatch = useDispatch();

  const fetchProduct = useCallback(async () => {
    const response = await getProductById(productId);
    if (response) setProduct(response);
  }, [productId]);

  const handleRemoveFromWishList = async () => {
    try {
      const response = await removeFromWishList({ productId });
      if (response.success) {
        toast.success("removed from wishlist");
        dispatch(setUser(response.user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <div className="flex justify-between items-center my-6">
      {" "}
      {product && product.images.length > 0 && (
        <Image
          src={`${product.images[0]}`}
          alt={product.name}
          width={50}
          height={32}
          className="w-14 h-14"
        />
      )}
      <h2>{product && product.name.slice(0, 18)}...</h2>
      {product && (
        <button
          onClick={() =>
            product &&
            dispatch(
              addToCart({
                ...product,
                quantity: 1,
              })
            )
          }
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      )}
      {product && (
        <button
          className="bg-red-400 p-3 text-white rounded-sm block"
          onClick={handleRemoveFromWishList}
        >
          Remove
        </button>
      )}
    </div>
  );
}

export default WishlistProductCard;
