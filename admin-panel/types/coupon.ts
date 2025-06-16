export type CouponType =
  | "Fixed Discount"
  | "Percentage Discount"
  | "Free Shipping";
export type DiscountTarget = "All Products" | string;

export interface CouponState {
  code: string;
  name: string;
  type: CouponType;
  discountValue: number | "";
  discountOn: DiscountTarget;
  duration: string | null; // ISO date string
  userLimit: number | "";
  noDuration?: boolean;
  noUserLimit?: boolean;
}
