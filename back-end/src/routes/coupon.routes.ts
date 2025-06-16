import express from "express";
import { applyCoupon } from "../controllers/coupon.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

// User applies coupon
router.post("/apply",protect, applyCoupon);

export default router;
