"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Locale } from "@/lib/i18n-config"

// Define types for equipment data to avoid direct imports
export interface EquipmentSubcategory {
  id: string
  nameAr: string
  nameEn: string
}

export interface EquipmentCategory {
  id: string
  nameAr: string
  nameEn: string
  subcategories: EquipmentSubcategory[]
}

interface EquipmentCategoryDropdownProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  lang: Locale
  className?: string
  searchPlaceholder?: string
  noResultsText?: string
  showIcon?: boolean
  categories: EquipmentCategory[] // Pass data as prop instead of loading it
}

export function EquipmentCategoryDropdown({
  value,
  onChange,
  placeholder,
  lang,
  className,
  searchPlaceholder,
  noResultsText,
  showIcon = true,
  categories,
}: EquipmentCategoryDropdownProps) {
  const [open, setOpen] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState<{ category: string; subcategory: string } | null>(null)
  const [mounted, setMounted] = useState(false)

  // Only run this effect after component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Find the selected equipment details
  useEffect(() => {
    if (!value || !categories.length) {
      setSelectedEquipment(null)
      return
    }

    for (const category of categories) {
      // Check if the value is a category ID (for "Others" category with no subcategories)
      if (value === category.id) {
        setSelectedEquipment({
          category: lang === "ar" ? category.nameAr : category.nameEn,
          subcategory: "",
        })
        return
      }

      // Check subcategories
      const subcategory = category.subcategories.find((sub) => sub.id === value)
      if (subcategory) {
        setSelectedEquipment({
          category: lang === "ar" ? category.nameAr : category.nameEn,
          subcategory: lang === "ar" ? subcategory.nameAr : subcategory.nameEn,
        })
        return
      }
    }

    setSelectedEquipment(null)
  }, [value, categories, lang])

  // Handle selection
  const handleSelect = (itemId: string) => {
    onChange?.(itemId)
    setOpen(false)
  }

  // Default placeholders based on language
  const defaultPlaceholder = lang === "ar" ? "اختر فئة المعدات" : "Select equipment category"
  const defaultSearchPlaceholder = lang === "ar" ? "ابحث عن فئة..." : "Search for a category..."
  const defaultNoResultsText = lang === "ar" ? "لا توجد نتائج" : "No results found"

  // Don't render the full component until after client-side hydration
  if (!mounted) {
    return (
      <Button variant="outline" className={cn("w-full justify-between", className)}>
        <div className="flex items-center gap-2 truncate">
          {showIcon && <Wrench className="h-4 w-4 shrink-0 opacity-50" />}
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
            {showIcon && <Wrench className="h-4 w-4 shrink-0 opacity-50" />}
            <span className="truncate">
              {selectedEquipment
                ? selectedEquipment.subcategory
                  ? `${selectedEquipment.subcategory} - ${selectedEquipment.category}`
                  : selectedEquipment.category
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
              {categories.map((category) => (
                <CommandGroup key={category.id} heading={lang === "ar" ? category.nameAr : category.nameEn}>
                  {category.subcategories.length > 0 ? (
                    category.subcategories.map((subcategory) => (
                      <CommandItem
                        key={subcategory.id}
                        value={subcategory.id}
                        onSelect={() => handleSelect(subcategory.id)}
                        className="flex items-center gap-2"
                      >
                        <Check className={cn("h-4 w-4", value === subcategory.id ? "opacity-100" : "opacity-0")} />
                        {lang === "ar" ? subcategory.nameAr : subcategory.nameEn}
                      </CommandItem>
                    ))
                  ) : (
                    <CommandItem
                      key={category.id}
                      value={category.id}
                      onSelect={() => handleSelect(category.id)}
                      className="flex items-center gap-2"
                    >
                      <Check className={cn("h-4 w-4", value === category.id ? "opacity-100" : "opacity-0")} />
                      {lang === "ar" ? category.nameAr : category.nameEn}
                    </CommandItem>
                  )}
                </CommandGroup>
              ))}
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
