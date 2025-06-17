import { Request, Response } from "express";
import Order from "../models/order.model";
import Product from "../models/product.model"; // Assuming this exists

export const createOrder = async (req: Request, res: Response) => {
  const { orderItems, paymentMethod, phoneNumber, shippingAddress } = req.body;

  if (paymentMethod !== "cod") {
    res.status(400).json({ success: false, message: "Invalid payment method" });
    return;
  }

  if (!orderItems || orderItems.length === 0) {
    res.status(400).json({ success: false, message: "No order items" });
    return;
  }

  try {
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
    totalPrice += 100; // Assuming a fixed shipping cost of 100
    const order = new Order({
      user: req.user!._id,
      orderItems: validatedItems,
      shippingAddress,
      paymentMethod,
      phoneNumber,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json({ success: true, createOrder: createdOrder });
  } catch (error: any) {
    console.error("Order creation error:", error.message || error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getUserOrders = async (req: any, res: Response) => {
  try {
    const userId = req.user._id; // Assumes auth middleware sets req.user

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      res.status(404).json({ message: "No orders found for this user" });
      return;
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
