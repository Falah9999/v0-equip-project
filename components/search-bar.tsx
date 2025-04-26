"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { LocationDropdown, type LocationGovernorate } from "@/components/location-dropdown"
import { EquipmentCategoryDropdown, type EquipmentCategory } from "@/components/equipment-category-dropdown"
import type { Locale } from "@/lib/i18n-config"

interface SearchBarProps {
  dict: {
    placeholder: string
    category: string
    location: string
    date: string
    search: string
    categories: { [key: string]: string }
  }
  lang: Locale
  locations: LocationGovernorate[]
  categories: EquipmentCategory[]
}

export default function SearchBar({ dict, lang, locations, categories }: SearchBarProps) {
  const router = useRouter()
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [mounted, setMounted] = useState(false)

  // Only run after client-side hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Build query parameters
    const params = new URLSearchParams()
    if (category) params.append("category", category)
    if (location) params.append("location", location)
    if (date) params.append("date", date.toISOString().split("T")[0])

    // Navigate to equipment page with filters
    router.push(`/${lang}/equipment?${params.toString()}`)
  }

  // Don't render the full component until after client-side hydration
  if (!mounted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="h-10 bg-muted rounded-md animate-pulse"></div>
          <div className="h-10 bg-muted rounded-md animate-pulse"></div>
          <div className="h-10 bg-muted rounded-md animate-pulse"></div>
          <div className="h-10 bg-primary/30 rounded-md animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <EquipmentCategoryDropdown
            value={category}
            onChange={setCategory}
            lang={lang}
            placeholder={dict.category}
            categories={categories}
          />
        </div>

        <div className="relative">
          <LocationDropdown
            value={location}
            onChange={setLocation}
            lang={lang}
            placeholder={dict.location}
            governorates={locations}
          />
        </div>

        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                {date ? date.toLocaleDateString() : dict.date}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <Button type="submit" className="w-full">
          {dict.search}
        </Button>
      </div>
    </form>
  )
}
