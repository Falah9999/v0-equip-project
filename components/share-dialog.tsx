"use client"

import { useState } from "react"
import { Check, Copy, Mail, Share2, LinkIcon, Facebook, Twitter, PhoneIcon as WhatsApp } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import type { Locale } from "@/lib/i18n-config"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  url: string
  title: string
  description?: string
  lang: Locale
}

export function ShareDialog({ open, onOpenChange, url, title, description, lang }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)

  const labels = {
    shareTitle: lang === "ar" ? "مشاركة" : "Share",
    shareDescription:
      lang === "ar"
        ? "شارك هذا المحتوى مع الآخرين عبر الرابط أو وسائل التواصل الاجتماعي"
        : "Share this content with others via link or social media",
    copyLink: lang === "ar" ? "نسخ الرابط" : "Copy Link",
    copied: lang === "ar" ? "تم النسخ!" : "Copied!",
    shareVia: lang === "ar" ? "مشاركة عبر" : "Share via",
    link: lang === "ar" ? "رابط" : "Link",
    email: lang === "ar" ? "البريد الإلكتروني" : "Email",
    social: lang === "ar" ? "وسائل التواصل" : "Social",
    sendEmail: lang === "ar" ? "إرسال بريد إلكتروني" : "Send Email",
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast({
        title: labels.copied,
        description: url,
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleEmailShare = () => {
    const subject = encodeURIComponent(title)
    const body = encodeURIComponent(`${description || title}\n\n${url}`)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  const handleSocialShare = (platform: "facebook" | "twitter" | "whatsapp") => {
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)
    const encodedDescription = encodeURIComponent(description || "")

    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
        break
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
        break
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer")
  }

  // Check if the Web Share API is available
  const isWebShareAvailable = typeof navigator !== "undefined" && !!navigator.share

  const handleNativeShare = async () => {
    if (isWebShareAvailable) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{labels.shareTitle}</DialogTitle>
          <DialogDescription>{labels.shareDescription}</DialogDescription>
        </DialogHeader>

        {isWebShareAvailable && (
          <div className="flex justify-center mb-4">
            <Button onClick={handleNativeShare} className="w-full">
              <Share2 className="mr-2 h-4 w-4" />
              {labels.shareTitle}
            </Button>
          </div>
        )}

        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="link">
              <LinkIcon className="h-4 w-4 mr-2" />
              {labels.link}
            </TabsTrigger>
            <TabsTrigger value="email">
              <Mail className="h-4 w-4 mr-2" />
              {labels.email}
            </TabsTrigger>
            <TabsTrigger value="social">
              <Share2 className="h-4 w-4 mr-2" />
              {labels.social}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="mt-4">
            <div className="flex space-x-2">
              <Input value={url} readOnly className="flex-1" />
              <Button variant="outline" size="icon" onClick={handleCopyLink}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">{labels.copyLink}</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="email" className="mt-4">
            <Button onClick={handleEmailShare} className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              {labels.sendEmail}
            </Button>
          </TabsContent>

          <TabsContent value="social" className="mt-4">
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" onClick={() => handleSocialShare("facebook")}>
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
              <Button variant="outline" onClick={() => handleSocialShare("twitter")}>
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
              <Button variant="outline" onClick={() => handleSocialShare("whatsapp")}>
                <WhatsApp className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
