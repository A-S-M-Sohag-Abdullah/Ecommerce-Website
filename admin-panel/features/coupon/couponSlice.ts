import { CouponState, CouponType, DiscountTarget } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CouponState = {
  code: "",
  name: "",
  type: "Fixed Discount",
  discountValue: "",
  discountOn: "All Products",
  duration: null,
  userLimit: "",
  noDuration: false,
  noUserLimit: false,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setType: (state, action: PayloadAction<CouponType>) => {
      state.type = action.payload;
    },
    setDiscountValue: (state, action: PayloadAction<number>) => {
      state.discountValue = action.payload;
    },
    setDiscountOn: (state, action: PayloadAction<DiscountTarget>) => {
      state.discountOn = action.payload;
    },

    setDuration: (state, action: PayloadAction<string | null>) => {
      state.duration = action.payload;
    },
    setUserLimit: (state, action: PayloadAction<number | "">) => {
      state.userLimit = action.payload;
    },
    setNoDuration: (state, action: PayloadAction<boolean>) => {
      state.noDuration = action.payload;
      if (action.payload) state.duration = null;
    },
    setNoUserLimit: (state, action: PayloadAction<boolean>) => {
      state.noUserLimit = action.payload;
      if (action.payload) state.userLimit = "";
    },
    resetCoupon: () => initialState,
  },
});

export const {
  setCode,
  setName,
  setType,
  setDiscountValue,
  setDiscountOn,
  setDuration,
  setUserLimit,
  setNoDuration,
  setNoUserLimit,
  resetCoupon,
} = couponSlice.actions;

export default couponSlice.reducer;
