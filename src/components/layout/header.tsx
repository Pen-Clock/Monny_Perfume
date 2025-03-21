"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { useCart } from "~/components/cart/cart-context"

const mainNavItems = [
  { label: "Home", href: "/" },
  { label: "Men", href: "/products?category=men" },
  { label: "Women", href: "/products?category=women" },
  { label: "Beauty", href: "/products?category=beauty" },
  { label: "Gifts", href: "/products?category=gifts" },
  { label: "Trendy With Us", href: "/trendy" },
  { label: "Designers", href: "/designers" },
  { label: "Service", href: "/service" },
  { label: "Technology", href: "/products?category=technology" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { cartItems } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center border-b">
        <Link href="/" className="flex items-center">
          <div className="relative h-12 w-12">
            <Image
              src="/placeholder.svg?height=48&width=48"
              alt="BCS Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/telegram" className="text-sm hover:underline">
            Telegram Hotline
          </Link>

          <div className="relative w-64">
            <Input type="search" placeholder="Search" className="pr-8" />
            <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>

        <div className="md:hidden flex items-center gap-2">
          {searchOpen ? (
            <div className="fixed inset-0 bg-white z-50 p-4">
              <div className="flex items-center gap-2">
                <Input type="search" placeholder="Search" className="flex-1" autoFocus />
                <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>
          )}

          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <nav className="hidden md:block border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <ul className="flex space-x-8">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="py-4 inline-block text-sm font-medium hover:text-gray-600">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-10">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="BCS Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="p-4">
            <ul className="space-y-4">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-2 text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t grid grid-cols-4 gap-4">
              <Button variant="outline" size="icon" className="flex flex-col items-center justify-center h-20">
                <User className="h-6 w-6 mb-1" />
                <span className="text-xs">Account</span>
              </Button>
              <Button variant="outline" size="icon" className="flex flex-col items-center justify-center h-20">
                <Heart className="h-6 w-6 mb-1" />
                <span className="text-xs">Wishlist</span>
              </Button>
              <Link href="/cart" className="col-span-2">
                <Button variant="outline" size="icon" className="w-full flex items-center justify-center h-20 gap-2">
                  <ShoppingBag className="h-6 w-6" />
                  <span>Cart ({cartItems.length})</span>
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

