import { useEffect, useState } from "react";
import { getCategories } from "../api/categories.api.js";

export function useCategories() {
  const [items, setItems] = useState([]); // [{title,image}]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setError("");
        setLoading(true);
        const res = await getCategories({ signal: controller.signal });
        setItems(res?.category || []);
      } catch (e) {
        if (e?.name === "AbortError") return;
        setError(e?.message || "Failed to load categories.");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return { items, loading, error };
}
