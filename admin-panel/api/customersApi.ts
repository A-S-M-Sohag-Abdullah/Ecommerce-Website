import axiosInstance from "@/lib/axiosInstance";

export const getCustomers = async (page: number, limit: number = 10) => {
  try {
    const res = await axiosInstance.get("/api/admin/customers/", {
      params: { page, limit },
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};
