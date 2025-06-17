"use client";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { clearCart } from "@/features/cart/cartSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const PaymentSuccessPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-50">
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="text-6xl text-red-400 mb-5 border-2 border-red-500 rounded-full border-double"
      />
      <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-2 bg-red-400 text-white rounded hover:bg-red-500 transition"
        >
          Go to Home
        </Link>
        <Link
          href="/account/orders"
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition"
        >
          View Orders
        </Link>
      </div>
    </section>
  );
};

export default PaymentSuccessPage;
