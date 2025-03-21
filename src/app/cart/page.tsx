"use client"

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "~/components/ui/button"
import { useCart } from "~/components/cart/cart-context"
import { Separator } from "~/components/ui/separator"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-gray-400" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 hidden md:grid md:grid-cols-12 gap-4">
              <div className="col-span-6">
                <h3 className="font-medium">Product</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="font-medium">Price</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="font-medium">Quantity</h3>
              </div>
              <div className="col-span-2 text-right">
                <h3 className="font-medium">Total</h3>
              </div>
            </div>

            <div className="divide-y">
              {cartItems.map((item) => {
                const price =
                  item.product.discount > 0
                    ? item.product.price * (1 - item.product.discount / 100)
                    : item.product.price

                return (
                  <div key={item.product.id} className="p-6">
                    <div className="md:grid md:grid-cols-12 gap-4 flex flex-col">
                      <div className="col-span-6 flex gap-4">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden border">
                          <Image
                            src={item.product.images[0] || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-gray-500">{item.product.brand}</p>
                          <button
                            className="text-sm text-red-600 flex items-center mt-2"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 flex items-center justify-center">
                        <span className="font-medium">${price.toFixed(2)}</span>
                      </div>

                      <div className="col-span-2 flex items-center justify-center">
                        <div className="flex items-center border rounded-md">
                          <button
                            className="px-2 py-1"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 py-1 border-x">{item.quantity}</span>
                          <button
                            className="px-2 py-1"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 flex items-center justify-end">
                        <span className="font-medium">${(price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <Link href="/products">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>

              <Button className="w-full">Proceed to Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

