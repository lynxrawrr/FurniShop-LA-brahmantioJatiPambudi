export function sanitizeText(input, { max = 80 } = {}) {
  return String(input ?? "")
    .replace(/[<>]/g, "")                 
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function sanitizeEmail(input) {
  return String(input ?? "")
    .trim()
    .replace(/\s+/g, "")
    .toLowerCase();
}
