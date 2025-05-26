import axiosInstance from "@/lib/axiosInstance";

type Order = {
  orderItems: {
    productId: string;
    quantity: number;
  }[];
  paymentMethod: string;
  phoneNumber?: string;
  shippingAddress: {
    companyName: string;
    streetAddress: string;
    apartment: string;
    city: string;
  };
};

export const placeOrder = async (order: Order) => {
  const res = await axiosInstance.post("/api/orders/createOrder/", order, {
    withCredentials: true, // Include cookies
  });
  
  return res.data;
};
