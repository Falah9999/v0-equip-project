"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, X, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useComparison } from "@/contexts/comparison-context"
import type { Locale } from "@/lib/i18n-config"
import { getEquipmentById } from "@/lib/data"
import type { EquipmentItem } from "@/components/equipment-card"

interface ComparisonTableProps {
  lang: Locale
  sharedIds?: string[]
}

export default function ComparisonTable({ lang, sharedIds = [] }: ComparisonTableProps) {
  const { comparisonItems, removeFromComparison, addToComparison, clearComparison } = useComparison()
  const [mounted, setMounted] = useState(false)
  const [displayItems, setDisplayItems] = useState<EquipmentItem[]>([])
  const [isLoading, setIsLoading] = useState(sharedIds.length > 0)
  const router = useRouter()

  // Load shared items if provided
  useEffect(() => {
    const loadSharedItems = async () => {
      if (sharedIds.length > 0) {
        setIsLoading(true)

        try {
          // Clear existing comparison items
          clearComparison()

          // Load each shared item
          const items = await Promise.all(sharedIds.map((id) => getEquipmentById(id)))

          // Filter out any null items and add to comparison
          const validItems = items.filter(Boolean) as EquipmentItem[]
          validItems.forEach((item) => addToComparison(item))

          // Update URL to remove the ids parameter
          router.replace(`/${lang}/equipment/compare`, { scroll: false })
        } catch (error) {
          console.error("Error loading shared items:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    if (sharedIds.length > 0) {
      loadSharedItems()
    }
  }, [sharedIds, addToComparison, clearComparison, lang, router])

  // Only show after client-side hydration to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
    setDisplayItems(comparisonItems)
  }, [comparisonItems])

  // Update display items when comparison items change
  useEffect(() => {
    if (mounted) {
      setDisplayItems(comparisonItems)
    }
  }, [comparisonItems, mounted])

  if (!mounted || isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-pulse bg-muted h-full w-full rounded-lg"></div>
      </div>
    )
  }

  if (displayItems.length === 0) {
    return (
      <div className="text-center py-16 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">
          {lang === "ar" ? "لا توجد معدات للمقارنة" : "No Equipment to Compare"}
        </h2>
        <p className="text-muted-foreground mb-6">
          {lang === "ar"
            ? "يرجى إضافة معدات للمقارنة من صفحة المعدات"
            : "Please add equipment to compare from the equipment page"}
        </p>
        <Button asChild>
          <Link href={`/${lang}/equipment`}>{lang === "ar" ? "استعرض المعدات" : "Browse Equipment"}</Link>
        </Button>
      </div>
    )
  }

  if (displayItems.length === 1) {
    return (
      <div className="text-center py-16 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">
          {lang === "ar" ? "يرجى إضافة معدات أخرى للمقارنة" : "Please Add More Equipment"}
        </h2>
        <p className="text-muted-foreground mb-6">
          {lang === "ar" ? "تحتاج إلى معدات أخرى على الأقل للمقارنة" : "You need at least one more item to compare"}
        </p>
        <Button asChild>
          <Link href={`/${lang}/equipment`}>{lang === "ar" ? "استعرض المعدات" : "Browse Equipment"}</Link>
        </Button>
      </div>
    )
  }

  // Get all unique specification keys from all items
  const allSpecKeys = new Set<string>()
  displayItems.forEach((item) => {
    if (item.specs) {
      Object.keys(item.specs).forEach((key) => allSpecKeys.add(key))
    }
  })

  // Convert to array and sort alphabetically
  const specKeys = Array.from(allSpecKeys).sort()

  return (
    <div className="overflow-x-auto pb-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted">
            <th className="p-4 text-left border-b min-w-[200px]">{lang === "ar" ? "المواصفات" : "Specifications"}</th>
            {displayItems.map((item) => (
              <th key={item.id} className="p-4 text-center border-b min-w-[250px]">
                <div className="flex flex-col items-center">
                  <div className="relative h-32 w-full mb-3">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <div className="flex justify-center gap-2 mt-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/${lang}/equipment/${item.id}`}>{lang === "ar" ? "عرض" : "View"}</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromComparison(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">{lang === "ar" ? "إزالة" : "Remove"}</span>
                    </Button>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Basic information rows */}
          <tr>
            <td className="p-4 border-b font-medium">{lang === "ar" ? "الفئة" : "Category"}</td>
            {displayItems.map((item) => (
              <td key={item.id} className="p-4 text-center border-b">
                {item.subcategory ? `${item.subcategory} (${item.category})` : item.category}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 border-b font-medium">{lang === "ar" ? "الموقع" : "Location"}</td>
            {displayItems.map((item) => (
              <td key={item.id} className="p-4 text-center border-b">
                {item.governorate ? `${item.location}, ${item.governorate}` : item.location}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 border-b font-medium">{lang === "ar" ? "السعر اليومي" : "Daily Rate"}</td>
            {displayItems.map((item) => (
              <td key={item.id} className="p-4 text-center border-b font-semibold">
                {item.dailyRate} KWD
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 border-b font-medium">{lang === "ar" ? "السعر الأسبوعي" : "Weekly Rate"}</td>
            {displayItems.map((item) => (
              <td key={item.id} className="p-4 text-center border-b">
                {item.weeklyRate ? `${item.weeklyRate} KWD` : "-"}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 border-b font-medium">{lang === "ar" ? "متاح" : "Available"}</td>
            {displayItems.map((item) => (
              <td key={item.id} className="p-4 text-center border-b">
                {item.available ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-red-500 mx-auto" />
                )}
              </td>
            ))}
          </tr>

          {/* Description row */}
          <tr>
            <td className="p-4 border-b font-medium">{lang === "ar" ? "الوصف" : "Description"}</td>
            {displayItems.map((item) => (
              <td key={item.id} className="p-4 text-center border-b">
                {item.description || "-"}
              </td>
            ))}
          </tr>

          {/* Specification rows */}
          {specKeys.map((specKey) => (
            <tr key={specKey}>
              <td className="p-4 border-b font-medium">{specKey}</td>
              {displayItems.map((item) => (
                <td key={item.id} className="p-4 text-center border-b">
                  {item.specs && item.specs[specKey] !== undefined ? item.specs[specKey] : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
