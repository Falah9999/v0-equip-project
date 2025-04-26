import { UrlTester } from "./url-tester"
import type { Locale } from "@/lib/i18n-config"

export default function UrlTestPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">URL Generation Test</h1>
      <UrlTester lang={lang} />
    </div>
  )
}
