import { z } from "zod";

const chatHistoryItemSchema = z.object({
  role: z.enum(["user", "bot"]),
  content: z.string().trim().min(1).max(500),
});

export const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(500),
  history: z.array(chatHistoryItemSchema).max(8).default([]),
});

export type ChatRequestInput = z.infer<typeof chatRequestSchema>;
