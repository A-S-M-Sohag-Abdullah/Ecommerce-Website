import { Request, Response } from "express";
import Coupon from "../models/coupon.model";
import Product from "../models/product.model";

export const applyCoupon = async (req: Request, res: Response) => {
  const { code, cartItems, subtotal } = req.body;
  const userId = req.user?._id;

  if (!code || !cartItems || !subtotal || !userId) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const coupon = await Coupon.findOne({ code });
  if (!coupon) {
    res.status(404).json({ message: "Coupon not found" });
    return;
  }

  if (coupon.duration && new Date() > new Date(coupon.duration)) {
    res.status(400).json({ message: "Coupon expired" });
    return;
  }

  if (
    coupon.userLimit &&
    coupon.usedBy &&
    coupon.usedBy.length >= coupon.userLimit
  ) {
    res.status(400).json({ message: "Coupon usage limit reached" });
    return;
  }

  // Ensure userId is a string or ObjectId for comparison
  const userIdStr =
    typeof userId === "object" && userId.toString
      ? userId.toString()
      : String(userId);
  const usedByIds = coupon.usedBy.map((id: any) => id.toString());
  if (usedByIds.includes(userIdStr)) {
    res.status(400).json({ message: "You have already used this coupon" });
    return;
  }

  // Apply discount only on allowed items
  let eligibleAmount = subtotal;
  let eligibleItemsCount = cartItems.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );

  //console.log(cartItems);

  if (coupon.discountOn !== "All Products") {
    const categoryItems = await Promise.all(
      cartItems.map(async (item: any) => {
        const product = await Product.findById(item._id);

        console.log(product?.category, coupon.discountOn);
        return product?.category === coupon.discountOn ? item : null;
      })
    );

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

  // Calculate discount
  let discountAmount = 0;
  if (coupon.type === "Percentage Discount") {
    discountAmount = (eligibleAmount * coupon.discountValue) / 100;
  } else if (coupon.type === "Fixed Discount" && eligibleItemsCount > 0) {
    discountAmount = eligibleItemsCount * coupon.discountValue;
  } else if (coupon.type === "Free Shipping") {
    discountAmount = 100;
  }

  const totalAfterDiscount = subtotal - discountAmount;

  res.json({
    valid: true,
    discountAmount,
    totalAfterDiscount,
    message: "Coupon applied successfully",
  });
};
