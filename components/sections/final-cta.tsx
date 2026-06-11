import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { MotionReveal } from "@/components/ui/motion-reveal";

export function FinalCta() {
  return (
    <section className="pb-20 pt-4">
      <div className="page-container">
        <MotionReveal>
          <div className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-violet-600/25 via-blue-600/15 to-cyan-400/10 p-7 sm:p-10 lg:p-12">
            <div className="dot-grid absolute inset-0 opacity-30" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-cyan-300">Your next growth move</p>
                <h2 className="mt-4 max-w-3xl text-2xl font-semibold leading-tight tracking-[-.045em] sm:text-4xl">Stop guessing where growth will come from next.</h2>
                <div className="mt-5 flex flex-wrap gap-4 text-xs font-medium text-slate-300">{["Clear priorities", "Measurable outcomes", "Senior-led execution"].map((item) => <span key={item} className="flex items-center gap-2"><CheckCircle2 size={14} className="text-cyan-300" />{item}</span>)}</div>
              </div>
              <a href="#contact" className="button-primary w-fit">Get free audit <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
