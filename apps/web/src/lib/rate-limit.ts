const memoryWindows = new Map<string, Array<number>>();

export function allowRequest(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const windowStart = now - windowMs;
  const entries = memoryWindows.get(key)?.filter((value) => value >= windowStart) ?? [];
  const allowed = entries.length < limit;
  if (allowed) {
    entries.push(now);
    memoryWindows.set(key, entries);
  }

  return {
    allowed,
    remaining: Math.max(0, limit - entries.length),
  };
}
