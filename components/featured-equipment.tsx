"use client"

import { useState, useEffect } from "react"
import type { Locale } from "@/lib/i18n-config"
import EquipmentGrid from "@/components/equipment-grid"
import type { EquipmentItem } from "@/components/equipment-card"

interface FeaturedEquipmentProps {
  dict: {
    viewDetails: string
    dailyRate: string
    available: string
    unavailable: string
    noResults: string
  }
  lang: Locale
}

export default function FeaturedEquipment({ dict, lang }: FeaturedEquipmentProps) {
  const [mounted, setMounted] = useState(false)

  // Only run after client-side hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock data for featured equipment - no async operations
  const featuredEquipment: EquipmentItem[] = [
    {
      id: "1",
      name: lang === "en" ? "Caterpillar Excavator 320" : "حفارة كاتربيلر 320",
      category: lang === "en" ? "Excavators" : "حفارات",
      subcategory: lang === "en" ? "Tracked Excavators" : "حفارات مجنزرة",
      location: lang === "en" ? "Kuwait City" : "مدينة الكويت",
      governorate: lang === "en" ? "Capital" : "العاصمة",
      dailyRate: 120,
      weeklyRate: 700,
      available: true,
      image: "/placeholder.svg?height=300&width=400",
      specs: {
        Brand: "Caterpillar",
        Model: "320",
        Year: 2020,
      },
    },
    {
      id: "2",
      name: lang === "en" ? "Bobcat Skid Steer Loader" : "بوبكات لودر انزلاقي",
      category: lang === "en" ? "Loaders" : "لودرات",
      subcategory: lang === "en" ? "Skid Steer Loaders" : "لودرات انزلاقية",
      location: lang === "en" ? "Salmiya" : "السالمية",
      governorate: lang === "en" ? "Hawally" : "حولي",
      dailyRate: 85,
      weeklyRate: 500,
      available: true,
      image: "/placeholder.svg?height=300&width=400",
      specs: {
        Brand: "Bobcat",
        Model: "S650",
        Year: 2021,
      },
    },
    {
      id: "3",
      name: lang === "en" ? "Concrete Mixer CM350" : "خلاطة خرسانة CM350",
      category: lang === "en" ? "Tools" : "أدوات",
      subcategory: lang === "en" ? "Concrete Tools" : "أدوات خرسانية",
      location: lang === "en" ? "Hawally" : "حولي",
      governorate: lang === "en" ? "Hawally" : "حولي",
      dailyRate: 50,
      weeklyRate: 300,
      available: false,
      image: "/placeholder.svg?height=300&width=400",
      specs: {
        Brand: "PowerMix",
        Model: "CM350",
        "Drum Capacity": "350 liters",
      },
    },
    {
      id: "4",
      name: lang === "en" ? "Mobile Crane MC200" : "رافعة متنقلة MC200",
      category: lang === "en" ? "Cranes" : "رافعات",
      subcategory: lang === "en" ? "Mobile Cranes" : "رافعات متنقلة",
      location: lang === "en" ? "Farwaniya" : "الفروانية",
      governorate: lang === "en" ? "Farwaniya" : "الفروانية",
      dailyRate: 200,
      weeklyRate: 1200,
      available: true,
      image: "/placeholder.svg?height=300&width=400",
      specs: {
        Brand: "Liebherr",
        Model: "MC200",
        "Max Lifting Capacity": "200 tons",
      },
    },
  ]

  // Comparison labels
  const comparisonLabels = {
    compare: lang === "ar" ? "قارن" : "Compare",
    addedToCompare: lang === "ar" ? "تمت الإضافة" : "Added",
    comparisonFull: lang === "ar" ? "المقارنة ممتلئة" : "Comparison full",
    share: lang === "ar" ? "مشاركة" : "Share",
  }

  // Don't render the full component until after client-side hydration
  if (!mounted) {
    return <div className="h-96 animate-pulse bg-muted rounded-lg"></div>
  }

  return (
    <EquipmentGrid
      equipment={featuredEquipment}
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
