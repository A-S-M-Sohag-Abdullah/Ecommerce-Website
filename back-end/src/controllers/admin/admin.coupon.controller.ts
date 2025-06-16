import { Request, Response } from "express";
import Coupon from "../../models/coupon.model";

// Add Coupon
export const addCoupon = async (req: Request, res: Response) => {
  try {
    const { code, name, type, discountValue, duration, userLimit, discountOn } =
      req.body;

    const exists = await Coupon.findOne({ code });
    if (exists) {
      res.status(400).json({ message: "Coupon code already exists" });
      return;
    }

    const coupon = new Coupon({
      code,
      name,
      type,
      discountValue,
      duration,
      userLimit,
      discountOn,
    });

    const saved = await coupon.save();
    res.status(201).json({ success: true, coupon: saved });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Update Coupon
export const updateCoupon = async (req: Request, res: Response) => {
  try {
    const { code, name, type, discountValue, duration, userLimit, discountOn } =
      req.body;

    const updated = await Coupon.findByIdAndUpdate(
      req.params.id,
      {
        code,
        name,
        type,
        discountValue,
        duration,
        userLimit,
        discountOn,
      },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Coupon not found" });
      return;
    }

    res.json({ success: true, updatedCoupon: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Delete Coupon
export const deleteCoupon = async (req: Request, res: Response) => {
  try {
    const deleted = await Coupon.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Coupon not found" });
      return;
    }
    res.json({ message: "Coupon deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get All Coupons
export const getAllCoupons = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const coupons = await Coupon.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Coupon.countDocuments();

    res.json({
      Coupons: coupons,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total: total,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get Single Coupon
export const getCoupon = async (req: Request, res: Response) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      res.status(404).json({ message: "Coupon not found" });
      return;
    }
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
