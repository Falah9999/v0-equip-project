import kuwaitAreasData from "./data/kuwait_areas_bilingual.json"
import equipmentCategoriesData from "./data/equipment_categories_bilingual.json"
import type { Locale } from "./i18n-config"

// Types for location data
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

// Types for equipment data
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

// Parse Kuwait areas data
export function getKuwaitGovernorates(): LocationGovernorate[] {
  return Object.entries(kuwaitAreasData).map(([governorateNameAr, data]) => {
    const governorateNameEn = data.en
    const governorateId = governorateNameEn.toLowerCase().replace(/\s+/g, "-")

    const areas = data.areas.map((area, index) => {
      const [areaNameAr, areaNameEn] = area
      const areaId = `${governorateId}-${areaNameEn.toLowerCase().replace(/\s+/g, "-")}`

      return {
        id: areaId,
        nameAr: areaNameAr,
        nameEn: areaNameEn,
      }
    })

    return {
      id: governorateId,
      nameAr: governorateNameAr,
      nameEn: governorateNameEn,
      areas,
    }
  })
}

// Parse equipment categories data
export function getEquipmentCategories(): EquipmentCategory[] {
  return Object.entries(equipmentCategoriesData).map(([categoryNameAr, data]) => {
    const categoryNameEn = data.en
    const categoryId = categoryNameEn.toLowerCase().replace(/\s+/g, "-")

    const subcategories = data.subcategories.map((subcategory, index) => {
      const [subcategoryNameAr, subcategoryNameEn] = subcategory
      const subcategoryId = `${categoryId}-${subcategoryNameEn.toLowerCase().replace(/\s+/g, "-")}`

      return {
        id: subcategoryId,
        nameAr: subcategoryNameAr,
        nameEn: subcategoryNameEn,
      }
    })

    return {
      id: categoryId,
      nameAr: categoryNameAr,
      nameEn: categoryNameEn,
      subcategories,
    }
  })
}

// Helper function to get name based on locale
export function getLocalizedName(item: { nameAr: string; nameEn: string }, locale: Locale): string {
  return locale === "ar" ? item.nameAr : item.nameEn
}
