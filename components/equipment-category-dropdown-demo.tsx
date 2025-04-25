"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EquipmentCategoryDropdown } from "@/components/equipment-category-dropdown"
import type { Locale } from "@/lib/i18n-config"

interface EquipmentCategoryDropdownDemoProps {
  lang: Locale
}

export function EquipmentCategoryDropdownDemo({ lang }: EquipmentCategoryDropdownDemoProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lang === "ar" ? "اختر فئة المعدات" : "Select Equipment Category"}</CardTitle>
        <CardDescription>
          {lang === "ar" ? "اختر فئة المعدات والفئة الفرعية" : "Choose an equipment category and subcategory"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <EquipmentCategoryDropdown value={selectedCategory} onChange={setSelectedCategory} lang={lang} />

        {selectedCategory && (
          <div className="mt-4 p-4 border rounded-md bg-muted">
            <p className="font-medium">{lang === "ar" ? "الفئة المختارة:" : "Selected Category:"}</p>
            <p className="text-sm text-muted-foreground">{selectedCategory}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
