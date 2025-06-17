import express from "express";
import { getProfile } from "../controllers/user.controller";
import { protect } from "../middlewares/auth.middleware";
import { updateProfile } from "../controllers/user.controller";
import { upload } from "../middlewares/upload.middlware";
const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, upload.single("avatar"), updateProfile);

export default router;
