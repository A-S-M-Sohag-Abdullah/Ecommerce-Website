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

router.get("/:name", getCategory);

// Admin only
router.post("/", upload.single("image"), addCategory);

router.put("/:oldName", upload.single("image"), updateCategory);

router.delete("/:id", isAdmin, deleteCategory);

export default router;
