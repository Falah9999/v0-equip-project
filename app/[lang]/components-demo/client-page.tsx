"use client"

import { useEffect, useState } from "react"
import type { Locale } from "@/lib/i18n-config"
import { fetchDictionary } from "@/lib/client-actions"
import { LocationDropdownDemo } from "@/components/location-dropdown-demo"
import { EquipmentCategoryDropdownDemo } from "@/components/equipment-category-dropdown-demo"

export default function ComponentsDemoPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const [dict, setDict] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDictionary() {
      try {
        const dictionary = await fetchDictionary(lang)
        setDict(dictionary)
      } catch (error) {
        console.error("Failed to load dictionary:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDictionary()
  }, [lang])

  if (loading || !dict) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading...</p>
      </div>
    )
  }

  // Demo components array
  const demoComponents = [
    { id: "location", component: <LocationDropdownDemo lang={lang} /> },
    { id: "category", component: <EquipmentCategoryDropdownDemo lang={lang} /> },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{lang === "ar" ? "عرض المكونات" : "Components Demo"}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array.isArray(demoComponents) && demoComponents.length > 0 ? (
          demoComponents.map((item) => (
            <div key={item.id} className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">
                {item.id === "location"
                  ? lang === "ar"
                    ? "قائمة المواقع"
                    : "Location Dropdown"
                  : lang === "ar"
                    ? "قائمة فئات المعدات"
                    : "Equipment Category Dropdown"}
              </h2>
              {item.component}
            </div>
          ))
        ) : (
          <p>No demo components to display</p>
        )}
      </div>
    </div>
  )
}
