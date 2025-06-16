"use client";

import { getCouponByID } from "@/api/couponApi";
import {
  setCode,
  setDiscountOn,
  setDiscountValue,
  setDuration,
  setName,
  setType,
  setUserLimit,
} from "@/features/coupon/couponSlice";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function EditCoupoWrapper({ children }: { children: React.ReactNode }) {
  const { couponId } = useParams() || "";
  const dispatch = useDispatch();

  useEffect(() => {
    const previousCouponState = async () => {
      if (typeof couponId === "string") {
        const data = await getCouponByID(couponId);
        if (data) {
          dispatch(setName(data.name));
          dispatch(setCode(data.code));
          dispatch(setDiscountOn(data.discountOn));
          dispatch(
            setDuration(new Date(data.duration).toISOString().split("T")[0])
          );
          dispatch(setUserLimit(data.userLimit));
          dispatch(setType(data.type));
          dispatch(setDiscountValue(data.discountValue));
        }
      }
    };

    previousCouponState();
  }, [couponId]);

  return <>{children}</>;
}

export default EditCoupoWrapper;
