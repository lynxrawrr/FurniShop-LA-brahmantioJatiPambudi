import Container from "../../../components/layout/Container.jsx";

export default function StatsSection({ data, loading }) {
  // Data stats
  const stats = [
    {
      value: loading ? "..." : (data?.experience ?? "-"),
      label: "Year\nExperience",
    },
    {
      value: loading ? "..." : (data?.country ?? "-"),
      label: "Opened in\nthe country",
    },
    {
      value: loading ? "..." : (data?.sold ?? "-"),
      label: "Furniture\nsold",
    },
    {
      value: loading ? "..." : (data?.variant ?? "-"),
      label: "Variant\nFurniture",
    },
  ];

  return (
    <section className="relative z-10 -mt-20 md:-mt-24">
      <Container>
        {/* Card wrapper */}
        <div className="rounded-3xl bg-brand p-8 shadow-2xl md:p-12">
          {/* Grid layout */}
          <dl className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`
        relative flex flex-col items-center justify-center text-center
        border-white/20
        ${index % 2 === 0 ? "border-r" : ""}
        md:border-r md:last:border-none
      `}
              >
                <dd className="mb-2 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  {stat.value}
                </dd>
                <dt className="whitespace-pre-line text-sm leading-tight text-white/90 md:text-base">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
