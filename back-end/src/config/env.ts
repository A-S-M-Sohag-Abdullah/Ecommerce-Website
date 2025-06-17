import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const ENV = process.env.ENV || "DEV";
export const MONGO_URI = process.env.MONGO_URI as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
export const SMTP_EMAIL = process.env.SMTP_EMAIL;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const SSLCOMMERZ_STORE_ID = process.env.SSLCOMMERZ_STORE_ID;
export const SSLCOMMERZ_STORE_PASSWORD = process.env.SSLCOMMERZ_STORE_PASSWORD;
export const SSLCOMMERZ_SUCCESS_URL = process.env.SSLCOMMERZ_SUCCESS_URL;
export const SSLCOMMERZ_FAIL_URL = process.env.SSLCOMMERZ_FAIL_URL;
export const SSLCOMMERZ_CANCEL_URL = process.env.SSLCOMMERZ_CANCEL_URL;
export const SSLCOMMERZ_IPN_URL = process.env.SSLCOMMERZ_IPN_URL;
