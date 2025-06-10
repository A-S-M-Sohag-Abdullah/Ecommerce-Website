import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../../controllers/admin/admin.category.controller";
import { isAdmin } from "../../middlewares/isAdmin.middleware";
import { upload } from "../../middlewares/upload.middlware";

const router = express.Router();

// Public
router.get("/", getCategories);

router.get("/:id", getCategory);

// Admin only
router.post("/", upload.single("image"), addCategory);
router.put("/:id", isAdmin, updateCategory);
router.delete("/:id", isAdmin, deleteCategory);

export default router;
