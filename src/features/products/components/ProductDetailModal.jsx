import { useEffect, useMemo, useRef } from "react";
import { FiX, FiShoppingCart } from "react-icons/fi";
import { money, safeText } from "../../../utils/format.js";

export default function ProductDetailModal({ open, item, onClose, onAddToCart }) {
  const closeBtnRef = useRef(null);
  const dialogRef = useRef(null);

  const titleId = useMemo(() => "product-modal-title", []);
  const descId = useMemo(() => "product-modal-desc", []);

  useEffect(() => {
    if (!open) return;

    const prevActive = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getFocusable = () => {
      const root = dialogRef.current;
      if (!root) return [];
      return Array.from(
        root.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
    };

    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
        return;
      }

      if (e.key !== "Tab") return;

      const focusables = getFocusable();
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
        return;
      }

      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    const t = window.setTimeout(() => closeBtnRef.current?.focus?.(), 50);

    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;

      prevActive?.focus?.();
    };
  }, [open, onClose]);

  if (!open || !item) return null;

  const price = item?.price_after_discount ?? item?.price;
  const title = safeText(item?.title);
  const image = item?.image;
  const desc = safeText(item?.description || "No description available.");

  const discountPercent = item?.price_after_discount
    ? Math.round(((item.price - item.price_after_discount) / item.price) * 100)
    : 0;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      role="presentation"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity" />

      {/* Modal panel */}
      <article
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-300"
      >
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-dark shadow-sm backdrop-blur transition-all hover:bg-white hover:shadow-md md:right-6 md:top-6"
        >
          <FiX className="text-xl" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Left: image */}
          <div className="relative flex h-75 w-full items-center justify-center bg-gray-50 p-8 md:h-112.5">
            {discountPercent > 0 ? (
              <span className="absolute left-6 top-6 z-10 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-rose-500/30">
                {discountPercent}% OFF
              </span>
            ) : null}

            {image ? (
              <img
                src={image}
                alt={title}
                className="h-full w-full object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="text-muted">No Image Available</div>
            )}
          </div>

          {/* Right: details */}
          <div className="flex flex-col p-6 md:p-10">
            <h3
              id={titleId}
              className="mb-4 text-2xl font-bold leading-tight text-dark md:text-3xl"
            >
              {title}
            </h3>

            <div className="mb-6 flex items-center gap-4 border-b border-gray-100 pb-6">
              <p className="text-3xl font-bold text-brand">{money(price)}</p>

              {discountPercent > 0 ? (
                <div className="flex flex-col">
                  <p className="text-sm text-muted line-through decoration-rose-500/50">
                    {money(item?.price)}
                  </p>
                  <p className="text-xs font-semibold text-rose-500">
                    Save {money(item.price - price)}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              <h3 className="mb-2 text-sm font-semibold text-dark">Description</h3>
              <p id={descId} className="text-base leading-relaxed text-muted">
                {desc}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => {
                  onAddToCart?.(item);
                  onClose?.();
                }}
                className="sm:col-span-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#23262f] text-sm font-bold text-white shadow-lg shadow-brand/20 transition-all hover:scale-[1.01] hover:bg-dark/90"
              >
                <FiShoppingCart className="text-lg" />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 text-sm font-semibold text-dark transition-colors hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
