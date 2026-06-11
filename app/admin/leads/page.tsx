import Link from "next/link";

import { LeadsDashboard } from "@/components/admin/leads-dashboard";

export default function AdminLeadsPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="page-container">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-blue-700">Nexora admin</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Lead and payment inbox</h1>
            <p className="mt-2 text-sm text-slate-600">Review recent enquiries, bookings, and payment status.</p>
          </div>
          <Link href="/" className="text-sm font-bold text-slate-700 hover:text-slate-950">Back to website</Link>
        </div>
        <LeadsDashboard />
      </div>
    </main>
  );
}
