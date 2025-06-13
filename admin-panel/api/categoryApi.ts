import axiosInstance from "@/lib/axiosInstance";
import { Category } from "@/types";

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

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get("/api/admin/category");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getCategoryByName = async (categoryName: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/admin/category/${categoryName}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return undefined;
  }
};

export const updateCategory = async (
  categoryData: Category,
  categoryName: string
) => {
  try {
    const response = await axiosInstance.put(
      `/api/admin/category/${categoryName}`,
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

export const getProductsByCategory = async (category: string) => {
  try {
    const res = await axiosInstance.get(`/api/products/getCategoryProducts/${category}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
