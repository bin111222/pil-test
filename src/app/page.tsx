import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { CategoryGrid } from "@/components/CategoryGrid";
import { BestsellerCarousel } from "@/components/BestsellerCarousel";
import { WhyTrust } from "@/components/WhyTrust";
import { Testimonials } from "@/components/Testimonials";
import { getHomepageCollections, getBestsellerProducts } from "@/lib/shopify";

export default async function Home() {
  const [categories, bestsellers] = await Promise.all([
    getHomepageCollections(),
    getBestsellerProducts(),
  ]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main>
        <Hero />
        <TrustStrip />
        <CategoryGrid categories={categories} />
        <BestsellerCarousel products={bestsellers} />
        <WhyTrust />
        <Testimonials />
      </main>
    </div>
  );
}
