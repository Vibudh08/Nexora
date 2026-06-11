import { getServerEnv } from "@/lib/env/server-env";
import type { ChatRequestInput } from "@/lib/validations/chat.schema";

const GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";

const SYSTEM_INSTRUCTION = `
You are Nexora's Growth Assistant for a premium digital growth agency.

Nexora helps businesses with SEO and content, paid advertising, web design,
social media, growth strategy, and practical workflow automation.

Business facts:
- The free marketing audit is submitted through the website contact form.
- The 60-minute Growth Strategy Session costs INR 499 and includes a funnel
  review, three high-impact opportunities, and a prioritized 30-day action plan.
- A strategist responds to enquiries within one business day.

Answer only questions related to Nexora, digital marketing, websites, growth,
automation, project fit, timelines, pricing, and booking. Do not invent client
results, guarantees, discounts, team credentials, or services. If information
is uncertain, say so and recommend contacting the team. Keep answers practical,
friendly, and under 90 words. Do not use markdown headings.
`.trim();

type GeminiGenerateContentResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

export async function generateGeminiReply(input: ChatRequestInput) {
  const { GEMINI_API_KEY, GEMINI_MODEL = "gemini-3.5-flash" } = getServerEnv();

  if (!GEMINI_API_KEY) {
    throw new Error("Gemini integration is not configured.");
  }

  const contents = [
    ...input.history.map((item) => ({
      role: item.role === "bot" ? "model" : "user",
      parts: [{ text: item.content }],
    })),
    {
      role: "user",
      parts: [{ text: input.message }],
    },
  ];

  const response = await fetch(
    `${GEMINI_API_BASE_URL}/${encodeURIComponent(GEMINI_MODEL)}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        contents,
        generationConfig: {
          maxOutputTokens: 220,
          thinkingConfig: {
            thinkingLevel: "low",
          },
        },
      }),
      signal: AbortSignal.timeout(12_000),
    },
  );

  if (!response.ok) {
    throw new Error("Gemini API request failed.");
  }

  const data = (await response.json()) as GeminiGenerateContentResponse;
  const reply = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text)
    .filter(Boolean)
    .join(" ")
    .trim();

  if (!reply) {
    throw new Error("Gemini returned an empty response.");
  }

  return reply;
}
