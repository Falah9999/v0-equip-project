import type { Locale } from "@/lib/i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { LocationDropdownDemo } from "@/components/location-dropdown-demo"
import { EquipmentCategoryDropdownDemo } from "@/components/equipment-category-dropdown-demo"

export default async function ComponentsDemoPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{lang === "ar" ? "عرض المكونات" : "Components Demo"}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">{lang === "ar" ? "قائمة المواقع" : "Location Dropdown"}</h2>
          <LocationDropdownDemo lang={lang} />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">
            {lang === "ar" ? "قائمة فئات المعدات" : "Equipment Category Dropdown"}
          </h2>
          <EquipmentCategoryDropdownDemo lang={lang} />
        </div>
      </div>
    </div>
  )
}
