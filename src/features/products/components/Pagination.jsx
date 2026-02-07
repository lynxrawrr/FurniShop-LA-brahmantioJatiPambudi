import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function Pagination({ page, totalPages, onPrev, onNext, onPage }) {
  const dots = Array.from({ length: totalPages }).slice(0, 5);

  return (
    <div className="mt-16 flex items-center justify-center gap-6">
      {/* Prev */}
      <button
        type="button"
        onClick={onPrev}
        disabled={page === 1}
        className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-dark transition-colors hover:border-dark hover:bg-dark hover:text-white disabled:opacity-50"
        aria-label="Previous page"
      >
        <FiArrowLeft className="text-xl" />
      </button>

      {/* Dots */}
      <div className="flex items-center gap-3" aria-label="Pagination pages">
        {dots.map((_, i) => {
          const p = i + 1;
          const active = p === page;

          return (
            <button
              key={p}
              type="button"
              onClick={() => onPage(p)}
              className={`h-3 rounded-full transition-all duration-300 ${
                active ? "w-3 bg-dark" : "w-3 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to page ${p}`}
              aria-current={active ? "page" : undefined}
            />
          );
        })}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={onNext}
        disabled={page === totalPages}
        className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-dark transition-colors hover:border-dark hover:bg-dark hover:text-white disabled:opacity-50"
        aria-label="Next page"
      >
        <FiArrowRight className="text-xl" />
      </button>
    </div>
  );
}
