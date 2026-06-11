import { ArrowRight, Clock3, Mail, ShieldCheck } from "lucide-react";

import { LeadForm } from "@/components/forms/lead-form";
import { MotionReveal } from "@/components/ui/motion-reveal";

const details = [
  { icon: Clock3, label: "Response within one business day" },
  { icon: ShieldCheck, label: "Your details stay private" },
  { icon: Mail, label: "vibudhrathore8@gmail.com" },
];

export function Contact() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden border-b border-white/10 bg-[#050816]">
      <div className="absolute -left-40 top-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[150px]" />
      <div className="absolute -right-48 top-0 -z-10 h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-[150px]" />

      <div className="page-container grid gap-8 xl:grid-cols-[.9fr_1.1fr] xl:items-start">
        <MotionReveal className="xl:sticky xl:top-28">
          <p className="eyebrow">Free marketing audit</p>
          <h2 className="mt-5 max-w-xl text-[clamp(2rem,3.3vw,3.25rem)] font-semibold leading-[1.06] tracking-[-.05em]">
            Find the growth opportunity hiding in plain sight.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400">
            Share where growth feels stuck. We will review the challenge and return practical opportunities, not a generic sales pitch.
          </p>

          <div className="mt-8 flex max-w-lg flex-wrap gap-x-5 gap-y-3">
            {details.map(({ icon: Icon, label }) => (
              <p key={label} className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
                <Icon size={13} className="text-cyan-300" /> {label}
              </p>
            ))}
          </div>
          <a href="#consultation" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-cyan-300 transition hover:text-white">
            Need a deeper plan? Book the strategy session <ArrowRight size={14} />
          </a>
        </MotionReveal>

        <MotionReveal delay={0.1} className="w-full xl:max-w-[690px] xl:justify-self-end">
          <LeadForm />
        </MotionReveal>
      </div>
    </section>
  );
}
