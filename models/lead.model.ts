import { InferSchemaType, Model, models, model, Schema } from "mongoose";

import { LEAD_STATUSES } from "@/types/lead";

const leadSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    phone: { type: String, required: true, trim: true },
    service: { type: String, required: true },
    message: { type: String, required: true, trim: true, maxlength: 1000 },
    status: {
      type: String,
      enum: LEAD_STATUSES,
      default: "new",
    },
  },
  { timestamps: true },
);

export type LeadDocument = InferSchemaType<typeof leadSchema>;

export const LeadModel =
  (models.Lead as Model<LeadDocument>) ||
  model<LeadDocument>("Lead", leadSchema);
