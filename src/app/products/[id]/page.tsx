import { notFound } from "next/navigation"
import { allProducts } from "~/lib/mock-data"
import AddToCartButton from "~/components/products/add-to-cart-button"
import ProductGallery from "~/components/products/product-gallery"
import RelatedProducts from "~/components/products/related-products"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = allProducts.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  // Find related products (same category, different product)
  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <ProductGallery images={product.images} />

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-500 mt-1">{product.brand}</p>
          </div>

          <div className="flex items-center">
            <div className="flex items-center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
            </div>
            <span className="text-gray-500 ml-2">({product.reviews} reviews)</span>
          </div>

          <div>
            {product.discount > 0 ? (
              <div className="flex items-center">
                <span className="text-2xl font-bold text-red-600">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
                <span className="ml-2 text-gray-500 line-through">${product.price.toFixed(2)}</span>
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                  {product.discount}% OFF
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {product.colors.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Colors</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button key={color} className="border rounded-md px-3 py-1 text-sm hover:bg-gray-50">
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes.length > 0 && product.sizes[0] !== "One Size" && (
            <div>
              <h3 className="text-sm font-medium mb-2">Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button key={size} className="border rounded-md px-3 py-1 text-sm hover:bg-gray-50">
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AddToCartButton product={product} />

          <div className="pt-6 border-t">
            <h3 className="text-sm font-medium mb-2">Product Details</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Category: {product.category}</li>
              <li>Brand: {product.brand}</li>
              <li>Tags: {product.tags.join(", ")}</li>
              <li>In Stock: {product.inStock ? "Yes" : "No"}</li>
            </ul>
          </div>
        </div>
      </div>

      <RelatedProducts products={relatedProducts} />
    </div>
  )
}

