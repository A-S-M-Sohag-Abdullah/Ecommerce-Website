import { Request, Response } from "express";
import { Coupon } from "../models/coupon.model";


// Admin creates a coupon
export const createCoupon = async (req: Request, res: Response) => {
  try {
    const { code, discount, expiresAt, usageLimit } = req.body;

    const existing = await Coupon.findOne({ code });
    if (existing) {
      res.status(400).json({ message: "Coupon already exists" });
      return;
    }

    const coupon = await Coupon.create({
      code,
      discount,
      expiresAt,
      usageLimit,
    });
    res.status(201).json({ coupon });
  } catch (err) {
    res.status(500).json({ message: "Error creating coupon", error: err });
  }
};

// User applies coupon at checkout
export const applyCoupon = async (req: Request, res: Response) => {
  try {
    const { code, userId } = req.body;

    const coupon = await Coupon.findOne({ code });
    if (!coupon) {
      res.status(404).json({ message: "Invalid coupon" });
      return;
    }

    if (coupon.expiresAt < new Date()) {
      res.status(400).json({ message: "Coupon expired" });
      return;
    }

    if (coupon.usedBy.includes(userId)) {
      res.status(400).json({ message: "Coupon already used" });
      return;
    }

    if (coupon.usageLimit > 0 && coupon.usedBy.length >= coupon.usageLimit) {
      res.status(400).json({ message: "Coupon usage limit reached" });
      return;
    }

    // Mark as used (optional)
    coupon.usedBy.push(userId);
    await coupon.save();

    res
      .status(200)
      .json({ discount: coupon.discount, message: "Coupon applied!" });
  } catch (err) {
    res.status(500).json({ message: "Error applying coupon", error: err });
  }
};
