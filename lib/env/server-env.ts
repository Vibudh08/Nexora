type ServerEnv = {
  MONGODB_URI?: string;
  EMAIL_USER?: string;
  EMAIL_PASS?: string;
  RAZORPAY_KEY_ID?: string;
  RAZORPAY_KEY_SECRET?: string;
  DNS_SERVERS?: string;
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
  NEXT_PUBLIC_SITE_URL?: string;
  GEMINI_API_KEY?: string;
  GEMINI_MODEL?: string;
};

export function getServerEnv(): ServerEnv {
  return {
    MONGODB_URI: process.env.MONGODB_URI,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    DNS_SERVERS: process.env.DNS_SERVERS,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GEMINI_MODEL: process.env.GEMINI_MODEL,
  };
}
