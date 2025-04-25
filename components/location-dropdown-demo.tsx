"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LocationDropdown } from "@/components/location-dropdown"
import type { Locale } from "@/lib/i18n-config"

interface LocationDropdownDemoProps {
  lang: Locale
}

export function LocationDropdownDemo({ lang }: LocationDropdownDemoProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>("")

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lang === "ar" ? "اختر الموقع" : "Select Location"}</CardTitle>
        <CardDescription>
          {lang === "ar" ? "اختر المحافظة والمنطقة في الكويت" : "Choose a governorate and area in Kuwait"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <LocationDropdown value={selectedLocation} onChange={setSelectedLocation} lang={lang} />

        {selectedLocation && (
          <div className="mt-4 p-4 border rounded-md bg-muted">
            <p className="font-medium">{lang === "ar" ? "الموقع المختار:" : "Selected Location:"}</p>
            <p className="text-sm text-muted-foreground">{selectedLocation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
