import { http } from "../../../lib/http/http.js";

export function getCategories({ signal } = {}) {
  return http("/api/category", { signal });
}
