import { useEffect, useRef } from "react";
import Container from "../../../components/layout/Container.jsx";
import { FiArrowRight } from "react-icons/fi";

function CategoryCard({ title, image }) {
  return (
    <div className="group relative h-full w-full overflow-hidden rounded-lg bg-gray-100">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-90"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-6 text-center">
        <span className="text-xl font-bold text-white drop-shadow-lg">
          {title}
        </span>
      </div>
    </div>
  );
}

function CategorySkeleton() {
  return <div className="h-full w-full animate-pulse rounded-2xl bg-gray-200" />;
}

export default function NewInStoreSection({ items = [], loading, error }) {
  const scrollRef = useRef(null);

  // Auto-slide: geser per card tiap 3 detik
  useEffect(() => {
    if (loading || items.length === 0) return;

    const el = scrollRef.current;
    if (!el) return;

    const timer = setInterval(() => {
      if (!el.firstElementChild) return;

      const cardWidth = el.firstElementChild.clientWidth + 24; // + gap
      const maxLeft = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxLeft - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [loading, items.length]);

  return (
    <section className="overflow-hidden py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-12 md:flex-row md:items-center">
          {/* Left: text */}
          <div className="shrink-0 md:w-[20rem] lg:w-[24rem]">
            <h2 className="text-3xl font-bold leading-tight text-dark md:text-4xl lg:text-5xl">
              New In <br /> Store Now
            </h2>

            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              Get the latest items immediately with promo prices.
            </p>

            <a
              href="#products"
              className="group mt-8 inline-flex items-center gap-3 text-base font-bold text-dark"
            >
              Check All
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>

            {error ? (
              <p className="mt-4 text-sm font-medium text-rose-600">{error}</p>
            ) : null}
          </div>

          {/* Right: horizontal slider */}
          <div className="min-w-0 flex-1 md:-mr-32 lg:-mr-40">
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto pb-8 pr-12 pt-2 scroll-smooth scrollbar-hide md:gap-6"
              aria-label="New in store categories"
            >
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="w-56 shrink-0 lg:w-60">
                      <div className="h-80 lg:h-96">
                        <CategorySkeleton />
                      </div>
                    </div>
                  ))
                : items.slice(0, 4).map((c, idx) => (
                    <div key={`${c.title}-${idx}`} className="w-56 shrink-0 lg:w-60">
                      <div className="h-80 lg:h-96">
                        <CategoryCard title={c.title} image={c.image} />
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
