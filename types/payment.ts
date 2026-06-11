import type { ServiceOption } from "@/types/lead";

export type ConsultationBooking = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  service: ServiceOption;
  amount: number;
  currency: string;
  status: "created" | "paid" | "failed";
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  createdAt: string;
};

export type RazorpayCheckoutResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

