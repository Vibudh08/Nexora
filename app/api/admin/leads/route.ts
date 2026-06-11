import { getRecentLeads } from "@/lib/services/lead.service";
import { apiError, apiSuccess } from "@/lib/utils/api-response";
import { getErrorMessage, isDatabaseConfigurationError } from "@/lib/utils/errors";

export async function GET() {
  try {
    const leads = await getRecentLeads();
    return apiSuccess(JSON.parse(JSON.stringify(leads)));
  } catch (error) {
    if (isDatabaseConfigurationError(error)) {
      return apiError("Lead storage is not configured yet.", 503);
    }
    return apiError(getErrorMessage(error), 500);
  }
}

