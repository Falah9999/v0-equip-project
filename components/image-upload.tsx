"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { X, Upload, ImagePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Locale } from "@/lib/i18n-config"

interface ImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
  lang: Locale
  className?: string
}

export function ImageUpload({ images = [], onChange, maxImages = 5, lang, className }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const labels = {
    dragDrop: lang === "ar" ? "اسحب وأفلت الصور هنا" : "Drag and drop images here",
    or: lang === "ar" ? "أو" : "or",
    browse: lang === "ar" ? "تصفح الملفات" : "Browse files",
    addMore: lang === "ar" ? "إضافة المزيد من الصور" : "Add more images",
    maxReached: lang === "ar" ? `الحد الأقصى هو ${maxImages} صور` : `Maximum of ${maxImages} images reached`,
    formats:
      lang === "ar" ? "يدعم: JPG، PNG، WEBP (بحد أقصى 5 ميجابايت لكل منها)" : "Supports: JPG, PNG, WEBP (max 5MB each)",
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (files: File[]) => {
    if (images.length >= maxImages) return

    const allowedFiles = files.slice(0, maxImages - images.length)
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    const maxSize = 5 * 1024 * 1024 // 5MB

    const newImages: string[] = []

    // Use synchronous file reading to avoid suspense issues
    allowedFiles
      .filter((file) => allowedTypes.includes(file.type) && file.size <= maxSize)
      .forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            // Update state with the new image
            onChange([...images, ...newImages, e.target.result as string])
          }
        }
        reader.readAsDataURL(file)
      })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    onChange(newImages)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Image preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Equipment image ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload area */}
      {images.length < maxImages ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center",
            dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          )}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-medium">{labels.dragDrop}</p>
            <p className="text-xs text-muted-foreground">{labels.or}</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              <ImagePlus className="h-4 w-4 mr-2" />
              {labels.browse}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">{labels.formats}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-center text-muted-foreground">{labels.maxReached}</p>
      )}
    </div>
  )
}
