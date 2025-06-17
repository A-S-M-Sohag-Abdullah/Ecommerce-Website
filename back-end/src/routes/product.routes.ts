import express from "express";
import {
  getProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
  addProductReview,
} from "../controllers/product.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);
router.get("/getCategoryProducts/:category", getProductsByCategory);

router.get("/search", searchProducts); // ?name=searchQuery

router.post("/:id/review", protect, addProductReview);
export default router;
