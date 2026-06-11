import { clientNames } from "@/lib/constants/site";

export function TrustedBy() {
  return (
    <section className="border-y border-white/10 bg-white/[.018] py-5">
      <div className="page-container flex flex-col gap-5 lg:flex-row lg:items-center">
        <p className="shrink-0 text-[10px] font-bold uppercase tracking-[.2em] text-slate-500">Built for ambitious teams</p>
        <div className="flex flex-1 flex-wrap items-center justify-between gap-5">
          {clientNames.map((client) => <span key={client} className="text-xs font-bold tracking-[.08em] text-slate-500 transition hover:text-slate-200">{client}</span>)}
        </div>
      </div>
    </section>
  );
}
