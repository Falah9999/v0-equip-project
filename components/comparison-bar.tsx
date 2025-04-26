"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { X, ChevronUp, ChevronDown, Scale, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShareDialog } from "@/components/share-dialog"
import { useComparison } from "@/contexts/comparison-context"
import type { Locale } from "@/lib/i18n-config"

interface ComparisonBarProps {
  lang: Locale
  labels: {
    compare: string
    selected: string
    clear: string
    remove: string
    minimized: string
    share?: string
  }
}

export function ComparisonBar({ lang, labels }: ComparisonBarProps) {
  const { comparisonItems, removeFromComparison, clearComparison, maxItems } = useComparison()
  const [minimized, setMinimized] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const router = useRouter()

  // Only show after client-side hydration to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update share URL when comparison items change
  useEffect(() => {
    if (mounted && typeof window !== "undefined" && comparisonItems.length > 0) {
      const itemIds = comparisonItems.map((item) => item.id).join(",")
      setShareUrl(`${window.location.origin}/${lang}/equipment/compare?ids=${itemIds}`)
    }
  }, [comparisonItems, lang, mounted])

  if (!mounted) return null
  if (comparisonItems.length === 0) return null

  const handleCompare = () => {
    router.push(`/${lang}/equipment/compare`)
  }

  const toggleMinimized = () => {
    setMinimized(!minimized)
  }

  const handleShare = () => {
    setShareDialogOpen(true)
  }

  const shareTitle = lang === "ar" ? "مقارنة المعدات" : "Equipment Comparison"
  const shareDescription =
    lang === "ar"
      ? `مقارنة بين ${comparisonItems.length} من المعدات`
      : `Comparison of ${comparisonItems.length} equipment items`

  const shareLabel = labels.share || (lang === "ar" ? "مشاركة" : "Share")

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg transition-all duration-300">
      {minimized ? (
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            <span className="font-medium">
              {labels.minimized} ({comparisonItems.length}/{maxItems})
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={toggleMinimized}>
            <ChevronUp className="h-4 w-4 mr-1" />
            {labels.compare}
          </Button>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-lg">
                {labels.selected}: {comparisonItems.length}/{maxItems}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={clearComparison}>
                {labels.clear}
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleMinimized}>
                <ChevronDown className="h-4 w-4 mr-1" />
                {lang === "ar" ? "تصغير" : "Minimize"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {comparisonItems.map((item) => (
              <div key={item.id} className="relative bg-muted rounded-md p-2 flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={() => removeFromComparison(item.id)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">{labels.remove}</span>
                </Button>
                <div className="relative h-16 w-16 mb-2">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <span className="text-sm font-medium text-center line-clamp-1">{item.name}</span>
                <span className="text-xs text-muted-foreground">{item.dailyRate} KWD/day</span>
              </div>
            ))}

            {Array.from({ length: maxItems - comparisonItems.length }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="bg-muted/50 rounded-md p-2 flex items-center justify-center border-2 border-dashed border-muted-foreground/20 h-[104px]"
              >
                <span className="text-sm text-muted-foreground">{lang === "ar" ? "أضف معدات" : "Add equipment"}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            <Button onClick={handleCompare} disabled={comparisonItems.length < 2}>
              {labels.compare}
            </Button>
            {comparisonItems.length >= 2 && (
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-1" />
                {shareLabel}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Share dialog */}
      <ShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        url={shareUrl}
        title={shareTitle}
        description={shareDescription}
        lang={lang}
      />
    </div>
  )
}
