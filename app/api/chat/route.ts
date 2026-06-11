import { ZodError } from "zod";

import { getChatReply } from "@/lib/services/chat.service";
import { apiError, apiSuccess } from "@/lib/utils/api-response";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import { chatRequestSchema } from "@/lib/validations/chat.schema";

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientId = forwardedFor?.split(",")[0]?.trim() || "unknown";

    if (!checkRateLimit(`chat:${clientId}`, 20, 10 * 60 * 1000)) {
      return apiError("Too many chat messages. Please try again in a few minutes.", 429);
    }

    const payload = chatRequestSchema.parse(await request.json());
    return apiSuccess(await getChatReply(payload));
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Please enter a valid chat message.", 422, error.flatten());
    }

    return apiError("The growth assistant could not respond right now.", 500);
  }
}
