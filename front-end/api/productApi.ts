import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await axiosInstance.get(`/api/products/`, {
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
