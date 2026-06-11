"use client";

import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

import { MotionReveal } from "@/components/ui/motion-reveal";
import { caseStudies } from "@/lib/constants/site";

const metrics = [
  { label: "Organic traffic", value: "+184%", detail: "in 6 months", icon: TrendingUp, color: "text-cyan-300" },
  { label: "Qualified leads", value: "+148%", detail: "after funnel rebuild", icon: TrendingUp, color: "text-blue-300" },
  { label: "Revenue influenced", value: "₹12Cr+", detail: "across partnerships", icon: TrendingUp, color: "text-violet-300" },
  { label: "Cost per opportunity", value: "-31%", detail: "through optimization", icon: TrendingDown, color: "text-emerald-300" },
];

export function Work() {
  return (
    <section id="results" className="section-padding relative overflow-hidden">
      <div className="absolute right-0 top-24 -z-10 h-[480px] w-[480px] rounded-full bg-blue-600/10 blur-[150px]" />
      <div className="page-container">
        <div className="grid gap-7 lg:grid-cols-[1fr_.6fr] lg:items-end">
          <MotionReveal>
            <p className="eyebrow">Measurable results</p>
            <h2 className="section-title mt-5">Proof that strategy becomes performance.</h2>
          </MotionReveal>
          <MotionReveal delay={0.1}><p className="max-w-md leading-7 text-slate-400 lg:justify-self-end">Beautiful work matters. Business impact matters more. These are the metrics our growth systems are designed to move.</p></MotionReveal>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.article key={metric.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="premium-panel rounded-2xl p-5">
              <div className="flex items-center justify-between"><p className="text-xs font-medium text-slate-500">{metric.label}</p><metric.icon size={15} className={metric.color} /></div>
              <p className={`mt-7 text-4xl font-semibold tracking-[-.065em] ${metric.color}`}>{metric.value}</p>
              <p className="mt-2 text-[11px] text-slate-500">{metric.detail}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <motion.article key={study.client} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} whileHover={{ y: -6 }} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[.025]">
              <div className="relative h-48 overflow-hidden border-b border-white/10 bg-[#0b1020] p-5">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-blue-500/10 to-cyan-400/10" />
                <div className="relative rounded-xl border border-white/10 bg-[#080c18]/80 p-4 shadow-2xl">
                  <div className="flex items-center justify-between"><p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Growth report</p><span className="h-2 w-2 rounded-full bg-cyan-300" /></div>
                  <div className="mt-5 flex h-20 items-end gap-2">{[28, 42, 36, 58, 51, 72, 66, 92].map((height, item) => <span key={item} className="flex-1 rounded-t-sm bg-gradient-to-t from-violet-600/50 to-cyan-300" style={{ height: `${height}%` }} />)}</div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-cyan-300">{study.category}</p><ArrowUpRight size={15} className="text-slate-600 transition group-hover:rotate-45 group-hover:text-white" /></div>
                <h3 className="mt-4 text-xl font-semibold leading-tight tracking-[-.035em]">{study.title}</h3>
                <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-4"><p className="text-3xl font-semibold tracking-[-.06em]">{study.result}</p><p className="max-w-28 text-right text-[10px] leading-4 text-slate-500">{study.resultLabel}</p></div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
