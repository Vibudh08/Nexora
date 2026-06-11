import type { LeadInput } from "@/lib/validations/lead.schema";
import type { ConsultationInput } from "@/lib/validations/payment.schema";
import { getEmailTransporter, getSenderEmail } from "@/lib/integrations/nodemailer";
import { escapeHtml } from "@/lib/utils/security";

function emailLayout(title: string, content: string) {
  return `
    <div style="background:#f8fafc;padding:32px;font-family:Arial,sans-serif;color:#0f172a">
      <div style="max-width:600px;margin:auto;background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:32px">
        <p style="margin:0 0 20px;color:#2563eb;font-size:13px;font-weight:700;letter-spacing:1px">NEXORA DIGITAL</p>
        <h1 style="margin:0 0 16px;font-size:24px">${title}</h1>
        ${content}
      </div>
    </div>
  `;
}

export async function sendLeadNotifications(lead: LeadInput) {
  const transporter = getEmailTransporter();
  const sender = getSenderEmail();
  const safe = {
    name: escapeHtml(lead.fullName),
    email: escapeHtml(lead.email),
    phone: escapeHtml(lead.phone),
    service: escapeHtml(lead.service),
    message: escapeHtml(lead.message),
  };

  await Promise.all([
    transporter.sendMail({
      from: `"Nexora Digital" <${sender}>`,
      to: lead.email,
      subject: "We received your Nexora enquiry",
      html: emailLayout(
        `Thanks, ${safe.name}.`,
        `<p style="line-height:1.7;color:#475569">We received your enquiry about <strong>${safe.service}</strong>. A strategist will review your goals and contact you within one business day.</p>`,
      ),
    }),
    transporter.sendMail({
      from: `"Nexora Website" <${sender}>`,
      to: sender,
      replyTo: lead.email,
      subject: `New lead: ${lead.fullName} - ${lead.service}`,
      html: emailLayout(
        "New website lead",
        `<p><strong>Name:</strong> ${safe.name}</p>
         <p><strong>Email:</strong> ${safe.email}</p>
         <p><strong>Phone:</strong> ${safe.phone}</p>
         <p><strong>Service:</strong> ${safe.service}</p>
         <p><strong>Message:</strong><br>${safe.message}</p>`,
      ),
    }),
  ]);
}

export async function sendPaymentConfirmation(
  booking: ConsultationInput,
  paymentId: string,
  amountInRupees: number,
) {
  const transporter = getEmailTransporter();
  const sender = getSenderEmail();
  const safeName = escapeHtml(booking.fullName);
  const safeService = escapeHtml(booking.service);
  const safePaymentId = escapeHtml(paymentId);

  await Promise.all([
    transporter.sendMail({
      from: `"Nexora Digital" <${sender}>`,
      to: booking.email,
      subject: "Your Nexora strategy session is confirmed",
      html: emailLayout(
        "Your strategy session is confirmed.",
        `<p style="line-height:1.7;color:#475569">Thanks, ${safeName}. Your payment of <strong>INR ${amountInRupees}</strong> was successful. Our team will contact you to schedule your ${safeService} strategy session.</p>
         <p style="color:#64748b;font-size:13px">Payment ID: ${safePaymentId}</p>`,
      ),
    }),
    transporter.sendMail({
      from: `"Nexora Payments" <${sender}>`,
      to: sender,
      replyTo: booking.email,
      subject: `Paid consultation: ${booking.fullName}`,
      html: emailLayout(
        "New paid consultation",
        `<p><strong>Name:</strong> ${safeName}</p>
         <p><strong>Email:</strong> ${escapeHtml(booking.email)}</p>
         <p><strong>Phone:</strong> ${escapeHtml(booking.phone)}</p>
         <p><strong>Service:</strong> ${safeService}</p>
         <p><strong>Amount:</strong> INR ${amountInRupees}</p>
         <p><strong>Payment ID:</strong> ${safePaymentId}</p>`,
      ),
    }),
  ]);
}

