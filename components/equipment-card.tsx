"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Calendar, Clock, Maximize2, Scale, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Lightbox } from "@/components/lightbox"
import { ShareDialog } from "@/components/share-dialog"
import { useComparison } from "@/contexts/comparison-context"
import { toast } from "@/components/ui/use-toast"
import type { Locale } from "@/lib/i18n-config"

export interface EquipmentItem {
  id: string
  name: string
  category: string
  subcategory?: string
  location: string
  governorate?: string
  dailyRate: number
  weeklyRate?: number
  available: boolean
  image: string
  images?: string[]
  specs?: Record<string, string | number>
  description?: string
}

interface EquipmentCardProps {
  equipment: EquipmentItem
  lang: Locale
  viewLabel: string
  rentLabel?: string
  availableLabel: string
  unavailableLabel: string
  dailyRateLabel: string
  weeklyRateLabel?: string
  compareLabel?: string
  addedToCompareLabel?: string
  comparisonFullLabel?: string
  shareLabel?: string
  showRentButton?: boolean
  onRentClick?: (id: string) => void
}

export function EquipmentCard({
  equipment,
  lang,
  viewLabel,
  rentLabel,
  availableLabel,
  unavailableLabel,
  dailyRateLabel,
  weeklyRateLabel,
  compareLabel = lang === "ar" ? "قارن" : "Compare",
  addedToCompareLabel = lang === "ar" ? "تمت الإضافة" : "Added",
  comparisonFullLabel = lang === "ar" ? "المقارنة ممتلئة" : "Comparison full",
  shareLabel = lang === "ar" ? "مشاركة" : "Share",
  showRentButton = false,
  onRentClick,
}: EquipmentCardProps) {
  const { id, name, category, subcategory, location, governorate, dailyRate, weeklyRate, available, image } = equipment
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const { addToComparison, isInComparison, isComparisonFull } = useComparison()

  const handleRentClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onRentClick) {
      onRentClick(id)
    }
  }

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInComparison(id)) {
      return
    }

    if (isComparisonFull) {
      toast({
        title: comparisonFullLabel,
        description: lang === "ar" ? "يرجى إزالة عنصر من المقارنة أولاً" : "Please remove an item from comparison first",
        variant: "destructive",
      })
      return
    }

    addToComparison(equipment)
    toast({
      title: lang === "ar" ? "تمت الإضافة إلى المقارنة" : "Added to comparison",
      description: name,
    })
  }

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShareDialogOpen(true)
  }

  // Get all images for the lightbox
  const allImages =
    equipment.images && equipment.images.length > 0
      ? equipment.images
      : [image || "/placeholder.svg?height=300&width=400"]

  const isCompared = isInComparison(id)

  // Generate the share URL for this equipment
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/${lang}/equipment/${id}` : ""
  const shareTitle = name
  const shareDescription = equipment.description || `${category} - ${location} - ${dailyRate} KWD/day`

  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden group">
        <Image
          src={image || "/placeholder.svg?height=300&width=400"}
          alt={name}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-0 left-0 w-full p-3 flex justify-between">
          <Badge className="bg-primary/90 hover:bg-primary">{subcategory || category}</Badge>
          <Badge className={available ? "bg-green-500/90 hover:bg-green-500" : "bg-red-500/90 hover:bg-red-500"}>
            {available ? availableLabel : unavailableLabel}
          </Badge>
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Compare button */}
          <Button
            variant={isCompared ? "default" : "secondary"}
            size="sm"
            onClick={handleCompareClick}
            disabled={isCompared || isComparisonFull}
          >
            <Scale className="h-4 w-4 mr-1" />
            {isCompared ? addedToCompareLabel : compareLabel}
          </Button>

          {/* Share button */}
          <Button variant="secondary" size="sm" onClick={handleShareClick}>
            <Share2 className="h-4 w-4 mr-1" />
            {shareLabel}
          </Button>
        </div>

        {/* Expand button */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-3 right-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setLightboxOpen(true)}
        >
          <Maximize2 className="h-4 w-4" />
          <span className="sr-only">View fullscreen</span>
        </Button>

        {/* Overlay to make the image clickable for lightbox */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => setLightboxOpen(true)}
          aria-label="View fullscreen"
        />
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{name}</h3>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">
              {location}
              {governorate ? `, ${governorate}` : ""}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{dailyRateLabel}</span>
              </div>
              <span className="font-semibold text-foreground">{dailyRate} KWD</span>
            </div>

            {weeklyRate && weeklyRateLabel && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{weeklyRateLabel}</span>
                </div>
                <span className="font-semibold text-foreground">{weeklyRate} KWD</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild variant="outline" className="flex-1">
          <Link href={`/${lang}/equipment/${id}`}>{viewLabel}</Link>
        </Button>

        {showRentButton && available && (
          <Button className="flex-1" onClick={handleRentClick}>
            {rentLabel}
          </Button>
        )}
      </CardFooter>

      {/* Lightbox component */}
      <Lightbox images={allImages} initialIndex={0} open={lightboxOpen} onOpenChange={setLightboxOpen} />

      {/* Share dialog */}
      <ShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        url={shareUrl}
        title={shareTitle}
        description={shareDescription}
        lang={lang}
      />
    </Card>
  )
}
