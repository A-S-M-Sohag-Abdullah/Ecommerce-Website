import express from "express";
import { adminLogin } from "../../controllers/admin/admin.auth.controller";

const router = express.Router();

router.post("/login", adminLogin);

export default router;