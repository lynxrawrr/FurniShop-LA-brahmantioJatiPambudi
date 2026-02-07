import Container from "../../../components/layout/Container.jsx";

export default function HeroSection({ data, loading, error, onShopNow }) {
  const title = data?.title || "Creative Home Simplify your Furniture";
  const desc =
    data?.description ||
    "Do i have consent to record this meeting gain locaion, root-and-branch, review, nor game plan who's goto";

  return (
    <section aria-label="Hero" className="relative">
      <div className="relative bg-dark">
        {/* Background banner */}
        {data?.banner ? (
          <img
            src={data.banner}
            alt="Furniture banner"
            className="h-screen w-full object-cover opacity-90"
            loading="eager"
          />
        ) : (
          <div className="h-screen w-full bg-dark" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

        {/* Content */}
        <div className="absolute inset-0">
          <Container className="flex h-full items-center justify-center pb-20">
            <div className="mx-auto max-w-4xl text-center text-white">
              {loading ? (
                <>
                  <div className="mx-auto h-12 w-3/4 animate-pulse rounded-2xl bg-white/20" />
                  <div className="mx-auto mt-6 h-4 w-2/3 animate-pulse rounded bg-white/15" />
                  <div className="mx-auto mt-2 h-4 w-1/2 animate-pulse rounded bg-white/15" />
                  <div className="mx-auto mt-10 h-12 w-32 animate-pulse rounded-xl bg-white/15" />
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                    {title}
                  </h1>

                  <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
                    {desc}
                  </p>

                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={onShopNow}
                      className="
                        rounded-xl
                        bg-white/20
                        px-8 py-3
                        text-sm font-bold text-white
                        shadow-soft
                        backdrop-blur-md
                        transition-all
                        hover:scale-105 hover:bg-white/30
                        md:text-base
                      "
                    >
                      Shop Now
                    </button>
                  </div>
                </>
              )}

              {error ? (
                <p className="mt-4 text-sm font-medium text-rose-300">{error}</p>
              ) : null}
            </div>
          </Container>
        </div>

        {/* Bottom gradient */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-linear-to-b from-transparent to-white md:h-40" />
      </div>
    </section>
  );
}
