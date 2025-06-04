import axiosInstance from "@/lib/axiosInstance";

export const getOrders = async (page: number, limit: number = 10) => {
  try {
    const res = await axiosInstance.get("/api/admin/orders/", {
      params: { page, limit },
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
