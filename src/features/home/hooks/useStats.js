import { useEffect, useState } from "react";
import { getStats } from "../api/stats.api.js";

export function useStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setError("");
        setLoading(true);
        const res = await getStats({ signal: controller.signal });
        setData(res || null);
      } catch (e) {
        if (e?.name === "AbortError") return;
        setError(e?.message || "Failed to load stats.");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return { data, loading, error };
}
