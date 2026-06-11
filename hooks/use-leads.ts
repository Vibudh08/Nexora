"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import type { Lead, LeadStatus } from "@/types/lead";
import type { ConsultationBooking } from "@/types/payment";

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [updatingLeadId, setUpdatingLeadId] = useState("");

  useEffect(() => {
    async function loadLeads() {
      try {
        const [leadResponse, bookingResponse] = await Promise.all([
          axios.get("/api/admin/leads"),
          axios.get("/api/admin/bookings"),
        ]);
        setLeads(leadResponse.data.data);
        setBookings(bookingResponse.data.data);
      } catch (requestError) {
        setError(
          axios.isAxiosError(requestError)
            ? (requestError.response?.data?.error?.message ?? "Could not load leads.")
            : "Could not load leads.",
        );
      } finally {
        setLoading(false);
      }
    }

    void loadLeads();
  }, []);

  async function updateLeadStatus(leadId: string, status: LeadStatus) {
    setActionError("");
    setUpdatingLeadId(leadId);

    try {
      const response = await axios.patch(`/api/admin/leads/${leadId}`, { status });
      const updatedLead = response.data.data as Lead;
      setLeads((current) =>
        current.map((lead) => (lead._id === updatedLead._id ? updatedLead : lead)),
      );
    } catch (requestError) {
      setActionError(
        axios.isAxiosError(requestError)
          ? (requestError.response?.data?.error?.message ?? "Could not update lead status.")
          : "Could not update lead status.",
      );
    } finally {
      setUpdatingLeadId("");
    }
  }

  return {
    leads,
    bookings,
    loading,
    error,
    actionError,
    updatingLeadId,
    updateLeadStatus,
  };
}
