"use client";

import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ServiceSelect } from "@/components/ui/service-select";
import { useLeadForm } from "@/hooks/use-lead-form";

const fieldClass = "mt-2 h-12 w-full rounded-lg border border-white/10 bg-white/[.035] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-cyan-300/50 focus:bg-white/[.055] focus:ring-4 focus:ring-cyan-300/5";

export function LeadForm() {
  const { form, submitLead, successMessage, serverError } = useLeadForm();
  const { control, register, formState: { errors, isSubmitting } } = form;

  return (
    <form noValidate onSubmit={submitLead} className="premium-panel relative z-10 w-full rounded-3xl p-5 sm:p-7">
      <div className="mb-5 flex items-start justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-cyan-300">Request your free audit</p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-.03em] text-white">Tell us where growth feels stuck.</h3>
        </div>
        <span className="shrink-0 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-emerald-200">
          No cost
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.fullName?.message}>
          <input {...register("fullName")} className={fieldClass} placeholder="Your name" />
        </Field>
        <Field label="Email address" error={errors.email?.message}>
          <input {...register("email")} type="email" className={fieldClass} placeholder="you@company.com" />
        </Field>
        <Field label="Phone number" error={errors.phone?.message}>
          <input {...register("phone")} className={fieldClass} placeholder="+91 98765 43210" />
        </Field>
        <Field label="Service interested in" error={errors.service?.message}>
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
      <div className="mt-4">
        <Field label="What are you looking to achieve?" error={errors.message?.message}>
          <textarea {...register("message")} className={`${fieldClass} h-28 resize-none py-3`} placeholder="Tell us about your goals, challenges, and timeline..." />
        </Field>
      </div>
      {successMessage && <Notice success message={successMessage} />}
      {serverError && <Notice message={serverError} />}
      <Button type="submit" variant="secondary" disabled={isSubmitting} className="mt-5 h-12 w-full gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-500 hover:to-blue-500">
        {isSubmitting ? <LoaderCircle size={17} className="animate-spin" /> : <Send size={16} />}
        {isSubmitting ? "Sending enquiry..." : "Request my growth plan"}
      </Button>
      <p className="mt-3 text-center text-[10px] text-slate-600">Private and confidential. Response within one business day.</p>
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

function Notice({ message, success = false }: { message: string; success?: boolean }) {
  const Icon = success ? CheckCircle2 : AlertCircle;
  return (
    <p className={`mt-5 flex gap-2 rounded-xl border p-3 text-sm font-medium ${success ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-200" : "border-red-300/20 bg-red-300/10 text-red-200"}`}>
      <Icon size={18} className="shrink-0" /> {message}
    </p>
  );
}
