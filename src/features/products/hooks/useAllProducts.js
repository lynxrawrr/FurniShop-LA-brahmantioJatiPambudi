import { useCallback, useEffect, useRef, useState } from "react";
import { getProducts } from "../api/products.api.js";

export function useAllProducts() {
  const cacheRef = useRef(null);
  const controllerRef = useRef(null);
  const mountedRef = useRef(true);

  const [loadingAll, setLoadingAll] = useState(false);
  const [errorAll, setErrorAll] = useState("");

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      controllerRef.current?.abort?.();
    };
  }, []);

  const loadAll = useCallback(async () => {
    if (cacheRef.current) return cacheRef.current;

    controllerRef.current?.abort?.();
    const controller = new AbortController();
    controllerRef.current = controller;

    if (mountedRef.current) {
      setLoadingAll(true);
      setErrorAll("");
    }

    try {
      const limit = 50;
      let page = 1;
      let all = [];
      let totalPages = null;

      while (true) {
        const res = await getProducts({
          page,
          limit,
          signal: controller.signal,
        });
        const batch = res?.products || [];
        const meta = res?.meta || {};

        all = all.concat(batch);
        totalPages = meta?.totalPages ?? totalPages;

        if (typeof totalPages === "number") {
          if (page >= totalPages) break;
        } else {
          if (batch.length < limit) break;
        }

        page += 1;
        if (controller.signal.aborted) break;
      }

      if (controller.signal.aborted) return [];

      cacheRef.current = all;
      return all;
    } catch (e) {
      if (e?.name === "AbortError" || controller.signal.aborted) return [];
      if (mountedRef.current)
        setErrorAll(e?.message || "Failed to load all products.");
      return [];
    } finally {
      if (controllerRef.current === controller) controllerRef.current = null;
      if (mountedRef.current) setLoadingAll(false);
    }
  }, []);

  const clearCache = useCallback(() => {
    cacheRef.current = null;
  }, []);

  const cancel = useCallback(() => {
    controllerRef.current?.abort?.();
    controllerRef.current = null;
    if (mountedRef.current) setLoadingAll(false);
  }, []);

  return { loadAll, clearCache, cancel, loadingAll, errorAll };
}
