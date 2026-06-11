import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#03050c] py-12 text-slate-400">
      <div className="page-container">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-xl font-bold tracking-[-.05em] text-white">NEXORA<span className="text-cyan-300">.</span></p>
            <p className="mt-3 max-w-md text-sm leading-6">A next-generation growth agency building systems that turn attention into measurable revenue.</p>
          </div>
          <a href="#contact" className="button-secondary w-fit">Start a project <ArrowUpRight size={15} /></a>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-xs sm:flex-row sm:justify-between">
          <p>Copyright 2026 Nexora Digital. All rights reserved.</p>
          <p>Strategy / SEO / Paid Media / Web / Automation</p>
        </div>
      </div>
    </footer>
  );
}
