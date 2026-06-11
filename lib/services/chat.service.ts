import { findChatbotIntent } from "@/lib/chatbot/chatbot-engine";
import { generateGeminiReply } from "@/lib/integrations/gemini";
import type { ChatRequestInput } from "@/lib/validations/chat.schema";

export async function getChatReply(input: ChatRequestInput) {
  const fallbackIntent = findChatbotIntent(input.message);

  try {
    return {
      reply: await generateGeminiReply(input),
      action: fallbackIntent.action,
      source: "gemini" as const,
    };
  } catch {
    return {
      reply: fallbackIntent.response,
      action: fallbackIntent.action,
      source: "rule-based" as const,
    };
  }
}
