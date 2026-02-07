import { useHeader } from "./hooks/useHeader.js";
import { useStats } from "./hooks/useStats.js";
import HeroSection from "./sections/HeroSection.jsx";
import StatsSection from "./sections/StatsSection.jsx";
import { useCategories } from "./hooks/useCategories.js";
import AboutSection from "./sections/AboutSection.jsx";
import NewInStoreSection from "./sections/NewInStoreSection.jsx";
import BestManufacturerSection from "./sections/BestManufacturerSection.jsx";
import ProductsSection from "./sections/ProductsSection.jsx";
import TestimonialsSection from "./sections/TestimonialsSection.jsx";
import NewsletterSection from "./sections/NewsletterSection.jsx";

export default function HomePage() {
  const header = useHeader();
  const stats = useStats();
  const categories = useCategories();

  function handleShopNow() {
    const el = document.querySelector("#products");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main id="main">
      <HeroSection
        data={header.data}
        loading={header.loading}
        error={header.error}
        onShopNow={handleShopNow}
      />
      <StatsSection data={stats.data} loading={stats.loading} />

      <AboutSection />
      <NewInStoreSection
        items={categories.items}
        loading={categories.loading}
        error={categories.error}
      />
      <BestManufacturerSection />
      <ProductsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </main>
  );
}
