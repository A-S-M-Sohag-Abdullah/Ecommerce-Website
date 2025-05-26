import { Request, Response } from "express";
import Order from "../models/order.model";
import Product from "../models/product.model"; // Assuming this exists

export const createOrder = async (req: Request, res: Response) => {
  const { orderItems, paymentMethod, phoneNumber, shippingAddress } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400).json({ message: "No order items" });
    return;
  }

  try {
    let totalPrice = 0;
    const validatedItems = [];

    for (const item of orderItems) {
      const product = await Product.findById(item.productId); // Ensure productId is in the item

      if (!product) {
        res
          .status(404)
          .json({ message: `Product not found: ${item.productId}` });
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
    res.status(500).json({ message: "Internal Server Error" });
  }
};
