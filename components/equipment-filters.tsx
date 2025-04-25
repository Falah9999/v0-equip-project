"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LocationDropdown, type LocationGovernorate } from "@/components/location-dropdown"
import { EquipmentCategoryDropdown, type EquipmentCategory } from "@/components/equipment-category-dropdown"
import type { Locale } from "@/lib/i18n-config"

interface EquipmentFiltersProps {
  dict: {
    title: string
    categories: { [key: string]: string }
    priceRange: string
    availability: string
    clear: string
    apply: string
    locations: { title: string }
  }
  lang: Locale
  locations: LocationGovernorate[]
  categories: EquipmentCategory[]
}

export default function EquipmentFilters({ dict, lang, locations, categories }: EquipmentFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current filter values from URL
  const currentCategory = searchParams.get("category") || ""
  const currentLocation = searchParams.get("location") || ""
  const currentMinPrice = Number(searchParams.get("minPrice") || "0")
  const currentMaxPrice = Number(searchParams.get("maxPrice") || "500")
  const currentAvailable = searchParams.get("available") === "true"

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string>(currentCategory)
  const [selectedLocation, setSelectedLocation] = useState<string>(currentLocation)
  const [priceRange, setPriceRange] = useState<[number, number]>([currentMinPrice, currentMaxPrice])
  const [availableOnly, setAvailableOnly] = useState<boolean>(currentAvailable)

  const handleApplyFilters = () => {
    const params = new URLSearchParams()

    if (selectedCategory) {
      params.set("category", selectedCategory)
    }

    if (selectedLocation) {
      params.set("location", selectedLocation)
    }

    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    if (availableOnly) {
      params.set("available", "true")
    }

    router.push(`/${lang}/equipment?${params.toString()}`)
  }

  const handleClearFilters = () => {
    setSelectedCategory("")
    setSelectedLocation("")
    setPriceRange([0, 500])
    setAvailableOnly(false)
    router.push(`/${lang}/equipment`)
  }

  return (
    <div className="bg-card rounded-lg border p-4">
      <h2 className="font-semibold text-lg mb-4">{dict.title}</h2>

      <Accordion type="multiple" defaultValue={["categories", "locations", "price"]}>
        <AccordionItem value="categories">
          <AccordionTrigger className="py-2">{dict.categories.title}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <EquipmentCategoryDropdown
                value={selectedCategory}
                onChange={setSelectedCategory}
                lang={lang}
                showIcon={false}
                categories={categories}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="locations">
          <AccordionTrigger className="py-2">{dict.locations.title}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <LocationDropdown
                value={selectedLocation}
                onChange={setSelectedLocation}
                lang={lang}
                showIcon={false}
                governorates={locations}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="py-2">{dict.priceRange}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 px-1">
              <Slider
                value={priceRange}
                min={0}
                max={500}
                step={10}
                onValueChange={(value) => setPriceRange(value as [number, number])}
              />
              <div className="flex justify-between text-sm">
                <span>{priceRange[0]} KWD</span>
                <span>{priceRange[1]} KWD</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="available-only"
            checked={availableOnly}
            onCheckedChange={(checked) => setAvailableOnly(checked as boolean)}
          />
          <label htmlFor="available-only" className="text-sm cursor-pointer">
            {dict.availability}
          </label>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <Button onClick={handleApplyFilters} className="w-full">
          {dict.apply}
        </Button>
        <Button variant="outline" onClick={handleClearFilters} className="w-full">
          {dict.clear}
        </Button>
      </div>
    </div>
  )
}
