"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { MotionReveal } from "@/components/ui/motion-reveal";
import { services } from "@/lib/constants/site";

export function Services() {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="page-container">
        <div className="grid gap-7 lg:grid-cols-[1fr_.65fr] lg:items-end">
          <MotionReveal>
            <p className="eyebrow">Growth capabilities</p>
            <h2 className="section-title mt-5">Every channel connected to one outcome: <span className="text-gradient">profitable growth.</span></h2>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <p className="max-w-lg leading-7 text-slate-400 lg:justify-self-end">We do not sell disconnected deliverables. We build focused growth systems where strategy, creative, technology, and acquisition improve each other.</p>
          </MotionReveal>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[.025] p-6 transition-colors hover:border-blue-400/35 hover:bg-white/[.045]"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-cyan-300"><service.icon size={19} /></span>
                <ArrowUpRight size={17} className="text-slate-600 transition group-hover:rotate-45 group-hover:text-white" />
              </div>
              <p className="mt-8 text-[10px] font-bold uppercase tracking-[.16em] text-cyan-300">{service.metric}</p>
              <h3 className="mt-3 text-xl font-semibold leading-tight tracking-[-.035em]">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{service.description}</p>
              <div className="absolute -bottom-20 -right-20 h-44 w-44 rounded-full bg-gradient-to-br from-violet-500/15 to-cyan-400/10 blur-2xl transition duration-500 group-hover:scale-125" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
