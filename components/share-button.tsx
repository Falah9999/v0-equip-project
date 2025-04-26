"use client"

import { useState } from "react"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShareDialog } from "@/components/share-dialog"
import type { Locale } from "@/lib/i18n-config"

interface ShareButtonProps {
  // Ensure we're using the environment variable for the base URL
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
  const shareLabel = lang === "ar" ? "مشاركة" : "Share"

  return (
    <>
      <Button variant={variant} size={size} onClick={() => setShareDialogOpen(true)}>
        <Share2 className="h-4 w-4 mr-2" />
        {shareLabel}
      </Button>

      <ShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        url={url}
        title={title}
        description={description}
        lang={lang}
      />
    </>
  )
}
