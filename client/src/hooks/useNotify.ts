import { useContext } from "react";
import { NotifyContext } from "../providers/NotifyProvider";

export function useNotify() {
  const context = useContext(NotifyContext);
  if (!context) {
    throw new Error("Notify Context error!");
  }
  return context;
}
