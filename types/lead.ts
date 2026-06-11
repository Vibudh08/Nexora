export const SERVICE_OPTIONS = [
  "SEO & Content",
  "Paid Advertising",
  "Web Design",
  "Social Media",
  "Growth Strategy",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "closed",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type Lead = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  service: ServiceOption;
  message: string;
  status: LeadStatus;
  createdAt: string;
};
