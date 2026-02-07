import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Container from "../../../components/layout/Container.jsx";
import ProductGrid from "../../products/components/ProductGrid.jsx";
import Pagination from "../../products/components/Pagination.jsx";
import ProductDetailModal from "../../products/components/ProductDetailModal.jsx";
import Toast from "../../../components/Toast.jsx";
import { useProducts } from "../../products/hooks/useProducts.js";
import { useDebouncedValue } from "../../products/hooks/useDebouncedValue.js";
import { useAllProducts } from "../../products/hooks/useAllProducts.js";
import { sanitizeText } from "../../../utils/sanitize.js";
import { safeText, truncateText } from "../../../utils/format.js"; // sesuaikan path

export default function ProductsSection() {
  const { page, items, meta, loading, error, prev, next, setPage } =
    useProducts({
      initialPage: 1,
      limit: 8,
    });

  const [selected, setSelected] = useState(null);

  // State
  const [toast, setToast] = useState({ open: false, msg: "", action: null });
  const [query, setQuery] = useState("");

  const qRaw = useDebouncedValue(query, 250);
  const q = sanitizeText(qRaw);
  const searchMode = Boolean(q);

  const { loadAll, loadingAll, errorAll } = useAllProducts();
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    if (!searchMode) return;
    let alive = true;
    (async () => {
      const all = await loadAll();
      if (alive) setAllItems(all);
    })();
    return () => {
      alive = false;
    };
  }, [searchMode, loadAll]);

  const filteredAll = useMemo(() => {
    if (!searchMode) return [];
    const term = q.toLowerCase();
    return (allItems || []).filter((p) => {
      const title = String(p?.title || "").toLowerCase();
      const category = String(p?.category || "").toLowerCase();
      return title.includes(term) || category.includes(term);
    });
  }, [allItems, q, searchMode]);

  const displayItems = searchMode ? filteredAll : items;
  const displayLoading = searchMode ? loadingAll : loading;
  const displayError = searchMode ? errorAll : error;

  // Add To Cart
  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);

    const title = truncateText(safeText(product?.title), 8);

    setToast({
      open: true,
      msg: `${title} added to cart`,
      action: {
        label: "View Cart",
        onClick: () => {
          alert("Navigate ke Cart Page");
        },
      },
    });

    setSelected(null);
  };

  return (
    <section id="products" className="py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-dark md:text-4xl lg:text-5xl">
            All Product
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            The products we provide only for you as our service are selected
            from the best products with number 1 quality in the world.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-8 flex w-full max-w-xl items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition-all focus-within:border-dark focus-within:shadow-md">
            <FiSearch className="shrink-0 text-xl text-muted" />
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <input
              id="product-search"
              value={query}
              onChange={(e) => setQuery(e.target.value.slice(0, 50))}
              placeholder="Search by product name..."
              className="w-full bg-transparent text-base text-dark placeholder:text-muted focus:outline-none"
              autoComplete="off"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="shrink-0 rounded-lg bg-gray-100 px-3 py-1 text-xs font-bold text-muted transition-colors hover:bg-rose-100 hover:text-rose-600"
                aria-label="Clear search"
              >
                Clear
              </button>
            ) : null}
          </div>

          {/* Result */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted md:text-base">
              {searchMode ? (
                loadingAll ? (
                  <span className="animate-pulse">
                    Searching across all products...
                  </span>
                ) : (
                  <>
                    Found{" "}
                    <span className="font-bold text-dark">
                      {filteredAll.length}
                    </span>{" "}
                    result(s) for{" "}
                    <span className="font-bold text-dark">“{q}”</span>
                  </>
                )
              ) : (
                <>
                  Showing{" "}
                  <span className="font-bold text-dark">{items.length}</span>{" "}
                  products
                  <span className="mx-2 opacity-30">•</span>
                  Total{" "}
                  <span className="font-bold text-dark">
                    {meta?.totalItems ?? meta?.total}
                  </span>{" "}
                  products
                </>
              )}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mt-12 md:mt-16">
          {displayError ? (
            <div className="mx-auto mb-10 max-w-lg rounded-2xl bg-rose-50 p-6 text-center text-rose-600">
              <p>Something went wrong: {displayError}</p>
            </div>
          ) : null}

          {/* Product Grid */}
          <ProductGrid
            items={displayItems}
            loading={displayLoading}
            onOpenDetail={(p) => setSelected(p)}
            onAddToCart={handleAddToCart}
          />

          {!searchMode && !displayLoading ? (
            <Pagination
              page={meta.page || page}
              totalPages={meta.totalPages || 1}
              onPrev={prev}
              onNext={next}
              onPage={setPage}
            />
          ) : null}

          {!displayLoading && searchMode && filteredAll.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex w-full max-w-xl flex-col items-center justify-center rounded-3xl bg-gray-50 px-6 py-16 md:px-12">
                <FiSearch className="mb-6 text-6xl text-gray-300" />
                <p className="text-lg text-muted md:text-xl">
                  No products match{" "}
                  <span className="font-bold text-dark">“{q}”</span>
                </p>
                <p className="mt-2 text-sm text-muted/60">
                  Try checking your spelling or use different keywords.
                </p>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-brand px-8 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-dark/90"
                >
                  Reset Search
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </Container>

      {/* Product Detail Modal */}
      <ProductDetailModal
        open={Boolean(selected)}
        item={selected}
        onClose={() => setSelected(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Toast */}
      <Toast
        open={toast.open}
        message={toast.msg}
        action={toast.action}
        onClose={() => setToast({ open: false, msg: "", action: null })}
      />
    </section>
  );
}
