import {
  CONSULTATION_AMOUNT_PAISE,
  CONSULTATION_CURRENCY,
} from "@/lib/constants/consultation";
import { connectToDatabase } from "@/lib/db/mongoose";
import {
  getRazorpayClient,
  getRazorpayKeyId,
  getRazorpayKeySecret,
} from "@/lib/integrations/razorpay";
import { verifyRazorpaySignature } from "@/lib/utils/security";
import type {
  ConsultationInput,
  PaymentFailureInput,
  PaymentVerificationInput,
} from "@/lib/validations/payment.schema";
import { ConsultationBookingModel } from "@/models/consultation-booking.model";

export async function createConsultationOrder(input: ConsultationInput) {
  const razorpay = getRazorpayClient();
  const order = await razorpay.orders.create({
    amount: CONSULTATION_AMOUNT_PAISE,
    currency: CONSULTATION_CURRENCY,
    receipt: `consult_${Date.now()}`,
    notes: {
      customer: input.fullName,
      service: input.service,
    },
  });

  await connectToDatabase();
  await ConsultationBookingModel.create({
    ...input,
    amount: CONSULTATION_AMOUNT_PAISE,
    currency: CONSULTATION_CURRENCY,
    razorpayOrderId: order.id,
    status: "created",
  });

  return {
    keyId: getRazorpayKeyId(),
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
  };
}

export async function verifyConsultationPayment(
  input: PaymentVerificationInput,
) {
  const valid = verifyRazorpaySignature(
    input.razorpay_order_id,
    input.razorpay_payment_id,
    input.razorpay_signature,
    getRazorpayKeySecret(),
  );

  if (!valid) {
    throw new Error("Payment signature verification failed.");
  }

  await connectToDatabase();
  const booking = await ConsultationBookingModel.findOneAndUpdate(
    { razorpayOrderId: input.razorpay_order_id },
    {
      $set: {
        razorpayPaymentId: input.razorpay_payment_id,
        status: "paid",
      },
    },
    { new: true },
  ).lean();

  if (!booking) {
    throw new Error("Consultation booking was not found.");
  }

  return booking;
}

export async function markConsultationPaymentFailed(input: PaymentFailureInput) {
  await connectToDatabase();
  return ConsultationBookingModel.findOneAndUpdate(
    { razorpayOrderId: input.razorpay_order_id, status: "created" },
    { $set: { status: "failed" } },
    { new: true },
  ).lean();
}

export async function getRecentConsultationBookings(limit = 100) {
  await connectToDatabase();
  return ConsultationBookingModel.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean()
    .exec();
}
