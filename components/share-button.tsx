"use client"

import { useState, useEffect } from "react"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShareDialog } from "@/components/share-dialog"
import type { Locale } from "@/lib/i18n-config"

interface ShareButtonProps {
  url: string
  title: string
  description?: string
  lang: Locale
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
}

export function ShareButton({
  url,
  title,
  description,
  lang,
  variant = "outline",
  size = "default",
}: ShareButtonProps) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [finalUrl, setFinalUrl] = useState("")

  // Only run after client-side hydration
  useEffect(() => {
    setMounted(true)

    // If the URL is relative and we're in the browser, make it absolute
    if (typeof window !== "undefined") {
      if (url.startsWith("http")) {
        setFinalUrl(url)
      } else if (url.startsWith("/")) {
        setFinalUrl(`${window.location.origin}${url}`)
      } else {
        setFinalUrl(`${window.location.origin}/${url}`)
      }
    } else {
      setFinalUrl(url)
    }
  }, [url])

  const shareLabel = lang === "ar" ? "مشاركة" : "Share"

  // Don't render the full component until after client-side hydration
  if (!mounted) {
    return (
      <Button variant={variant} size={size} disabled>
        <Share2 className="h-4 w-4 mr-2" />
        {shareLabel}
      </Button>
    )
  }

  return (
    <>
      <Button variant={variant} size={size} onClick={() => setShareDialogOpen(true)}>
        <Share2 className="h-4 w-4 mr-2" />
        {shareLabel}
      </Button>

      <ShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        url={finalUrl}
        title={title}
        description={description}
        lang={lang}
      />
    </>
  )
}
