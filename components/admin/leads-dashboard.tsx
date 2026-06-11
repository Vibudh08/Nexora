"use client";

import { CreditCard, Inbox, LoaderCircle, Mail, Phone } from "lucide-react";

import { useLeads } from "@/hooks/use-leads";
import { LEAD_STATUSES } from "@/types/lead";
import type { LeadStatus } from "@/types/lead";

export function LeadsDashboard() {
  const {
    leads,
    bookings,
    loading,
    error,
    actionError,
    updatingLeadId,
    updateLeadStatus,
  } = useLeads();

  if (loading) {
    return <StateMessage icon={LoaderCircle} message="Loading leads..." spinning />;
  }

  if (error) {
    return <StateMessage icon={Inbox} message={error} />;
  }

  if (!leads.length && !bookings.length) {
    return <StateMessage icon={Inbox} message="No leads or bookings have been submitted yet." />;
  }

  return (
    <div className="space-y-8">
      {actionError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {actionError}
        </p>
      )}
      <AdminTable title="Lead enquiries" icon={Inbox}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-950 text-xs uppercase tracking-wider text-slate-300">
              <tr>
                {["Contact", "Service", "Message", "Status", "Received"].map(
                  (heading) => (
                    <th key={heading} className="px-5 py-4 font-semibold">
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => (
                <tr key={lead._id} className="align-top hover:bg-slate-50">
                  <td className="px-5 py-5">
                    <p className="font-bold text-slate-950">{lead.fullName}</p>
                    <a
                      className="mt-2 flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-700"
                      href={`mailto:${lead.email}`}
                    >
                      <Mail size={13} />
                      {lead.email}
                    </a>
                    <a
                      className="mt-1 flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-700"
                      href={`tel:${lead.phone}`}
                    >
                      <Phone size={13} />
                      {lead.phone}
                    </a>
                  </td>
                  <td className="px-5 py-5 font-medium text-slate-700">
                    {lead.service}
                  </td>
                  <td className="max-w-sm px-5 py-5 leading-6 text-slate-600">
                    {lead.message}
                  </td>
                  <td className="px-5 py-5">
                    <LeadStatusSelect
                      status={lead.status}
                      updating={updatingLeadId === lead._id}
                      onChange={(status) => void updateLeadStatus(lead._id, status)}
                    />
                  </td>
                  <td className="px-5 py-5 text-slate-500">
                    {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                      dateStyle: "medium",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminTable>
      <AdminTable title="Consultation payments" icon={CreditCard}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-950 text-xs uppercase tracking-wider text-slate-300">
              <tr>
                {[
                  "Customer",
                  "Service",
                  "Amount",
                  "Status",
                  "Order ID",
                  "Received",
                ].map((heading) => (
                  <th key={heading} className="px-5 py-4 font-semibold ">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-slate-50">
                  <td className="px-5 py-5">
                    <p className="font-bold text-slate-700">
                      {booking.fullName}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {booking.email}
                    </p>
                  </td>
                  <td className="px-5 py-5 text-slate-700">
                    {booking.service}
                  </td>
                  <td className="px-5 py-5 text-slate-700 font-bold">
                    INR {booking.amount / 100}
                  </td>
                  <td className="px-5 py-5">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="px-5 py-5 font-mono text-xs text-slate-500">
                    {booking.razorpayOrderId}
                  </td>
                  <td className="px-5 py-5 text-slate-500">
                    {new Date(booking.createdAt).toLocaleDateString("en-IN", {
                      dateStyle: "medium",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminTable>
    </div>
  );
}

function LeadStatusSelect({
  status,
  updating,
  onChange,
}: {
  status: LeadStatus;
  updating: boolean;
  onChange: (status: LeadStatus) => void;
}) {
  const color =
    status === "new"
      ? "border-blue-200 bg-blue-50 text-blue-800"
      : status === "contacted"
        ? "border-amber-200 bg-amber-50 text-amber-800"
        : status === "qualified"
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-slate-300 bg-slate-100 text-slate-700";

  return (
    <div className="min-w-32">
      <select
        aria-label="Lead status"
        value={status}
        disabled={updating}
        onChange={(event) => onChange(event.target.value as LeadStatus)}
        className={`w-full rounded-lg border px-2.5 py-2 text-xs font-bold capitalize outline-none transition focus:ring-2 focus:ring-blue-500/20 disabled:cursor-wait disabled:opacity-60 ${color}`}
      >
        {LEAD_STATUSES.map((option) => (
          <option key={option} value={option} className="bg-white text-slate-900">
            {option}
          </option>
        ))}
      </select>
      {updating && <p className="mt-1 text-[10px] font-semibold text-slate-500">Saving...</p>}
    </div>
  );
}

function AdminTable({ title, icon: Icon, children }: { title: string; icon: typeof Inbox; children: React.ReactNode }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <h2 className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 font-bold text-slate-950">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-blue-700">
          <Icon size={16} />
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color = status === "paid" ? "bg-teal-100 text-teal-800" : status === "failed" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800";
  return <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${color}`}>{status}</span>;
}

function StateMessage({ icon: Icon, message, spinning = false }: { icon: typeof Inbox; message: string; spinning?: boolean }) {
  return (
    <div className="grid min-h-64 place-items-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
      <div>
        <Icon className={`mx-auto mb-3 ${spinning ? "animate-spin" : ""}`} />
        <p>{message}</p>
      </div>
    </div>
  );
}
