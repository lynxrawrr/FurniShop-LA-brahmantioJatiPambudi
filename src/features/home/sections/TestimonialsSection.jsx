import Container from "../../../components/layout/Container.jsx";
import { useTestimonials } from "../../testimonials/hooks/useTestimonials.js";
import TestimonialCard from "../../testimonials/components/TestimonialCard.jsx";
import TestimonialControls from "../../testimonials/components/TestimonialControls.jsx";
import livingImg from "../../../assets/gallery/living.png";

export default function TestimonialsSection() {
  const { items, meta, loading, error, prev, next, canPrev, canNext } =
    useTestimonials({
      initialPage: 1,
      limit: 1,
    });

  const item = items?.[0];

  return (
    <section
      id="testimonials"
      className="py-16 md:py-24"
      aria-labelledby="testimonials-title"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: content */}
          <div>
            <h2
              id="testimonials-title"
              className="text-3xl font-bold leading-tight text-dark md:text-4xl lg:text-5xl"
            >
              What People Are Saying About Us
            </h2>

            <div
              className="mt-12"
              aria-live="polite"
              aria-busy={loading || undefined}
              aria-atomic="true"
            >
              {error ? (
                <p className="mb-4 text-sm text-rose-600" role="alert">
                  {error}
                </p>
              ) : null}

              {loading ? (
                <div className="space-y-6" aria-hidden="true">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 animate-pulse rounded-full bg-gray-200" />
                    <div className="space-y-2">
                      <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
                      <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
                    </div>
                  </div>
                  <div className="h-24 w-full animate-pulse rounded bg-gray-200" />
                </div>
              ) : item ? (
                <div
                  aria-label={`Testimonial ${meta?.page || 1} of ${meta?.totalPages || 1}`}
                >
                  <TestimonialCard item={item} />
                </div>
              ) : null}

              {/* Controls (desktop) */}
              <TestimonialControls
                page={meta.page}
                totalPages={meta.totalPages}
                onPrev={prev}
                onNext={next}
                canPrev={canPrev}
                canNext={canNext}
                className="mt-12 hidden lg:flex"
              />
            </div>
          </div>

          {/* Right: image */}
          <div className="overflow-hidden rounded-lg shadow-soft">
            <img
              src={livingImg}
              alt="Modern living room"
              className="h-full w-full object-cover aspect-4/3 lg:aspect-auto"
              loading="lazy"
            />
          </div>

          {/* Controls (mobile) */}
          <TestimonialControls
            page={meta.page}
            totalPages={meta.totalPages}
            onPrev={prev}
            onNext={next}
            canPrev={canPrev}
            canNext={canNext}
            className="mt-8 flex justify-center lg:hidden"
          />
        </div>
      </Container>
    </section>
  );
}
