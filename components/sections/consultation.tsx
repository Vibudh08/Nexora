import { CalendarCheck2, CheckCircle2, CreditCard, ShieldCheck, Sparkles } from "lucide-react";

import { ConsultationForm } from "@/components/forms/consultation-form";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { CONSULTATION_PRICE_INR, CONSULTATION_TITLE } from "@/lib/constants/consultation";

const benefits = [
  "Live audit of your current marketing funnel",
  "Three highest-impact growth opportunities",
  "A prioritized 30-day execution roadmap",
  "Direct recommendations from a senior strategist",
];

export function Consultation() {
  return (
    <section id="consultation" className="section-padding relative overflow-hidden border-y border-white/10 bg-[#080c19]">
      <div className="absolute left-1/2 top-0 -z-10 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[170px]" />
      <div className="page-container">
        <MotionReveal className="mx-auto max-w-3xl text-center">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[.18em] text-violet-200">
            <Sparkles size={12} /> Highest-value next step
          </span>
          <h2 className="section-title mx-auto mt-6">{CONSULTATION_TITLE}</h2>
          <p className="mt-5 text-base leading-7 text-slate-400">
            A focused working session designed to uncover where growth is leaking and exactly what to do next.
          </p>
        </MotionReveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
          <MotionReveal className="premium-panel rounded-3xl p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/20">
                <CalendarCheck2 size={22} />
              </span>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Assessment offer</p>
                <p className="mt-1 text-4xl font-semibold tracking-[-.07em]">INR {CONSULTATION_PRICE_INR}</p>
              </div>
            </div>
            <p className="mt-8 text-sm font-semibold text-white">What happens during the call</p>
            <div className="mt-5 space-y-4">
              {benefits.map((benefit) => (
                <p key={benefit} className="flex gap-3 text-sm leading-6 text-slate-300">
                  <CheckCircle2 size={16} className="mt-1 shrink-0 text-cyan-300" />
                  {benefit}
                </p>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-2 border-t border-white/10 pt-5 text-[10px] font-bold text-slate-400">
              <span className="flex items-center gap-2 rounded-lg bg-white/[.035] p-3">
                <CreditCard size={13} className="text-cyan-300" /> Secure Razorpay
              </span>
              <span className="flex items-center gap-2 rounded-lg bg-white/[.035] p-3">
                <ShieldCheck size={13} className="text-cyan-300" /> Server verified
              </span>
            </div>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <ConsultationForm />
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
