import axiosInstance from "@/lib/axiosInstance";

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/api/category/getcategories");
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
