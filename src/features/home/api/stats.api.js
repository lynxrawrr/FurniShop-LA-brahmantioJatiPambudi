import { http } from "../../../lib/http/http.js";

export function getStats({ signal } = {}) {
  return http("/api/data", { signal });
}
