import { http } from "../../../lib/http/http.js";

export function getHeader({ signal } = {}) {
  return http("/api/header", { signal });
}
