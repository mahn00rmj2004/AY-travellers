// lib/rate-limit.ts

type Bucket = { count: number; resetTime: number };

const ipMap = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;           // 5 requests per window

if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of ipMap) {
      if (bucket.resetTime < now) ipMap.delete(key);
    }
  }, 5 * 60 * 1000).unref?.();
}

export function rateLimit(
  ip: string,
  limit: number = MAX_REQUESTS,
  windowMs: number = WINDOW_MS
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const record = ipMap.get(ip);

  if (!record || now > record.resetTime) {
    ipMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  if (record.count >= limit) {
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((record.resetTime - now) / 1000)),
    };
  }

  record.count++;
  return { ok: true, retryAfter: 0 };
}