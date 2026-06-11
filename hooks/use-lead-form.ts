"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { leadSchema, type LeadInput } from "@/lib/validations/lead.schema";

const NOTICE_DURATION_MS = 5000;

export function useLeadForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const form = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: undefined,
      message: "",
    },
  });

  useEffect(() => {
    if (!successMessage && !serverError) return;

    const noticeTimer = setTimeout(() => {
      setSuccessMessage("");
      setServerError("");
    }, NOTICE_DURATION_MS);

    return () => clearTimeout(noticeTimer);
  }, [successMessage, serverError]);

  function showNotice(type: "success" | "error", message: string) {
    setSuccessMessage(type === "success" ? message : "");
    setServerError(type === "error" ? message : "");
  }

  const submitLead = form.handleSubmit(
    async (values) => {
      setSuccessMessage("");
      setServerError("");
      try {
        const response = await axios.post("/api/leads", values);
        showNotice("success", response.data.data.message);
        form.reset();
      } catch (error) {
        showNotice(
          "error",
          axios.isAxiosError(error)
            ? (error.response?.data?.error?.message ?? "We could not submit your enquiry.")
            : "We could not submit your enquiry.",
        );
      }
    },
    () => {
      setSuccessMessage("");
      setServerError("");
    },
  );

  return { form, submitLead, successMessage, serverError };
}
