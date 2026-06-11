export type ChatAction = {
  label: string;
  target: "#services" | "#consultation" | "#contact" | "#results";
};

export type ChatMessage = {
  id: string;
  role: "bot" | "user";
  content: string;
  timestamp: number;
  action?: ChatAction;
};

export type ChatReply = {
  reply: string;
  action?: ChatAction;
  source: "gemini" | "rule-based";
};

export type ChatIntent = {
  id: string;
  label: string;
  keywords: string[];
  response: string;
  action?: ChatAction;
};
