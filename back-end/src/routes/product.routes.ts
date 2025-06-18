import express from "express";
import {
  getProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
  addProductReview,
} from "../controllers/product.controller";
import { protect } from "../middlewares/auth.middleware";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);
router.get("/getCategoryProducts/:category", getProductsByCategory);

router.get("/seachProducts/search", searchProducts); // ?name=searchQuery

router.post("/:id/review", protect, addProductReview);

router.post("/wishlist/add", protect, addToWishlist);
router.post("/wishlist/remove", protect, removeFromWishlist);
router.get("/wishlist", protect, getWishlist);
export default router;
