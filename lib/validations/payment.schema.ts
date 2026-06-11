import { z } from "zod";

import { SERVICE_OPTIONS } from "@/types/lead";

const phonePattern = /^[+]?[\d\s()-]{8,18}$/;

export const consultationSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(80),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().regex(phonePattern, "Please enter a valid phone number."),
  service: z.enum(SERVICE_OPTIONS, { error: "Please select a service." }),
});

export const paymentVerificationSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export const paymentFailureSchema = z.object({
  razorpay_order_id: z.string().min(1),
  error_description: z.string().max(500).optional(),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;
export type PaymentVerificationInput = z.infer<typeof paymentVerificationSchema>;
export type PaymentFailureInput = z.infer<typeof paymentFailureSchema>;
