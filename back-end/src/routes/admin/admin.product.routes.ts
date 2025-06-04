import express from "express";
import {
  addProduct,
  getTopProducts,
} from "../../controllers/admin/admin.product.controller";
import { upload } from "../../middlewares/upload.middlware";
import { isAdmin } from "../../middlewares/isAdmin.middleware";

const router = express.Router();

// 'image' is the name of the field in the form-data
router.get("/", (req, res) => {
  res.status(200).json({ message: "Admin Product Management" });
});

router.post("/add", upload.array("images", 5), addProduct);

router.get("/topProducts", getTopProducts);

export default router;
