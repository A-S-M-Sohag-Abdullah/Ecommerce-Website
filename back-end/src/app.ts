import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middlewares/error.middleware';
import couponRoutes from "./routes/coupon.routes";
import contactRoutes from "./routes/contact.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/contact", contactRoutes);

app.use(errorHandler);

export default app;
