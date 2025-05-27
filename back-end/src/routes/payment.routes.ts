import express from "express";
import {
  initiatePayment,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  paymentIPN,
  dummyPayment,
} from "../controllers/payment.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/dummy", protect, dummyPayment);

router.post("/initiate", protect, initiatePayment);
router.post("/success/:tran_id", paymentSuccess);
router.post("/fail", paymentFail);
router.post("/cancel", paymentCancel);
router.post("/ipn", paymentIPN);

export default router;
