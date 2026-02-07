export default function ProductCardSkeleton() {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white"
      aria-hidden="true"
    >
      {/* Image placeholder */}
      <div className="relative h-40 w-full animate-pulse bg-gray-100 md:h-64" />

      {/* Text placeholders */}
      <div className="flex flex-col px-3 pb-4 pt-2 md:px-5 md:pb-6">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100 md:h-5" />
        <div className="mt-2 h-3 w-1/4 animate-pulse rounded bg-gray-100 md:h-4" />
      </div>
    </div>
  );
}
