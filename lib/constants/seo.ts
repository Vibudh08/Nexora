export const SITE_NAME = "Nexora Digital";
export const SITE_DESCRIPTION =
  "Nexora combines strategy, creative, technology, and data to help ambitious businesses grow.";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

