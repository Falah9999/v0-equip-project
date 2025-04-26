"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShareButton } from "@/components/share-button"
import { getSiteBaseUrl } from "@/lib/utils-url"
import type { Locale } from "@/lib/i18n-config"

export function UrlTester({ lang }: { lang: Locale }) {
  const [baseUrl, setBaseUrl] = useState<string>("")
  const [envVarValue, setEnvVarValue] = useState<string>("")
  const [windowOrigin, setWindowOrigin] = useState<string>("")
  const [customPath, setCustomPath] = useState<string>("/equipment/1")
  const [generatedUrl, setGeneratedUrl] = useState<string>("")

  useEffect(() => {
    // Get the base URL using our utility function
    setBaseUrl(getSiteBaseUrl())

    // Get the environment variable value directly
    setEnvVarValue(process.env.NEXT_PUBLIC_SITE_URL || "Not set")

    // Get window.location.origin
    setWindowOrigin(window.location.origin)

    // Generate initial URL
    updateGeneratedUrl("/equipment/1")
  }, [])

  const updateGeneratedUrl = (path: string) => {
    setCustomPath(path)
    setGeneratedUrl(`${getSiteBaseUrl()}/${lang}${path}`)
  }

  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const path = e.target.value.startsWith("/") ? e.target.value : `/${e.target.value}`
    updateGeneratedUrl(path)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Environment Configuration</CardTitle>
          <CardDescription>Current environment variable and URL settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="env-var">NEXT_PUBLIC_SITE_URL Environment Variable</Label>
              <Input id="env-var" value={envVarValue} readOnly />
            </div>
            <div>
              <Label htmlFor="window-origin">window.location.origin</Label>
              <Input id="window-origin" value={windowOrigin} readOnly />
            </div>
          </div>
          <div>
            <Label htmlFor="base-url">Base URL from getSiteBaseUrl()</Label>
            <Input id="base-url" value={baseUrl} readOnly />
            <p className="text-sm text-muted-foreground mt-1">
              This is the value used for generating share URLs. In browser environments, this will always be
              window.location.origin.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>URL Generation Test</CardTitle>
          <CardDescription>Test how URLs are generated for sharing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="custom-path">Custom Path</Label>
            <Input id="custom-path" value={customPath} onChange={handlePathChange} placeholder="/equipment/1" />
            <p className="text-sm text-muted-foreground mt-1">
              Enter a path to see how the full URL would be generated
            </p>
          </div>

          <div>
            <Label htmlFor="generated-url">Generated URL</Label>
            <div className="flex gap-2">
              <Input id="generated-url" value={generatedUrl} readOnly className="flex-1" />
              <Button variant="outline" onClick={() => navigator.clipboard.writeText(generatedUrl)}>
                Copy
              </Button>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-medium mb-2">Test Share Button</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Click the button below to test the share dialog with the generated URL
            </p>
            <ShareButton
              url={generatedUrl}
              title="Test Share"
              description="Testing URL generation for sharing"
              lang={lang}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Share URLs</CardTitle>
          <CardDescription>Examples of share URLs for different pages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Equipment Detail Page</Label>
              <Input value={`${baseUrl}/${lang}/equipment/1`} readOnly />
            </div>
            <div>
              <Label>Comparison Page (with IDs)</Label>
              <Input value={`${baseUrl}/${lang}/equipment/compare?ids=1,2,3`} readOnly />
            </div>
            <div>
              <Label>Homepage</Label>
              <Input value={`${baseUrl}/${lang}`} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
