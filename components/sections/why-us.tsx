import { Gauge, LineChart, ShieldCheck, Users2 } from "lucide-react";

import { MotionReveal } from "@/components/ui/motion-reveal";

const reasons = [
  { icon: LineChart, title: "Revenue before vanity", text: "We measure qualified leads, acquisition efficiency, conversion, and commercial impact." },
  { icon: Gauge, title: "Fast learning cycles", text: "Focused experiments create evidence quickly, so budget moves toward what actually works." },
  { icon: Users2, title: "Senior-led execution", text: "Experienced specialists remain hands-on instead of disappearing after the pitch." },
  { icon: ShieldCheck, title: "Radical clarity", text: "Clear priorities, transparent reporting, and direct communication without agency theatre." },
];

export function WhyUs() {
  return (
    <section id="why-us" className="section-padding relative overflow-hidden bg-[#080c19]">
      <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[130px]" />
      <div className="page-container">
        <MotionReveal className="max-w-3xl">
          <p className="eyebrow">Why businesses choose Nexora</p>
          <h2 className="section-title mt-5">The discipline of a product team. The speed of a growth studio.</h2>
        </MotionReveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <MotionReveal key={reason.title} delay={index * 0.07} className="bg-[#080c19]">
              <article className="group h-full p-6 transition hover:bg-white/[.025] sm:p-8">
                <reason.icon size={21} className="text-cyan-300" />
                <h3 className="mt-8 text-xl font-semibold tracking-[-.035em]">{reason.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{reason.text}</p>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
