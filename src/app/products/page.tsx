import { Suspense } from "react"
import { allProducts, categories } from "~/lib/mock-data"
import ProductGrid from "~/components/products/product-grid"
import ProductFilters from "~/components/products/product-filters"
import ProductSort from "~/components/products/product-sort"
import { Skeleton } from "~/components/ui/skeleton"

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Parse search params
  const categoryParam = searchParams.category as string | undefined
  const sortParam = searchParams.sort as string | undefined
  const searchParam = searchParams.search as string | undefined

  // Filter products based on search params
  let filteredProducts = [...allProducts]

  if (categoryParam) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase() === categoryParam.toLowerCase(),
    )
  }

  if (searchParam) {
    const searchLower = searchParam.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
    )
  }

  // Sort products
  if (sortParam) {
    switch (sortParam) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "newest":
        // In a real app, you'd sort by date
        filteredProducts.sort((a, b) => b.id.localeCompare(a.id))
        break
      case "popular":
        filteredProducts.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        // Default to featured
        filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
  } else {
    // Default sort is by featured
    filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {categoryParam ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Products` : "All Products"}
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0">
          <ProductFilters categories={categories} />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">{filteredProducts.length} products</p>
            <ProductSort />
          </div>

          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid products={filteredProducts} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array(12)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-square rounded-md" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
    </div>
  )
}

