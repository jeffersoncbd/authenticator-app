import { useContext } from "react";
import { ToastContext } from "./Context";

export function useToast() {
  const toasts = useContext(ToastContext);
  return toasts.addToast;
}
