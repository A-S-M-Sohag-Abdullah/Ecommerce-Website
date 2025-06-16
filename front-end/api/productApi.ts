import axiosInstance from "@/lib/axiosInstance";
import { Product } from "@/types";
import axios from "axios";



// Get all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await axiosInstance.get(`/api/products/?limit=50`, {
      withCredentials: true,
    });
    return res.data.products as Product[];
  } catch (error) {
    console.log("Error fetching products:", error);
    return [];
  }
};

// Get product by ID
export const getProductById = async (
  productId: string
): Promise<Product | null> => {
  try {
    const res = await axiosInstance.get(`/api/products/${productId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
