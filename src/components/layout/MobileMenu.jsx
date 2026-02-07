import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

// Helper: ambil elemen yang bisa di-focus untuk focus-trap
function getFocusable(container) {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => {
    const style = window.getComputedStyle(el);
    return style.display !== "none" && style.visibility !== "hidden";
  });
}

export default function MobileMenu({ open, onClose, links = [] }) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastActiveRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    lastActiveRef.current = document.activeElement;

    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
        return;
      }

      if (e.key === "Tab") {
        const focusables = getFocusable(panelRef.current);
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;

        const inside = panelRef.current?.contains(active);

        if (e.shiftKey) {
          if (!inside || active === first) {
            e.preventDefault();
            last.focus();
          }
          return;
        }

        if (!inside) {
          e.preventDefault();
          first.focus();
          return;
        }

        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = window.setTimeout(() => closeBtnRef.current?.focus?.(), 0);

    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;

      const el = lastActiveRef.current;
      if (el && typeof el.focus === "function") el.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-200 flex items-start justify-end p-4"
      onMouseDown={(e) => {
        if (!panelRef.current) return;
        if (!panelRef.current.contains(e.target)) onClose?.();
      }}
    >
      {/* <div className="absolute inset-0 bg-black/40" aria-hidden="true" /> */}

      {/* Panel menu  */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        className="
          relative z-10
          w-full max-w-xs
          bg-white
          shadow-2xl
          rounded-3xl
          overflow-hidden
          origin-top-right
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div
            id="mobile-menu-title"
            className="font-bold text-lg tracking-tight text-gray-900"
          >
            FurniShop
          </div>

          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            aria-label="Close menu"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* Navigasi link */}
        <nav className="px-4 py-4" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={onClose}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-brand transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <div className="px-6 pb-6 pt-2">
          <a
            href="#products"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-xl bg-brand py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 hover:bg-brand/90 transition-all"
          >
            Shop Now
          </a>
        </div>
      </aside>
    </div>
  );
}
