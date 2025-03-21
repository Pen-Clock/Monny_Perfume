"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "~/components/ui/checkbox"
import { Slider } from "~/components/ui/slider"
import type { Category } from "~/lib/types"

interface ProductFiltersProps {
  categories: Category[]
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([0, 200])

  const currentCategory = searchParams.get("category")

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (category === currentCategory) {
      params.delete("category")
    } else {
      params.set("category", category)
    }

    router.push(`/products?${params.toString()}`)
  }

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)

    const params = new URLSearchParams(searchParams.toString())
    params.set("minPrice", values[0].toString())
    params.set("maxPrice", values[1].toString())

    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={category.slug === currentCategory}
                onCheckedChange={() => handleCategoryChange(category.slug)}
              />
              <label
                htmlFor={category.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        <Slider
          defaultValue={[0, 200]}
          max={200}
          step={1}
          value={priceRange}
          onValueChange={handlePriceChange}
          className="mb-6"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm">${priceRange[0]}</span>
          <span className="text-sm">${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Availability</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" />
            <label
              htmlFor="in-stock"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              In Stock
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="on-sale" />
            <label
              htmlFor="on-sale"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              On Sale
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

