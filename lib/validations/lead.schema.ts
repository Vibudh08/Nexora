import { z } from "zod";

import { LEAD_STATUSES, SERVICE_OPTIONS } from "@/types/lead";

const phonePattern = /^[+]?[\d\s()-]{8,18}$/;

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "Name must be under 80 characters."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(phonePattern, "Please enter a valid phone number."),
  service: z.enum(SERVICE_OPTIONS, {
    error: "Please select a service.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more about your goal.")
    .max(1000, "Message must be under 1000 characters."),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const leadStatusParamsSchema = z.object({
  leadId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid lead ID."),
});

export const leadStatusSchema = z.object({
  status: z.enum(LEAD_STATUSES),
});

export type LeadStatusInput = z.infer<typeof leadStatusSchema>;
