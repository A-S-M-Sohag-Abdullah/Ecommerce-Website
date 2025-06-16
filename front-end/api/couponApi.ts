import { CartItem } from "@/features/cart/cartSlice";
import axiosInstance from "@/lib/axiosInstance";

export const addCoupon = async (
  code: string,
  cart: CartItem[],
  subtotal: number
) => {
  try {
    const response = await axiosInstance.post(
      "/api/coupons/apply",
      { code, cartItems: cart, subtotal },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
