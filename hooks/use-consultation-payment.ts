"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  CONSULTATION_TITLE,
} from "@/lib/constants/consultation";
import { loadRazorpayCheckout } from "@/lib/utils/load-razorpay";
import {
  consultationSchema,
  type ConsultationInput,
} from "@/lib/validations/payment.schema";
import { usePaymentStore } from "@/store/payment.store";
import type { RazorpayCheckoutResponse } from "@/types/payment";

type CreateOrderResponse = {
  keyId: string;
  orderId: string;
  amount: number | string;
  currency: string;
};

const NOTICE_DURATION_MS = 5000;

export function useConsultationPayment() {
  const { status, message, setPaymentState } = usePaymentStore();
  const form = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { fullName: "", email: "", phone: "", service: undefined },
  });

  useEffect(() => {
    if (status !== "success" && status !== "error") return;

    const noticeTimer = setTimeout(() => {
      setPaymentState("idle");
    }, NOTICE_DURATION_MS);

    return () => clearTimeout(noticeTimer);
  }, [message, setPaymentState, status]);

  const startPayment = form.handleSubmit(
    async (values) => {
      setPaymentState("creating");

      const checkoutLoaded = await loadRazorpayCheckout();
      if (!checkoutLoaded) {
        setPaymentState("error", "Razorpay Checkout could not load. Please try again.");
        return;
      }

      try {
        const orderResponse = await axios.post("/api/payments/create-order", values);
        const order = orderResponse.data.data as CreateOrderResponse;

        const checkout = new window.Razorpay({
          key: order.keyId,
          amount: order.amount,
          currency: order.currency,
          name: "Nexora Digital",
          description: CONSULTATION_TITLE,
          order_id: order.orderId,
          prefill: {
            name: values.fullName,
            email: values.email,
            contact: values.phone,
          },
          theme: { color: "#2563eb" },
          modal: {
            ondismiss: () => setPaymentState("idle"),
          },
          handler: async (response: RazorpayCheckoutResponse) => {
            setPaymentState("verifying");
            try {
              const verification = await axios.post("/api/payments/verify", response);
              setPaymentState("success", verification.data.data.message);
              form.reset();
            } catch {
              setPaymentState(
                "error",
                "Payment was received but verification failed. Please contact us.",
              );
            }
          },
        });

        checkout.on("payment.failed", (response) => {
          const orderId = response.error?.metadata?.order_id || order.orderId;
          void axios.post("/api/payments/failed", {
            razorpay_order_id: orderId,
            error_description: response.error?.description,
          });
          setPaymentState("error", "Payment failed. No booking was confirmed.");
        });
        setPaymentState("awaiting");
        checkout.open();
      } catch (error) {
        setPaymentState(
          "error",
          axios.isAxiosError(error)
            ? (error.response?.data?.error?.message ?? "Could not start payment.")
            : "Could not start payment.",
        );
      }
    },
    () => {
      setPaymentState("idle");
    },
  );

  return { form, startPayment, status, message };
}
