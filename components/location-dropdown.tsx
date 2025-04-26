"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Locale } from "@/lib/i18n-config"

// Define types for location data to avoid direct imports
export interface LocationArea {
  id: string
  nameAr: string
  nameEn: string
}

export interface LocationGovernorate {
  id: string
  nameAr: string
  nameEn: string
  areas: LocationArea[]
}

interface LocationDropdownProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  lang: Locale
  className?: string
  searchPlaceholder?: string
  noResultsText?: string
  showIcon?: boolean
  governorates: LocationGovernorate[] // Pass data as prop instead of loading it
}

export function LocationDropdown({
  value,
  onChange,
  placeholder,
  lang,
  className,
  searchPlaceholder,
  noResultsText,
  showIcon = true,
  governorates,
}: LocationDropdownProps) {
  const [open, setOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ governorate: string; area: string } | null>(null)
  const [mounted, setMounted] = useState(false)

  // Only run this effect after component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Find the selected location details
  useEffect(() => {
    if (!value || !governorates.length) {
      setSelectedLocation(null)
      return
    }

    for (const governorate of governorates) {
      const area = governorate.areas.find((area) => area.id === value)
      if (area) {
        setSelectedLocation({
          governorate: lang === "ar" ? governorate.nameAr : governorate.nameEn,
          area: lang === "ar" ? area.nameAr : area.nameEn,
        })
        return
      }
    }

    setSelectedLocation(null)
  }, [value, governorates, lang])

  // Handle selection
  const handleSelect = (areaId: string) => {
    onChange?.(areaId)
    setOpen(false)
  }

  // Default placeholders based on language
  const defaultPlaceholder = lang === "ar" ? "اختر الموقع" : "Select location"
  const defaultSearchPlaceholder = lang === "ar" ? "ابحث عن منطقة..." : "Search for an area..."
  const defaultNoResultsText = lang === "ar" ? "لا توجد نتائج" : "No results found"

  // Don't render the full component until after client-side hydration
  if (!mounted) {
    return (
      <Button variant="outline" className={cn("w-full justify-between", className)}>
        <div className="flex items-center gap-2 truncate">
          {showIcon && <MapPin className="h-4 w-4 shrink-0 opacity-50" />}
          <span className="truncate">{placeholder || defaultPlaceholder}</span>
        </div>
        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
      </Button>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <div className="flex items-center gap-2 truncate">
            {showIcon && <MapPin className="h-4 w-4 shrink-0 opacity-50" />}
            <span className="truncate">
              {selectedLocation
                ? `${selectedLocation.area}, ${selectedLocation.governorate}`
                : placeholder || defaultPlaceholder}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align={lang === "ar" ? "end" : "start"}>
        <Command dir={lang === "ar" ? "rtl" : "ltr"}>
          <CommandInput placeholder={searchPlaceholder || defaultSearchPlaceholder} />
          <CommandList>
            <CommandEmpty>{noResultsText || defaultNoResultsText}</CommandEmpty>
            <ScrollArea className="h-[300px]">
              {governorates.map((governorate) => (
                <CommandGroup key={governorate.id} heading={lang === "ar" ? governorate.nameAr : governorate.nameEn}>
                  {governorate.areas.map((area) => (
                    <CommandItem
                      key={area.id}
                      value={area.id}
                      onSelect={() => handleSelect(area.id)}
                      className="flex items-center gap-2"
                    >
                      <Check className={cn("h-4 w-4", value === area.id ? "opacity-100" : "opacity-0")} />
                      {lang === "ar" ? area.nameAr : area.nameEn}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
