import { MotionReveal } from "@/components/ui/motion-reveal";

const steps = [
  { number: "01", title: "Diagnose", text: "Find the constraint limiting demand, conversion, or efficiency." },
  { number: "02", title: "Prioritize", text: "Turn insight into a focused roadmap tied to commercial impact." },
  { number: "03", title: "Execute", text: "Ship high-quality creative, technology, and campaigns quickly." },
  { number: "04", title: "Compound", text: "Scale what works and continuously remove friction from growth." },
];

export function Process() {
  return (
    <section id="process" className="section-padding border-y border-white/10 bg-[#080c19]">
      <div className="page-container">
        <MotionReveal className="max-w-3xl">
          <p className="eyebrow">The growth operating system</p>
          <h2 className="section-title mt-5">A clear path from business challenge to measurable momentum.</h2>
        </MotionReveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {steps.map((step, index) => (
            <MotionReveal key={step.number} delay={index * 0.07} className="bg-[#080c19]">
              <article className="h-full p-6 transition hover:bg-white/[.025]">
                <span className="font-mono text-[10px] font-bold text-cyan-300">{step.number}</span>
                <h3 className="mt-12 text-xl font-semibold tracking-[-.04em]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{step.text}</p>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
