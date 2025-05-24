import { BetsCartListType } from "./betsCartType";

export interface CouponType {
  id: number;
  coupon: BetsCartListType[];
  maxEarning: number;
  totalOdd: number;
  foldAmount: number;
  date: Date;
}
