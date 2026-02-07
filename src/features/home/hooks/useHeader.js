import { useEffect, useState } from "react";
import { getHeader } from "../api/header.api.js";

export function useHeader() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setError("");
        setLoading(true);
        const res = await getHeader({ signal: controller.signal });
        setData(res || null);
      } catch (e) {
        if (e?.name === "AbortError") return;
        setError(e?.message || "Failed to load header.");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return { data, loading, error };
}
