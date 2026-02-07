import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function TestimonialControls({
  onPrev,
  onNext,
  canPrev,
  canNext,
  className = "",
}) {
  const baseBtn =
    "inline-flex h-13 w-13 items-center justify-center rounded-full shadow-md transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

  return (
    <div className={`flex items-center gap-5 ${className}`} aria-label="Testimonial controls">
      {/* Prev */}
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous testimonial"
        className={[
          baseBtn,
          "bg-white text-dark hover:scale-105 hover:bg-gray-50",
          !canPrev ? "cursor-not-allowed opacity-50" : "",
        ].join(" ")}
      >
        <FiArrowLeft className="text-2xl" />
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next testimonial"
        className={[
          baseBtn,
          "bg-brand text-white hover:scale-105 hover:bg-brand-2",
          !canNext ? "cursor-not-allowed opacity-50" : "",
        ].join(" ")}
      >
        <FiArrowRight className="text-2xl" />
      </button>
    </div>
  );
}
