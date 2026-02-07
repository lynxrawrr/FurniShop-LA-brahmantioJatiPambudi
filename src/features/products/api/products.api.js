import { http } from "../../../lib/http/http.js";

export function getProducts({ page = 1, limit = 8, signal } = {}) {
  const qs = new URLSearchParams({ page: String(page), limit: String(limit) });
  return http(`/api/products?${qs.toString()}`, { signal });
}
