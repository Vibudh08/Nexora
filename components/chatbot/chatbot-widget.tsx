"use client";

import axios from "axios";
import { Bot, MessageCircle, RotateCcw, Send, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

import { ChatbotMessage } from "@/components/chatbot/chatbot-message";
import { findChatbotIntent } from "@/lib/chatbot/chatbot-engine";
import { QUICK_REPLIES } from "@/lib/chatbot/intents";
import { useChatbotStore } from "@/store/chatbot.store";
import type { ChatReply } from "@/types/chatbot";

export function ChatbotWidget() {
  const { isOpen, messages, setOpen, addMessage, resetChat } = useChatbotStore();
  const [input, setInput] = useState("");
  const [isTyping, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  async function respond(value: string, mode: "ai" | "guided" = "ai") {
    const trimmed = value.trim();
    if (!trimmed || isTyping) return;

    const history = messages
      .filter((message) => message.id !== "welcome")
      .slice(-8)
      .map(({ role, content }) => ({ role, content }));

    addMessage("user", trimmed);
    setInput("");
    setTyping(true);

    try {
      if (mode === "guided") {
        await new Promise((resolve) => window.setTimeout(resolve, 450));
        const intent = findChatbotIntent(trimmed);
        addMessage("bot", intent.response, intent.action);
        return;
      }

      const response = await axios.post<{ data: ChatReply }>("/api/chat", {
        message: trimmed,
        history,
      });
      const result = response.data.data;
      addMessage("bot", result.reply, result.action);
    } catch {
      const intent = findChatbotIntent(trimmed);
      addMessage("bot", intent.response, intent.action);
    } finally {
      setTyping(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void respond(input);
  }

  function handleAction(target: string) {
    setOpen(false);
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            aria-label="Nexora Growth Assistant"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 18 }}
            transition={{ duration: 0.22 }}
            className="absolute bottom-16 right-0 flex h-[min(650px,calc(100vh-7rem))] w-[min(390px,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#080c19]/95 shadow-2xl shadow-black/60 backdrop-blur-xl"
          >
            <header className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-violet-600/20 to-blue-600/15 px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-lg shadow-violet-500/20"><Bot size={19} /><span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#080c19] bg-cyan-300" /></span>
                <div><p className="text-sm font-semibold">Nexora Growth Assistant</p><p className="mt-0.5 text-[10px] text-slate-500">Gemini AI + guided fallback</p></div>
              </div>
              <div className="flex gap-1">
                <button type="button" aria-label="Reset chat" title="Reset chat" onClick={resetChat} className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white"><RotateCcw size={14} /></button>
                <button type="button" aria-label="Close chat" onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white"><X size={16} /></button>
              </div>
            </header>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
              {messages.map((message) => <ChatbotMessage key={message.id} message={message} onAction={handleAction} />)}
              {isTyping && <div className="flex items-center gap-2.5"><span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500"><Bot size={13} /></span><div className="flex gap-1 rounded-2xl rounded-tl-sm border border-white/10 bg-white/[.045] px-4 py-3">{[0,1,2].map((dot) => <span key={dot} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: `${dot * 100}ms` }} />)}</div></div>}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/10 bg-black/15 px-4 py-3">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">{QUICK_REPLIES.map((reply) => <button key={reply} type="button" onClick={() => void respond(reply, "guided")} disabled={isTyping} className="shrink-0 rounded-full border border-white/10 bg-white/[.035] px-3 py-1.5 text-[10px] font-semibold text-slate-400 transition hover:border-cyan-300/20 hover:text-white disabled:opacity-50">{reply}</button>)}</div>
              <form onSubmit={submit} className="flex gap-2">
                <input value={input} onChange={(event) => setInput(event.target.value)} maxLength={500} placeholder="Ask Gemini about your growth..." aria-label="Chat message" className="h-11 min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[.035] px-3 text-xs text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/30" />
                <button type="submit" disabled={!input.trim() || isTyping} aria-label="Send message" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-white transition hover:brightness-110 disabled:opacity-40"><Send size={15} /></button>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {!isOpen && <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="pointer-events-none absolute -left-40 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-[#0b1020]/90 px-3 py-2 text-[10px] font-bold text-slate-300 shadow-xl backdrop-blur sm:block"><Sparkles size={11} className="mr-1.5 inline text-cyan-300" />Ask the growth assistant</motion.span>}
      <motion.button whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.96 }} type="button" aria-label={isOpen ? "Close growth assistant" : "Open growth assistant"} aria-expanded={isOpen} onClick={() => setOpen(!isOpen)} className="relative grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-xl shadow-violet-600/25">
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
        {!isOpen && <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-[#050816] bg-cyan-300" />}
      </motion.button>
    </div>
  );
}
