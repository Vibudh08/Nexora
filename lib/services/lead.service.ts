import { connectToDatabase } from "@/lib/db/mongoose";
import type { LeadInput, LeadStatusInput } from "@/lib/validations/lead.schema";
import { LeadModel } from "@/models/lead.model";

export async function createLead(input: LeadInput) {
  await connectToDatabase();
  return LeadModel.create({
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    service: input.service,
    message: input.message,
  });
}

export async function getRecentLeads(limit = 100) {
  await connectToDatabase();
  return LeadModel.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean()
    .exec();
}

export async function updateLeadStatus(leadId: string, input: LeadStatusInput) {
  await connectToDatabase();
  return LeadModel.findByIdAndUpdate(
    leadId,
    { $set: { status: input.status } },
    { new: true, runValidators: true },
  )
    .lean()
    .exec();
}
