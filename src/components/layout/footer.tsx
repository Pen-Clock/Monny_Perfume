import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:underline">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-sm hover:underline">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:underline">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm hover:underline">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm hover:underline">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-sm hover:underline">
                  Warranty
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=men" className="text-sm hover:underline">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/products?category=women" className="text-sm hover:underline">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/products?category=beauty" className="text-sm hover:underline">
                  Beauty
                </Link>
              </li>
              <li>
                <Link href="/products?category=gifts" className="text-sm hover:underline">
                  Gifts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <Link href="https://facebook.com" className="hover:text-gray-300">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://instagram.com" className="hover:text-gray-300">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" className="hover:text-gray-300">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://youtube.com" className="hover:text-gray-300">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>

            <h3 className="font-bold text-lg mb-2">Newsletter</h3>
            <p className="text-sm mb-2">Subscribe to get special offers and updates</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="px-3 py-2 text-black text-sm flex-1" />
              <button className="bg-white text-black px-4 py-2 text-sm font-medium">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="BCS Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>

          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Branded Cambo Supply. All rights reserved.
          </div>

          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link href="/terms" className="text-sm text-gray-400 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-400 hover:underline">
              Privacy
            </Link>
            <Link href="/cookies" className="text-sm text-gray-400 hover:underline">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

