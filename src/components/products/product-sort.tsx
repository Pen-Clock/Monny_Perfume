"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

export default function ProductSort() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentSort = searchParams.get("sort") || "featured"

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === "featured") {
      params.delete("sort")
    } else {
      params.set("sort", value)
    }

    router.push(`/products?${params.toString()}`)
  }

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="featured">Featured</SelectItem>
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="popular">Most Popular</SelectItem>
      </SelectContent>
    </Select>
  )
}

