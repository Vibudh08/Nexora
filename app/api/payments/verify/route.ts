import { after } from "next/server";
import { ZodError } from "zod";

import { CONSULTATION_PRICE_INR } from "@/lib/constants/consultation";
import { sendPaymentConfirmation } from "@/lib/services/email.service";
import { verifyConsultationPayment } from "@/lib/services/payment.service";
import { apiError, apiSuccess } from "@/lib/utils/api-response";
import {
  getErrorMessage,
  isDatabaseConfigurationError,
  isIntegrationConfigurationError,
} from "@/lib/utils/errors";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import {
  paymentVerificationSchema,
  type ConsultationInput,
} from "@/lib/validations/payment.schema";

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientId = forwardedFor?.split(",")[0]?.trim() || "unknown";
    if (!checkRateLimit(`payment-verify:${clientId}`, 20, 10 * 60 * 1000)) {
      return apiError("Too many verification attempts. Please try again in a few minutes.", 429);
    }

    const payload = paymentVerificationSchema.parse(await request.json());
    const booking = await verifyConsultationPayment(payload);

    after(async () => {
      await sendPaymentConfirmation(
        {
          fullName: booking.fullName,
          email: booking.email,
          phone: booking.phone,
          service: booking.service as ConsultationInput["service"],
        },
        payload.razorpay_payment_id,
        CONSULTATION_PRICE_INR,
      ).catch((error) => {
        console.error("Payment confirmation email failed:", error);
      });
    });

    return apiSuccess({
      bookingId: booking._id.toString(),
      message: "Payment verified. Your strategy session is confirmed.",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Invalid payment verification data.", 422, error.flatten());
    }
    if (isDatabaseConfigurationError(error) || isIntegrationConfigurationError(error)) {
      return apiError("Consultation payments are not configured yet.", 503);
    }
    if (error instanceof Error && error.message === "Payment signature verification failed.") {
      return apiError(error.message, 400);
    }
    return apiError(getErrorMessage(error), 500);
  }
}
