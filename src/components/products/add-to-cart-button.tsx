"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { useCart } from "~/components/cart/cart-context"
import type { Product } from "~/lib/types"
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react"

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="flex items-center border rounded-md">
          <button className="px-3 py-2" onClick={decreaseQuantity} disabled={quantity <= 1}>
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-4 py-2 border-x">{quantity}</span>
          <button className="px-3 py-2" onClick={increaseQuantity}>
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1" onClick={handleAddToCart}>
          <ShoppingBag className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
        <Button variant="outline">
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

