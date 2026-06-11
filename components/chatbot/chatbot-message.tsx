"use client";

import { ArrowRight, Bot } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils/cn";
import type { ChatMessage as ChatMessageType } from "@/types/chatbot";

export function ChatbotMessage({ message, onAction }: { message: ChatMessageType; onAction: (target: string) => void }) {
  const isBot = message.role === "bot";

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn("flex gap-2.5", isBot ? "justify-start" : "justify-end")}>
      {isBot && <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-white"><Bot size={13} /></span>}
      <div className={cn("max-w-[82%]", isBot ? "" : "text-right")}>
        <p className={cn("inline-block rounded-2xl border px-3.5 py-2.5 text-left text-xs leading-5", isBot ? "rounded-tl-sm border-white/10 bg-white/[.045] text-slate-300" : "rounded-tr-sm border-blue-400/20 bg-blue-500/20 text-blue-50")}>{message.content}</p>
        {message.action && (
          <button type="button" onClick={() => onAction(message.action!.target)} className="mt-2 flex items-center gap-1.5 rounded-lg border border-cyan-300/15 bg-cyan-300/[.06] px-3 py-2 text-[10px] font-bold text-cyan-200 transition hover:bg-cyan-300/10">
            {message.action.label} <ArrowRight size={12} />
          </button>
        )}
      </div>
    </motion.div>
  );
}

