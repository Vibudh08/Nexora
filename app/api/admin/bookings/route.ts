import { getRecentConsultationBookings } from "@/lib/services/payment.service";
import { apiError, apiSuccess } from "@/lib/utils/api-response";
import { getErrorMessage, isDatabaseConfigurationError } from "@/lib/utils/errors";

export async function GET() {
  try {
    const bookings = await getRecentConsultationBookings();
    return apiSuccess(JSON.parse(JSON.stringify(bookings)));
  } catch (error) {
    if (isDatabaseConfigurationError(error)) {
      return apiError("Payment storage is not configured yet.", 503);
    }
    return apiError(getErrorMessage(error), 500);
  }
}

