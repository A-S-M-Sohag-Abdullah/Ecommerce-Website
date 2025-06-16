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
  couponCode: string;
};

export const placeOrder = async (order: Order) => {
  if (order.paymentMethod !== "online") {
    const res = await axiosInstance.post("/api/orders/createOrder/", order, {
      withCredentials: true, // Include cookies
    });

    return res.data;
  } else {
    console.log("Initiating online payment for order:", order);
    const res = await axiosInstance.post("/api/payment/initiate", order, {
      withCredentials: true,
    });
    window.location.replace(res.data.url);
    console.log("Payment initiation response:", res.data.url);
  }
};
