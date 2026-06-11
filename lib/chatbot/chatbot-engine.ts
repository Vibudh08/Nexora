import { CHAT_INTENTS } from "@/lib/chatbot/intents";
import type { ChatIntent } from "@/types/chatbot";

const FALLBACK_INTENT: ChatIntent = {
  id: "fallback",
  label: "Contact the team",
  keywords: [],
  response:
    "I do not have a reliable predefined answer for that yet. Share the details with our team and a strategist will respond within one business day.",
  action: { label: "Ask the team", target: "#contact" },
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

export function findChatbotIntent(input: string) {
  const normalized = normalize(input);

  const matches = CHAT_INTENTS.map((intent) => ({
    intent,
    score: intent.keywords.reduce(
      (score, keyword) => score + (normalized.includes(normalize(keyword)) ? 1 : 0),
      0,
    ),
  })).sort((a, b) => b.score - a.score);

  return matches[0]?.score > 0 ? matches[0].intent : FALLBACK_INTENT;
}

