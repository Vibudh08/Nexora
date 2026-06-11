import { create } from "zustand";

type PaymentStatus =
  | "idle"
  | "creating"
  | "awaiting"
  | "verifying"
  | "success"
  | "error";

type PaymentState = {
  status: PaymentStatus;
  message: string;
  setPaymentState: (status: PaymentStatus, message?: string) => void;
};

export const usePaymentStore = create<PaymentState>((set) => ({
  status: "idle",
  message: "",
  setPaymentState: (status, message = "") => set({ status, message }),
}));

