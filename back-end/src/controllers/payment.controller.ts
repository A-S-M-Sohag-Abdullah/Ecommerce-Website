import e, { Request, Response } from "express";
import SSLCommerzPayment from "sslcommerz-lts";
import Product from "../models/product.model"; // Assuming this exists
import Coupon from "../models/coupon.model";
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
import Category from "../models/category.model";

dotenv.config();

const store_id = SSLCOMMERZ_STORE_ID!;
const store_passwd = SSLCOMMERZ_STORE_PASSWORD!;
const is_live = false; // set to true in production

export const dummyPayment = async (req: any, res: Response) => {
  console.log("Dummy payment initiated for user:", req.user._id);
  res.status(200).send("Payment successful");
};

/* export const initiatePayment = async (req: any, res: Response) => {
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
}; */

export const initiatePayment = async (req: any, res: Response) => {
  console.log("Initiating payment for user:", req.user._id);
  const {
    orderItems,
    paymentMethod,
    phoneNumber,
    shippingAddress,
    couponCode,
  } = req.body;
  let totalPrice = 0;
  const validatedItems = [];

  for (const item of orderItems) {
    const product = await Product.findById(item.productId);
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
      category: product.category,
    });
  }
  let coupon: typeof Coupon.prototype | null = null;
  // Apply coupon if provided
  if (couponCode) {
    coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
      res.status(400).json({ message: "Invalid coupon" });
      return;
    }

    if (coupon.duration && new Date(coupon.duration) < new Date()) {
      res.status(400).json({ message: "Coupon expired" });
      return;
    }

    if (coupon.userLimit && coupon.usedBy.length >= coupon.userLimit) {
      res.status(400).json({ message: "Coupon usage limit reached" });
      return;
    }

    if (coupon.usedBy.includes(req.user._id)) {
      res.status(400).json({ message: "You have already used this coupon" });
      return;
    }

    let eligibleAmount = totalPrice;
    let eligibleItemsCount = validatedItems.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    );
    /* console.log(validatedItems);
    console.log("line 189" + eligibleItemsCount); */

    if (coupon.discountOn !== "All Products") {
      const categoryItems = await Promise.all(
        validatedItems.map(async (item: any) => {
          console.log(item?.category, coupon.discountOn);
          return item?.category === coupon.discountOn ? item : null;
        })
      );
      console.log(categoryItems);
      const filteredItems = categoryItems.filter(Boolean);

      eligibleAmount = filteredItems.reduce(
        (sum, item: any) => sum + item.price * item.quantity,
        0
      );
      eligibleItemsCount = filteredItems.reduce(
        (sum, item: any) => sum + item.quantity,
        0
      );
    }

    let discountAmount = 0;
    if (coupon.type === "Percentage Discount") {
      discountAmount = (eligibleAmount * coupon.discountValue) / 100;
      totalPrice = Math.max(0, totalPrice - coupon.discountValue);
    } else if (coupon.type === "Fixed Discount" && eligibleItemsCount > 0) {
      discountAmount = eligibleItemsCount * coupon.discountValue;
      totalPrice = Math.max(0, totalPrice - discountAmount);
    } else if (coupon.type === "Free Shipping") {
      discountAmount = 100;
      totalPrice = Math.max(0, totalPrice - discountAmount);
    }

    // Optionally: mark user as used the coupon now or on payment success
  }

  // Add shipping charge
  totalPrice += 100;

  console.log("Line 204 :" + totalPrice);

  const tran_id = "REF_" + Date.now();

  const data = {
    total_amount: totalPrice,
    currency: "BDT",
    tran_id,
    success_url: SSLCOMMERZ_SUCCESS_URL! + `/${tran_id}`,
    fail_url: SSLCOMMERZ_FAIL_URL! + `/${tran_id}`,
    cancel_url: SSLCOMMERZ_CANCEL_URL! + `/${tran_id}`,
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
        user: req.user._id,
        orderItems: validatedItems,
        shippingAddress,
        paymentMethod,
        trasactionId: tran_id,
        paidStatus: false,
        phoneNumber,
        totalPrice,
        coupon: coupon,
      });
      await order.save();
      coupon.usedBy.push(req.user._id);
      await coupon.save();
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

export const paymentFail = async (req: Request, res: Response) => {
  const { tran_id } = req.params;

  try {
    const order = await Order.findOne({ trasactionId: tran_id });
    if (order) {
      const coupon = await Coupon.findOne({ _id: order.coupon });

      if (coupon) {
        await Coupon.updateOne(
          { _id: coupon._id },
          { $pull: { usedBy: order.user } }
        );
      }
      await Order.deleteOne({ _id: order._id });
    }
    console.log("Payment Failed:", req.body);
    res.redirect("http://localhost:3000/orderfail");
  } catch (error) {}
};

export const paymentCancel = async (req: Request, res: Response) => {
  const { tran_id } = req.params;

  try {
    const order = await Order.findOne({ trasactionId: tran_id });
    if (order) {
      const coupon = await Coupon.findOne({ _id: order.coupon });

      if (coupon) {
        await Coupon.updateOne(
          { _id: coupon._id },
          { $pull: { usedBy: order.user } }
        );
      }
      await Order.deleteOne({ _id: order._id });
    }
    console.log("Payment Failed:", req.body);
    res.redirect("http://localhost:3000/ordercancel");
  } catch (error) {}
};

export const paymentIPN = (req: Request, res: Response) => {
  console.log("IPN Notification:", req.body);
  res.status(200).send("IPN received");
};
