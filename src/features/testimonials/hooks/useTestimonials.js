import { useEffect, useMemo, useState } from "react";
import { getTestimonials } from "../api/testimonials.api.js";

export function useTestimonials({ initialPage = 1, limit = 1 } = {}) {
  const [page, setPage] = useState(initialPage);
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({
    page: initialPage,
    limit,
    totalItems: 0,
    totalPages: 1,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setError("");
        setLoading(true);

        const res = await getTestimonials({ page, limit, signal: controller.signal });

        setItems(res?.testimonials || []);
        setMeta({
          page: res?.page ?? page,
          limit: res?.limit ?? limit,
          totalItems: res?.totalItems ?? 0,
          totalPages: res?.totalPages ?? 1,
        });
      } catch (e) {
        if (e?.name === "AbortError") return;
        setError(e?.message || "Failed to load testimonials.");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [page, limit]);

  const canPrev = page > 1;
  const canNext = page < (meta.totalPages || 1);

  const actions = useMemo(
    () => ({
      setPage,
      prev: () => setPage((p) => Math.max(1, p - 1)),
      next: () => setPage((p) => Math.min(meta.totalPages || 1, p + 1)),
    }),
    [meta.totalPages]
  );

  return { page, items, meta, loading, error, canPrev, canNext, ...actions };
}
