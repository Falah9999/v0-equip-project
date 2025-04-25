"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog"
import { SwipeHandler } from "@/components/swipe-handler"
import { cn } from "@/lib/utils"

interface LightboxProps {
  images: string[]
  initialIndex?: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Lightbox({ images, initialIndex = 0, open, onOpenChange }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [zoom, setZoom] = useState(false)

  // Reset current index when images change or lightbox opens
  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex, open])

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          navigatePrevious()
          break
        case "ArrowRight":
          navigateNext()
          break
        case "Escape":
          onOpenChange(false)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, currentIndex, images.length])

  const navigateNext = () => {
    if (zoom) return
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const navigatePrevious = () => {
    if (zoom) return
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const toggleZoom = () => {
    setZoom((prevZoom) => !prevZoom)
  }

  // If no images, don't render anything
  if (images.length === 0) return null

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) setZoom(false)
        onOpenChange(newOpen)
      }}
    >
      <DialogOverlay className="bg-black/90" />
      <DialogContent className="max-w-full max-h-full h-full sm:h-auto p-0 border-none bg-transparent shadow-none">
        <SwipeHandler onSwipeLeft={navigateNext} onSwipeRight={navigatePrevious} disabled={zoom || images.length <= 1}>
          <div className="relative flex flex-col items-center justify-center w-full h-full">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white bg-black/20 hover:bg-black/40"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>

            {/* Zoom toggle button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 left-4 z-50 text-white bg-black/20 hover:bg-black/40"
              onClick={toggleZoom}
            >
              {zoom ? <ZoomOut className="h-6 w-6" /> : <ZoomIn className="h-6 w-6" />}
              <span className="sr-only">{zoom ? "Zoom out" : "Zoom in"}</span>
            </Button>

            {/* Main image container */}
            <div
              className={cn(
                "relative w-full h-full flex items-center justify-center overflow-hidden",
                zoom ? "cursor-zoom-out" : "cursor-zoom-in",
              )}
              onClick={toggleZoom}
            >
              <div className={cn("transition-transform duration-300 ease-out", zoom ? "scale-150" : "scale-100")}>
                <Image
                  src={images[currentIndex] || "/placeholder.svg"}
                  alt={`Image ${currentIndex + 1}`}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[80vh]"
                  priority
                />
              </div>
            </div>

            {/* Navigation buttons */}
            {images.length > 1 && !zoom && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/20 hover:bg-black/40 rounded-full h-12 w-12"
                  onClick={navigatePrevious}
                >
                  <ChevronLeft className="h-8 w-8" />
                  <span className="sr-only">Previous</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/20 hover:bg-black/40 rounded-full h-12 w-12"
                  onClick={navigateNext}
                >
                  <ChevronRight className="h-8 w-8" />
                  <span className="sr-only">Next</span>
                </Button>
              </>
            )}

            {/* Thumbnail navigation */}
            {images.length > 1 && !zoom && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
                <div className="flex gap-2 p-2 bg-black/30 rounded-full">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80",
                      )}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute top-4 left-16 bg-black/30 text-white text-sm px-2 py-1 rounded-md">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </SwipeHandler>
      </DialogContent>
    </Dialog>
  )
}
