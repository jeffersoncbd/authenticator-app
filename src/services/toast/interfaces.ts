export type ToastType = "success" | "warning" | "danger" | "info";

export interface Toast {
  title: string;
  message?: string;
  type: ToastType;
}

export interface IdentifiedToast extends Toast {
  id: string;
  timestamp: number;
}
