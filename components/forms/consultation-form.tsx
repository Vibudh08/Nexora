"use client";

import { AlertCircle, CheckCircle2, LoaderCircle, LockKeyhole } from "lucide-react";
import { Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ServiceSelect } from "@/components/ui/service-select";
import { useConsultationPayment } from "@/hooks/use-consultation-payment";

const fieldClass =
  "mt-2 h-12 w-full rounded-lg border border-white/10 bg-white/[.035] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-cyan-300/50 focus:bg-white/[.055] focus:ring-4 focus:ring-cyan-300/5";

export function ConsultationForm() {
  const { form, startPayment, status, message } = useConsultationPayment();
  const {
    control,
    register,
    formState: { errors },
  } = form;
  const busy = ["creating", "awaiting", "verifying"].includes(status);

  return (
    <form noValidate onSubmit={startPayment} className="premium-panel rounded-3xl p-6 sm:p-8">
      <div className="mb-7 border-b border-white/10 pb-5">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-cyan-300">Secure strategy booking</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-.04em] text-white">Reserve your 60-minute session.</h3>
        <p className="mt-2 text-xs leading-5 text-slate-500">Complete the details below, then finish the booking through Razorpay Test Mode.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.fullName?.message}>
          <input {...register("fullName")} className={fieldClass} placeholder="Your name" />
        </Field>
        <Field label="Email address" error={errors.email?.message}>
          <input {...register("email")} type="email" className={fieldClass} placeholder="you@company.com" />
        </Field>
        <Field label="Phone number" error={errors.phone?.message}>
          <input {...register("phone")} className={fieldClass} placeholder="+91 98765 43210" />
        </Field>
        <Field label="Primary growth goal" error={errors.service?.message}>
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <ServiceSelect
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </Field>
      </div>

      {message && (
        <p className={`mt-5 flex gap-2 rounded-xl border p-3 text-sm font-medium ${status === "success" ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-200" : "border-red-300/20 bg-red-300/10 text-red-200"}`}>
          {status === "success" ? <CheckCircle2 size={18} className="shrink-0" /> : <AlertCircle size={18} className="shrink-0" />}
          {message}
        </p>
      )}

      <Button type="submit" variant="secondary" disabled={busy} className="mt-6 h-13 w-full gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-xl shadow-blue-600/15 hover:from-violet-500 hover:to-blue-500">
        {busy ? <LoaderCircle size={17} className="animate-spin" /> : <LockKeyhole size={16} />}
        {status === "creating" && "Creating secure order..."}
        {status === "awaiting" && "Complete payment in Razorpay"}
        {status === "verifying" && "Verifying payment..."}
        {!busy && "Book Strategy Session - INR 499"}
      </Button>
      <p className="mt-4 text-center text-[10px] text-slate-600">
        Secure Razorpay Test Mode checkout. No real payment required.
      </p>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold text-slate-300">
      {label}{children}
      {error && <span className="mt-1 block text-xs font-medium text-red-300">{error}</span>}
    </label>
  );
}
