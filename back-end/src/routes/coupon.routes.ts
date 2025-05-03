import express from "express";
import { createCoupon, applyCoupon } from "../controllers/coupon.controller";

const router = express.Router();

// Admin creates coupon
router.post("/", createCoupon);

// User applies coupon
router.post("/apply", applyCoupon);

export default router;
