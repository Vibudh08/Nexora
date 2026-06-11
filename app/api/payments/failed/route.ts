import { ZodError } from "zod";

import { markConsultationPaymentFailed } from "@/lib/services/payment.service";
import { apiError, apiSuccess } from "@/lib/utils/api-response";
import { getErrorMessage, isDatabaseConfigurationError } from "@/lib/utils/errors";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import { paymentFailureSchema } from "@/lib/validations/payment.schema";

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientId = forwardedFor?.split(",")[0]?.trim() || "unknown";
    if (!checkRateLimit(`payment-failed:${clientId}`, 20, 10 * 60 * 1000)) {
      return apiError("Too many payment updates. Please try again in a few minutes.", 429);
    }

    const payload = paymentFailureSchema.parse(await request.json());
    await markConsultationPaymentFailed(payload);
    return apiSuccess({ recorded: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Invalid payment failure data.", 422, error.flatten());
    }
    if (isDatabaseConfigurationError(error)) {
      return apiError("Payment storage is not configured yet.", 503);
    }
    return apiError(getErrorMessage(error), 500);
  }
}
