import { http } from "../../../lib/http/http.js";

export function getTestimonials({ page = 1, limit = 1, signal } = {}) {
  const qs = new URLSearchParams({ page: String(page), limit: String(limit) });
  return http(`/api/testimonials?${qs.toString()}`, { signal });
}
