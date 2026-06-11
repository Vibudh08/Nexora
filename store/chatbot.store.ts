import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { ChatAction, ChatMessage } from "@/types/chatbot";

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "bot",
  content:
    "Hi, I am Nexora's Growth Assistant. Tell me what you want to improve, or choose a common question below.",
  timestamp: 0,
};

type ChatbotState = {
  isOpen: boolean;
  messages: ChatMessage[];
  setOpen: (isOpen: boolean) => void;
  addMessage: (
    role: ChatMessage["role"],
    content: string,
    action?: ChatAction,
  ) => void;
  resetChat: () => void;
};

export const useChatbotStore = create<ChatbotState>()(
  persist(
    (set) => ({
      isOpen: false,
      messages: [welcomeMessage],
      setOpen: (isOpen) => set({ isOpen }),
      addMessage: (role, content, action) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
              role,
              content,
              timestamp: Date.now(),
              action,
            },
          ],
        })),
      resetChat: () => set({ messages: [welcomeMessage] }),
    }),
    {
      name: "nexora-chat-session",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ messages: state.messages }),
    },
  ),
);

