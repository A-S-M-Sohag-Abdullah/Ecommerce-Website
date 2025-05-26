import express from 'express';
import { createOrder } from '../controllers/order.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/createOrder', protect, createOrder);

export default router;
