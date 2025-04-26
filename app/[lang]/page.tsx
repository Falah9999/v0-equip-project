import { Suspense } from "react"
import type { Locale } from "@/lib/i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { getKuwaitGovernorates, getEquipmentCategories } from "@/lib/bilingual-data"
import SearchBar from "@/components/search-bar"
import PromotionalBanner from "@/components/promotional-banner"
import CategoryGrid from "@/components/category-grid"
import FeaturedEquipment from "@/components/featured-equipment"

// Loading fallbacks
function SearchBarFallback() {
  return <div className="h-24 bg-muted rounded-lg animate-pulse"></div>
}

function CategoryGridFallback() {
  return <div className="h-32 bg-muted rounded-lg animate-pulse"></div>
}

function FeaturedEquipmentFallback() {
  return <div className="h-64 bg-muted rounded-lg animate-pulse"></div>
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  // Server-side data fetching
  const dict = await getDictionary(lang)

  // Get locations and categories data on the server
  const locations = getKuwaitGovernorates()
  const categories = getEquipmentCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{dict.home.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{dict.home.subtitle}</p>
        </div>
        <Suspense fallback={<SearchBarFallback />}>
          <div>
            <SearchBar dict={dict.search} lang={lang} locations={locations} categories={categories} />
          </div>
        </Suspense>
      </section>

      <section className="my-12">
        <Suspense fallback={<div className="h-64 bg-muted rounded-lg animate-pulse"></div>}>
          <div>
            <PromotionalBanner dict={dict.promo} />
          </div>
        </Suspense>
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-semibold mb-6">{dict.home.categories}</h2>
        <Suspense fallback={<CategoryGridFallback />}>
          <div>
            <CategoryGrid dict={dict.categories} lang={lang} />
          </div>
        </Suspense>
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-semibold mb-6">{dict.home.featured}</h2>
        <Suspense fallback={<FeaturedEquipmentFallback />}>
          <div>
            <FeaturedEquipment dict={dict.equipment} lang={lang} />
          </div>
        </Suspense>
      </section>
    </div>
  )
}
