import express from "express";
import { contactForm } from "../controllers/contact.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", protect, contactForm);

export default router;
