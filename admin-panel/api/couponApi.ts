import axiosInstance from "@/lib/axiosInstance";
import { CouponState } from "@/types";

export const addCoupon = async (coupon: CouponState) => {
  try {
    const response = await axiosInstance.post("/api/admin/coupon/add", coupon);
    return response.data;
  } catch (error) {}
};

export const getAllCoupons = async (page: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/admin/coupon/getallcoupons?page=${page}`
    );

    return response.data;
  } catch (error) {}
};

export const getCouponByID = async (couponId: string) => {
  try {
    const response = await axiosInstance.get(`/api/admin/coupon/${couponId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching coupon:", error);
    throw error; // or handle it gracefully
  }
};

export const updateCoupon = async (
  couponId: string,
  updatedData: CouponState
) => {
  try {
    const response = await axiosInstance.put(
      `/api/admin/coupon/update/${couponId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating coupon:", error);
    throw error; // optionally handle it more gracefully
  }
};
