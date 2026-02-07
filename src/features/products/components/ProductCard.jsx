import { FiPlus } from "react-icons/fi";
import { money, safeText } from "../../../utils/format.js";

export default function ProductCard({ item, onOpenDetail, onAddToCart }) {
  const title = safeText(item?.title);
  const price = item?.price_after_discount ?? item?.price;

  const handleOpenDetail = () => onOpenDetail?.(item);

  const handleKeyDown = (e) => {
    // biar Enter/Space di card kebuka, tapi jangan ganggu kalau fokusnya ada di button
    const isInteractive = e.target?.closest?.("button,a,input,select,textarea");
    if (isInteractive) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // prevent scroll on Space
      handleOpenDetail();
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart?.(item);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleOpenDetail}
      onKeyDown={handleKeyDown}
      aria-label={`Open detail for ${title}`}
      className={[
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl",
        "border border-gray-100 bg-white",
        "transition-all duration-300 hover:shadow-lg",
      ].join(" ")}
    >
      <div
        className={[
          "relative flex w-full items-center justify-center bg-white",
          "h-40 p-4 md:h-64 md:p-6",
        ].join(" ")}
      >
        <img
          src={item?.image}
          alt={title}
          loading="lazy"
          className={[
            "h-full w-full object-contain",
            "transition-transform duration-500 group-hover:scale-110",
          ].join(" ")}
        />

        <button
          type="button"
          onClick={handleAddToCart}
          aria-label={`Add ${title}`}
          className={[
            "absolute bottom-3 right-3 md:bottom-4 md:right-4",
            "inline-flex items-center justify-center",
            "h-8 w-8 md:h-10 md:w-10",
            "rounded-full bg-gray-100 text-dark",
            "transition-colors hover:bg-brand hover:text-white",
          ].join(" ")}
        >
          <FiPlus className="text-lg md:text-xl" />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-4 pt-2 md:px-5 md:pb-6">
        <h3 className="line-clamp-1 text-base font-bold text-dark md:text-lg">
          {title}
        </h3>

        <div className="mt-1 flex items-center gap-2 md:mt-2 md:gap-3">
          <p className="text-sm text-dark md:text-base">{money(price)}</p>

          {item?.price_after_discount ? (
            <p className="text-xs text-muted-2 line-through md:text-sm">
              {money(item?.price)}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
