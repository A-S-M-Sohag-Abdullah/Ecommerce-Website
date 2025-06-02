import axiosInstance from "@/lib/axiosInstance";

export const addProduct = async (productData: FormData) => {
  try {
    const res = await axiosInstance.post("/api/admin/products/add", productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    console.log("Product added successfully:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
export const getProducts = async (page: number, limit: number) => {
  try {
    const res = await axiosInstance.get("/api/admin/products", {
      params: { page, limit },
      withCredentials: true,
    });
    console.log("Fetched products:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};