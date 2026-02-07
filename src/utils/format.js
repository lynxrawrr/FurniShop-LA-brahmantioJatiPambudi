/** Normalize string + fallback */
export function safeText(value, fallback = "") {
  const s = String(value ?? "").replace(/\s+/g, " ").trim();
  return s || fallback;
}

/** Truncate text + ellipsis */
export function truncateText(value, max = 42) {
  const s = safeText(value);
  if (!s) return "";
  if (max <= 1) return "…";
  return s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s;
}

/** Currency formatter */
export function money(value, { currency = "USD", locale = "en-US" } = {}) {
  const num = Number(value);
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    Number.isFinite(num) ? num : 0
  );
}
