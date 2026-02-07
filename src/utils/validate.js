export function isEmail(value) {
  const s = String(value ?? "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export function minLen(value, n = 2) {
  return String(value ?? "").trim().length >= n;
}
