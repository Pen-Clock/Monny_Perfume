import HeroBanner from "~/components/home/hero-banner"
import ProductSection from "~/components/home/product-section"
import { featuredProducts } from "~/lib/mock-data"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      //<HeroBanner />
      <ProductSection title="Shop The Latest" viewAllLink="/products" products={featuredProducts.slice(0, 4)} />
      <ProductSection
        title="Trending Now"
        viewAllLink="/products?category=trending"
        products={featuredProducts.slice(4, 8)}
      />
      <ProductSection title="Popular Brands" viewAllLink="/brands" products={featuredProducts.slice(8, 12)} />
    </div>
  )
}

