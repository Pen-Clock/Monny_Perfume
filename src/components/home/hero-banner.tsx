import Link from "next/link"
import Image from "next/image"
import womenClothingImage from './pngtree-orange-simple-and-atmospheric-women-s-clothing-autumn-and-winter-fashion-image_906464.jpg';
export default function HeroBanner() {
  return (
    <div className="relative w-full h-[500px] bg-pink-100">
      <Image
        src={womenClothingImage}
        alt="International Women's Day Sale"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <Link href="/products?category=women&sale=true" className="mt-8">
          <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  )
}

