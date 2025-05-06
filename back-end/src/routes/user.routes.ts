import express from 'express';
import { getProfile } from '../controllers/user.controller';
import { protect } from '../middlewares/auth.middleware';
import { updateProfile } from "../controllers/user.controller";
const router = express.Router();

router.get('/profile', protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;
