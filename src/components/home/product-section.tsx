import Link from "next/link"
import ProductCard from "~/components/products/product-card"
import type { Product } from "~/lib/types"

interface ProductSectionProps {
  title: string
  viewAllLink: string
  products: Product[]
}

export default function ProductSection({ title, viewAllLink, products }: ProductSectionProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <Link href={viewAllLink} className="text-sm font-medium text-red-600 hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

