import { http } from "../../../lib/http/http.js";

export function subscribeEmail({ email, signal } = {}) {
  return http("/api/subscribe", {
    method: "POST",
    body: { email },
    signal,
  });
}
