type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  leadRateLimits?: Map<string, RateLimitEntry>;
};

const limits = globalForRateLimit.leadRateLimits ?? new Map<string, RateLimitEntry>();
globalForRateLimit.leadRateLimits = limits;

export function checkRateLimit(key: string, maxRequests = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const current = limits.get(key);

  if (!current || current.resetAt <= now) {
    limits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) return false;

  current.count += 1;
  return true;
}

