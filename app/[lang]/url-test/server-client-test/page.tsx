import { getSiteBaseUrl } from "@/lib/utils-url"
import { ClientTest } from "./client-test"
import type { Locale } from "@/lib/i18n-config"

export default function ServerClientTestPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  // This will use the server-side logic in getSiteBaseUrl()
  const serverBaseUrl = getSiteBaseUrl()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Server vs Client URL Generation Test</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Server-Side Base URL</h2>
          <p className="mb-2">This URL is generated on the server using getSiteBaseUrl()</p>
          <div className="p-4 bg-muted rounded-md overflow-x-auto">
            <code>{serverBaseUrl}</code>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            In server environments, this will use process.env.NEXT_PUBLIC_SITE_URL if available, or an empty string as
            fallback.
          </p>
        </div>

        <ClientTest lang={lang} />
      </div>
    </div>
  )
}
