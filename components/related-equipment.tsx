"use client"

import { useState, useEffect } from "react"
import type { Locale } from "@/lib/i18n-config"
import EquipmentGrid from "@/components/equipment-grid"
import type { EquipmentItem } from "@/components/equipment-card"

interface RelatedEquipmentProps {
  category: string
  currentId: string
  dict: {
    viewDetails: string
    dailyRate: string
    available: string
    unavailable: string
    noResults: string
  }
  lang: Locale
}

export default function RelatedEquipment({ category, currentId, dict, lang }: RelatedEquipmentProps) {
  const [mounted, setMounted] = useState(false)

  // Only run after client-side hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock data for related equipment
  const relatedEquipment: EquipmentItem[] = [
    {
      id: "5",
      name: lang === "en" ? "Caterpillar Excavator 330" : "حفارة كاتربيلر 330",
      category: lang === "en" ? "Excavators" : "حفارات",
      subcategory: lang === "en" ? "Tracked Excavators" : "حفارات مجنزرة",
      location: lang === "en" ? "Kuwait City" : "مدينة الكويت",
      governorate: lang === "en" ? "Capital" : "العاصمة",
      dailyRate: 150,
      weeklyRate: 900,
      available: true,
      image: "/placeholder.svg?height=300&width=400",
      specs: {
        Brand: "Caterpillar",
        Model: "330",
        Year: 2019,
        "Engine Power": "204 HP",
      },
    },
    {
      id: "6",
      name: lang === "en" ? "Komatsu Excavator PC200" : "حفارة كوماتسو PC200",
      category: lang === "en" ? "Excavators" : "حفارات",
      subcategory: lang === "en" ? "Tracked Excavators" : "حفارات مجنزرة",
      location: lang === "en" ? "Salmiya" : "السالمية",
      governorate: lang === "en" ? "Hawally" : "حولي",
      dailyRate: 130,
      weeklyRate: 780,
      available: true,
      image: "/placeholder.svg?height=300&width=400",
      specs: {
        Brand: "Komatsu",
        Model: "PC200",
        Year: 2020,
        "Engine Power": "155 HP",
      },
    },
    {
      id: "7",
      name: lang === "en" ? "Hitachi Excavator ZX210" : "حفارة هيتاشي ZX210",
      category: lang === "en" ? "Excavators" : "حفارات",
      subcategory: lang === "en" ? "Tracked Excavators" : "حفارات مجنزرة",
      location: lang === "en" ? "Hawally" : "حولي",
      governorate: lang === "en" ? "Hawally" : "حولي",
      dailyRate: 140,
      weeklyRate: 840,
      available: true,
      image: "/placeholder.svg?height=300&width=400",
      specs: {
        Brand: "Hitachi",
        Model: "ZX210",
        Year: 2021,
        "Engine Power": "163 HP",
      },
    },
  ].filter((item) => item.id !== currentId)

  // Comparison labels
  const comparisonLabels = {
    compare: lang === "ar" ? "قارن" : "Compare",
    addedToCompare: lang === "ar" ? "تمت الإضافة" : "Added",
    comparisonFull: lang === "ar" ? "المقارنة ممتلئة" : "Comparison full",
    share: lang === "ar" ? "مشاركة" : "Share",
  }

  // Don't render the full component until after client-side hydration
  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-64 bg-muted rounded-lg animate-pulse"></div>
        ))}
      </div>
    )
  }

  return (
    <EquipmentGrid
      equipment={relatedEquipment}
      dict={{
        ...dict,
        weeklyRate: lang === "ar" ? "أسبوعياً" : "Weekly",
        compare: comparisonLabels.compare,
        addedToCompare: comparisonLabels.addedToCompare,
        comparisonFull: comparisonLabels.comparisonFull,
        share: comparisonLabels.share,
      }}
      lang={lang}
    />
  )
}
