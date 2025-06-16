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
router.post("/fail/:tran_id", paymentFail);
router.post("/cancel/:tran_id", paymentCancel);
router.post("/ipn", paymentIPN);

export default router;
