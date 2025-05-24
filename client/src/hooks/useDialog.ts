import { useContext } from "react";
import { DialogContext } from "../providers/DialogProvider";

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog Context error!");
  }
  return context;
}
