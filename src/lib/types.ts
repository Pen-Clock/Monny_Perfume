export interface Product {
  id: string
  name: string
  description: string
  price: number
  discount: number
  brand: string
  category: string
  images: string[]
  colors: string[]
  sizes: string[]
  tags: string[]
  rating: number
  reviews: number
  inStock: boolean
  featured: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  description: string
}

export interface Brand {
  id: string
  name: string
  logo: string
  description: string
}

