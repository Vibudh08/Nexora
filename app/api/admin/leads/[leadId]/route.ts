import { ZodError } from "zod";

import { updateLeadStatus } from "@/lib/services/lead.service";
import { apiError, apiSuccess } from "@/lib/utils/api-response";
import { getErrorMessage, isDatabaseConfigurationError } from "@/lib/utils/errors";
import {
  leadStatusParamsSchema,
  leadStatusSchema,
} from "@/lib/validations/lead.schema";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ leadId: string }> },
) {
  try {
    const { leadId } = leadStatusParamsSchema.parse(await params);
    const input = leadStatusSchema.parse(await request.json());
    const lead = await updateLeadStatus(leadId, input);

    if (!lead) {
      return apiError("Lead not found.", 404);
    }

    return apiSuccess(JSON.parse(JSON.stringify(lead)));
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Invalid lead status update.", 422, error.flatten());
    }
    if (isDatabaseConfigurationError(error)) {
      return apiError("Lead storage is not configured yet.", 503);
    }
    return apiError(getErrorMessage(error), 500);
  }
}
