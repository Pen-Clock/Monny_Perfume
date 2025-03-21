"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "~/components/ui/button"
import { useCart } from "~/components/cart/cart-context"
import type { Product } from "~/lib/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addToCart } = useCart()

  return (
    <div className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="aspect-square overflow-hidden rounded-md bg-gray-100 relative">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white rounded-full h-8 w-8 shadow-sm"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
        </Button>

        {isHovered && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-white bg-opacity-90 transform transition-transform duration-300">
            <Button className="w-full text-xs" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          </div>
        )}
      </div>

      <div className="mt-2">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-sm font-medium truncate">{product.name}</h3>
          <p className="text-sm text-gray-500 truncate">{product.brand}</p>
          <div className="flex items-center mt-1">
            {product.discount > 0 ? (
              <>
                <span className="text-sm font-medium text-red-600">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
                <span className="ml-2 text-xs text-gray-500 line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-sm font-medium">${product.price.toFixed(2)}</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  )
}

