import e, { Request, Response } from "express";
import SSLCommerzPayment from "sslcommerz-lts";
import Product from "../models/product.model"; // Assuming this exists
import Order from "../models/order.model";
import dotenv from "dotenv";
import {
  SSLCOMMERZ_CANCEL_URL,
  SSLCOMMERZ_FAIL_URL,
  SSLCOMMERZ_IPN_URL,
  SSLCOMMERZ_STORE_ID,
  SSLCOMMERZ_STORE_PASSWORD,
  SSLCOMMERZ_SUCCESS_URL,
} from "../config/env";

import User from "../models/user.model";

dotenv.config();

const store_id = SSLCOMMERZ_STORE_ID!;
const store_passwd = SSLCOMMERZ_STORE_PASSWORD!;
const is_live = false; // set to true in production

export const dummyPayment = async (req: any, res: Response) => {
  console.log("Dummy payment initiated for user:", req.user._id);
  res.status(200).send("Payment successful");
};

export const initiatePayment = async (req: any, res: Response) => {
  console.log("Initiating payment for user:", req.user._id);
  const { orderItems, paymentMethod, phoneNumber, shippingAddress } = req.body;
  let totalPrice = 0;
  const validatedItems = [];

  for (const item of orderItems) {
    const product = await Product.findById(item.productId); // Ensure productId is in the item

    if (!product) {
      res.status(404).json({
        success: false,
        message: `Product not found: ${item.productId}`,
      });
      return;
    }

    const itemTotal = Math.round(product.price * item.quantity * 100) / 100;
    totalPrice = Math.round((totalPrice + itemTotal) * 100) / 100;

    validatedItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });
  }
  totalPrice += 100;

  const tran_id = "REF_" + Date.now();

  const data = {
    total_amount: totalPrice,
    currency: "BDT",
    tran_id: tran_id,
    success_url: SSLCOMMERZ_SUCCESS_URL! + `/${tran_id}`,
    fail_url: SSLCOMMERZ_FAIL_URL!,
    cancel_url: SSLCOMMERZ_CANCEL_URL!,
    ipn_url: SSLCOMMERZ_IPN_URL!,
    shipping_method: "NO",
    product_name: "Ecommerce Checkout",
    product_category: "General",
    product_profile: "general",
    cus_name: req.user.name,
    cus_email: req.user.email,
    cus_add1: JSON.stringify(shippingAddress),
    cus_phone: phoneNumber,
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
  };

  try {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);

    if (apiResponse?.GatewayPageURL) {
      const order = new Order({
        user: req.user!._id,
        orderItems: validatedItems,
        shippingAddress,
        paymentMethod,
        trasactionId: tran_id,
        paidStatus: false, // Initially set to false
        phoneNumber,
        totalPrice,
      });
      const createdOrder = await order.save();
      res.status(200).json({ url: apiResponse.GatewayPageURL });
    } else {
      res.status(400).json({ message: "Payment initiation failed" });
    }
  } catch (error) {
    console.error("SSLCommerz Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const paymentSuccess = async (req: Request, res: Response) => {
  console.log("Payment Success:", req.body);
  const { tran_id } = req.params;

  // TODO: Save payment status in DB
  const order = await Order.findOne({ trasactionId: tran_id });
  if (!order) {
    console.error("Order not found for transaction ID:", tran_id);
    res.status(404).send("Order not found");
    return;
  } else {
    order.paidStatus = true; // Update the paid status
    await order.save();
  }
  res.redirect("http://localhost:3000/paymentSuccess");
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
