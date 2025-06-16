import express from "express";
import {
  addCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
} from "../../controllers/admin/admin.coupon.controller";

const router = express.Router();

router.get("/getallcoupons", getAllCoupons);
router.post("/add", addCoupon);
router.get("/:id", getCoupon);
router.put("/update/:id", updateCoupon);

export default router;
