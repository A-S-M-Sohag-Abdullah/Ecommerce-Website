import express from "express";
import { register, login } from "../controllers/auth.controller";
import { googleLogin } from "../controllers/auth.controller";


const router = express.Router();

router.post("/google-login", googleLogin);
router.post("/register", register);
router.post("/login", login);

export default router;
