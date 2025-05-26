"use client";
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import { it } from "node:test";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductItem = ({
  image,
  name,
  quantity,
  price,
}: {
  image: string;
  name: string;
  quantity: number;
  price: number;
}) => (
  <div className="product flex justify-between items-center w-full">
    <div className="product-pic-name flex items-center font-medium">
      <Image
        src={image}
        alt={name}
        width={50}
        height={50}
        className="me-3 w-12"
      />
      ({quantity}){name}
    </div>
    <div className="product-price font-medium">
      ${(price * quantity).toFixed(2)}
    </div>
  </div>
);

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between font-medium pb-2 border-b">
    {label} <span className="amount">{value === "0" ? "Free" : value}</span>
  </div>
);

function CheckoutCart() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      {" "}
      <div className="product-list space-y-2 w-full">
        {cart.map((item) => {
          return (
            <ProductItem
              key={item._id}
              image={item.image || ""}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
            />
          );
        })}
      </div>
      {/* Pricing */}
      <div className="pricing-area mt-4 space-y-2">
        <SummaryItem
          label="Subtotal"
          value={cart
            .reduce((sum, item) => sum + item.quantity * item.price, 0)
            .toFixed(2)}
        />
        <SummaryItem label="Shipping" value={"100"} />
        <SummaryItem
          label="Total"
          value={cart
            .reduce((sum, item) => sum + item.quantity * item.price, 100)
            .toFixed(2)}
        />
      </div>
    </div>
  );
}

export default CheckoutCart;
