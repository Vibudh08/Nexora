import { Quote, Star } from "lucide-react";

import { MotionReveal } from "@/components/ui/motion-reveal";
import { testimonials } from "@/lib/constants/site";

export function Testimonials() {
  return (
    <section className="section-padding">
      <div className="page-container">
        <MotionReveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center before:hidden">Client confidence</p>
          <h2 className="section-title mx-auto mt-5">Trusted when growth actually matters.</h2>
          <p className="mt-5 text-sm leading-6 text-slate-400">Clear thinking, accountable execution, and outcomes clients can measure.</p>
        </MotionReveal>
        <div className="mt-12 grid gap-3 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <MotionReveal key={testimonial.name} delay={index * 0.08}>
              <figure className={`h-full rounded-2xl border p-6 ${index === 1 ? "border-violet-400/30 bg-gradient-to-br from-violet-500/15 to-blue-500/5" : "border-white/10 bg-white/[.025]"}`}>
                <div className="flex items-center justify-between"><Quote size={22} className="text-cyan-300" /><span className="flex gap-1 text-cyan-300">{[1,2,3,4,5].map((item) => <Star key={item} size={10} fill="currentColor" />)}</span></div>
                <blockquote className="mt-7 min-h-40 text-base font-medium leading-7 text-slate-200">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                <figcaption className="mt-7 border-t border-white/10 pt-5"><p className="text-sm font-semibold">{testimonial.name}</p><p className="mt-1 text-xs text-slate-500">{testimonial.role}</p></figcaption>
              </figure>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
