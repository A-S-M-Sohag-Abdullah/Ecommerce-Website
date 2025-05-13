import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.routes";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middlewares/error.middleware";
import couponRoutes from "./routes/coupon.routes";
import contactRoutes from "./routes/contact.routes";
import { FRONTEND_URL } from "./config/env";

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL?.split(","), // Allow frontend to access the backend
    credentials: true, // Allow cookies and authorization headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/contact", contactRoutes);

app.use(errorHandler);

export default app;
