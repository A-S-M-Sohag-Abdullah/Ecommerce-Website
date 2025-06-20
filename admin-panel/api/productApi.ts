import axiosInstance from "@/lib/axiosInstance";

export const addProduct = async (productData: FormData) => {
  try {
    const res = await axiosInstance.post(
      "/api/admin/products/add",
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    console.log("Product added successfully:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
export const getProducts = async (page: number, limit: number = 10) => {
  try {
    const res = await axiosInstance.get("/api/products/", {
      params: { page, limit },
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getTopProducts = async (page: number = 1, limit: number = 5) => {
  try {
    const res = await axiosInstance.get("/api/admin/products/topProducts", {
      params: { page, limit },
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching top products:", error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/api/admin/products/${id}`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

export const updateProductById = async (id: string, productData: FormData) => {
  try {
    const res = await axiosInstance.put(
      `/api/admin/products/update/${id}`,
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
