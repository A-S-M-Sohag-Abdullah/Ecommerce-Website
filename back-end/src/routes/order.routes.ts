import express from 'express';
import { createOrder, getUserOrders } from '../controllers/order.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/createOrder', protect, createOrder);

router.get("/my-orders", protect, getUserOrders);

export default router;
