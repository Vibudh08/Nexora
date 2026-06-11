import { InferSchemaType, Model, models, model, Schema } from "mongoose";

const consultationBookingSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, required: true, trim: true },
    service: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: "INR" },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
      index: true,
    },
    razorpayOrderId: { type: String, required: true, unique: true, index: true },
    razorpayPaymentId: { type: String, sparse: true },
  },
  { timestamps: true },
);

export type ConsultationBookingDocument = InferSchemaType<
  typeof consultationBookingSchema
>;

export const ConsultationBookingModel =
  (models.ConsultationBooking as Model<ConsultationBookingDocument>) ||
  model<ConsultationBookingDocument>(
    "ConsultationBooking",
    consultationBookingSchema,
  );

