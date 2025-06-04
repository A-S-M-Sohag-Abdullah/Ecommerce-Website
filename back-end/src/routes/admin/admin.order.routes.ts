import express from "express";
import { getLast7DaysSales, getOrders } from "../../controllers/admin/admin.order.controller";

const router = express.Router();

router.get("/", getOrders);
router.get("/last7days", getLast7DaysSales);

export default router;
