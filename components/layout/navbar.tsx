"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

import { navigation } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-x-0 top-0 z-50 pt-4"
    >
      <nav className="page-container flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-[#070b16]/75 px-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:px-5">
        <a
          href="#"
          className="flex items-center gap-2.5 font-bold tracking-[-.04em] text-white"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-[10px] shadow-lg shadow-violet-500/25">
          <Image src="/icon.svg" alt="NEXORA" width={36} height={36} />
          </span>
          NEXORA
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-semibold text-slate-400 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-white px-4 text-xs font-bold text-slate-950 transition hover:bg-cyan-200"
          >
            Get free audit <ArrowUpRight size={14} />
          </a>
        </div>
        <button
          aria-label="Toggle navigation"
          className="text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <div
        className={cn(
          "page-container mt-2 grid overflow-hidden transition-all lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 rounded-2xl border border-white/10 bg-[#0b1020]/95 backdrop-blur-xl">
          <div className="flex flex-col gap-1 p-3">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
