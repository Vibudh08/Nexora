import { ZodError } from "zod";

import { createConsultationOrder } from "@/lib/services/payment.service";
import { apiError, apiSuccess } from "@/lib/utils/api-response";
import {
  getErrorMessage,
  isDatabaseConfigurationError,
  isIntegrationConfigurationError,
} from "@/lib/utils/errors";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import { consultationSchema } from "@/lib/validations/payment.schema";

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientId = forwardedFor?.split(",")[0]?.trim() || "unknown";
    if (!checkRateLimit(`payment-order:${clientId}`, 10, 10 * 60 * 1000)) {
      return apiError("Too many booking attempts. Please try again in a few minutes.", 429);
    }

    const payload = consultationSchema.parse(await request.json());
    const order = await createConsultationOrder(payload);
    return apiSuccess(order, 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Please check the booking information.", 422, error.flatten());
    }
    if (isDatabaseConfigurationError(error) || isIntegrationConfigurationError(error)) {
      return apiError("Consultation payments are not configured yet.", 503);
    }
    return apiError(getErrorMessage(error), 500);
  }
}
