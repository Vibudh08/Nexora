"use client";

import { ArrowRight, ArrowUpRight, Check, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const chartPoints = "0,118 44,106 88,112 132,82 176,89 220,56 264,64 308,27 352,36 396,12";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-36 lg:min-h-[850px] lg:pb-24">
      <div className="dot-grid absolute inset-0 -z-20" />
      <div className="noise-overlay pointer-events-none absolute inset-0 -z-10 opacity-[.035]" />
      <div className="absolute -left-48 top-24 -z-10 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[130px]" />
      <div className="absolute -right-32 top-16 -z-10 h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-[150px]" />

      <div className="page-container grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr]">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[.06] px-3 py-2 text-[10px] font-bold uppercase tracking-[.18em] text-cyan-200"
          >
            <Sparkles size={12} /> Revenue-focused digital growth systems
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-7 max-w-3xl text-[clamp(2.75rem,5vw,4.8rem)] font-semibold leading-[.98] tracking-[-.06em]"
          >
            Marketing that drives <span className="text-gradient">revenue,</span> not just traffic.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="mt-7 max-w-xl text-base leading-7 text-slate-400 sm:text-lg"
          >
            We help ambitious businesses scale through SEO, paid media, websites,
            automation, and conversion-focused growth systems.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#contact" className="button-primary group">
              Get free marketing audit <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </a>
            <a href="#consultation" className="button-secondary">
              Book strategy session <ArrowUpRight size={16} />
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-slate-400"
          >
            {["Senior-led execution", "Clear business reporting", "No long-term lock-in"].map((item) => (
              <span key={item} className="flex items-center gap-2"><Check size={13} className="text-cyan-300" />{item}</span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[610px]"
        >
          <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-br from-violet-600/20 to-cyan-400/10 blur-3xl" />
          <div className="premium-panel relative overflow-hidden rounded-[1.8rem] p-4 sm:p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-slate-500">Growth command center</p>
                <p className="mt-1 text-sm font-semibold text-white">Revenue performance</p>
              </div>
              <span className="flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> Live data
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[["Revenue influenced", "₹48.6L", "+38.2%"], ["Qualified leads", "1,284", "+24.7%"], ["Conversion rate", "8.42%", "+2.1%"]].map(([label, value, change]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/[.035] p-4">
                  <p className="text-[10px] font-medium text-slate-500">{label}</p>
                  <p className="mt-2 text-xl font-semibold tracking-[-.04em]">{value}</p>
                  <p className="mt-1 text-[10px] font-bold text-cyan-300">{change}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl border border-white/10 bg-[#080d1b]/80 p-4 sm:p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-medium text-slate-500">Revenue growth</p>
                  <p className="mt-1 text-lg font-semibold">Last 6 months</p>
                </div>
                <span className="flex items-center gap-1 rounded-lg bg-violet-500/10 px-2.5 py-1.5 text-[10px] font-bold text-violet-300"><TrendingUp size={12} />+116%</span>
              </div>
              <svg viewBox="0 0 396 132" className="mt-5 h-36 w-full overflow-visible" aria-label="Revenue growth chart">
                <defs>
                  <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity=".35" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="chart-line" x1="0" x2="1">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                <polygon points={`0,132 ${chartPoints} 396,132`} fill="url(#chart-fill)" />
                <polyline className="metric-line" points={chartPoints} fill="none" stroke="url(#chart-line)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex justify-between text-[9px] font-semibold uppercase tracking-widest text-slate-600">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => <span key={month}>{month}</span>)}
              </div>
            </div>
          </div>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="premium-panel absolute -bottom-7 -left-3 hidden rounded-xl px-4 py-3 sm:block">
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Cost per lead</p>
            <p className="mt-1 text-lg font-semibold text-white">-31.4% <span className="text-[10px] text-cyan-300">this quarter</span></p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
