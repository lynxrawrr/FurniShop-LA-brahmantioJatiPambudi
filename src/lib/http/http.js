import { env } from "../config/env.js";

function safeJsonParse(text) {
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

export async function http(path, { method = "GET", body, headers, signal } = {}) {
  const url = path.startsWith("http") ? path : `${env.API_BASE_URL}${path}`;

  const res = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  const text = await res.text().catch(() => "");
  const data = safeJsonParse(text);

  if (!res.ok) {
    const msg = data?.message || `HTTP ${res.status} ${res.statusText}`;
    throw new Error(msg);
  }
  return data;
}
