import Razorpay from "razorpay";

let razorpay: Razorpay | null = null;

export function getRazorpayClient() {
  if (razorpay) return razorpay;

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Razorpay integration is not configured.");
  }

  razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
  return razorpay;
}

export function getRazorpayKeyId() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  if (!keyId) throw new Error("Razorpay integration is not configured.");
  return keyId;
}

export function getRazorpayKeySecret() {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) throw new Error("Razorpay integration is not configured.");
  return keySecret;
}

