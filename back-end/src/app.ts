import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.routes";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middlewares/error.middleware";
import couponRoutes from "./routes/coupon.routes";
import contactRoutes from "./routes/contact.routes";
import paymentRoutes from "./routes/payment.routes";
import { FRONTEND_URL } from "./config/env";
import adminAuthRoutes from "./routes/admin/admin.auth.routes";
import adminProductRoutes from "./routes/admin/admin.product.routes";
import "./config/passport";
import cookieParser from "cookie-parser";
import adminOrderRoutes from "./routes/admin/admin.order.routes";
import adminCustomerRoutes from "./routes/admin/admin.customer.routes";
import adminCategoryRoutes from "./routes/admin/admin.category.routes";
import adminCouponRoutes from "./routes/admin/admin.coupon.routes";
import userCategoryRoutes from "./routes/category.routes";

import fs from "fs";
import path from "path";

// Create public/uploads directory if it doesn't exist
const uploadPath = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URL?.split(",") || [],
    credentials: true, // ✅ Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
/* app.use(cors()); */
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

//User Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/category/", userCategoryRoutes);

//Admin Routes
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/category", adminCategoryRoutes);
app.use("/api/admin/customers", adminCustomerRoutes);
app.use("/api/admin/coupon", adminCouponRoutes);

app.use(errorHandler);

export default app;
