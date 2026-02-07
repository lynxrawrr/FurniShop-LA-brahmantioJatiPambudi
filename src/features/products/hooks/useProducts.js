import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../api/products.api.js";

export function useProducts({ initialPage = 1, limit = 8 } = {}) {
  const [page, setPage] = useState(initialPage);

  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({
    page: initialPage,
    totalPages: 1,
    totalItems: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setError("");
        setLoading(true);

        const res = await getProducts({
          page,
          limit,
          signal: controller.signal,
        });

        setItems(res?.products || []);
        setMeta({
          page: res?.page ?? page,
          totalPages: res?.totalPages ?? 1,
          totalItems: res?.totalItems ?? 0,
        });
      } catch (e) {
        if (e?.name === "AbortError") return;
        setError(e?.message || "Failed to load products.");
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
    [meta.totalPages],
  );

  return { page, items, meta, loading, error, canPrev, canNext, ...actions };
}
