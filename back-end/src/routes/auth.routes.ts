import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  getLoggedInUser,
  googleAuth,
  googleCallback,
  googleFailure,
  logout,
} from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/me", protect, getLoggedInUser);
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.get("/google/failure", googleFailure);
router.get("/logout", logout);
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
