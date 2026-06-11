import { after } from "next/server";
import { ZodError } from "zod";

import { createLead } from "@/lib/services/lead.service";
import { sendLeadNotifications } from "@/lib/services/email.service";
import { apiError, apiSuccess } from "@/lib/utils/api-response";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import {
  getErrorMessage,
  isDatabaseConfigurationError,
} from "@/lib/utils/errors";
import { leadSchema } from "@/lib/validations/lead.schema";

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientId = forwardedFor?.split(",")[0]?.trim() || "unknown";
    if (!checkRateLimit(clientId)) {
      return apiError("Too many submissions. Please try again in a few minutes.", 429);
    }

    const payload = leadSchema.parse(await request.json());
    const lead = await createLead(payload);

    after(async () => {
      await sendLeadNotifications(payload).catch((error) => {
        console.error("Lead notification email failed:", error);
      });
    });

    return apiSuccess(
      {
        id: lead._id.toString(),
        message: "Thanks! Our growth team will contact you within one business day.",
      },
      201,
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Please check the submitted information.", 422, error.flatten());
    }

    if (isDatabaseConfigurationError(error)) {
      return apiError("Lead storage is not configured yet.", 503);
    }

    return apiError(getErrorMessage(error), 500);
  }
}
