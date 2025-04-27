import { Request, Response } from 'express';
import Order from '../models/order.model';

export const createOrder = async (req: Request, res: Response) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  }

  const order = new Order({
    user: req.user!._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};
