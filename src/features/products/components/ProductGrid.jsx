import ProductCard from "./ProductCard.jsx";
import ProductCardSkeleton from "./ProductCardSkeleton.jsx";

export default function ProductGrid({
  items = [],
  loading,
  onOpenDetail,
  onAddToCart,
}) {
  const gridClass =
    "grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-y-10";

  if (loading) {
    return (
      <div
        className={gridClass}
        aria-label="Loading products"
        aria-hidden="true"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={gridClass} aria-label="Products grid">
      {items.map((p) => (
        <ProductCard
          key={p.id}
          item={p}
          onOpenDetail={onOpenDetail}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
