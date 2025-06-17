"use client";

import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { updateCart  } from "@/features/cart/cartSlice";
import { Fragment } from "react";

function CartItems() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  console.log(cart);
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    const quantity = Math.max(1, newQuantity); // Ensure at least 1
    dispatch(updateCart({ id: itemId, quantity }));
  };

  return (
    <>
      {cart.map((item) => {
        return (
          <Fragment key={item._id}>
            <div className="flex items-center gap-4">
              
              {item?.images?.length > 0 && (
                <Image
                  src={`${item.images[0]}`}
                  alt="product picture"
                  width={40}
                  height={40}
                  className="w-10"
                />
              )}

              <div>
                <h3 className="font-medium">
                  {item.name.slice(0, 20)}
                  {item.name.length > 20 ? "..." : ""}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <p className="font-medium">{item.price}</p>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <input
                type="number"
                value={item.quantity}
                min={1}
                className="w-12 border text-center"
                onChange={(e) =>
                  handleQuantityChange(item._id, parseInt(e.target.value))
                }
              />
            </div>
            <div className="flex items-center gap-2 justify-end">
              <p className="font-semibold">
                {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </Fragment>
        );
      })}
    </>
  );
}

export default CartItems;
