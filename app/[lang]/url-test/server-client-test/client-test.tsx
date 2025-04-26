"use client"

import { useEffect, useState } from "react"
import { getSiteBaseUrl } from "@/lib/utils-url"
import type { Locale } from "@/lib/i18n-config"

export function ClientTest({ lang }: { lang: Locale }) {
  const [clientBaseUrl, setClientBaseUrl] = useState<string>("")

  useEffect(() => {
    // This will use the client-side logic in getSiteBaseUrl()
    setClientBaseUrl(getSiteBaseUrl())
  }, [])

  return (
    <div className="border p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Client-Side Base URL</h2>
      <p className="mb-2">This URL is generated in the browser using getSiteBaseUrl()</p>
      <div className="p-4 bg-muted rounded-md overflow-x-auto">
        <code>{clientBaseUrl}</code>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        In browser environments, this will always use window.location.origin.
      </p>
    </div>
  )
}
