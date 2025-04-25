"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Lightbox } from "@/components/lightbox"

interface EquipmentGalleryProps {
  images: string[]
}

export default function EquipmentGallery({ images }: EquipmentGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // If no images provided, use a placeholder
  const galleryImages = images.length > 0 ? images : ["/placeholder.svg?height=600&width=800"]

  const handlePrevious = () => {
    setActiveIndex((current) => (current === 0 ? galleryImages.length - 1 : current - 1))
  }

  const handleNext = () => {
    setActiveIndex((current) => (current === galleryImages.length - 1 ? 0 : current + 1))
  }

  const openLightbox = () => {
    setLightboxOpen(true)
  }

  return (
    <>
      <div className="space-y-4">
        <div className="relative aspect-video overflow-hidden rounded-lg group">
          <Image src={galleryImages[activeIndex] || "/placeholder.svg"} alt="Equipment" fill className="object-cover" />

          <div className="absolute inset-0 flex items-center justify-between p-4">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full opacity-80 hover:opacity-100"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </Button>

            <Button
              variant="secondary"
              size="icon"
              className="rounded-full opacity-80 hover:opacity-100"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </Button>
          </div>

          {/* Expand button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={openLightbox}
          >
            <Maximize2 className="h-5 w-5" />
            <span className="sr-only">View fullscreen</span>
          </Button>

          {/* Overlay to make the entire image clickable */}
          <div className="absolute inset-0 cursor-pointer" onClick={openLightbox} aria-label="View fullscreen" />
        </div>

        {galleryImages.length > 1 && (
          <div className="flex space-x-2 overflow-auto pb-2">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border-2 ${
                  index === activeIndex ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox component */}
      <Lightbox images={galleryImages} initialIndex={activeIndex} open={lightboxOpen} onOpenChange={setLightboxOpen} />
    </>
  )
}
