import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface Coupon {
  code: string;
  discountValue: number;
}

interface CouponState {
  appliedCoupon: Coupon | null;
  error: string | null;
}

const initialState: CouponState = {
  appliedCoupon: null,
  error: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    applyCoupon(state, action: PayloadAction<Coupon>) {
      state.appliedCoupon = action.payload;
      state.error = null;
    },
    removeCoupon(state) {
      state.appliedCoupon = null;
      state.error = null;
    },
    setCouponError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearCouponError(state) {
      state.error = null;
    },
  },
});

export const { applyCoupon, removeCoupon, setCouponError, clearCouponError } =
  couponSlice.actions;

export default couponSlice.reducer;
