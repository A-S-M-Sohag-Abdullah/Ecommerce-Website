import axiosInstance from "@/lib/axiosInstance";
interface Category {
  name: string;
  description: string;
  image: File;
}
export const addCategory = async (categoryData: Category) => {
  try {
    const response = await axiosInstance.post(
      "/api/admin/category",
      categoryData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};
export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/api/admin/category");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
