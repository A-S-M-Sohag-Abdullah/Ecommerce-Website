import { Request, Response } from "express";
import SSLCommerzPayment from "sslcommerz-lts";
import dotenv from "dotenv";
import { SSLCOMMERZ_CANCEL_URL, SSLCOMMERZ_FAIL_URL, SSLCOMMERZ_IPN_URL, SSLCOMMERZ_STORE_ID, SSLCOMMERZ_STORE_PASSWORD, SSLCOMMERZ_SUCCESS_URL } from "../config/env";

dotenv.config();

const store_id = SSLCOMMERZ_STORE_ID!;
const store_passwd = SSLCOMMERZ_STORE_PASSWORD!;
const is_live = false; // set to true in production

export const initiatePayment = async (req: Request, res: Response) => {
  const { amount, customer } = req.body;

  const data = {
    total_amount: amount,
    currency: "BDT",
    tran_id: "REF_" + Date.now(),
    success_url: SSLCOMMERZ_SUCCESS_URL!,
    fail_url: SSLCOMMERZ_FAIL_URL!,
    cancel_url: SSLCOMMERZ_CANCEL_URL!,
    ipn_url: SSLCOMMERZ_IPN_URL!,
    shipping_method: "NO",
    product_name: "Ecommerce Checkout",
    product_category: "General",
    product_profile: "general",
    cus_name: customer.name,
    cus_email: customer.email,
    cus_add1: customer.address,
    cus_phone: customer.phone,
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
  };

  try {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);

    if (apiResponse?.GatewayPageURL) {
      res.status(200).json({ url: apiResponse.GatewayPageURL });
    } else {
      res.status(400).json({ message: "Payment initiation failed" });
    }
  } catch (error) {
    console.error("SSLCommerz Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const paymentSuccess = (req: Request, res: Response) => {
  console.log("Payment Success:", req.body);
  // TODO: Save payment status in DB
  res.redirect("https://your-frontend.vercel.app/success");
};

export const paymentFail = (req: Request, res: Response) => {
  console.log("Payment Failed:", req.body);
  res.redirect("https://your-frontend.vercel.app/fail");
};

export const paymentCancel = (req: Request, res: Response) => {
  console.log("Payment Cancelled:", req.body);
  res.redirect("https://your-frontend.vercel.app/cancel");
};

export const paymentIPN = (req: Request, res: Response) => {
  console.log("IPN Notification:", req.body);
  res.status(200).send("IPN received");
};
