import { useContext } from "react";
import { BetsCartContext } from "../providers/BetsCartProvider";

export function useBetsCart() {
  const context = useContext(BetsCartContext);
  if (!context) {
    throw new Error("Bets Cart Context error!");
  }
  return context;
}
