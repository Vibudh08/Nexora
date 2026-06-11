export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "An unexpected error occurred.";
}

export function isDatabaseConfigurationError(error: unknown) {
  return (
    error instanceof Error && error.message === "MONGODB_URI is not configured."
  );
}

export function isIntegrationConfigurationError(error: unknown) {
  return (
    error instanceof Error &&
    (error.message === "Email integration is not configured." ||
      error.message === "Razorpay integration is not configured.")
  );
}

