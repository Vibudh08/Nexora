import { CheckCircle2, Layers3, MoveUpRight } from "lucide-react";

import { MotionReveal } from "@/components/ui/motion-reveal";

const principles = [
  "Senior specialists stay involved from strategy through delivery.",
  "Every recommendation connects to a measurable business outcome.",
  "Clear communication replaces unnecessary agency complexity.",
];

export function About() {
  return (
    <section id="about" className="section-padding border-y border-white/10 bg-[#080c19]">
      <div className="page-container grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <MotionReveal>
          <p className="eyebrow">About Nexora</p>
          <h2 className="section-title mt-5">Built like a partner. Focused like a product team.</h2>
          <p className="mt-6 max-w-lg leading-7 text-slate-400">Nexora brings commercial strategy, design, engineering, media, and automation into one accountable growth team.</p>
        </MotionReveal>
        <MotionReveal delay={0.12}>
          <div className="premium-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[.035] p-5">
                <Layers3 className="text-cyan-300" size={22} />
                <p className="mt-8 text-2xl font-semibold tracking-[-.045em]">One team.</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">No handoffs between disconnected vendors or specialists.</p>
              </div>
              <div className="rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-blue-500/5 p-5">
                <MoveUpRight className="text-violet-300" size={22} />
                <p className="mt-8 text-2xl font-semibold tracking-[-.045em]">One outcome.</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">Every channel aligned around qualified demand and revenue.</p>
              </div>
            </div>
            <div className="mt-4 space-y-3 border-t border-white/10 pt-5">
              {principles.map((principle) => (
                <p key={principle} className="flex gap-3 text-sm font-medium text-slate-300"><CheckCircle2 className="mt-0.5 shrink-0 text-cyan-300" size={16} />{principle}</p>
              ))}
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
