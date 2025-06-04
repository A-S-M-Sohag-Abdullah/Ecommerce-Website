import express from "express";
import { getCustomers } from "../../controllers/admin/admin.Customer.controller";


const router = express.Router();

router.get("/", getCustomers);

export default router;
