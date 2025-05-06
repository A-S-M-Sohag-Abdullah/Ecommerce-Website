import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";
import { googleLogin } from "../controllers/auth.controller";

const router = express.Router();

router.post("/google-login", googleLogin);
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
