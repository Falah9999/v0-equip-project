import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getDictionary } from "@/lib/dictionaries"
import { Button } from "@/components/ui/button"
import ComparisonTable from "@/components/comparison-table"
import { ShareButton } from "@/components/share-button"
import type { Locale } from "@/lib/i18n-config"

export default async function ComparisonPage({
  params: { lang },
  searchParams,
}: {
  params: { lang: Locale }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const dict = await getDictionary(lang)

  // Get the IDs from the URL if this is a shared comparison
  const sharedIds = searchParams.ids ? (Array.isArray(searchParams.ids) ? searchParams.ids : [searchParams.ids]) : []

  // Generate the share URL for this comparison
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || ""
  const shareUrl = `${baseUrl}/${lang}/equipment/compare${sharedIds.length > 0 ? `?ids=${sharedIds.join(",")}` : ""}`
  const shareTitle = lang === "ar" ? "مقارنة المعدات" : "Equipment Comparison"
  const shareDescription =
    lang === "ar"
      ? "قارن المواصفات والأسعار والميزات للمعدات المختارة"
      : "Compare specifications, pricing, and features for selected equipment"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button variant="ghost" asChild className="mb-4">
            <Link href={`/${lang}/equipment`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              {lang === "ar" ? "العودة إلى المعدات" : "Back to Equipment"}
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{lang === "ar" ? "مقارنة المعدات" : "Equipment Comparison"}</h1>
          <p className="text-muted-foreground mt-2">
            {lang === "ar"
              ? "قارن المواصفات والأسعار والميزات للمعدات المختارة"
              : "Compare specifications, pricing, and features for your selected equipment"}
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <ShareButton url={shareUrl} title={shareTitle} description={shareDescription} lang={lang} />
        </div>
      </div>

      <ComparisonTable lang={lang} sharedIds={sharedIds} />
    </div>
  )
}
